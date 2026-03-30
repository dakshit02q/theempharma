'use client'
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

export default function AdminAdmissions() {
    const [admissions, setAdmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchAdmissions();
    }, []);

    const fetchAdmissions = async () => {
        try {
            const response = await fetch('/api/admissions');
            const data = await response.json();
            if (data.success) {
                setAdmissions(data.data);
            }
        } catch (error) {
            console.error('Error fetching admissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`/api/admin/admissions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
                credentials: 'include'
            });

            if (response.ok) {
                fetchAdmissions();
            }
        } catch (error) {
            console.error('Error updating admission status:', error);
        }
    };

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
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admissions Management</h1>
                    
                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-2 rounded-lg text-sm min-h-[44px] flex items-center justify-center ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            All ({admissions.length})
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-3 py-2 rounded-lg text-sm min-h-[44px] flex items-center justify-center ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Pending ({admissions.filter(a => a.status === 'pending').length})
                        </button>
                        <button
                            onClick={() => setFilter('approved')}
                            className={`px-3 py-2 rounded-lg text-sm min-h-[44px] flex items-center justify-center ${filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Approved ({admissions.filter(a => a.status === 'approved').length})
                        </button>
                        <button
                            onClick={() => setFilter('rejected')}
                            className={`px-3 py-2 rounded-lg text-sm min-h-[44px] flex items-center justify-center ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Rejected ({admissions.filter(a => a.status === 'rejected').length})
                        </button>
                    </div>
                </div>

                {/* Admissions Table - Desktop */}
                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Applicant Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Course & Experience
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Submitted
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAdmissions.map((admission) => (
                                    <tr key={admission.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {admission.firstName} {admission.lastName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    ID: {admission.id}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{admission.email}</div>
                                            <div className="text-sm text-gray-500">{admission.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                Course ID: {admission.courseId}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Experience: {admission.experienceYears || 0} years
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(admission.status)}`}>
                                                {admission.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(admission.submittedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {admission.status === 'pending' && (
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => updateStatus(admission.id, 'approved')}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Approve"
                                                    >
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(admission.id, 'rejected')}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Reject"
                                                    >
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                </div>
                                            )}
                                            {admission.status !== 'pending' && (
                                                <button
                                                    onClick={() => updateStatus(admission.id, 'pending')}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Reset to Pending"
                                                >
                                                    <i className="fas fa-undo"></i>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {filteredAdmissions.length === 0 && (
                        <div className="text-center py-12">
                            <i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                            <p className="text-gray-500">No admissions found for the selected filter.</p>
                        </div>
                    )}
                </div>

                {/* Admissions Cards - Mobile */}
                <div className="md:hidden space-y-4">
                    {filteredAdmissions.map((admission) => (
                        <div key={admission.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {admission.firstName} {admission.lastName}
                                    </h3>
                                    <p className="text-sm text-gray-600 break-all">{admission.email}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(admission.status)}`}>
                                    {admission.status}
                                </span>
                            </div>
                            
                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                    <i className="fas fa-phone w-4 mr-2"></i>
                                    <span>{admission.phone}</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-calendar w-4 mr-2"></i>
                                    <span>{new Date(admission.dateOfBirth).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-map-marker-alt w-4 mr-2"></i>
                                    <span>{admission.address}</span>
                                </div>
                            </div>
                            
                            {admission.status === 'pending' && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => updateStatus(admission.id, 'approved')}
                                        className="flex-1 bg-green-50 text-green-600 py-2 px-3 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium min-h-[44px] flex items-center justify-center"
                                    >
                                        <i className="fas fa-check mr-2"></i>
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => updateStatus(admission.id, 'rejected')}
                                        className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium min-h-[44px] flex items-center justify-center"
                                    >
                                        <i className="fas fa-times mr-2"></i>
                                        Reject
                                    </button>
                                </div>
                            )}
                            {admission.status !== 'pending' && (
                                <button
                                    onClick={() => updateStatus(admission.id, 'pending')}
                                    className="w-full bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium min-h-[44px] flex items-center justify-center"
                                >
                                    <i className="fas fa-undo mr-2"></i>
                                    Reset to Pending
                                </button>
                            )}
                        </div>
                    ))}
                    
                    {filteredAdmissions.length === 0 && (
                        <div className="text-center py-12">
                            <i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                            <p className="text-gray-500">No admissions found for the selected filter.</p>
                        </div>
                    )}
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                        <div className="text-xl sm:text-2xl font-bold text-blue-600">{admissions.length}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Total Applications</div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                        <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                            {admissions.filter(a => a.status === 'pending').length}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Pending Review</div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                        <div className="text-xl sm:text-2xl font-bold text-green-600">
                            {admissions.filter(a => a.status === 'approved').length}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Approved</div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                        <div className="text-xl sm:text-2xl font-bold text-red-600">
                            {admissions.filter(a => a.status === 'rejected').length}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Rejected</div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
