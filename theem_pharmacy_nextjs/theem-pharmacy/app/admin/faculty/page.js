'use client'
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { apiClient } from '@/lib/api-client';

const initialFormData = {
    name: '',
    position: '',
    specialization: '',
    email: '',
    phone: '',
    bio: '',
    image: '',
};

function truncate(value, maxLength = 120) {
    if (!value) {
        return 'No bio provided';
    }
    return value.length > maxLength ? `${value.substring(0, maxLength)}...` : value;
}

export default function AdminFaculty() {
    const [facultyMembers, setFacultyMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingFaculty, setEditingFaculty] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [deletingFacultyId, setDeletingFacultyId] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        fetchFaculty();
    }, []);

    const fetchFaculty = async () => {
        try {
            setErrorMessage('');
            const data = await apiClient.getFaculty({
                limit: 300,
                sortBy: 'createdAt',
                sortOrder: 'desc',
            });
            setFacultyMembers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching faculty:', error);
            setErrorMessage(error.message || 'Failed to load faculty members.');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingFaculty(null);
        setFormData(initialFormData);
    };

    const openCreateModal = () => {
        setErrorMessage('');
        setEditingFaculty(null);
        setFormData(initialFormData);
        setShowModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setIsSaving(true);

        try {
            const payload = {
                name: formData.name.trim(),
                position: formData.position.trim(),
                specialization: formData.specialization.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                bio: formData.bio.trim(),
                image: formData.image.trim(),
            };

            if (editingFaculty) {
                await apiClient.adminUpdateFaculty(editingFaculty.id, payload);
            } else {
                await apiClient.createFacultyMember(payload);
            }

            await fetchFaculty();
            closeModal();
        } catch (error) {
            console.error('Error saving faculty member:', error);
            setErrorMessage(error.message || 'Failed to save faculty member.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (member) => {
        setErrorMessage('');
        setEditingFaculty(member);
        setFormData({
            name: member.name || '',
            position: member.position || '',
            specialization: member.specialization || '',
            email: member.email || '',
            phone: member.phone || '',
            bio: member.bio || '',
            image: member.image || '',
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this faculty member?')) {
            return;
        }

        setErrorMessage('');
        setDeletingFacultyId(id);
        try {
            await apiClient.adminDeleteFaculty(id);
            await fetchFaculty();
        } catch (error) {
            console.error('Error deleting faculty member:', error);
            setErrorMessage(error.message || 'Failed to delete faculty member.');
        } finally {
            setDeletingFacultyId(null);
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
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Faculty Management</h1>
                    <button
                        onClick={openCreateModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Faculty
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bio</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {facultyMembers.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                            <div className="text-sm text-gray-500">{member.specialization || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{member.position}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-700">{member.email || 'N/A'}</div>
                                            <div className="text-sm text-gray-500">{member.phone || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{truncate(member.bio)}</td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(member)}
                                                className="text-blue-600 hover:text-blue-900 mr-3 disabled:opacity-50"
                                                disabled={isSaving || deletingFacultyId === member.id}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(member.id)}
                                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                disabled={isSaving || deletingFacultyId === member.id}
                                            >
                                                <i className={`fas ${deletingFacultyId === member.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="md:hidden space-y-4">
                    {facultyMembers.map((member) => (
                        <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                    <p className="text-sm text-gray-600">{member.position}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(member)}
                                        className="text-blue-600 hover:text-blue-900 p-2 disabled:opacity-50"
                                        disabled={isSaving || deletingFacultyId === member.id}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member.id)}
                                        className="text-red-600 hover:text-red-900 p-2 disabled:opacity-50"
                                        disabled={isSaving || deletingFacultyId === member.id}
                                    >
                                        <i className={`fas ${deletingFacultyId === member.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 break-all mb-2">{member.email || 'No email'}</p>
                            <p className="text-sm text-gray-600">{truncate(member.bio, 160)}</p>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                            <h2 className="text-lg sm:text-xl font-bold mb-4">
                                {editingFaculty ? 'Edit Faculty Member' : 'Add Faculty Member'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.position}
                                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                        <input
                                            type="text"
                                            value={formData.specialization}
                                            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                    <textarea
                                        rows={4}
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
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
                                        {isSaving ? 'Saving...' : editingFaculty ? 'Update' : 'Create'}
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
