'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { apiClient } from '@/lib/api-client';

const initialFormData = {
    title: '',
    description: '',
    approvingBody: '',
    approvalDate: '',
    validUntil: '',
    certificateNumber: '',
    category: 'academic',
    document: '',
    isActive: true,
};

export default function AdminApprovalsPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    async function fetchApprovals() {
        try {
            setErrorMessage('');
            const data = await apiClient.adminGetApprovals({
                limit: 500,
                sortBy: 'approvalDate',
                sortOrder: 'desc',
            });
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            setErrorMessage(error.message || 'Failed to load approvals.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApprovals();
    }, []);

    function openCreateModal() {
        setEditingItem(null);
        setFormData(initialFormData);
        setErrorMessage('');
        setShowModal(true);
    }

    function openEditModal(item) {
        setEditingItem(item);
        setFormData({
            title: item.title || '',
            description: item.description || '',
            approvingBody: item.approvingBody || '',
            approvalDate: item.approvalDate || '',
            validUntil: item.validUntil || '',
            certificateNumber: item.certificateNumber || '',
            category: item.category || 'academic',
            document: item.document || '',
            isActive: item.isActive !== false,
        });
        setErrorMessage('');
        setShowModal(true);
    }

    async function uploadDocument(file) {
        if (!file) {
            return;
        }

        setErrorMessage('');
        setIsUploading(true);
        try {
            const uploaded = await apiClient.adminUploadFile(file, {
                folderKind: 'approval',
                type: 'pdf',
                preferredName: formData.title || 'approval-document',
            });
            setFormData((prev) => ({ ...prev, document: uploaded.filePath }));
        } catch (error) {
            setErrorMessage(error.message || 'Failed to upload document.');
        } finally {
            setIsUploading(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage('');
        setIsSaving(true);

        try {
            const payload = {
                ...formData,
                title: formData.title.trim(),
                description: formData.description.trim(),
                approvingBody: formData.approvingBody.trim(),
                certificateNumber: formData.certificateNumber.trim(),
                document: formData.document.trim(),
            };

            if (editingItem) {
                await apiClient.adminUpdateApproval(editingItem.id, payload);
            } else {
                await apiClient.adminCreateApproval(payload);
            }

            await fetchApprovals();
            setShowModal(false);
            setEditingItem(null);
            setFormData(initialFormData);
        } catch (error) {
            setErrorMessage(error.message || 'Failed to save approval.');
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('Delete this approval and its document?')) {
            return;
        }

        try {
            setErrorMessage('');
            await apiClient.adminDeleteApproval(id);
            await fetchApprovals();
        } catch (error) {
            setErrorMessage(error.message || 'Failed to delete approval.');
        }
    }

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
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Approvals Management</h1>
                    <button
                        onClick={openCreateModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Approval
                    </button>
                </div>

                {errorMessage && (
                    <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approving Body</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.approvingBody || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.approvalDate || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {item.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <button
                                                onClick={() => openEditModal(item)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">{editingItem ? 'Edit Approval' : 'Add Approval'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Approving Body</label>
                                    <input
                                        type="text"
                                        value={formData.approvingBody}
                                        onChange={(event) => setFormData({ ...formData, approvingBody: event.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Approval Date</label>
                                    <input
                                        type="date"
                                        value={formData.approvalDate}
                                        onChange={(event) => setFormData({ ...formData, approvalDate: event.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                                    <input
                                        type="date"
                                        value={formData.validUntil}
                                        onChange={(event) => setFormData({ ...formData, validUntil: event.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Number</label>
                                    <input
                                        type="text"
                                        value={formData.certificateNumber}
                                        onChange={(event) => setFormData({ ...formData, certificateNumber: event.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(event) => setFormData({ ...formData, category: event.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">PDF Document</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(event) => uploadDocument(event.target.files?.[0])}
                                        className="w-full text-sm"
                                    />
                                    {isUploading ? <p className="text-xs text-blue-600 mt-1">Uploading...</p> : null}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stored Path</label>
                                    <input
                                        type="text"
                                        value={formData.document}
                                        onChange={(event) => setFormData({ ...formData, document: event.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        placeholder="/uploads/approvals/..."
                                    />
                                </div>
                            </div>

                            {formData.document ? (
                                <a href={formData.document} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
                                    <i className="fas fa-file-pdf mr-2"></i>
                                    Preview current document
                                </a>
                            ) : null}

                            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(event) => setFormData({ ...formData, isActive: event.target.checked })}
                                />
                                Active approval
                            </label>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    disabled={isSaving}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
                                    disabled={isSaving || isUploading}
                                >
                                    {isSaving ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
