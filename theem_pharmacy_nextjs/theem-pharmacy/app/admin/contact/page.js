'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { apiClient } from '@/lib/api-client';

export default function AdminContact() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const fetchData = async () => {
        try {
            setErrorMessage('');
            const data = await apiClient.adminGetContactSubmissions();
            setSubmissions(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching submissions:', error);
            setErrorMessage(error.message || 'Failed to load contact submissions.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleUpdateStatus = async (id, status) => {
        setIsSaving(true);
        try {
            await apiClient.adminUpdateContactSubmission(id, { status });
            await fetchData();
            if (selectedSubmission?.id === id) {
                setSelectedSubmission({ ...selectedSubmission, status });
            }
        } catch (error) {
            setErrorMessage(error.message || 'Failed to update status.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this submission permanently?')) return;
        setDeletingId(id);
        try {
            await apiClient.adminDeleteContactSubmission(id);
            await fetchData();
            if (selectedSubmission?.id === id) setSelectedSubmission(null);
        } catch (error) {
            setErrorMessage(error.message || 'Failed to delete submission.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>

                {errorMessage && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{errorMessage}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* List View */}
                    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[70vh]">
                        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                            <span className="font-medium text-gray-700">Inbox</span>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{submissions.length} total</span>
                        </div>
                        <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
                            {loading ? <div className="p-8 text-center text-gray-500"><i className="fas fa-spinner fa-spin mr-2"></i>Loading...</div> : 
                            submissions.map(sub => (
                                <div 
                                    key={sub.id} 
                                    onClick={() => setSelectedSubmission(sub)}
                                    className={`p-4 cursor-pointer hover:bg-blue-50 transition-colors ${selectedSubmission?.id === sub.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-semibold text-gray-900 truncate">{sub.name}</span>
                                        <span className="text-[10px] text-gray-500">{new Date(sub.submittedAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 truncate">{sub.subject}</div>
                                    <div className="mt-2 flex gap-2">
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${sub.status === 'new' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{sub.status}</span>
                                    </div>
                                </div>
                            ))}
                            {submissions.length === 0 && !loading && <div className="p-8 text-center text-gray-500">No submissions found.</div>}
                        </div>
                    </div>

                    {/* Detail View */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[70vh]">
                        {selectedSubmission ? (
                            <>
                                <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{selectedSubmission.subject}</h2>
                                        <p className="text-sm text-gray-500 mt-1">From: <span className="font-medium text-gray-700">{selectedSubmission.name}</span> &lt;{selectedSubmission.email}&gt;</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleUpdateStatus(selectedSubmission.id, selectedSubmission.status === 'read' ? 'new' : 'read')}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedSubmission.status === 'read' ? 'bg-gray-100 text-gray-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? <i className="fas fa-spinner fa-spin"></i> : selectedSubmission.status === 'read' ? 'Mark Unread' : 'Mark Read'}
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(selectedSubmission.id)}
                                            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
                                            disabled={deletingId === selectedSubmission.id}
                                        >
                                            <i className="fas fa-trash mr-1"></i> Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="p-8 flex-1 overflow-y-auto">
                                    <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm grid grid-cols-2 gap-4">
                                        <div><span className="text-gray-500">Phone:</span> <span className="ml-1 text-gray-900">{selectedSubmission.phone || 'Not provided'}</span></div>
                                        <div><span className="text-gray-500">Submitted:</span> <span className="ml-1 text-gray-900">{new Date(selectedSubmission.submittedAt).toLocaleString()}</span></div>
                                    </div>
                                    <div className="prose prose-blue max-w-none">
                                        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                                            {selectedSubmission.message}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-t bg-gray-50 text-right">
                                    <a href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                                        <i className="fas fa-reply mr-2"></i> Reply via Email
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-center items-center justify-center text-gray-400 italic">
                                Select a submission to view details
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
