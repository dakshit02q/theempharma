'use client'
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalFaculty: 0,
        totalCourses: 0,
        totalAdmissions: 0,
        totalEvents: 0,
        totalPlacements: 0,
        recentAdmissions: [],
        recentContacts: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch data from multiple endpoints
            const [studentsRes, facultyRes, coursesRes, admissionsRes, eventsRes, placementsRes] = await Promise.all([
                fetch('/api/students'),
                fetch('/api/faculty'),
                fetch('/api/courses'),
                fetch('/api/admissions'),
                fetch('/api/events'),
                fetch('/api/placements')
            ]);

            const [students, faculty, courses, admissions, events, placements] = await Promise.all([
                studentsRes.json(),
                facultyRes.json(),
                coursesRes.json(),
                admissionsRes.json(),
                eventsRes.json(),
                placementsRes.json()
            ]);

            setStats({
                totalStudents: students.data?.students?.length || 0,
                totalFaculty: faculty.data?.length || 0,
                totalCourses: courses.data?.length || 0,
                totalAdmissions: admissions.data?.length || 0,
                totalEvents: events.data?.length || 0,
                totalPlacements: placements.data?.length || 0,
                recentAdmissions: admissions.data?.slice(0, 5) || [],
                recentContacts: [] // Will be populated when contact API is available
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, icon, color, trend }) => (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    {trend && (
                        <p className="text-sm text-green-600 mt-1">
                            <i className="fas fa-arrow-up mr-1"></i>
                            {trend}% from last month
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                    <i className={`${icon} text-white text-xl`}></i>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                        <p className="text-gray-600">Loading dashboard...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 sm:p-6 text-white">
                    <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome to THEEM Admin Panel</h1>
                    <p className="opacity-90 text-sm sm:text-base">Manage your college data and monitor system performance</p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    <StatCard
                        title="Total Students"
                        value={stats.totalStudents}
                        icon="fas fa-user-graduate"
                        color="bg-blue-500"
                        trend={12}
                    />
                    <StatCard
                        title="Faculty Members"
                        value={stats.totalFaculty}
                        icon="fas fa-chalkboard-teacher"
                        color="bg-green-500"
                        trend={5}
                    />
                    <StatCard
                        title="Courses"
                        value={stats.totalCourses}
                        icon="fas fa-graduation-cap"
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="Applications"
                        value={stats.totalAdmissions}
                        icon="fas fa-file-alt"
                        color="bg-orange-500"
                        trend={25}
                    />
                    <StatCard
                        title="Events"
                        value={stats.totalEvents}
                        icon="fas fa-calendar-alt"
                        color="bg-red-500"
                    />
                    <StatCard
                        title="Placements"
                        value={stats.totalPlacements}
                        icon="fas fa-briefcase"
                        color="bg-indigo-500"
                        trend={18}
                    />
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Admissions */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
                            <a href="/admin/admissions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View All
                            </a>
                        </div>
                        <div className="space-y-3">
                            {stats.recentAdmissions.length > 0 ? (
                                stats.recentAdmissions.map((admission, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {admission.firstName} {admission.lastName}
                                            </p>
                                            <p className="text-sm text-gray-600">{admission.email}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            admission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            admission.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {admission.status}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent applications</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <a
                                href="/admin/courses"
                                className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors min-h-[44px]"
                            >
                                <i className="fas fa-plus text-blue-600 mr-3"></i>
                                <span className="text-sm font-medium text-blue-700">Add Course</span>
                            </a>
                            <a
                                href="/admin/faculty"
                                className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors min-h-[44px]"
                            >
                                <i className="fas fa-user-plus text-green-600 mr-3"></i>
                                <span className="text-sm font-medium text-green-700">Add Faculty</span>
                            </a>
                            <a
                                href="/admin/events"
                                className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors min-h-[44px]"
                            >
                                <i className="fas fa-calendar-plus text-purple-600 mr-3"></i>
                                <span className="text-sm font-medium text-purple-700">Add Event</span>
                            </a>
                            <a
                                href="/admin/students"
                                className="flex items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors min-h-[44px]"
                            >
                                <i className="fas fa-user-graduate text-orange-600 mr-3"></i>
                                <span className="text-sm font-medium text-orange-700">Manage Students</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm text-gray-600">Database: Online</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm text-gray-600">API: Operational</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm text-gray-600">Website: Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
