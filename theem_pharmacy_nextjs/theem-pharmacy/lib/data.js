import { db } from './db/index.js';
import {
    courses,
    faculty,
    aboutContent,
    features,
    statistics,
} from './db/schema.js';

// Courses
async function getAllCourses() {
    try {
        const result = await db.query.courses.findMany();
        return result;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

async function getCourseById(id) {
    try {
        const result = await db.query.courses.findFirst({
            where: (table, { eq }) => eq(table.id, id),
        });
        return result;
    } catch (error) {
        console.error('Error fetching course:', error);
        return null;
    }
}

// Faculty
async function getAllFaculty() {
    try {
        const result = await db.query.faculty.findMany();
        return result;
    } catch (error) {
        console.error('Error fetching faculty:', error);
        return [];
    }
}

async function getFacultyById(id) {
    try {
        const result = await db.query.faculty.findFirst({
            where: (table, { eq }) => eq(table.id, id),
        });
        return result;
    } catch (error) {
        console.error('Error fetching faculty member:', error);
        return null;
    }
}

// About Content
async function getAboutContent() {
    try {
        const result = await db.query.aboutContent.findMany({
            where: (table, { eq }) => eq(table.isActive, true),
            orderBy: (table, { asc }) => asc(table.order),
        });
        return result;
    } catch (error) {
        console.error('Error fetching about content:', error);
        return [];
    }
}

// Features
async function getAllFeatures() {
    try {
        const result = await db.query.features.findMany({
            where: (table, { eq }) => eq(table.isActive, true),
            orderBy: (table, { asc }) => asc(table.order),
        });
        return result;
    } catch (error) {
        console.error('Error fetching features:', error);
        return [];
    }
}

// Statistics
async function getAllStatistics() {
    try {
        const result = await db.query.statistics.findMany({
            where: (table, { eq }) => eq(table.isActive, true),
            orderBy: (table, { asc }) => asc(table.order),
        });
        return result;
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return [];
    }
}

export {
    getAllCourses,
    getCourseById,
    getAllFaculty,
    getFacultyById,
    getAboutContent,
    getAllFeatures,
    getAllStatistics,
};