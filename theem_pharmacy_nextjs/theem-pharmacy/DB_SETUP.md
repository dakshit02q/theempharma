# Server-Rendered Next.js with Drizzle ORM & PostgreSQL Setup Guide

## Overview

This is a server-rendered Next.js project integrated with Drizzle ORM for database management and PostgreSQL as the database. The application supports server-side rendering (SSR) for all pages and uses API routes for data management.

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 12+ (local installation or cloud service)
- Git

## Project Structure

```
theem-pharmacy/
├── app/
│   ├── api/                      # API routes
│   │   ├── courses/route.ts
│   │   ├── faculty/route.ts
│   │   ├── admissions/route.ts
│   │   ├── about/route.ts
│   │   ├── features/route.ts
│   │   └── statistics/route.ts
│   ├── about/
│   │   └── page.jsx             # Server-rendered About page
│   ├── admissions/
│   │   └── page.jsx             # Server-rendered Admissions page
│   ├── contact/
│   │   └── page.js
│   ├── courses/
│   │   └── page.jsx             # Server-rendered Courses page
│   ├── layout.js
│   ├── globals.css
│   └── page.jsx                 # Server-rendered Home page
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── ScrollToTopButton.js
│   └── CursorAnimation.js
├── lib/
│   ├── db/
│   │   ├── index.ts             # Database connection
│   │   ├── schema.ts            # Database schemas
│   │   └── seed.ts              # Seed data script
│   └── data.ts                  # Server-side data fetching functions
├── drizzle.config.ts            # Drizzle Kit configuration
├── .env.local                   # Environment variables (local)
├── .env.example                 # Environment variables template
├── next.config.mjs
├── package.json
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:

- `drizzle-orm` - ORM library
- `drizzle-kit` - Migration CLI tool
- `pg` - PostgreSQL driver
- `dotenv` - Environment variable loader

### 2. Setup PostgreSQL Database

#### Option A: Local PostgreSQL Installation

```bash
# On Windows (if PostgreSQL is installed)
# Using psql command line:
psql -U postgres

# Create database:
CREATE DATABASE theem_pharmacy_db;

# Verify:
\l
\q
```

#### Option B: Cloud PostgreSQL (Recommended for Easy Setup)

Use any of these services:

- **Neon** (https://neon.tech) - Free tier available
- **Render** (https://render.com)
- **ElephantSQL** (https://www.elephantsql.com)
- **Railway** (https://railway.app)

Get your connection string and proceed to step 3.

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and update the `DATABASE_URL`:

```
DATABASE_URL=postgresql://username:password@localhost:5432/theem_pharmacy_db
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**For cloud PostgreSQL, the format will be:**

```
DATABASE_URL=postgresql://user:password@host:port/database_name
```

### 4. Generate Database Migrations

```bash
npm run db:generate
```

This creates migration files in the `drizzle/` directory based on your schema.

### 5. Run Migrations

Push the schema to your database:

```bash
npm run db:push
```

Or manually migrate:

```bash
npm run db:migrate
```

### 6. Seed Initial Data

```bash
npm run db:seed
```

This will populate your database with:

- Sample courses (B.Pharmacy, M.Pharmacy, Pharm.D)
- Faculty members
- About page content
- Features and statistics

### 7. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Tables

#### `courses`

- `id` - Primary key
- `name` - Course name
- `description` - Course description
- `duration` - Course duration (e.g., "4 years")
- `eligibility` - Eligibility criteria
- `created_at` - Timestamp
- `updated_at` - Timestamp

#### `faculty`

- `id` - Primary key
- `name` - Faculty member name
- `position` - Job position
- `specialization` - Area of expertise
- `email` - Email address
- `phone` - Phone number
- `bio` - Biography
- `image` - Profile image URL
- `created_at` - Timestamp
- `updated_at` - Timestamp

#### `admissions`

- `id` - Primary key
- `first_name` - Applicant's first name
- `last_name` - Applicant's last name
- `email` - Email address
- `phone` - Phone number
- `course_id` - Foreign key to courses
- `qualifications` - Educational qualifications
- `experience_years` - Years of experience
- `status` - Application status (pending, accepted, rejected)
- `submitted_at` - Submission timestamp
- `created_at` - Timestamp
- `updated_at` - Timestamp

#### `about_content`

- `id` - Primary key
- `title` - Section title
- `content` - Content text
- `image` - Image URL
- `order` - Display order
- `is_active` - Active status
- `created_at` - Timestamp
- `updated_at` - Timestamp

#### `contact_submissions`

- `id` - Primary key
- `name` - Contact form name
- `email` - Contact email
- `phone` - Contact phone
- `subject` - Message subject
- `message` - Message content
- `status` - Status (new, responded, closed)
- `submitted_at` - Submission timestamp
- `created_at` - Timestamp

#### `features`

- `id` - Primary key
- `title` - Feature title
- `description` - Feature description
- `icon` - Icon identifier
- `order` - Display order
- `is_active` - Active status
- `created_at` - Timestamp
- `updated_at` - Timestamp

#### `statistics`

- `id` - Primary key
- `label` - Statistic label
- `value` - Numeric value
- `icon` - Icon identifier
- `order` - Display order
- `is_active` - Active status
- `created_at` - Timestamp
- `updated_at` - Timestamp

## API Endpoints

### GET Endpoints (All support server-side fetching)

- `GET /api/courses` - Fetch all courses
- `GET /api/faculty` - Fetch all faculty members
- `GET /api/about` - Fetch active about content
- `GET /api/features` - Fetch active features
- `GET /api/statistics` - Fetch active statistics
- `GET /api/admissions` - Fetch all admissions

### POST Endpoints (For form submissions)

- `POST /api/courses` - Create a new course
- `POST /api/faculty` - Add a faculty member
- `POST /api/admissions` - Submit admission application
- `POST /api/about` - Add about content
- `POST /api/features` - Add a feature
- `POST /api/statistics` - Add a statistic
- `POST /api/contact` - Submit contact form

## Server-Side Data Fetching

All pages use server-side rendering. Data fetching functions are located in `lib/data.ts`:

```typescript
// Examples:
const courses = await getAllCourses();
const faculty = await getAllFaculty();
const aboutContent = await getAboutContent();
const features = await getAllFeatures();
const statistics = await getAllStatistics();
```

Pages are converted to async components to use these functions:

```typescript
export default async function Home() {
  const courses = await getAllCourses();
  // ...
}
```

## Available npm Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm build                # Build for production
npm start                # Start production server

# Database Management
npm run db:generate      # Generate migrations from schema changes
npm run db:migrate       # Run pending migrations
npm run db:push          # Push schema changes to database
npm run db:seed          # Populate database with seed data
npm run db:studio        # Open Drizzle Studio (visual editor)

# Linting
npm run lint             # Run ESLint
```

## Drizzle Studio

View and manage your database visually:

```bash
npm run db:studio
```

This opens a web interface at `http://localhost:5173` where you can:

- Browse all tables
- View data
- Edit records
- Add new data

## Environment Variables

### Required

- `DATABASE_URL` - PostgreSQL connection string

### Optional

- `NEXT_PUBLIC_API_URL` - API base URL (defaults to localhost:3000)

## Server-Side Rendering Benefits

1. **Better SEO** - Content is rendered on the server
2. **Improved Performance** - No JavaScript waterfall for data fetching
3. **Data Privacy** - Database queries stay on the server
4. **Automatic Caching** - Next.js can cache SSR pages
5. **Real-time Data** - Always fetches fresh data on page load

## Example: Creating New Page with Server-Side Data

```typescript
import { getAllCourses } from "@/lib/data";

export const metadata = {
  title: "Courses",
};

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>{course.name}</div>
      ))}
    </div>
  );
}
```

## Troubleshooting

### Connection Error: "ECONNREFUSED"

- Verify PostgreSQL is running
- Check DATABASE_URL in .env.local
- Ensure database exists

### Migration Error: "Column does not exist"

- Run `npm run db:push` to apply pending migrations
- Check schema.ts for any type mismatches

### "dotenv not found"

- Run `npm install dotenv` separately if needed

### Pages Not Updating After Data Changes

- Clear Next.js cache: `rm -rf .next`
- Restart development server

## Deployment

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Ensure your hosting platform supports:

- Node.js 18+
- PostgreSQL connection
- Environment variables

## Security Considerations

1. **Never commit .env.local** - It's in .gitignore by default
2. **Use environment variables** for all sensitive data
3. **Validate form inputs** - Server-side validation is recommended
4. **Use HTTPS** in production
5. **Implement authentication** for admin sections

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Drizzle Discord Community](https://discord.com/invite/eeymqexeye)

## License

This project is private and proprietary.

## Contact

For issues or questions, contact the development team.
