# Server Components Architecture

## Overview
This project uses a server component architecture for better SSR (Server-Side Rendering) performance and SEO. The architecture supports three types of pages:

1. **Static Server Components** - Pages with fixed content (Home, About)
2. **Data-Fetching Server Components** - Pages that fetch data from database/APIs (Courses, Students)
3. **Client Components** - Pages with interactivity (Contact forms, tabs, filters)

## Structure

### Components/Pages Folder
All page content is organized in `components/pages/` as server components:

```
components/
├── pages/
│   ├── HomePage.js          # Static server component
│   ├── AboutPage.js         # Static server component
│   ├── CoursesPage.js       # Data-fetching server component
│   ├── StudentsPage.js      # Hybrid (server + client components)
│   └── [Other pages...]     # Additional page components
├── Header.js                # Navigation header
├── Footer.js                # Site footer
├── ScrollToTopButton.js     # Scroll to top functionality
└── CursorAnimation.js       # Custom cursor animation
```

### App Folder
The `app/` folder contains Next.js route files:

```
app/
├── page.js                  # Home route (imports HomePage)
├── about/
│   └── page.js             # About route (imports AboutPage)
├── courses/
│   └── page.js             # Courses route (fetches data, imports CoursesPage)
├── students/
│   └── page.js             # Students route (imports StudentsPage)
└── api/
    ├── contact/            # Contact form API
    ├── courses/            # Courses data API
    └── students/           # Students data API
```

## Implementation Patterns

### 1. Static Server Components
For pages with fixed content (no data fetching, no interactivity):

**Component** (`components/pages/HomePage.js`):
```javascript
import Image from 'next/image'
import Link from 'next/link'

// This is a Server Component - renders on server for SSR
export default function HomePage() {
  return (
    <>
      <section>
        {/* Your static content */}
      </section>
    </>
  )
}
```

**Route** (`app/page.js`):
```javascript
import HomePage from '@/components/pages/HomePage'
import ScrollToTopButton from '@/components/ScrollToTopButton'

export default function Home() {
  return (
    <>
      <HomePage />
      <ScrollToTopButton />
    </>
  )
}
```

### 2. Data-Fetching Server Components
For pages that fetch data from database or APIs:

**Route** (`app/courses/page.js`):
```javascript
import CoursesPage from '@/components/pages/CoursesPage'
import { getAllCourses } from '@/lib/data'

export const metadata = {
  title: 'Courses',
  description: 'Our pharmacy programs'
}

// Server Component with data fetching
export default async function Courses() {
  // Fetch data on the server
  const courses = await getAllCourses()
  
  // Fallback data if database is empty
  const defaultCourses = [/* ... */]
  const displayCourses = courses.length > 0 ? courses : defaultCourses
  
  // Pass data to the page component
  return <CoursesPage courses={displayCourses} />
}
```

**Component** (`components/pages/CoursesPage.js`):
```javascript
import Link from 'next/link'

// Server Component that receives data as props
export default function CoursesPage({ courses }) {
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  )
}
```

### 3. Hybrid Components (Server + Client)
For pages with both server-rendered content and client-side interactivity:

**Client Component** (`components/StudentTabs.js`):
```javascript
'use client'
import { useState } from 'react'

export default function StudentTabs({ students }) {
  const [activeTab, setActiveTab] = useState('overview')
  
  return (
    <div>
      <button onClick={() => setActiveTab('overview')}>
        Overview
      </button>
      {/* Tab content */}
    </div>
  )
}
```

**Server Component** (`components/pages/StudentsPage.js`):
```javascript
import StudentTabs from '@/components/StudentTabs'

// Server Component
export default function StudentsPage({ students, statistics }) {
  return (
    <div>
      {/* Static server-rendered content */}
      <section>
        <h1>Students</h1>
        <div>Total: {statistics.totalStudents}</div>
      </section>
      
      {/* Client component for interactivity */}
      <StudentTabs students={students} />
    </div>
  )
}
```

**Route** (`app/students/page.js`):
```javascript
import StudentsPage from '@/components/pages/StudentsPage'
import { getStudentData } from '@/lib/data'

export default async function Students() {
  const data = await getStudentData()
  return <StudentsPage {...data} />
}
```

### 4. Client-Only Components
For pages that are entirely interactive (forms, dashboards):

**Component** (`app/contact/page.js`):
```javascript
'use client'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({})
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

## Data Fetching Methods

### Server-Side (Recommended)
```javascript
// In app/page.js or components/pages/*.js (without 'use client')
import { getAllCourses } from '@/lib/data'

export default async function Page() {
  const courses = await getAllCourses() // Direct database query
  return <div>{/* Use courses */}</div>
}
```

### Client-Side (For dynamic updates)
```javascript
'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [data, setData] = useState([])
  
  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(setData)
  }, [])
  
  return <div>{/* Use data */}</div>
}
```

## Benefits

1. **Better SSR**: Content rendered on server, improving initial page load
2. **Improved SEO**: Search engines can crawl fully rendered HTML
3. **Code Organization**: Clear separation between routing, data, and presentation
4. **Maintainability**: Page content isolated in dedicated components
5. **Performance**: Reduced client-side JavaScript bundle size
6. **Flexibility**: Mix server and client components as needed

## Design Principles

- **No neon gradients or neon colors**: Professional blues (#2563eb, #1d4ed8) and subtle gradients
- **Clean, professional aesthetic**: Maintaining the existing design system
- **Consistent color palette**: 
  - Primary: Blues (#2563eb, #1d4ed8, #60a5fa)
  - Accents: Green (#10b981), Purple (#8b5cf6), Orange (#f97316)
  - Backgrounds: Gray-50, Blue-50 for sections
- **Smooth animations**: Subtle hover effects, card-hover class, transitions

## API Routes

API routes in `app/api/` are used for:
- Form submissions (`/api/contact`)
- Client-side data fetching (if needed)
- External integrations

They should return JSON and handle errors gracefully:

```javascript
// app/api/contact/route.js
export async function POST(request) {
  try {
    const data = await request.json()
    // Process data
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
```

## Adding New Pages

### For Static Pages:
1. Create server component in `components/pages/NewPage.js`
2. Create route in `app/new-route/page.js` that imports it
3. Add metadata for SEO

### For Data-Driven Pages:
1. Add data fetching function in `lib/data.js`
2. Create server component in `components/pages/NewPage.js`
3. Create route in `app/new-route/page.js` that fetches data and passes to component
4. Add fallback data for when database is empty

### For Interactive Pages:
1. Create client component with `'use client'` directive
2. Use React hooks for state management
3. Call API routes for data mutations

## Migration Checklist

When converting existing pages to this architecture:

- [ ] Identify if page needs client interactivity
- [ ] Extract JSX content to `components/pages/`
- [ ] Move data fetching to route file (`app/*/page.js`)
- [ ] Keep metadata in route file
- [ ] Test SSR by viewing page source
- [ ] Verify no hydration errors
- [ ] Check that design is maintained
- [ ] Ensure ScrollToTopButton is added where needed

## Notes

- Server components cannot use React hooks (useState, useEffect, etc.)
- Client components should be as small as possible
- Prefer server components for better performance
- Use client components only when necessary (forms, interactive UI)
- All components have access to Next.js features (Image, Link, etc.)
- The design system is maintained through `globals.css`
