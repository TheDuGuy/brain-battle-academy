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

- **Next.js 14** with TypeScript
- **Prisma 5** with SQLite database
- **Tailwind CSS** for styling
- **React** for UI components

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma migrate dev
npx tsx lib/seed.ts
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Default Users

- **Santi**: Password `santi123`
- **William**: Password `william123`

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

## Roadmap

- [ ] Add more maths games (Calculator Detective, Quiz Master, etc.)
- [ ] Implement English & Comprehension section
- [ ] Add Verbal Reasoning games
- [ ] Add Non-Verbal Reasoning games
- [ ] Build leaderboard system
- [ ] Add achievements and badges
- [ ] Create parent dashboard
- [ ] Add streak tracking
- [ ] Implement session statistics API

## Contributing

This is a personal project for 11+ exam preparation. Feel free to fork and customize for your needs!

## License

MIT
