// API utility functions for frontend interactions

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

function normalizeBaseUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') {
        return '';
    }

    return rawUrl.replace(/\/+$/, '');
}

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
    const normalizedApiUrl = normalizeBaseUrl(API_URL);

    // In local development, prefer same-origin API calls to avoid host/port mismatches.
    if (typeof window !== 'undefined' && normalizedApiUrl) {
        try {
            const configuredUrl = new URL(normalizedApiUrl, window.location.origin);
            const localHosts = new Set(['localhost', '127.0.0.1', '::1']);
            const isLocalDev = localHosts.has(window.location.hostname);

            if (isLocalDev && configuredUrl.origin !== window.location.origin) {
                return `${path}${buildQueryString(query)}`;
            }

            return `${configuredUrl.origin}${path}${buildQueryString(query)}`;
        } catch {
            return `${path}${buildQueryString(query)}`;
        }
    }

    return `${normalizedApiUrl}${path}${buildQueryString(query)}`;
}

async function request(path, options = {}) {
    const {
        method = 'GET',
        data,
        query,
        headers = {},
        credentials,
        // responseType: 'json' (default) | 'blob'
        responseType = 'json',
    } = options;

    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    const resolvedHeaders = {
        ...headers,
    };

    if (!isFormData) {
        resolvedHeaders['Content-Type'] = resolvedHeaders['Content-Type'] || 'application/json';
    }

    let response;
    try {
        response = await fetch(buildUrl(path, query), {
            method,
            headers: resolvedHeaders,
            body: data !== undefined
                ? (isFormData ? data : JSON.stringify(data))
                : undefined,
            credentials,
        });
    } catch (error) {
        const networkMessage = error instanceof Error ? error.message : 'Unknown network error';
        throw new Error(`Network error while requesting ${path}: ${networkMessage}`);
    }

    // Handle different response types
    const contentType = response.headers.get('content-type') || '';

    if (responseType === 'blob') {
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        return await response.blob();
    }

    // Default: expect JSON. Only attempt to parse JSON when content-type looks like JSON.
    if (contentType.includes('application/json') || contentType.includes('+json')) {
        let payload = null;
        try {
            payload = await response.json();
        } catch (err) {
            const networkMessage = err instanceof Error ? err.message : 'Failed to parse JSON';
            throw new Error(`Failed to parse JSON response for ${path}: ${networkMessage}`);
        }

        if (!response.ok || payload?.success === false) {
            const message = payload?.error || payload?.message || `Request failed: ${response.status}`;
            throw new Error(message);
        }

        return payload?.data !== undefined ? payload.data : payload;
    }

    // If we get here the response is not JSON. Return raw text for non-JSON successful responses.
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    try {
        return await response.text();
    } catch {
        return null;
    }
}

// Helper to fetch a file (PDF/image) as a Blob. Useful for guarded or credentialed file endpoints.
async function getFileAsBlob(path, options = {}) {
    const { query, credentials, headers = {} } = options;
    const url = buildUrl(path, query);
    const resp = await fetch(url, {
        method: 'GET',
        headers,
        credentials,
    });

    if (!resp.ok) {
        throw new Error(`Failed to fetch file: ${resp.status}`);
    }

    return await resp.blob();
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

    // Approvals
    async getApprovals(query) {
        return request('/api/approvals', { query });
    },

    async adminGetApprovals(query) {
        return request('/api/admin/approvals', { query, credentials: 'include' });
    },

    async adminCreateApproval(data) {
        return request('/api/admin/approvals', {
            method: 'POST',
            data,
            credentials: 'include',
        });
    },

    async adminUpdateApproval(id, data) {
        return request(`/api/admin/approvals/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteApproval(id) {
        return request(`/api/admin/approvals/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    // Committee
    async adminGetCommitteeMembers(query) {
        return request('/api/admin/committee', { query, credentials: 'include' });
    },

    async adminCreateCommitteeMember(data) {
        return request('/api/admin/committee', {
            method: 'POST',
            data,
            credentials: 'include',
        });
    },

    async adminUpdateCommitteeMember(id, data) {
        return request(`/api/admin/committee/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteCommitteeMember(id) {
        return request(`/api/admin/committee/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    // Research Projects
    async adminGetResearchProjects(query) {
        return request('/api/admin/research/projects', { query, credentials: 'include' });
    },

    async adminCreateResearchProject(data) {
        return request('/api/admin/research/projects', {
            method: 'POST',
            data,
            credentials: 'include',
        });
    },

    async adminUpdateResearchProject(id, data) {
        return request(`/api/admin/research/projects/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteResearchProject(id) {
        return request(`/api/admin/research/projects/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    // Research Publications
    async adminGetResearchPublications(query) {
        return request('/api/admin/research/publications', { query, credentials: 'include' });
    },

    async adminCreateResearchPublication(data) {
        return request('/api/admin/research/publications', {
            method: 'POST',
            data,
            credentials: 'include',
        });
    },

    async adminUpdateResearchPublication(id, data) {
        return request(`/api/admin/research/publications/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteResearchPublication(id) {
        return request(`/api/admin/research/publications/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    // Contact Submissions
    async adminGetContactSubmissions(query) {
        return request('/api/admin/contact', { query, credentials: 'include' });
    },

    async adminUpdateContactSubmission(id, data) {
        return request(`/api/admin/contact/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteContactSubmission(id) {
        return request(`/api/admin/contact/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
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

    async adminUpdateAdmission(id, data) {
        return request(`/api/admin/admissions/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteAdmission(id) {
        return request(`/api/admin/admissions/${id}`, {
            method: 'DELETE',
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

    async adminUploadFile(file, options = {}) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folderKind', options.folderKind || 'gallery');
        formData.append('type', options.type || 'image');
        if (options.preferredName) {
            formData.append('preferredName', options.preferredName);
        }

        return request('/api/admin/upload', {
            method: 'POST',
            data: formData,
            credentials: 'include',
        });
    },

    // Fetch a file as a Blob (useful for previewing PDFs fetched from protected endpoints)
    async getFileAsBlob(path, options = {}) {
        return getFileAsBlob(path, options);
    },

    async adminDeleteAdmissionsContent(slug, id) {
        return request(`/api/admin/admissions-content/${encodeURIComponent(slug)}`, {
            method: 'DELETE',
            query: { id },
            credentials: 'include',
        });
    },

    async getGalleryData() {
        return request('/api/gallery');
    },

    async adminGetGalleryCarouselItems() {
        return request('/api/admin/gallery-carousel', { credentials: 'include' });
    },

    async adminCreateGalleryCarouselItem(data) {
        return request('/api/admin/gallery-carousel', {
            method: 'POST',
            data,
            credentials: 'include',
        });
    },

    async adminUpdateGalleryCarouselItem(id, data) {
        return request(`/api/admin/gallery-carousel/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteGalleryCarouselItem(id) {
        return request(`/api/admin/gallery-carousel/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    async adminGetGalleryPhotos() {
        return request('/api/admin/gallery-photos', { credentials: 'include' });
    },

    async adminCreateGalleryPhoto(data) {
        return request('/api/admin/gallery-photos', {
            method: 'POST',
            data,
            credentials: 'include',
        });
    },

    async adminUpdateGalleryPhoto(id, data) {
        return request(`/api/admin/gallery-photos/${id}`, {
            method: 'PUT',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteGalleryPhoto(id) {
        return request(`/api/admin/gallery-photos/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    },

    async getInstituteCellContent(slug) {
        return request(`/api/institute-cells/${encodeURIComponent(slug)}`);
    },

    async adminGetInstituteCellContent(slug) {
        return request(`/api/admin/institute-cells/${encodeURIComponent(slug)}`, {
            credentials: 'include',
        });
    },

    async adminSaveInstituteCellContent(slug, data) {
        return request(`/api/admin/institute-cells/${encodeURIComponent(slug)}`, {
            method: 'POST',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteInstituteCellContent(slug, id) {
        return request(`/api/admin/institute-cells/${encodeURIComponent(slug)}`, {
            method: 'DELETE',
            query: { id },
            credentials: 'include',
        });
    },

    // Unified Dynamic Content Management
    async adminGetDynamicContent(category, slug) {
        return request(`/api/admin/dynamic-content/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`, {
            credentials: 'include',
        });
    },

    async adminSaveDynamicContent(category, slug, data) {
        return request(`/api/admin/dynamic-content/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`, {
            method: 'POST',
            data,
            credentials: 'include',
        });
    },

    async adminDeleteDynamicContent(category, slug, id) {
        return request(`/api/admin/dynamic-content/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`, {
            method: 'DELETE',
            query: { id },
            credentials: 'include',
        });
    },
};

module.exports = { apiClient };
module.exports.default = apiClient;