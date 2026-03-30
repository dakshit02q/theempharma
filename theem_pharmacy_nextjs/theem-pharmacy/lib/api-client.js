// API utility functions for client-side interactions

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const apiClient = {
    // Courses
    async getCourses() {
        const response = await fetch(`${API_URL}/api/courses`);
        if (!response.ok) throw new Error('Failed to fetch courses');
        return response.json();
    },

    async createCourse(data) {
        const response = await fetch(`${API_URL}/api/courses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create course');
        return response.json();
    },

    // Faculty
    async getFaculty() {
        const response = await fetch(`${API_URL}/api/faculty`);
        if (!response.ok) throw new Error('Failed to fetch faculty');
        return response.json();
    },

    async createFacultyMember(data) {
        const response = await fetch(`${API_URL}/api/faculty`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create faculty member');
        return response.json();
    },

    // Admissions
    async getAdmissions() {
        const response = await fetch(`${API_URL}/api/admissions`);
        if (!response.ok) throw new Error('Failed to fetch admissions');
        return response.json();
    },

    async submitAdmission(data) {
        const response = await fetch(`${API_URL}/api/admissions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to submit admission');
        return response.json();
    },

    // About
    async getAbout() {
        const response = await fetch(`${API_URL}/api/about`);
        if (!response.ok) throw new Error('Failed to fetch about content');
        return response.json();
    },

    async createAboutContent(data) {
        const response = await fetch(`${API_URL}/api/about`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create about content');
        return response.json();
    },

    // Features
    async getFeatures() {
        const response = await fetch(`${API_URL}/api/features`);
        if (!response.ok) throw new Error('Failed to fetch features');
        return response.json();
    },

    async createFeature(data) {
        const response = await fetch(`${API_URL}/api/features`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create feature');
        return response.json();
    },

    // Statistics
    async getStatistics() {
        const response = await fetch(`${API_URL}/api/statistics`);
        if (!response.ok) throw new Error('Failed to fetch statistics');
        return response.json();
    },

    async createStatistic(data) {
        const response = await fetch(`${API_URL}/api/statistics`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create statistic');
        return response.json();
    },

    // Students
    async getStudentsData(type = 'all') {
        const response = await fetch(`${API_URL}/api/students?type=${type}`);
        if (!response.ok) throw new Error('Failed to fetch students data');
        return response.json();
    },

    async createStudent(data) {
        const response = await fetch(`${API_URL}/api/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'student', ...data }),
        });
        if (!response.ok) throw new Error('Failed to create student');
        return response.json();
    },

    async createEvent(data) {
        const response = await fetch(`${API_URL}/api/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'event', ...data }),
        });
        if (!response.ok) throw new Error('Failed to create event');
        return response.json();
    },
};

module.exports = { apiClient };
module.exports.default = apiClient;