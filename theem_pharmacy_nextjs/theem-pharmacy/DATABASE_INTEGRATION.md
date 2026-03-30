# Database Dependencies - THEEM Pharmacy Website

## 📊 Current Database Integration Status

### ✅ Pages Using Database (via `lib/data.js`)

#### 1. **Courses Page** (`app/courses/page.js`)
- **Function**: `getAllCourses()`
- **Database Tables**: `courses`
- **Status**: ✅ Fully integrated
- **Fallback**: Yes - uses sample data if database is empty
- **Data Structure**:
  ```javascript
  {
    id, name, duration, eligibility, seats, 
    description, highlights, careerOpportunities
  }
  ```

### 🔄 Pages Using API Client (Client-Side Fetch)

#### 2. **Students Page** (`src/components/StudentsPage.js`)
- **Function**: `apiClient.getStudentsData('all')`
- **API Route**: `/api/students` (needs to be created)
- **Status**: ⚠️ Client component - fetches from API
- **Data Structure**:
  ```javascript
  {
    statistics: { totalStudents, activeOrganizations, eventsPerYear, placementRate },
    organizations: [...],
    achievements: [...],
    events: [...]
  }
  ```

### 📝 Pages Using Hardcoded/Sample Data (Ready for DB Integration)

#### 3. **Events Page** (`app/events/page.js`)
- **Current**: Sample data in `getEventsData()`
- **Ready for**: Database integration
- **Suggested DB Function**: `getAllEvents()`, `getEventsByCategory()`
- **Data Structure**:
  ```javascript
  {
    upcomingEvents: [...],
    pastEvents: [...],
    categories: [...]
  }
  ```

#### 4. **Alumni Page** (`app/alumni/page.js`)
- **Current**: Sample statistics in `getAlumniData()`
- **Ready for**: Database integration
- **Suggested DB Function**: `getAlumniStatistics()`
- **Data Structure**:
  ```javascript
  {
    statistics: {
      totalAlumni, industryLeaders, entrepreneurs,
      researchers, higherEducation, internationalPositions
    }
  }
  ```

#### 5. **Committee Page** (`app/committee/page.js`)
- **Current**: Sample members in `getCommitteeData()`
- **Ready for**: Database integration
- **Suggested DB Function**: `getAllCommitteeMembers()`
- **Data Structure**:
  ```javascript
  [
    {
      id, name, position, department,
      email, phone, bio, image
    }
  ]
  ```

#### 6. **Placement Page** (`app/placement/page.js`)
- **Current**: Sample statistics in `getPlacementData()`
- **Ready for**: Database integration
- **Suggested DB Function**: `getPlacementStatistics()`
- **Data Structure**:
  ```javascript
  {
    statistics: {
      placementRate, averagePackage,
      topPackage, recruitingCompanies
    }
  }
  ```

#### 7. **Research Page** (`app/research/page.js`)
- **Current**: Sample data in `getResearchData()`
- **Ready for**: Database integration
- **Suggested DB Functions**: 
  - `getAllResearchProjects()`
  - `getAllPublications()`
  - `getAllResearchFacilities()`
- **Data Structure**:
  ```javascript
  {
    researchProjects: [...],
    publications: [...],
    facilities: [...]
  }
  ```

#### 8. **Academics Page** (`app/academics/page.js`)
- **Current**: Sample calendar in `getAcademicData()`
- **Ready for**: Database integration
- **Suggested DB Function**: `getAcademicCalendar()`
- **Data Structure**:
  ```javascript
  {
    academicCalendar: [
      { id, title, date, category, description }
    ]
  }
  ```

### 🎨 Static Pages (No Database Needed)

#### 9. **Home Page** (`app/page.js`)
- **Status**: ✅ Static content
- **Note**: Could integrate statistics from database if needed

#### 10. **About Page** (`app/about/page.js`)
- **Status**: ✅ Static content
- **Available DB Functions**: 
  - `getAboutContent()` - for dynamic about sections
  - `getAllFeatures()` - for feature highlights
  - `getAllStatistics()` - for stats display

#### 11. **Admissions Page** (`app/admissions/page.js`)
- **Status**: ✅ Static content
- **Note**: Program details are hardcoded

#### 12. **Contact Page** (`app/contact/page.js`)
- **Status**: ✅ Client component with form
- **API**: Uses `/api/contact` for form submission

---

## 🗄️ Available Database Functions (`lib/data.js`)

Currently implemented:
- ✅ `getAllCourses()` - Fetch all courses
- ✅ `getCourseById(id)` - Fetch single course
- ✅ `getAllFaculty()` - Fetch all faculty members
- ✅ `getFacultyById(id)` - Fetch single faculty
- ✅ `getAboutContent()` - Fetch about page content
- ✅ `getAllFeatures()` - Fetch feature highlights
- ✅ `getAllStatistics()` - Fetch statistics

---

## 📋 Recommended Next Steps for Full Database Integration

### Priority 1: Core Academic Data
1. **Events** - Create `events` table and `getAllEvents()` function
2. **Committee** - Create `committee_members` table and functions
3. **Research** - Create `research_projects`, `publications`, `facilities` tables

### Priority 2: Student & Career Data
4. **Alumni** - Create `alumni_statistics` table
5. **Placement** - Create `placement_statistics` table
6. **Students** - Create API route `/api/students` that fetches from database

### Priority 3: Academic Calendar
7. **Academics** - Create `academic_calendar` table

---

## 🔧 How to Add Database Integration

### Example: Adding Events to Database

**1. Add to schema (`lib/db/schema.js`):**
```javascript
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  eventDate: date('event_date').notNull(),
  category: text('category').notNull(),
  // ... other fields
});
```

**2. Add function to `lib/data.js`:**
```javascript
async function getAllEvents() {
  try {
    const result = await db.query.events.findMany();
    return result;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}
```

**3. Update route (`app/events/page.js`):**
```javascript
import { getAllEvents } from '@/lib/data';

async function getEventsData() {
  const events = await getAllEvents();
  // Process and return data
  return { upcomingEvents, pastEvents, categories };
}
```

---

## 📊 Summary

| Page | Database Status | Priority |
|------|----------------|----------|
| Courses | ✅ Integrated | - |
| Students | ⚠️ API Client | Medium |
| Events | 📝 Sample Data | High |
| Committee | 📝 Sample Data | High |
| Research | 📝 Sample Data | High |
| Alumni | 📝 Sample Data | Medium |
| Placement | 📝 Sample Data | Medium |
| Academics | 📝 Sample Data | Medium |
| Home | Static | Low |
| About | Static | Low |
| Admissions | Static | Low |
| Contact | Form Only | - |

**Total**: 1 fully integrated, 7 ready for integration, 4 static
