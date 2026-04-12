'use client'
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { apiClient } from '@/lib/api-client';

const initialFormData = {
    label: '',
    value: '',
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

export default function AdminStatistics() {
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingStatistic, setEditingStatistic] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [deletingStatisticId, setDeletingStatisticId] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            setErrorMessage('');
            const data = await apiClient.getStatistics();
            setStatistics(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching statistics:', error);
            setErrorMessage(error.message || 'Failed to load statistics.');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingStatistic(null);
        setFormData(initialFormData);
    };

    const openCreateModal = () => {
        setErrorMessage('');
        setEditingStatistic(null);
        setFormData(initialFormData);
        setShowModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setIsSaving(true);

        try {
            const parsedValue = toOptionalInt(formData.value);
            if (parsedValue === null) {
                throw new Error('Value must be a valid number.');
            }

            const payload = {
                label: formData.label.trim(),
                value: parsedValue,
                icon: formData.icon.trim(),
                order: toOptionalInt(formData.order),
                isActive: Boolean(formData.isActive),
            };

            if (editingStatistic) {
                await apiClient.adminUpdateStatistic(editingStatistic.id, payload);
            } else {
                await apiClient.createStatistic(payload);
            }

            await fetchStatistics();
            closeModal();
        } catch (error) {
            console.error('Error saving statistic:', error);
            setErrorMessage(error.message || 'Failed to save statistic.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (item) => {
        setErrorMessage('');
        setEditingStatistic(item);
        setFormData({
            label: item.label || '',
            value: item.value ?? '',
            icon: item.icon || '',
            order: item.order ?? '',
            isActive: item.isActive !== false,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this statistic?')) {
            return;
        }

        setErrorMessage('');
        setDeletingStatisticId(id);
        try {
            await apiClient.adminDeleteStatistic(id);
            await fetchStatistics();
        } catch (error) {
            console.error('Error deleting statistic:', error);
            setErrorMessage(error.message || 'Failed to delete statistic.');
        } finally {
            setDeletingStatisticId(null);
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
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Statistics Management</h1>
                    <button
                        onClick={openCreateModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Statistic
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {statistics.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{item.label}</div>
                                            <div className="text-sm text-gray-500">{item.icon || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.value}</td>
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
                                                disabled={isSaving || deletingStatisticId === item.id}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                disabled={isSaving || deletingStatisticId === item.id}
                                            >
                                                <i className={`fas ${deletingStatisticId === item.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="md:hidden space-y-4">
                    {statistics.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{item.label}</h3>
                                    <p className="text-sm text-gray-600">{item.value} • Order {item.order ?? 0}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-600 hover:text-blue-900 p-2 disabled:opacity-50"
                                        disabled={isSaving || deletingStatisticId === item.id}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:text-red-900 p-2 disabled:opacity-50"
                                        disabled={isSaving || deletingStatisticId === item.id}
                                    >
                                        <i className={`fas ${deletingStatisticId === item.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{item.icon || 'No icon configured'}</p>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                            <h2 className="text-lg sm:text-xl font-bold mb-4">
                                {editingStatistic ? 'Edit Statistic' : 'Add Statistic'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.label}
                                            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Value *</label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.value}
                                            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon Class</label>
                                        <input
                                            type="text"
                                            placeholder="fas fa-chart-line"
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
                                        {isSaving ? 'Saving...' : editingStatistic ? 'Update Statistic' : 'Create Statistic'}
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