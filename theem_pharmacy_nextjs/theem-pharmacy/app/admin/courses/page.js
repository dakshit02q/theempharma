'use client'
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

export default function AdminCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        duration: '',
        eligibility: ''
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses');
            const data = await response.json();
            if (data.success) {
                setCourses(data.data);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingCourse ? `/api/admin/courses/${editingCourse.id}` : '/api/courses';
            const method = editingCourse ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();
            if (data.success) {
                fetchCourses();
                setShowModal(false);
                setEditingCourse(null);
                setFormData({ name: '', description: '', duration: '', eligibility: '' });
            }
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setFormData({
            name: course.name,
            description: course.description || '',
            duration: course.duration || '',
            eligibility: course.eligibility || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this course?')) {
            try {
                const response = await fetch(`/api/admin/courses/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                
                if (response.ok) {
                    fetchCourses();
                }
            } catch (error) {
                console.error('Error deleting course:', error);
            }
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
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Courses Management</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Course
                    </button>
                </div>

                {/* Courses Table - Desktop */}
                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Course Name
                                    </th>
                                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Eligibility
                                    </th>
                                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {courses.map((course) => (
                                    <tr key={course.id} className="hover:bg-gray-50">
                                        <td className="px-4 lg:px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{course.name}</div>
                                                <div className="text-sm text-gray-500">{course.description?.substring(0, 100)}...</div>
                                            </div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-sm text-gray-900">
                                            {course.duration}
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-sm text-gray-900">
                                            {course.eligibility}
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-sm text-gray-500">
                                            {new Date(course.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(course)}
                                                className="text-blue-600 hover:text-blue-900 mr-3 p-1"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(course.id)}
                                                className="text-red-600 hover:text-red-900 p-1"
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

                {/* Courses Cards - Mobile */}
                <div className="md:hidden space-y-4">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium text-gray-900 truncate">{course.name}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{course.description?.substring(0, 80)}...</p>
                                </div>
                                <div className="flex space-x-2 ml-2">
                                    <button
                                        onClick={() => handleEdit(course)}
                                        className="text-blue-600 hover:text-blue-900 p-2"
                                    >
                                        <i className="fas fa-edit text-sm"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className="text-red-600 hover:text-red-900 p-2"
                                    >
                                        <i className="fas fa-trash text-sm"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <span className="text-gray-500">Duration:</span>
                                    <span className="ml-1 text-gray-900">{course.duration}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Created:</span>
                                    <span className="ml-1 text-gray-900">{new Date(course.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <span className="text-gray-500 text-xs">Eligibility:</span>
                                <p className="text-gray-900 text-xs mt-1">{course.eligibility}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-lg max-h-screen overflow-y-auto">
                            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                                {editingCourse ? 'Edit Course' : 'Add New Course'}
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Course Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                        placeholder="Enter course name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                                        placeholder="Enter course description"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Duration
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                            placeholder="e.g., 4 Years"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Eligibility
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.eligibility}
                                            onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                            placeholder="e.g., 12th with PCM/PCB"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 sm:pt-6 border-t">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            setEditingCourse(null);
                                            setFormData({ name: '', description: '', duration: '', eligibility: '' });
                                        }}
                                        className="w-full sm:w-auto px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
                                    >
                                        {editingCourse ? 'Update Course' : 'Create Course'}
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
