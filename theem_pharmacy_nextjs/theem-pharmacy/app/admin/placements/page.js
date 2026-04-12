'use client'
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { apiClient } from '@/lib/api-client';

const initialFormData = {
    studentId: '',
    company: '',
    position: '',
    package: '',
    placementDate: '',
    location: '',
    isActive: true,
};

function toOptionalInt(value) {
    if (value === '' || value === null || value === undefined) {
        return null;
    }

    const parsed = Number.parseInt(String(value), 10);
    return Number.isNaN(parsed) ? null : parsed;
}

function toOptionalNumber(value) {
    if (value === '' || value === null || value === undefined) {
        return null;
    }

    const parsed = Number(value);
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

export default function AdminPlacements() {
    const [placements, setPlacements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPlacement, setEditingPlacement] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [deletingPlacementId, setDeletingPlacementId] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        fetchPlacements();
    }, []);

    const fetchPlacements = async () => {
        try {
            setErrorMessage('');
            const data = await apiClient.getPlacements({
                limit: 300,
                sortBy: 'placementDate',
                sortOrder: 'desc',
            });
            setPlacements(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching placements:', error);
            setErrorMessage(error.message || 'Failed to load placements.');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingPlacement(null);
        setFormData(initialFormData);
    };

    const openCreateModal = () => {
        setErrorMessage('');
        setEditingPlacement(null);
        setFormData(initialFormData);
        setShowModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setIsSaving(true);

        try {
            const payload = {
                studentId: toOptionalInt(formData.studentId),
                company: formData.company.trim(),
                position: formData.position.trim(),
                package: toOptionalNumber(formData.package),
                placementDate: formData.placementDate || null,
                location: formData.location.trim(),
                isActive: Boolean(formData.isActive),
            };

            if (editingPlacement) {
                await apiClient.adminUpdatePlacement(editingPlacement.id, payload);
            } else {
                await apiClient.createPlacement(payload);
            }

            await fetchPlacements();
            closeModal();
        } catch (error) {
            console.error('Error saving placement:', error);
            setErrorMessage(error.message || 'Failed to save placement.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (item) => {
        setErrorMessage('');
        setEditingPlacement(item);
        setFormData({
            studentId: item.studentId || '',
            company: item.company || '',
            position: item.position || '',
            package: item.package || '',
            placementDate: item.placementDate || '',
            location: item.location || '',
            isActive: item.isActive !== false,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this placement?')) {
            return;
        }

        setErrorMessage('');
        setDeletingPlacementId(id);
        try {
            await apiClient.adminDeletePlacement(id);
            await fetchPlacements();
        } catch (error) {
            console.error('Error deleting placement:', error);
            setErrorMessage(error.message || 'Failed to delete placement.');
        } finally {
            setDeletingPlacementId(null);
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
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Placements Management</h1>
                    <button
                        onClick={openCreateModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Placement
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {placements.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{item.company}</div>
                                            <div className="text-sm text-gray-500">{item.location || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.position || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.package ? `₹${Number(item.package).toLocaleString()}` : 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{formatDate(item.placementDate)}</td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-600 hover:text-blue-900 mr-3 disabled:opacity-50"
                                                disabled={isSaving || deletingPlacementId === item.id}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                disabled={isSaving || deletingPlacementId === item.id}
                                            >
                                                <i className={`fas ${deletingPlacementId === item.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="md:hidden space-y-4">
                    {placements.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{item.company}</h3>
                                    <p className="text-sm text-gray-600">{item.position || 'N/A'} • {formatDate(item.placementDate)}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-600 hover:text-blue-900 p-2 disabled:opacity-50"
                                        disabled={isSaving || deletingPlacementId === item.id}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:text-red-900 p-2 disabled:opacity-50"
                                        disabled={isSaving || deletingPlacementId === item.id}
                                    >
                                        <i className={`fas ${deletingPlacementId === item.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{item.location || 'No location specified'}</p>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                            <h2 className="text-lg sm:text-xl font-bold mb-4">
                                {editingPlacement ? 'Edit Placement' : 'Add Placement'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                        <input
                                            type="text"
                                            value={formData.position}
                                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={formData.studentId}
                                            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Package</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.package}
                                            onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Placement Date</label>
                                        <input
                                            type="date"
                                            value={formData.placementDate}
                                            onChange={(e) => setFormData({ ...formData, placementDate: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    />
                                    Active Placement
                                </label>

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
                                        {isSaving ? 'Saving...' : editingPlacement ? 'Update' : 'Create'}
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
