# THEEM - Theem College of Pharmacy and Research

> A modern, server-rendered Next.js application with Drizzle ORM and PostgreSQL for pharmaceutical education management

## 🚀 Features

### Architecture

- **Server-Side Rendering (SSR)** - All pages render on the server for better SEO and performance
- **PostgreSQL Database** - Robust relational database with Drizzle ORM
- **API-First Design** - RESTful API endpoints for all data operations
- **Type-Safe** - TypeScript support throughout the project
- **Responsive Design** - Mobile-first UI with Tailwind CSS
- **Modern Next.js 16.0.0** - Latest features with App Router

### Pages

- **Home** - Hero section with statistics and features from database
- **About** - Mission, vision, and faculty information from database
- **Programs/Courses** - Dynamic course listings from database
- **Admissions** - Online admission application form with database submission
- **Contact** - Contact form for inquiries
- **Faculty** - Faculty member profiles from database

### Database Tables

- Courses
- Faculty
- Admissions
- About Content
- Features
- Statistics
- Contact Submissions

## 📋 Requirements

- Node.js 18.0+
- npm or yarn
- PostgreSQL 12+
- Git

## ⚡ Quick Start

### 1. Setup Environment

```bash
# Clone repository (if applicable)
cd theem_pharmacy_nextjs/theem-pharmacy

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your database URL
# DATABASE_URL=postgresql://username:password@localhost:5432/theem_pharmacy_db
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

```bash
# Generate migrations
npm run db:generate

# Apply migrations to create tables
npm run db:push

# Seed initial data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup Detailed Guide

For complete database setup instructions, see [DB_SETUP.md](./DB_SETUP.md)

### Quick Database Connection String Examples

**Local PostgreSQL:**

```
postgresql://postgres:password@localhost:5432/theem_pharmacy_db
```

**Neon (Cloud):**

```
postgresql://user:password@ep-xyz.region.neon.tech/theem_pharmacy_db
```

**Render:**

```
postgresql://user:password@dpg-xyz.render.com/theem_pharmacy_db
```

## 📦 Available Scripts

```bash
npm run dev              # Start development server (hot reload)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint linter

# Database commands
npm run db:generate      # Generate new migrations from schema changes
npm run db:migrate       # Run pending migrations
npm run db:push          # Push schema directly to database
npm run db:seed          # Populate database with sample data
npm run db:studio        # Open Drizzle Studio (visual database editor)
```

## 🏗️ Project Structure

```
theem-pharmacy/
├── app/
│   ├── api/
│   │   ├── courses/route.ts           # GET/POST courses
│   │   ├── faculty/route.ts           # GET/POST faculty
│   │   ├── admissions/route.ts        # GET/POST admissions
│   │   ├── about/route.ts             # GET/POST about content
│   │   ├── features/route.ts          # GET/POST features
│   │   ├── statistics/route.ts        # GET/POST statistics
│   │   └── contact/route.ts           # POST contact submissions
│   ├── about/page.jsx                 # About page (SSR)
│   ├── admissions/page.jsx            # Admissions page (SSR)
│   ├── contact/page.js                # Contact page
│   ├── courses/page.jsx               # Courses page (SSR)
│   ├── layout.js                      # Root layout
│   ├── page.jsx                       # Home page (SSR)
│   └── globals.css
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── ScrollToTopButton.js
│   └── CursorAnimation.js
├── lib/
│   ├── db/
│   │   ├── index.ts                   # Database connection
│   │   ├── schema.ts                  # Table schemas
│   │   └── seed.ts                    # Seed script
│   ├── api-client.ts                  # API client utilities
│   └── data.ts                        # Server-side data fetching
├── public/images/
├── drizzle/                           # Generated migrations
├── .env.local                         # Environment variables (local)
├── .env.example                       # Environment template
├── drizzle.config.ts                  # Drizzle Kit config
├── tsconfig.json                      # TypeScript config
├── next.config.mjs                    # Next.js config
├── package.json
├── DB_SETUP.md                        # Detailed DB setup guide
└── README.md
```

## 🔄 Server-Side Rendering

All main pages are server-side rendered for optimal performance and SEO:

```typescript
// Example page with SSR
export const metadata = {
  /* SEO metadata */
};

export default async function CoursesPage() {
  // Direct server-side data fetching - no client-side waterfall
  const courses = await getAllCourses();

  return (
    <div>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```

### Benefits

- ✅ Better SEO - Content in HTML
- ✅ Faster Initial Load - No data fetching waterfall
- ✅ Better Privacy - Database queries on server
- ✅ Automatic Caching - Next.js caches SSR pages
- ✅ Real-time Data - Always fresh data

## 📊 Database Schema

### Core Tables

**courses**

- id, name, description, duration, eligibility, created_at, updated_at

**faculty**

- id, name, position, specialization, email, phone, bio, image, created_at, updated_at

**admissions**

- id, first_name, last_name, email, phone, course_id, qualifications, experience_years, status, submitted_at, created_at, updated_at

**about_content**

- id, title, content, image, order, is_active, created_at, updated_at

**features**

- id, title, description, icon, order, is_active, created_at, updated_at

**statistics**

- id, label, value, icon, order, is_active, created_at, updated_at

**contact_submissions**

- id, name, email, phone, subject, message, status, submitted_at, created_at

For detailed schema information, see [DB_SETUP.md#database-schema](./DB_SETUP.md#database-schema)

## 🔌 API Endpoints

All endpoints follow RESTful conventions:

### Read Operations

```
GET /api/courses
GET /api/faculty
GET /api/admissions
GET /api/about
GET /api/features
GET /api/statistics
```

### Write Operations

```
POST /api/courses
POST /api/faculty
POST /api/admissions
POST /api/about
POST /api/features
POST /api/statistics
POST /api/contact
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.0 with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **ORM**: Drizzle Kit for migrations
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Poppins & Montserrat (Google Fonts)
- **Animations**: Custom CSS animations & Framer Motion
- **Backend**: Next.js API Routes (TypeScript)
- **Type Safety**: TypeScript throughout

## 🎨 Styling

- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Font Awesome** - Icon library
- **Custom CSS** - Additional custom styles in `app/globals.css`

## 🔐 Environment Variables

```env
# Required - PostgreSQL connection string
DATABASE_URL=postgresql://user:password@host:port/database

# Optional - API base URL (defaults to http://localhost:3000)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Fully responsive components
- Mobile navigation menu

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub, connect to Vercel
# Add environment variables in dashboard
# Deploy on push to main branch
```

### Other Platforms

- Railway
- Render
- Heroku
- AWS Amplify

Ensure platform supports Node.js 18+ and PostgreSQL connections.

## 📚 Database Utilities

### Drizzle Studio

Visual database editor and explorer:

```bash
npm run db:studio
```

### Migrations

Generate migrations after schema changes:

```bash
npm run db:generate
```

## 🐛 Troubleshooting

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

- Verify PostgreSQL is running
- Check DATABASE_URL in .env.local
- Ensure database exists

### Migration Failed

- Run `npm run db:push` again
- Check schema.ts for errors
- Verify database URL

### Pages Not Updating

```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

### Environment Variables Not Loading

- Restart dev server after editing .env.local
- Verify .env.local is not in .gitignore

## 📖 Documentation

- [Detailed Database Setup Guide](./DB_SETUP.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🤝 Best Practices

### SSR Pages

- Fetch data directly in async components
- Use `generateMetadata` for SEO
- Handle loading states with Suspense

### API Routes

- Always validate input data
- Use proper HTTP status codes
- Include error handling

### Database

- Keep schema.ts up to date
- Generate migrations for changes
- Test migrations before deploying

### Performance

- Minimize client-side JavaScript
- Use Next.js Image component
- Implement proper caching headers

## 📝 License

Proprietary - Not for public use without permission

## 👥 Support

For issues or questions, contact the development team.

---

Built with ❤️ using Next.js, Drizzle ORM, and PostgreSQL

## 📁 Project Structure

```
theem-pharmacy/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── admissions/        # Admissions page
│   ├── contact/           # Contact page
│   ├── api/               # API routes
│   │   └── contact/       # Contact form API
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # Reusable components
│   ├── Header.js          # Navigation header
│   ├── Footer.js          # Site footer
│   └── ScrollToTopButton.js
├── public/                # Static assets
│   └── images/           # Image assets
└── package.json          # Dependencies
```

## 🎨 Key Features Implemented

### Cursor Animation

- Custom cursor with smooth follower
- Touch device detection and fallback
- Optimized performance with requestAnimationFrame

### Responsive Navigation

- Mobile hamburger menu
- Dark mode toggle (ready for implementation)
- Smooth scroll effects

### Contact Form

- Client-side validation
- API integration ready
- Success/error feedback
- Email service integration prepared

### Performance Optimizations

- Next.js Image optimization
- Lazy loading
- Font preloading
- CSS optimization

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env.local` file for email configuration:

```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
SMTP_FROM=noreply@theemcollege.edu
CONTACT_EMAIL=info@theemcollege.edu
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is developed for Theem College of Pharmacy and Research.

---

**Live URL**: http://localhost:3001 (Development)

**Developed with ❤️ using Next.js**
