'use client'
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

export default function AdminStudents() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [formData, setFormData] = useState({
        rollNumber: '',
        name: '',
        courseId: '',
        semester: '',
        email: '',
        phone: '',
        address: '',
        admissionYear: new Date().getFullYear(),
        status: 'active'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [studentsRes, coursesRes] = await Promise.all([
                fetch('/api/students'),
                fetch('/api/courses')
            ]);
            
            const [studentsData, coursesData] = await Promise.all([
                studentsRes.json(),
                coursesRes.json()
            ]);
            
            if (studentsData.success) {
                setStudents(studentsData.data.students || []);
            }
            if (coursesData.success) {
                setCourses(coursesData.data || []);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingStudent ? `/api/admin/students/${editingStudent.id}` : '/api/students';
            const method = editingStudent ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    courseId: parseInt(formData.courseId),
                    semester: parseInt(formData.semester),
                    admissionYear: parseInt(formData.admissionYear)
                }),
                credentials: 'include'
            });

            const data = await response.json();
            if (data.success) {
                fetchData();
                setShowModal(false);
                setEditingStudent(null);
                resetForm();
            }
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            rollNumber: '',
            name: '',
            courseId: '',
            semester: '',
            email: '',
            phone: '',
            address: '',
            admissionYear: new Date().getFullYear(),
            status: 'active'
        });
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setFormData({
            rollNumber: student.rollNumber || '',
            name: student.name || '',
            courseId: student.courseId?.toString() || '',
            semester: student.semester?.toString() || '',
            email: student.email || '',
            phone: student.phone || '',
            address: student.address || '',
            admissionYear: student.admissionYear || new Date().getFullYear(),
            status: student.status || 'active'
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this student?')) {
            try {
                const response = await fetch(`/api/admin/students/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                
                if (response.ok) {
                    fetchData();
                }
            } catch (error) {
                console.error('Error deleting student:', error);
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
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Students Management</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Student
                    </button>
                </div>

                {/* Students Table - Desktop */}
                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Student Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Course & Semester
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                <div className="text-sm text-gray-500">Roll: {student.rollNumber}</div>
                                                <div className="text-sm text-gray-500">Year: {student.admissionYear}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                Course ID: {student.courseId}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Semester: {student.semester}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{student.email}</div>
                                            <div className="text-sm text-gray-500">{student.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                student.status === 'active' ? 'bg-green-100 text-green-800' :
                                                student.status === 'inactive' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(student)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(student.id)}
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

                {/* Students Cards - Mobile */}
                <div className="md:hidden space-y-4">
                    {students.map((student) => (
                        <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{student.name}</h3>
                                    <p className="text-sm text-gray-600">Roll: {student.rollNumber}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    student.status === 'active' ? 'bg-green-100 text-green-800' :
                                    student.status === 'inactive' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {student.status}
                                </span>
                            </div>
                            
                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                    <i className="fas fa-graduation-cap w-4 mr-2"></i>
                                    <span>{courses.find(c => c.id === student.courseId)?.name || 'N/A'}</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-calendar w-4 mr-2"></i>
                                    <span>Semester {student.semester}</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-envelope w-4 mr-2"></i>
                                    <span className="break-all">{student.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-phone w-4 mr-2"></i>
                                    <span>{student.phone}</span>
                                </div>
                            </div>
                            
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(student)}
                                    className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium min-h-[44px] flex items-center justify-center"
                                >
                                    <i className="fas fa-edit mr-2"></i>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium min-h-[44px] flex items-center justify-center"
                                >
                                    <i className="fas fa-trash mr-2"></i>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                            <h2 className="text-lg sm:text-xl font-bold mb-4">
                                {editingStudent ? 'Edit Student' : 'Add New Student'}
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Roll Number
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.rollNumber}
                                            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Course
                                        </label>
                                        <select
                                            value={formData.courseId}
                                            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select Course</option>
                                            {courses.map((course) => (
                                                <option key={course.id} value={course.id}>
                                                    {course.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Semester
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="8"
                                            value={formData.semester}
                                            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Admission Year
                                        </label>
                                        <input
                                            type="number"
                                            min="2020"
                                            max="2030"
                                            value={formData.admissionYear}
                                            onChange={(e) => setFormData({ ...formData, admissionYear: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status
                                        </label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="graduated">Graduated</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            setEditingStudent(null);
                                            resetForm();
                                        }}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        {editingStudent ? 'Update' : 'Create'}
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
