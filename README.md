# Brain Battle Academy

An engaging, gamified 11+ exam preparation platform for kids. Features multiple game types covering Maths, English, Verbal Reasoning, and Non-Verbal Reasoning.

## Features

- **Multiple Game Types**: Quick Fire, Calculator Detective, Quiz Master, and more
- **Progress Tracking**: Track stars, accuracy, and session history
- **Earnings System**:
  - £1 for completing 7 days streak (15min/day)
  - £1 for achieving 90%+ accuracy in a session
- **Weekly Leaderboard**: Compete with friends (William vs Santi vs others)
- **Session Timer**: 15-minute focused learning sessions
- **Subjects Covered**:
  - Maths (fully implemented)
  - English & Comprehension (coming soon)
  - Verbal Reasoning (coming soon)
  - Non-Verbal Reasoning (coming soon)

## Tech Stack

- **Next.js 16** with TypeScript
- **Prisma 5** with PostgreSQL/SQLite database
- **Tailwind CSS 4** for styling
- **React 19** for UI components
- **bcryptjs** for password hashing

## Getting Started

### Local Development (SQLite)

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Use SQLite for local development (default in .env.example)
```

3. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev
npx tsx lib/seed.ts
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

### Production Setup (PostgreSQL)

1. Create a PostgreSQL database (e.g., on Vercel Postgres, Railway, or Supabase)

2. Update `.env` with your PostgreSQL connection string:
```bash
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

3. Update `prisma/schema.prisma` to use PostgreSQL:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

4. Run migrations and seed:
```bash
npx prisma migrate dev
npx tsx lib/seed.ts
```

5. Deploy to your hosting platform (Vercel recommended)

## Default Users

- **Santi**: Username `Santi`, Password `santi123`
- **William**: Username `William`, Password `william123`

## Project Structure

```
brain-battle-academy/
├── app/
│   ├── api/auth/         # Authentication endpoints
│   ├── dashboard/        # Main dashboard with game selection
│   ├── game/[gameId]/    # Dynamic game pages
│   ├── login/            # Login page
│   └── page.tsx          # Home page (redirects to login)
├── lib/
│   ├── prisma.ts         # Prisma client
│   └── seed.ts           # Database seeding
├── prisma/
│   └── schema.prisma     # Database schema
└── README.md
```

## Current Games

### Quick Fire ⚡
- Fast-paced arithmetic practice
- Addition, subtraction, multiplication, division
- 20 questions in 15 minutes
- Earn £1 for 90%+ accuracy

## Features Implemented

### Authentication & User Management
- ✅ Database-authenticated login with bcrypt password hashing
- ✅ User profiles with avatars and colors
- ✅ Secure session management

### Game System
- ✅ 21 different game types across all 4 subjects (Maths, English, Verbal Reasoning, Non-Verbal Reasoning)
- ✅ Quick Fire game with 60-second timer
- ✅ Multiple choice and text input question types
- ✅ Progress tracking with saved game states
- ✅ Interactive cheat sheet for reference

### Progress & Rewards
- ✅ Automatic session saving to database
- ✅ Star collection system
- ✅ Earnings system: £1 for 90%+ accuracy, £1 for 7-day streak
- ✅ Weekly streak tracking
- ✅ Real-time leaderboard

### Dashboard
- ✅ Personal stats (total stars, earnings, current streak)
- ✅ Leaderboard with all players
- ✅ Game selection for all subjects
- ✅ Earnings challenges display

## Roadmap

- [ ] Add more question content for each game type
- [ ] Implement parent dashboard for monitoring
- [ ] Add achievement badges system
- [ ] Create weekly/monthly leaderboards
- [ ] Add practice mode (no timers, no penalties)
- [ ] Mobile app version

## Contributing

This is a personal project for 11+ exam preparation. Feel free to fork and customize for your needs!

## License

MIT
