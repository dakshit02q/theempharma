'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { apiClient } from '@/lib/api-client';

export default function AdminCommittee() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        position: '',
        department: '',
        email: '',
        phone: '',
        bio: '',
        image: '',
        order: 0,
        isActive: true
    });

    const fetchData = async () => {
        try {
            setErrorMessage('');
            const data = await apiClient.adminGetCommitteeMembers();
            setMembers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching committee:', error);
            setErrorMessage(error.message || 'Failed to load committee members.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setFormData({
            name: '',
            position: '',
            department: '',
            email: '',
            phone: '',
            bio: '',
            image: '',
            order: 0,
            isActive: true
        });
    };

    const handleOpenModal = (member = null) => {
        setErrorMessage('');
        if (member) {
            setEditingMember(member);
            setFormData({
                name: member.name || '',
                position: member.position || '',
                department: member.department || '',
                email: member.email || '',
                phone: member.phone || '',
                bio: member.bio || '',
                image: member.image || '',
                order: member.order || 0,
                isActive: member.isActive !== false
            });
        } else {
            setEditingMember(null);
            resetForm();
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsSaving(true);
        try {
            if (editingMember) {
                await apiClient.adminUpdateCommitteeMember(editingMember.id, formData);
            } else {
                await apiClient.adminCreateCommitteeMember(formData);
            }
            await fetchData();
            setShowModal(false);
        } catch (error) {
            setErrorMessage(error.message || 'Failed to save member.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this member?')) return;
        setDeletingId(id);
        try {
            await apiClient.adminDeleteCommitteeMember(id);
            await fetchData();
        } catch (error) {
            setErrorMessage(error.message || 'Failed to delete member.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Committee Management</h1>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <i className="fas fa-plus mr-2"></i> Add Member
                    </button>
                </div>

                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {errorMessage}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-12">
                        <i className="fas fa-spinner fa-spin text-3xl text-blue-600"></i>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {members.map((member) => (
                                        <tr key={member.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {member.image ? (
                                                        <img src={member.image} alt="" className="h-10 w-10 rounded-full object-cover mr-3" />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                                            <i className="fas fa-user text-gray-400"></i>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                                        <div className="text-xs text-gray-500">Order: {member.order}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{member.position}</div>
                                                <div className="text-xs text-gray-500">{member.department}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{member.email}</div>
                                                <div className="text-xs text-gray-500">{member.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs rounded-full ${member.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {member.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button 
                                                        onClick={() => handleOpenModal(member)} 
                                                        className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-xs font-medium"
                                                    >
                                                        <i className="fas fa-edit mr-1"></i> Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(member.id)} 
                                                        disabled={deletingId === member.id} 
                                                        className="inline-flex items-center px-2 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-xs font-medium disabled:opacity-50"
                                                    >
                                                        <i className={`fas ${deletingId === member.id ? 'fa-spinner fa-spin' : 'fa-trash'} mr-1`}></i> Delete
                                                    </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {members.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No members found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
                            <h2 className="text-xl font-bold mb-4">{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                                    <input type="text" required value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <input type="text" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full border rounded-lg p-2" placeholder="https://..." />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                    <textarea rows="3" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full border rounded-lg p-2"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                    <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: e.target.value})} className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="flex items-center pt-8">
                                    <label className="flex items-center cursor-pointer">
                                        <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="mr-2 h-4 w-4 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-700">Active member</span>
                                    </label>
                                </div>
                                <div className="md:col-span-2 flex justify-end space-x-3 mt-6">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                                    <button type="submit" disabled={isSaving} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                                        {isSaving ? 'Saving...' : editingMember ? 'Update Member' : 'Add Member'}
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
