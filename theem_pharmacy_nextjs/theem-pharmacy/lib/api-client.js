// API utility functions for frontend interactions

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

function buildQueryString(query) {
    if (!query || typeof query !== 'object') {
        return '';
    }

    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
            return;
        }
        params.set(key, String(value));
    });

    const serialized = params.toString();
    return serialized ? `?${serialized}` : '';
}

function buildUrl(path, query) {
    return `${API_URL}${path}${buildQueryString(query)}`;
}

async function request(path, options = {}) {
    const {
        method = 'GET',
        data,
        query,
        headers = {},
        credentials,
    } = options;

    const response = await fetch(buildUrl(path, query), {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: data !== undefined ? JSON.stringify(data) : undefined,
        credentials,
    });

    let payload = null;
    try {
        payload = await response.json();
    } catch {
        payload = null;
    }

    if (!response.ok || payload?.success === false) {
        const message = payload?.error || payload?.message || `Request failed: ${response.status}`;
        throw new Error(message);
    }

    return payload?.data !== undefined ? payload.data : payload;
}

const apiClient = {
    // Navigation and dynamic content
    async getNavigationTree() {
        return request('/api/navigation');
    },

    async getPageContent(slug) {
        return request(`/api/content/${encodeURIComponent(slug)}`);
    },

    // Announcements
    async getAnnouncements(query) {
        return request('/api/announcements', { query });
    },

    async createAnnouncement(data) {
        return request('/api/announcements', { method: 'POST', data });
    },

    // Courses
    async getCourses(query) {
        return request('/api/courses', { query });
    },

    async createCourse(data) {
        return request('/api/courses', { method: 'POST', data });
    },

    // Faculty
    async getFaculty(query) {
        return request('/api/faculty', { query });
    },

    async createFacultyMember(data) {
        return request('/api/faculty', { method: 'POST', data });
    },

    // Admissions
    async getAdmissions(query) {
        return request('/api/admissions', { query });
    },

    async submitAdmission(data) {
        return request('/api/admissions', { method: 'POST', data });
    },

    // About
    async getAbout(query) {
        return request('/api/about', { query });
    },

    async createAboutContent(data) {
        return request('/api/about', { method: 'POST', data });
    },

    // Features
    async getFeatures(query) {
        return request('/api/features', { query });
    },

    async createFeature(data) {
        return request('/api/features', { method: 'POST', data });
    },

    // Statistics
    async getStatistics(query) {
        return request('/api/statistics', { query });
    },

    async createStatistic(data) {
        return request('/api/statistics', { method: 'POST', data });
    },

    // Events
    async getEvents(query) {
        return request('/api/events', { query });
    },

    async createEvent(data) {
        return request('/api/events', { method: 'POST', data });
    },

    // Placements
    async getPlacements(query) {
        return request('/api/placements', { query });
    },

    async createPlacement(data) {
        return request('/api/placements', { method: 'POST', data });
    },

    // Students
    async getStudentsData(query) {
        return request('/api/students', { query });
    },

    async createStudent(data) {
        return request('/api/students', { method: 'POST', data });
    },

    // Contact
    async submitContact(data) {
        return request('/api/contact', { method: 'POST', data });
    },

    // Admin
    async adminUpdateStudent(id, data) {
        return request(`/api/admin/students/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteStudent(id) {
        return request(`/api/admin/students/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    async adminUpdateAdmissionStatus(id, status) {
        return request(`/api/admin/admissions/${id}`, {
            method: 'PUT',
            data: { status },
            credentials: 'include',
        });
    },

    async adminUpdateCourse(id, data) {
        return request(`/api/admin/courses/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteCourse(id) {
        return request(`/api/admin/courses/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    async adminUpdateFaculty(id, data) {
        return request(`/api/admin/faculty/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteFaculty(id) {
        return request(`/api/admin/faculty/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    async adminUpdateEvent(id, data) {
        return request(`/api/admin/events/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteEvent(id) {
        return request(`/api/admin/events/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    async adminUpdatePlacement(id, data) {
        return request(`/api/admin/placements/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeletePlacement(id) {
        return request(`/api/admin/placements/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    async adminUpdateFeature(id, data) {
        return request(`/api/admin/features/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteFeature(id) {
        return request(`/api/admin/features/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    async adminUpdateStatistic(id, data) {
        return request(`/api/admin/statistics/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteStatistic(id) {
        return request(`/api/admin/statistics/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    async adminGetNavigationItems() {
        return request('/api/admin/navigation', { credentials: 'include' });
    },

    async adminCreateNavigationItem(data) {
        return request('/api/admin/navigation', {
            method: 'POST',
            data,
            credentials: 'include',
        });
    },

    async adminUpdateNavigationItem(id, data) {
        return request(`/api/admin/navigation/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteNavigationItem(id) {
        return request(`/api/admin/navigation/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    async adminGetContentSections() {
        return request('/api/admin/content', { credentials: 'include' });
    },

    async adminCreateContentSection(data) {
        return request('/api/admin/content', {
            method: 'POST',
            data,
            credentials: 'include',
        });
    },

    async adminUpdateContentSection(id, data) {
        return request(`/api/admin/content/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteContentSection(id) {
        return request(`/api/admin/content/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },
};

module.exports = { apiClient };
module.exports.default = apiClient;