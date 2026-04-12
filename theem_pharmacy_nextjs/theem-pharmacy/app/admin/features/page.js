'use client'
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { apiClient } from '@/lib/api-client';

const initialFormData = {
    title: '',
    description: '',
    icon: '',
    order: '',
    isActive: true,
};

function toOptionalInt(value) {
    if (value === '' || value === null || value === undefined) {
        return null;
    }

    const parsed = Number.parseInt(String(value), 10);
    return Number.isNaN(parsed) ? null : parsed;
}

export default function AdminFeatures() {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingFeature, setEditingFeature] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [deletingFeatureId, setDeletingFeatureId] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async () => {
        try {
            setErrorMessage('');
            const data = await apiClient.getFeatures();
            setFeatures(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching features:', error);
            setErrorMessage(error.message || 'Failed to load features.');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingFeature(null);
        setFormData(initialFormData);
    };

    const openCreateModal = () => {
        setErrorMessage('');
        setEditingFeature(null);
        setFormData(initialFormData);
        setShowModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setIsSaving(true);

        try {
            const payload = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                icon: formData.icon.trim(),
                order: toOptionalInt(formData.order),
                isActive: Boolean(formData.isActive),
            };

            if (editingFeature) {
                await apiClient.adminUpdateFeature(editingFeature.id, payload);
            } else {
                await apiClient.createFeature(payload);
            }

            await fetchFeatures();
            closeModal();
        } catch (error) {
            console.error('Error saving feature:', error);
            setErrorMessage(error.message || 'Failed to save feature.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (item) => {
        setErrorMessage('');
        setEditingFeature(item);
        setFormData({
            title: item.title || '',
            description: item.description || '',
            icon: item.icon || '',
            order: item.order ?? '',
            isActive: item.isActive !== false,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this feature?')) {
            return;
        }

        setErrorMessage('');
        setDeletingFeatureId(id);
        try {
            await apiClient.adminDeleteFeature(id);
            await fetchFeatures();
        } catch (error) {
            console.error('Error deleting feature:', error);
            setErrorMessage(error.message || 'Failed to delete feature.');
        } finally {
            setDeletingFeatureId(null);
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
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Features Management</h1>
                    <button
                        onClick={openCreateModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Feature
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {features.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                            <div className="text-sm text-gray-500">{item.icon || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 max-w-md truncate">{item.description || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.order ?? 0}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${item.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                                                {item.isActive !== false ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-600 hover:text-blue-900 mr-3 disabled:opacity-50"
                                                disabled={isSaving || deletingFeatureId === item.id}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                disabled={isSaving || deletingFeatureId === item.id}
                                            >
                                                <i className={`fas ${deletingFeatureId === item.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="md:hidden space-y-4">
                    {features.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.icon || 'No icon'} • Order {item.order ?? 0}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-600 hover:text-blue-900 p-2 disabled:opacity-50"
                                        disabled={isSaving || deletingFeatureId === item.id}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:text-red-900 p-2 disabled:opacity-50"
                                        disabled={isSaving || deletingFeatureId === item.id}
                                    >
                                        <i className={`fas ${deletingFeatureId === item.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{item.description || 'No description available'}</p>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                            <h2 className="text-lg sm:text-xl font-bold mb-4">
                                {editingFeature ? 'Edit Feature' : 'Add Feature'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            rows="4"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon Class</label>
                                        <input
                                            type="text"
                                            placeholder="fas fa-star"
                                            value={formData.icon}
                                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                        <input
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                                            <input
                                                type="checkbox"
                                                checked={formData.isActive}
                                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span>Active</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                        disabled={isSaving}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? 'Saving...' : editingFeature ? 'Update Feature' : 'Create Feature'}
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