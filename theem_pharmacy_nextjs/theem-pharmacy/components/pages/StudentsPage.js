'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api-client';

export default function StudentsPage() {
    const [studentsData, setStudentsData] = useState({
        statistics: {
            totalStudents: 0,
            activeOrganizations: 0,
            eventsPerYear: 0,
            placementRate: 0
        },
        organizations: [],
        achievements: [],
        events: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentsData = async () => {
            try {
                setLoading(true);
                const data = await apiClient.getStudentsData('all');
                setStudentsData(data);
            } catch (err) {
                console.error('Error fetching students data:', err);
                setError('Failed to load students data');
            } finally {
                setLoading(false);
            }
        };

        fetchStudentsData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading students data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Student Life at THEEM
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        Experience a vibrant campus life with endless opportunities for growth, learning, and excellence
                    </p>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        Student Statistics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">
                                {studentsData.statistics.totalStudents || 0}+
                            </div>
                            <div className="text-gray-600">Total Students</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-teal-600 mb-2">
                                {studentsData.statistics.activeOrganizations || studentsData.organizations?.length || 0}
                            </div>
                            <div className="text-gray-600">Active Organizations</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">
                                {studentsData.statistics.eventsPerYear || 0}+
                            </div>
                            <div className="text-gray-600">Events Per Year</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-2">
                                {studentsData.statistics.placementRate || 0}%
                            </div>
                            <div className="text-gray-600">Placement Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Student Organizations */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        Student Organizations
                    </h2>
                    {studentsData.organizations && studentsData.organizations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {studentsData.organizations.map((org) => (
                                <div key={org.id} className="bg-white rounded-lg shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{org.name}</h3>
                                    <p className="text-gray-600 mb-4">{org.description}</p>
                                    <div className="text-sm text-blue-600 font-semibold mb-3">
                                        {org.members} Members
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-700 mb-2">Activities:</h4>
                                        <ul className="text-sm text-gray-600">
                                            {org.activities && org.activities.map((activity, index) => (
                                                <li key={index} className="mb-1">• {activity}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>No organizations data available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Student Achievements */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        Student Achievements
                    </h2>
                    {studentsData.achievements && studentsData.achievements.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {studentsData.achievements.map((achievement) => (
                                <div key={achievement.id} className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                                    <div className="text-blue-600 font-semibold mb-2">
                                        {achievement.winner} - {achievement.year}
                                    </div>
                                    <p className="text-gray-600">{achievement.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>No achievements data available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Recent Events */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        Recent Events
                    </h2>
                    {studentsData.events && studentsData.events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {studentsData.events.map((event) => (
                                <div key={event.id} className="bg-white rounded-lg shadow-lg p-6">
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${event.type === 'academic' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                        }`}>
                                        {event.type ? event.type.charAt(0).toUpperCase() + event.type.slice(1) : 'General'}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                                    <div className="text-sm text-gray-500 mb-3">{event.date}</div>
                                    <p className="text-gray-600">{event.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>No recent events data available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}