'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { apiClient } from '@/lib/api-client';
import { ADMISSIONS_SLUGS, ADMISSIONS_TITLES } from '@/lib/content/admissions-config';

const defaultForm = {
    id: '',
    title: '',
    content: '',
    document: '',
    order: 0,
    isActive: true,
};

function ApplicationsTab({ admissions, loading, errorMessage, filter, setFilter, updateStatus, updatingAdmissionId, deleteAdmission, deletingAdmissionId, editAdmission }) {
    const filteredAdmissions = admissions.filter(admission => {
        if (filter === 'all') return true;
        return admission.status === filter;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {errorMessage && (
                <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'approved', 'rejected'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-3 py-2 rounded-lg text-sm min-h-[44px] flex items-center justify-center capitalize ${filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {status} ({status === 'all' ? admissions.length : admissions.filter(a => a.status === status).length})
                    </button>
                ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAdmissions.map((admission) => (
                                <tr key={admission.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{admission.firstName} {admission.lastName}</div>
                                        <div className="text-sm text-gray-500">ID: {admission.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{admission.email}</div>
                                        <div className="text-sm text-gray-500">{admission.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">Course ID: {admission.courseId}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(admission.status)}`}>{admission.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(admission.submittedAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => editAdmission(admission)} 
                                                className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-xs font-medium"
                                                title="Edit details"
                                            >
                                                <i className="fas fa-edit mr-1"></i> Edit
                                            </button>
                                            
                                            {admission.status === 'pending' ? (
                                                <>
                                                    <button 
                                                        onClick={() => updateStatus(admission.id, 'approved')} 
                                                        disabled={updatingAdmissionId === admission.id} 
                                                        className="inline-flex items-center px-2 py-1 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors text-xs font-medium disabled:opacity-50"
                                                    >
                                                        <i className={`fas ${updatingAdmissionId === admission.id ? 'fa-spinner fa-spin' : 'fa-check'} mr-1`}></i> Approve
                                                    </button>
                                                    <button 
                                                        onClick={() => updateStatus(admission.id, 'rejected')} 
                                                        disabled={updatingAdmissionId === admission.id} 
                                                        className="inline-flex items-center px-2 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-xs font-medium disabled:opacity-50"
                                                    >
                                                        <i className={`fas ${updatingAdmissionId === admission.id ? 'fa-spinner fa-spin' : 'fa-times'} mr-1`}></i> Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <button 
                                                    onClick={() => updateStatus(admission.id, 'pending')} 
                                                    disabled={updatingAdmissionId === admission.id} 
                                                    className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-xs font-medium disabled:opacity-50"
                                                >
                                                    <i className={`fas ${updatingAdmissionId === admission.id ? 'fa-spinner fa-spin' : 'fa-undo'} mr-1`}></i> Reset
                                                </button>
                                            )}
                                            
                                            <button 
                                                onClick={() => deleteAdmission(admission.id)} 
                                                disabled={deletingAdmissionId === admission.id} 
                                                className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-xs font-medium disabled:opacity-50"
                                            >
                                                <i className={`fas ${deletingAdmissionId === admission.id ? 'fa-spinner fa-spin' : 'fa-trash'} mr-1`}></i> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredAdmissions.length === 0 && (
                    <div className="text-center py-12"><i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i><p className="text-gray-500">No admissions found.</p></div>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {filteredAdmissions.map((admission) => (
                    <div key={admission.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-semibold text-gray-900">{admission.firstName} {admission.lastName}</h3>
                                <p className="text-sm text-gray-600 break-all">{admission.email}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(admission.status)}`}>{admission.status}</span>
                                <button onClick={() => editAdmission(admission)} className="text-blue-600 p-1"><i className="fas fa-edit"></i></button>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {admission.status === 'pending' ? (
                                <>
                                    <button onClick={() => updateStatus(admission.id, 'approved')} disabled={updatingAdmissionId === admission.id} className="flex-1 bg-green-50 text-green-600 py-2 px-3 rounded-lg text-sm font-medium"><i className={`fas ${updatingAdmissionId === admission.id ? 'fa-spinner fa-spin' : 'fa-check'} mr-2`}></i>Approve</button>
                                    <button onClick={() => updateStatus(admission.id, 'rejected')} disabled={updatingAdmissionId === admission.id} className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-lg text-sm font-medium"><i className={`fas ${updatingAdmissionId === admission.id ? 'fa-spinner fa-spin' : 'fa-times'} mr-2`}></i>Reject</button>
                                </>
                            ) : (
                                <button onClick={() => updateStatus(admission.id, 'pending')} disabled={updatingAdmissionId === admission.id} className="w-full bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium"><i className={`fas ${updatingAdmissionId === admission.id ? 'fa-spinner fa-spin' : 'fa-undo'} mr-2`}></i>Reset</button>
                            )}
                            <button onClick={() => deleteAdmission(admission.id)} disabled={deletingAdmissionId === admission.id} className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-lg text-sm font-medium"><i className={`fas ${deletingAdmissionId === admission.id ? 'fa-spinner fa-spin' : 'fa-trash'} mr-2`}></i>{deletingAdmissionId === admission.id ? 'Deleting...' : 'Delete'}</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Applications', count: admissions.length, color: 'text-blue-600' },
                    { label: 'Pending Review', count: admissions.filter(a => a.status === 'pending').length, color: 'text-yellow-600' },
                    { label: 'Approved', count: admissions.filter(a => a.status === 'approved').length, color: 'text-green-600' },
                    { label: 'Rejected', count: admissions.filter(a => a.status === 'rejected').length, color: 'text-red-600' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                        <div className={`text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.count}</div>
                        <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PageContentTab() {
    const [activeSlug, setActiveSlug] = useState(ADMISSIONS_SLUGS[0]);
    const [sections, setSections] = useState([]);
    const [formData, setFormData] = useState(defaultForm);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function loadSlugData(slug) {
        try {
            setErrorMessage('');
            setLoading(true);
            const data = await apiClient.adminGetAdmissionsContent(slug);
            const list = Array.isArray(data?.sections) ? data.sections : [];
            setSections(list);
            setFormData({
                ...defaultForm,
                title: data?.title || ADMISSIONS_TITLES[slug] || '',
            });
        } catch (error) {
            setErrorMessage(error.message || 'Failed to load admissions content.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSlugData(activeSlug);
    }, [activeSlug]);

    async function uploadDocument(file) {
        if (!file) return;
        setIsUploading(true);
        setErrorMessage('');
        try {
            const uploaded = await apiClient.adminUploadFile(file, {
                folderKind: 'admissions',
                type: 'pdf',
                preferredName: `${activeSlug}-document`,
            });
            setFormData((prev) => ({ ...prev, document: uploaded.filePath }));
        } catch (error) {
            setErrorMessage(error.message || 'Failed to upload PDF.');
        } finally {
            setIsUploading(false);
        }
    }

    function editSection(item) {
        setFormData({
            id: item.id,
            title: item.title || ADMISSIONS_TITLES[activeSlug],
            content: item.content || '',
            document: item.document || '',
            order: item.order || 0,
            isActive: item.isActive !== false,
        });
    }

    async function saveSection(event) {
        event.preventDefault();
        setIsSaving(true);
        setErrorMessage('');
        try {
            await apiClient.adminSaveAdmissionsContent(activeSlug, {
                ...formData,
                title: formData.title.trim() || ADMISSIONS_TITLES[activeSlug],
                content: formData.content.trim(),
                document: formData.document.trim(),
                order: Number.parseInt(String(formData.order), 10) || 0,
                id: formData.id || undefined,
            });
            await loadSlugData(activeSlug);
            setFormData({ ...defaultForm, title: ADMISSIONS_TITLES[activeSlug] });
        } catch (error) {
            setErrorMessage(error.message || 'Failed to save admissions content.');
        } finally {
            setIsSaving(false);
        }
    }

    async function deleteSection(id) {
        if (!window.confirm('Delete this admissions section?')) return;
        try {
            setErrorMessage('');
            await apiClient.adminDeleteAdmissionsContent(activeSlug, id);
            await loadSlugData(activeSlug);
            if (String(formData.id) === String(id)) {
                setFormData({ ...defaultForm, title: ADMISSIONS_TITLES[activeSlug] });
            }
        } catch (error) {
            setErrorMessage(error.message || 'Failed to delete section.');
        }
    }

    return (
        <div className="space-y-6">
            <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden bg-white">
                {ADMISSIONS_SLUGS.map((slug) => (
                    <button
                        key={slug}
                        onClick={() => setActiveSlug(slug)}
                        className={`px-4 py-2 text-sm font-medium ${activeSlug === slug ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                    >
                        {ADMISSIONS_TITLES[slug]}
                    </button>
                ))}
            </div>

            {errorMessage ? (
                <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
            ) : null}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Sections for {ADMISSIONS_TITLES[activeSlug]}</h2>
                    {loading ? (
                        <div className="py-10 text-center text-gray-500"><i className="fas fa-spinner fa-spin mr-2"></i>Loading...</div>
                    ) : sections.length === 0 ? (
                        <p className="text-sm text-gray-600">No sections yet. Create the first one from the form.</p>
                    ) : (
                        <div className="space-y-3">
                            {sections.map((item) => (
                                <div key={item.id} className="rounded-lg border border-gray-200 p-3">
                                    <div className="flex justify-between items-start gap-3">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1">Order: {item.order || 0} | {item.isActive ? 'Active' : 'Inactive'}</p>
                                            {item.document ? (
                                                <a href={item.document} target="_blank" rel="noreferrer" className="inline-block mt-2 text-xs text-blue-600 hover:text-blue-700">View PDF</a>
                                            ) : null}
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => editSection(item)} className="text-blue-600 hover:text-blue-800"><i className="fas fa-edit"></i></button>
                                            <button onClick={() => deleteSection(item.id)} className="text-red-600 hover:text-red-800"><i className="fas fa-trash"></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">{formData.id ? 'Edit Section' : 'Create Section'}</h2>
                    <form onSubmit={saveSection} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea rows={6} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">PDF Upload</label>
                                <input type="file" accept="application/pdf" onChange={(e) => uploadDocument(e.target.files?.[0])} className="w-full text-sm" />
                                {isUploading ? <p className="text-xs text-blue-600 mt-1">Uploading...</p> : null}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Path</label>
                                <input type="text" value={formData.document} onChange={(e) => setFormData({ ...formData, document: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="/uploads/admissions/..." />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <label className="inline-flex items-center gap-2 text-sm text-gray-700 pt-7">
                                <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                                Active section
                            </label>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => setFormData({ ...defaultForm, title: ADMISSIONS_TITLES[activeSlug] })} className="px-4 py-2 text-gray-600">Clear</button>
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60" disabled={isSaving || isUploading}>
                                {isSaving ? 'Saving...' : formData.id ? 'Update Section' : 'Create Section'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function AdminAdmissions() {
    const [activeTab, setActiveTab] = useState('applications');

    // Applications state
    const [admissions, setAdmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [appError, setAppError] = useState('');
    const [updatingAdmissionId, setUpdatingAdmissionId] = useState(null);
    const [deletingAdmissionId, setDeletingAdmissionId] = useState(null);

    // Edit Modal state
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingAdmission, setEditingAdmission] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [editFormData, setEditFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', 
        courseId: '', qualifications: '', experienceYears: '', status: ''
    });

    const fetchAdmissions = async () => {
        try {
            setAppError('');
            const data = await apiClient.getAdmissions({
                limit: 300,
                sortBy: 'submittedAt',
                sortOrder: 'desc',
            });
            setAdmissions(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching admissions:', error);
            setAppError(error.message || 'Failed to load admissions.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmissions();
    }, []);

    const updateStatus = async (id, newStatus) => {
        setUpdatingAdmissionId(id);
        setAppError('');
        try {
            await apiClient.adminUpdateAdmissionStatus(id, newStatus);
            await fetchAdmissions();
        } catch (error) {
            console.error('Error updating admission status:', error);
            setAppError(error.message || 'Failed to update admission status.');
        } finally {
            setUpdatingAdmissionId(null);
        }
    };

    const deleteAdmission = async (id) => {
        if (!window.confirm('Delete this admission application?')) {
            return;
        }

        setDeletingAdmissionId(id);
        setAppError('');
        try {
            await apiClient.adminDeleteAdmission(id);
            await fetchAdmissions();
        } catch (error) {
            console.error('Error deleting admission:', error);
            setAppError(error.message || 'Failed to delete admission.');
        } finally {
            setDeletingAdmissionId(null);
        }
    };

    const handleEditClick = (admission) => {
        setEditingAdmission(admission);
        setEditFormData({
            firstName: admission.firstName || '',
            lastName: admission.lastName || '',
            email: admission.email || '',
            phone: admission.phone || '',
            courseId: admission.courseId || '',
            qualifications: admission.qualifications || '',
            experienceYears: admission.experienceYears || '',
            status: admission.status || 'pending'
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setAppError('');
        try {
            await apiClient.adminUpdateAdmission(editingAdmission.id, editFormData);
            await fetchAdmissions();
            setShowEditModal(false);
        } catch (error) {
            setAppError(error.message || 'Failed to update admission.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admissions Management</h1>
                </div>

                <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden bg-white">
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'applications' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        <i className="fas fa-users mr-2"></i>Applications
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'content' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        <i className="fas fa-file-alt mr-2"></i>Page Content
                    </button>
                </div>

                {activeTab === 'applications' ? (
                    <ApplicationsTab
                        admissions={admissions}
                        loading={loading}
                        errorMessage={appError}
                        filter={filter}
                        setFilter={setFilter}
                        updateStatus={updateStatus}
                        updatingAdmissionId={updatingAdmissionId}
                        deleteAdmission={deleteAdmission}
                        deletingAdmissionId={deletingAdmissionId}
                        editAdmission={handleEditClick}
                    />
                ) : (
                    <PageContentTab />
                )}
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h2 className="text-xl font-bold mb-6">Edit Application</h2>
                        <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input type="text" required value={editFormData.firstName} onChange={e => setEditFormData({...editFormData, firstName: e.target.value})} className="w-full border rounded-lg p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input type="text" required value={editFormData.lastName} onChange={e => setEditFormData({...editFormData, lastName: e.target.value})} className="w-full border rounded-lg p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" required value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} className="w-full border rounded-lg p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input type="text" required value={editFormData.phone} onChange={e => setEditFormData({...editFormData, phone: e.target.value})} className="w-full border rounded-lg p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
                                <input type="number" value={editFormData.courseId} onChange={e => setEditFormData({...editFormData, courseId: e.target.value})} className="w-full border rounded-lg p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                                <input type="number" value={editFormData.experienceYears} onChange={e => setEditFormData({...editFormData, experienceYears: e.target.value})} className="w-full border rounded-lg p-2" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                                <textarea rows="3" value={editFormData.qualifications} onChange={e => setEditFormData({...editFormData, qualifications: e.target.value})} className="w-full border rounded-lg p-2"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select value={editFormData.status} onChange={e => setEditFormData({...editFormData, status: e.target.value})} className="w-full border rounded-lg p-2">
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                                <button type="submit" disabled={isSaving} className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50">
                                    {isSaving ? 'Saving...' : 'Update Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

