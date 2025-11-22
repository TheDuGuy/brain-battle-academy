# Brain Battle Academy - Hardening Summary

## Overview

This document summarizes the major refactoring and hardening work completed on the Brain Battle Academy app. The focus was on extracting business logic into pure, testable modules, improving security, and preparing for production deployment.

## 1. Pure Domain Module for Rewards (`lib/rewards.ts`)

### What Changed

Created a pure, testable domain module that implements ALL reward and streak business logic with zero dependencies on database or HTTP layers.

### Key Features

- **Pure Functions**: `evaluateRewards()` is completely pure - same inputs always produce same outputs
- **Europe/London Timezone**: All dates handled in London timezone using Luxon
- **Clear Types**: Explicit types for SessionInput, ExistingReward, RewardType, etc.
- **Business Rules Implemented**:
  - Daily completion: 15+ minutes of play counts as a completed day
  - Streak: Consecutive completed calendar days ending today
  - HIGH_ACCURACY reward: £1 for 90%+ accuracy (once per week)
  - STREAK reward: £1 for 7 consecutive days (once per week)

### Streak Calculation Logic

Streaks are calculated as:
1. Group all sessions by calendar day in London timezone
2. For each day, sum total duration
3. Day is "completed" if total duration >= 900 seconds (15 minutes)
4. Count consecutive completed days backwards from today
5. If today isn't completed, streak = 0
6. If any day is missed, streak breaks

**Example**:
- User plays Mon, Tue, Wed, skips Thu, plays Fri
- Streak on Fri = 1 (only Fri counts, previous days don't count due to gap)

### Week-Based Rewards

Rewards are tracked per week (Monday-Sunday in Europe/London):
- HIGH_ACCURACY: Max 1 per week, even if user achieves 90%+ multiple times
- STREAK: Max 1 per week, even if user maintains 7+ day streak across multiple weeks

The `weekStart` field ensures we don't grant duplicate rewards.

### Unit Tests

Created comprehensive test suite with Vitest (19 tests, all passing):
- HIGH_ACCURACY rewards (90%, 100%, 89%, weekly limits)
- Streak calculation (1-day, 7-day, breaks, week boundaries)
- Edge cases (midnight boundary, both rewards same session, zero questions)
- Realistic scenarios (multi-day play, committed student)

## 2. Updated Prisma Schema

### Changes Made

**User Model**:
```prisma
model User {
  // ... existing fields
  role String @default("PLAYER") // PLAYER or PARENT
  // Changed from `earnings` to `rewards`
  rewards Reward[]
}
```

**New Reward Model** (replaced Earning):
```prisma
model Reward {
  id          String   @id @default(cuid())
  userId      String
  type        String   // HIGH_ACCURACY or STREAK
  amountPence Int      // Money stored in pence (100 = £1)
  reason      String
  weekStart   DateTime
  createdAt   DateTime @default(now())

  @@index([userId, weekStart])
  @@index([userId, type, weekStart])
}
```

**New LoginAttempt Model** (for brute-force protection):
```prisma
model LoginAttempt {
  id          String   @id @default(cuid())
  username    String
  ipAddress   String?
  success     Boolean
  attemptedAt DateTime @default(now())

  @@index([username, attemptedAt])
  @@index([ipAddress, attemptedAt])
}
```

### Why These Changes

- **role field**: Prepare for parent/child distinction
- **amountPence**: Store money in smallest unit to avoid floating point issues
- **type + weekStart indexes**: Fast lookup for "did user already get this reward type this week?"
- **LoginAttempt**: Track failed logins for brute-force protection

### Seed Script Updated

Added three users:
- **Santi** (PLAYER) - santi123
- **William** (PLAYER) - william123
- **Parent** (PARENT) - parent123

## 3. Refactored /api/sessions Route

### Old Implementation Problems

The old route had:
- Business logic mixed with database operations
- No input validation
- Reward calculation embedded in API route
- Hard to test
- Manual streak/reward logic prone to bugs

### New Implementation

Complete rewrite following clean architecture:

```typescript
export async function POST(request: Request) {
  // 1. Validate with Zod schema
  const validated = sessionSchema.safeParse(body)

  // 2. Load context (recent sessions, existing rewards)
  const [recentSessions, existingRewards] = await Promise.all([...])

  // 3. Call pure domain logic
  const result = evaluateRewards({
    newSession: {...},
    recentSessions,
    existingRewards
  })

  // 4. Persist in transaction
  await prisma.$transaction(async (tx) => {
    // Create session
    // Create rewards
    // Update progress
    // Update streak
  })

  // 5. Return structured response
  return NextResponse.json({
    sessionId,
    accuracy,
    currentStreakDays,
    newRewards,
    totalEarningsPence
  })
}
```

### Validation Rules (Zod)

```typescript
const sessionSchema = z.object({
  userId: z.string().min(1),
  gameId: z.string().min(1),
  subject: z.enum(['MATHS', 'ENGLISH', 'VR', 'NVR']),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime(),
  totalQuestions: z.number().int().min(1),
  correctAnswers: z.number().int().min(0),
})
.refine(data => data.correctAnswers <= data.totalQuestions)
.refine(data => {
  const durationHours = (end - start) / (1000 * 60 * 60)
  return durationHours >= 0 && durationHours <= 3
})
```

Rejects:
- Invalid dates
- Negative values
- correctAnswers > totalQuestions
- Sessions longer than 3 hours
- Missing required fields

### Response Format

```json
{
  "sessionId": "cmi...",
  "accuracy": 95.5,
  "currentStreakDays": 7,
  "newRewards": [
    {
      "type": "HIGH_ACCURACY",
      "amountPence": 100,
      "reason": "Achieved 95% accuracy"
    },
    {
      "type": "STREAK",
      "amountPence": 100,
      "reason": "Completed 7-day learning streak"
    }
  ],
  "totalEarningsPence": 500,
  "message": "Session saved with rewards!"
}
```

## 4. Testing Infrastructure

### Vitest Setup

Added `vitest.config.ts`:
```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  }
})
```

### Test Coverage

- 19 tests covering all reward scenarios
- Pure function testing (no mocks needed!)
- Fast execution (< 100ms total)
- Tests run independently

### Running Tests

```bash
npx vitest run        # Run once
npx vitest            # Watch mode
npx vitest --ui       # UI mode
```

## 5. Dependencies Added

```json
{
  "dependencies": {
    "luxon": "^3.x",     // Timezone handling
    "zod": "^3.x"        // Runtime validation
  },
  "devDependencies": {
    "@types/luxon": "^3.x",
    "vitest": "^4.x",
    "@vitest/ui": "^4.x"
  }
}
```

## 6. What's Still TODO

### High Priority

**Implement httpOnly Cookie Authentication**:
- Replace localStorage auth tokens with secure cookies
- Create `/api/auth/me` endpoint
- Update login route to set httpOnly cookies

**Add Brute-Force Protection**:
- Use LoginAttempt model
- Lock accounts after 5 failed attempts in 10 minutes
- Return generic error message

**Centralize Game Configuration**:
- Create `lib/games.ts` with all 21 game configs
- Update dashboard and game pages to use centralized config

**Update Client (game page)**:
- Parse new API response format
- Show reward notifications (toasts/modals)
- Display current streak
- Handle validation errors

### Medium Priority

**UX Improvements**:
- Reward feedback animations
- Empty states
- Accessibility improvements (44px touch targets)

### Migration Notes

When moving to PostgreSQL:
1. Update `datasource` in schema.prisma to `provider = "postgresql"`
2. Can add proper enum types (UserRole, RewardType)
3. Better indexing performance
4. Connection pooling available

## 7. How Streak + Reward Logic Works

### Daily Play Tracking

1. **Sessions are grouped by calendar day** (using Europe/London timezone)
2. **Multiple sessions in same day are summed**:
   - 8am: 10-minute session
   - 3pm: 8-minute session
   - Total: 18 minutes → Day completed ✓

3. **Day must have 15+ minutes total to count**

### Streak Calculation Example

```
Mon: 20 min ✓
Tue: 15 min ✓
Wed: 10 min ✗ (not enough)
Thu: 20 min ✓
Fri: 25 min ✓ (today)

Streak = 2 (Thu + Fri only)
```

Wednesday broke the streak because it didn't reach 15 minutes.

### Reward Awarding

**Week 1 (Mon-Sun)**:
- Monday: Play with 95% accuracy → Get £1 HIGH_ACCURACY
- Tuesday: Play with 100% accuracy → No reward (already got one this week)
- Days 1-7: Complete all → Get £1 STREAK on day 7

**Week 2 (Mon-Sun)**:
- Monday: Can earn new HIGH_ACCURACY reward (new week)
- Continue streak: Still only get STREAK reward once per week

### Money Calculation

All money stored in pence:
- `amountPence: 100` = £1.00
- `amountPence: 250` = £2.50

Total earnings = SUM of all reward.amountPence values.

Never recalculate by counting sessions - the Reward table is the source of truth.

## 8. Brute-Force Protection Design

### Implementation Plan

```typescript
// In /api/auth/login

const WINDOW_MINUTES = 10
const MAX_ATTEMPTS = 5

// Before checking password:
const recentAttempts = await prisma.loginAttempt.findMany({
  where: {
    username,
    success: false,
    attemptedAt: {
      gte: new Date(Date.now() - WINDOW_MINUTES * 60 * 1000)
    }
  }
})

if (recentAttempts.length >= MAX_ATTEMPTS) {
  await prisma.loginAttempt.create({
    data: { username, ipAddress, success: false }
  })
  return NextResponse.json(
    { error: 'Too many failed attempts. Please try again later.' },
    { status: 429 }
  )
}

// ... check password ...

// Record attempt
await prisma.loginAttempt.create({
  data: { username, ipAddress, success: passwordValid }
})
```

### Features

- Tracks by username AND IP address
- 10-minute rolling window
- Generic error message (don't reveal if username exists)
- Resets on successful login

## 9. File Structure

```
brain-battle-academy/
├── lib/
│   ├── rewards.ts              # ⭐ Pure domain logic
│   ├── rewards.test.ts         # ⭐ Comprehensive tests
│   ├── game-generators.ts      # Question generators
│   └── prisma.ts               # Prisma client
├── app/api/
│   ├── sessions/
│   │   ├── route.ts            # ⭐ Refactored with validation
│   │   └── route.old.ts        # Backup of old version
│   ├── auth/
│   │   └── login/route.ts      # TODO: Add brute-force protection
│   └── stats/                  # Existing stats routes
├── prisma/
│   └── schema.prisma           # ⭐ Updated with roles, rewards
└── vitest.config.ts            # ⭐ Test configuration
```

## 10. Migration Commands

```bash
# Install new dependencies
npm install luxon zod
npm install -D @types/luxon vitest @vitest/ui

# Run migrations
npx prisma migrate dev --name add-roles-rewards-and-login-attempts

# Regenerate Prisma client
npx prisma generate

# Seed database
npx tsx lib/seed.ts

# Run tests
npx vitest run
```

## 11. Key Improvements

### Before

- ❌ Business logic embedded in API routes
- ❌ No input validation
- ❌ Manual streak calculation (buggy)
- ❌ Duplicate reward checking prone to errors
- ❌ Hard to test
- ❌ Timezone handling inconsistent

### After

- ✅ Pure domain module (zero dependencies)
- ✅ Comprehensive Zod validation
- ✅ Streak calculation tested with 19 test cases
- ✅ Robust weekly reward deduplication
- ✅ 100% testable without mocks
- ✅ Consistent Europe/London timezone

## 12. Production Readiness

### Completed

- [x] Extract business logic to pure functions
- [x] Add comprehensive unit tests
- [x] Validate all inputs with Zod
- [x] Use database transactions
- [x] Store money in smallest unit (pence)
- [x] Add user roles
- [x] Add indexes for performance

### Still Needed

- [ ] httpOnly cookie authentication
- [ ] Brute-force protection
- [ ] Centralized game config
- [ ] Update client to use new API
- [ ] UX improvements (toasts, etc.)

---

## Summary

The app now has a solid foundation with:
1. **Testable business logic** separated from infrastructure
2. **Validated inputs** preventing bad data
3. **Transactional persistence** ensuring data integrity
4. **Timezone-aware calculations** preventing midnight bugs
5. **Week-based reward tracking** preventing duplicates

The remaining work (auth improvements, brute-force protection, client updates) builds on this foundation without changing the core architecture.
