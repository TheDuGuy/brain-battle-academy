# Brain Battle Academy - Deployment Guide

## Pre-Deployment Checklist

### ✅ Code Quality
- [x] All TypeScript errors resolved
- [x] Build completes successfully (`npm run build`)
- [x] No console errors in development
- [x] All API routes tested and working

### ✅ Database Integration
- [x] Prisma schema configured
- [x] All models properly related
- [x] Seed script working
- [x] API routes use database (not localStorage)

### 🧪 Testing Checklist

#### Authentication Flow
- [ ] Test login with valid credentials (Santi/santi123)
- [ ] Test login with invalid credentials
- [ ] Test login with wrong password
- [ ] Verify redirect to dashboard after successful login
- [ ] Verify redirect to login when not authenticated

#### Game Flow
- [ ] Test Quick Fire game (maths with timer)
- [ ] Test Calculator Detective game
- [ ] Test Quiz Master game (multiple choice)
- [ ] Test at least one game from each subject:
  - [ ] Maths
  - [ ] English
  - [ ] Verbal Reasoning
  - [ ] Non-Verbal Reasoning
- [ ] Verify questions generate correctly
- [ ] Verify answers are validated correctly
- [ ] Test completing a game
- [ ] Test game saves to database
- [ ] Test saved progress loads correctly
- [ ] Test "Continue Game" functionality

#### Dashboard & Stats
- [ ] Verify stats load from database
- [ ] Check total stars calculation
- [ ] Check earnings calculation
- [ ] Check current streak display
- [ ] Verify week earnings update
- [ ] Test leaderboard displays correctly
- [ ] Verify leaderboard sorts by stars
- [ ] Test "Switch User" button

#### Rewards System
- [ ] Complete game with 90%+ accuracy → verify £1 reward
- [ ] Complete game with <90% accuracy → verify no reward
- [ ] Play on consecutive days → verify streak increments
- [ ] Complete 7-day streak → verify £1 reward
- [ ] Verify rewards only given once per week

#### Edge Cases
- [ ] Test with empty database
- [ ] Test with only one user
- [ ] Test with multiple users
- [ ] Test losing all 3 lives
- [ ] Test timer running out (Quick Fire)
- [ ] Test browser refresh during game
- [ ] Test logout and re-login

## PostgreSQL Migration Steps

### 1. Choose a PostgreSQL Provider

**Recommended options:**
- **Vercel Postgres** (if deploying to Vercel) - Easiest integration
- **Supabase** - Free tier, great developer experience
- **Railway** - Simple setup, good free tier
- **Neon** - Serverless PostgreSQL

### 2. Create Database

For Vercel Postgres (recommended if using Vercel):
```bash
# In Vercel dashboard:
1. Go to your project
2. Click "Storage" tab
3. Create new Postgres database
4. Copy connection string
```

For Supabase:
```bash
1. Sign up at supabase.com
2. Create new project
3. Go to Settings → Database
4. Copy connection string (URI mode)
```

### 3. Update Environment Variables

Create `.env.production` or update `.env`:
```bash
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public&sslmode=require"
```

### 4. Update Prisma Schema

```bash
# Edit prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 5. Generate Prisma Client & Run Migrations

```bash
# Generate new Prisma client for PostgreSQL
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init

# Seed the database
npx tsx lib/seed.ts
```

### 6. Test Locally with PostgreSQL

```bash
# Start dev server
npm run dev

# Test all functionality with PostgreSQL
# - Login
# - Play games
# - Check dashboard
# - Verify leaderboard
```

### 7. Deploy to Vercel

```bash
# Install Vercel CLI (if not already)
npm i -g vercel

# Deploy
vercel

# Or push to GitHub and deploy automatically if connected
git push origin main
```

## Environment Variables for Production

Required environment variables:
```
DATABASE_URL=postgresql://...
NODE_ENV=production
```

## Post-Deployment Verification

- [ ] Visit production URL
- [ ] Test login flow
- [ ] Play at least one complete game
- [ ] Verify stats update
- [ ] Check leaderboard works
- [ ] Test from mobile device
- [ ] Check browser console for errors
- [ ] Verify database connections work

## Database Backup Strategy

### For PostgreSQL

1. **Automated Backups** (most providers include this)
   - Vercel Postgres: Automatic daily backups
   - Supabase: Automatic daily backups (retained 7 days on free tier)

2. **Manual Backup**
```bash
# Using Prisma
npx prisma db pull
npx prisma db push

# Using pg_dump (if you have direct access)
pg_dump DATABASE_URL > backup.sql
```

## Monitoring & Maintenance

### Things to Monitor:
- Database size (watch for hitting limits)
- API response times
- Error logs (Vercel Analytics or similar)
- User growth
- Database connection pool usage

### Regular Maintenance:
- Review and clean up old sessions (>30 days)
- Archive old earnings/streaks by quarter
- Monitor question quality/difficulty
- Update seed data with more questions

## Scaling Considerations

Current setup can handle:
- **100-500 active users** easily
- **1000+ users** with proper database indexes
- **5000+ users** may need:
  - Connection pooling (PgBouncer)
  - Read replicas for leaderboard
  - Caching layer (Redis)

## Troubleshooting

### Common Issues:

**"Can't reach database"**
- Check DATABASE_URL is correct
- Verify SSL mode if required
- Check firewall/IP whitelist

**"P2002: Unique constraint failed"**
- User already exists
- Check seed script doesn't run multiple times

**"Prisma client not generated"**
```bash
npx prisma generate
```

**"Migration failed"**
- Check database permissions
- Ensure clean migration history
- Try: `npx prisma migrate reset` (⚠️ deletes all data)

## Rollback Plan

If production deploy fails:

1. **Revert to SQLite temporarily:**
```bash
# Change prisma/schema.prisma back to sqlite
# Redeploy
```

2. **Debug PostgreSQL connection:**
```bash
# Test connection locally first
npx prisma db pull
```

3. **Check logs:**
```bash
vercel logs [deployment-url]
```

## Support & Resources

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
