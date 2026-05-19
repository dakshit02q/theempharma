import { pgTable, serial, text, varchar, integer, timestamp, boolean, decimal, date } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Courses Table
export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  duration: varchar('duration', { length: 50 }),
  eligibility: text('eligibility'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Faculty Table
export const faculty = pgTable('faculty', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }).notNull(),
  specialization: varchar('specialization', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  bio: text('bio'),
  image: text('image'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Admissions Table
export const admissions = pgTable('admissions', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  courseId: integer('course_id'),
  qualifications: text('qualifications'),
  experienceYears: integer('experience_years'),
  status: varchar('status', { length: 50 }).default('pending'),
  submittedAt: timestamp('submitted_at').default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// About Page Content
export const aboutContent = pgTable('about_content', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  image: text('image'),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Contact Submissions
export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).default('new'),
  submittedAt: timestamp('submitted_at').default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Features/Services
export const features = pgTable('features', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Statistics
export const statistics = pgTable('statistics', {
  id: serial('id').primaryKey(),
  label: varchar('label', { length: 255 }).notNull(),
  value: integer('value').notNull(),
  icon: varchar('icon', { length: 100 }),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Committee Members
export const committee = pgTable('committee', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }).notNull(),
  department: varchar('department', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  bio: text('bio'),
  image: text('image'),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Academic Calendar
export const academicCalendar = pgTable('academic_calendar', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  category: varchar('category', { length: 100 }).default('general'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Syllabus
export const syllabus = pgTable('syllabus', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id'),
  semester: integer('semester'),
  subject: varchar('subject', { length: 255 }).notNull(),
  syllabus: text('syllabus'),
  document: text('document'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Research Projects
export const researchProjects = pgTable('research_projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  principalInvestigator: varchar('principal_investigator', { length: 255 }),
  startDate: date('start_date'),
  endDate: date('end_date'),
  status: varchar('status', { length: 100 }).default('ongoing'),
  fundingAgency: varchar('funding_agency', { length: 255 }),
  amount: decimal('amount', { precision: 10, scale: 2 }),
  publicationCount: integer('publication_count').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Publications
export const publications = pgTable('publications', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  authors: text('authors'),
  journal: varchar('journal', { length: 255 }),
  year: integer('year'),
  volume: varchar('volume', { length: 50 }),
  pages: varchar('pages', { length: 50 }),
  doi: varchar('doi', { length: 255 }),
  impactFactor: decimal('impact_factor', { precision: 5, scale: 2 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Students
export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  rollNumber: varchar('roll_number', { length: 50 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  courseId: integer('course_id'),
  semester: integer('semester'),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  address: text('address'),
  admissionYear: integer('admission_year'),
  status: varchar('status', { length: 50 }).default('active'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Placements
export const placements = pgTable('placements', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id'),
  company: varchar('company', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }),
  package: decimal('package', { precision: 10, scale: 2 }),
  placementDate: date('placement_date'),
  location: varchar('location', { length: 255 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Alumni
export const alumni = pgTable('alumni', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  graduationYear: integer('graduation_year'),
  course: varchar('course', { length: 255 }),
  currentPosition: varchar('current_position', { length: 255 }),
  currentCompany: varchar('current_company', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  achievements: text('achievements'),
  testimonial: text('testimonial'),
  image: text('image'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Events
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  eventDate: date('event_date'),
  startTime: varchar('start_time', { length: 20 }),
  endTime: varchar('end_time', { length: 20 }),
  venue: varchar('venue', { length: 255 }),
  organizer: varchar('organizer', { length: 255 }),
  category: varchar('category', { length: 100 }).default('general'),
  image: text('image'),
  registrationRequired: boolean('registration_required').default(false),
  maxParticipants: integer('max_participants'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Approvals
export const approvals = pgTable('approvals', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  approvingBody: varchar('approving_body', { length: 255 }),
  approvalDate: date('approval_date'),
  validUntil: date('valid_until'),
  certificateNumber: varchar('certificate_number', { length: 100 }),
  document: text('document'),
  category: varchar('category', { length: 100 }).default('academic'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const galleryCarouselItems = pgTable('gallery_carousel_items', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  caption: text('caption'),
  image: text('image').notNull(),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const galleryPhotos = pgTable('gallery_photos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  caption: text('caption'),
  image: text('image').notNull(),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});


export const announcements = pgTable('announcements', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  priority: integer('priority').default(0),
  isActive: boolean('is_active').default(true),
  startsAt: timestamp('starts_at'),
  endsAt: timestamp('ends_at'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const navigationItems = pgTable('navigation_items', {
  id: serial('id').primaryKey(),
  label: varchar('label', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  parentId: integer('parent_id'),
  icon: varchar('icon', { length: 100 }),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const pageContentSections = pgTable('page_content_sections', {
  id: serial('id').primaryKey(),
  pageSlug: varchar('page_slug', { length: 255 }).notNull(),
  sectionKey: varchar('section_key', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  document: text('document'),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// // Export all tables for use in other modules
// export {
//   courses,
//   faculty,
//   admissions,
//   aboutContent,
//   contactSubmissions,
//   features,
//   statistics,
//   committee,
//   academicCalendar,
//   syllabus,
//   researchProjects,
//   publications,
//   students,
//   placements,
//   alumni,
//   events,
//   approvals,
// };
