'use client'
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { apiClient } from '@/lib/api-client';

const initialFormData = {
    title: '',
    description: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    venue: '',
    organizer: '',
    category: 'general',
    image: '',
    registrationRequired: false,
    maxParticipants: '',
    isActive: true,
};

function toOptionalInt(value) {
    if (value === '' || value === null || value === undefined) {
        return null;
    }

    const parsed = Number.parseInt(String(value), 10);
    return Number.isNaN(parsed) ? null : parsed;
}

function formatDate(value) {
    if (!value) {
        return 'TBD';
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return String(value);
    }

    return parsed.toLocaleDateString();
}

export default function AdminEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [deletingEventId, setDeletingEventId] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setErrorMessage('');
            const data = await apiClient.getEvents({
                limit: 300,
                sortBy: 'eventDate',
                sortOrder: 'desc',
            });
            setEvents(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching events:', error);
            setErrorMessage(error.message || 'Failed to load events.');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingEvent(null);
        setFormData(initialFormData);
    };

    const openCreateModal = () => {
        setErrorMessage('');
        setEditingEvent(null);
        setFormData(initialFormData);
        setShowModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setIsSaving(true);

        try {
            const payload = {
                ...formData,
                title: formData.title.trim(),
                description: formData.description.trim(),
                venue: formData.venue.trim(),
                organizer: formData.organizer.trim(),
                image: formData.image.trim(),
                maxParticipants: toOptionalInt(formData.maxParticipants),
            };

            if (editingEvent) {
                await apiClient.adminUpdateEvent(editingEvent.id, payload);
            } else {
                await apiClient.createEvent(payload);
            }

            await fetchEvents();
            closeModal();
        } catch (error) {
            console.error('Error saving event:', error);
            setErrorMessage(error.message || 'Failed to save event.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (item) => {
        setErrorMessage('');
        setEditingEvent(item);
        setFormData({
            title: item.title || '',
            description: item.description || '',
            eventDate: item.eventDate || '',
            startTime: item.startTime || '',
            endTime: item.endTime || '',
            venue: item.venue || '',
            organizer: item.organizer || '',
            category: item.category || 'general',
            image: item.image || '',
            registrationRequired: Boolean(item.registrationRequired),
            maxParticipants: item.maxParticipants || '',
            isActive: item.isActive !== false,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this event?')) {
            return;
        }

        setErrorMessage('');
        setDeletingEventId(id);
        try {
            await apiClient.adminDeleteEvent(id);
            await fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
            setErrorMessage(error.message || 'Failed to delete event.');
        } finally {
            setDeletingEventId(null);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Events Management</h1>
                    <button
                        onClick={openCreateModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Event
                    </button>
                </div>

                {errorMessage && (
                    <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                    </div>
                )}

                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {events.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                            <div className="text-sm text-gray-500">{item.organizer || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{formatDate(item.eventDate)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.venue || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 capitalize">{item.category || 'general'}</td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-600 hover:text-blue-900 mr-3 disabled:opacity-50"
                                                disabled={isSaving || deletingEventId === item.id}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                disabled={isSaving || deletingEventId === item.id}
                                            >
                                                <i className={`fas ${deletingEventId === item.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="md:hidden space-y-4">
                    {events.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{formatDate(item.eventDate)} • {item.venue || 'N/A'}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-600 hover:text-blue-900 p-2 disabled:opacity-50"
                                        disabled={isSaving || deletingEventId === item.id}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:text-red-900 p-2 disabled:opacity-50"
                                        disabled={isSaving || deletingEventId === item.id}
                                    >
                                        <i className={`fas ${deletingEventId === item.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{item.description || 'No description available'}</p>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
                            <h2 className="text-lg sm:text-xl font-bold mb-4">
                                {editingEvent ? 'Edit Event' : 'Add Event'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="general">General</option>
                                            <option value="academic">Academic</option>
                                            <option value="cultural">Cultural</option>
                                            <option value="industry">Industry</option>
                                            <option value="community">Community</option>
                                            <option value="sports">Sports</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                                        <input
                                            type="date"
                                            value={formData.eventDate}
                                            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                                        <input
                                            type="text"
                                            value={formData.venue}
                                            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Organizer</label>
                                        <input
                                            type="text"
                                            value={formData.organizer}
                                            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                        <input
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                        <input
                                            type="text"
                                            value={formData.startTime}
                                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., 10:00 AM"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                        <input
                                            type="text"
                                            value={formData.endTime}
                                            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., 1:00 PM"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={formData.maxParticipants}
                                            onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={formData.registrationRequired}
                                            onChange={(e) => setFormData({ ...formData, registrationRequired: e.target.checked })}
                                        />
                                        Registration Required
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                        Active Event
                                    </label>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                                        disabled={isSaving}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? 'Saving...' : editingEvent ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
