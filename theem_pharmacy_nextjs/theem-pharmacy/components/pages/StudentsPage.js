const defaultStudentsData = {
    statistics: {
        totalStudents: 0,
        activeOrganizations: 0,
        eventsPerYear: 0,
        placementRate: 0,
    },
    organizations: [],
    achievements: [],
    events: [],
};

function formatEventDate(dateValue) {
    if (!dateValue) {
        return 'Date to be announced';
    }

    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) {
        return String(dateValue);
    }

    return parsedDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default function StudentsPage({ studentsData = defaultStudentsData, isFallback = false }) {
    const safeData = {
        statistics: {
            ...defaultStudentsData.statistics,
            ...(studentsData?.statistics || {}),
        },
        organizations: Array.isArray(studentsData?.organizations)
            ? studentsData.organizations
            : [],
        achievements: Array.isArray(studentsData?.achievements)
            ? studentsData.achievements
            : [],
        events: Array.isArray(studentsData?.events)
            ? studentsData.events
            : [],
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-14 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                        Student Life at THEEM
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                        Experience a vibrant campus life with endless opportunities for growth, learning, and excellence
                    </p>
                </div>
            </section>

            {/* Data Source Notice */}
            <section className={`py-4 border-y ${isFallback ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs sm:text-sm font-medium ${isFallback ? 'text-amber-800' : 'text-green-800'}`}>
                    {isFallback
                        ? 'Live data is currently unavailable. Showing safe fallback values.'
                        : 'Showing live student data from the backend.'}
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-12 sm:py-14 lg:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
                        Student Statistics
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        <div className="text-center bg-blue-50 rounded-xl p-4 sm:p-5 lg:p-6">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">
                                {safeData.statistics.totalStudents || 0}+
                            </div>
                            <div className="text-gray-600 text-xs sm:text-sm lg:text-base">Total Students</div>
                        </div>
                        <div className="text-center bg-teal-50 rounded-xl p-4 sm:p-5 lg:p-6">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-600 mb-1 sm:mb-2">
                                {safeData.statistics.activeOrganizations || safeData.organizations.length || 0}
                            </div>
                            <div className="text-gray-600 text-xs sm:text-sm lg:text-base">Active Organizations</div>
                        </div>
                        <div className="text-center bg-green-50 rounded-xl p-4 sm:p-5 lg:p-6">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-1 sm:mb-2">
                                {safeData.statistics.eventsPerYear || 0}+
                            </div>
                            <div className="text-gray-600 text-xs sm:text-sm lg:text-base">Events Per Year</div>
                        </div>
                        <div className="text-center bg-purple-50 rounded-xl p-4 sm:p-5 lg:p-6">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">
                                {safeData.statistics.placementRate || 0}%
                            </div>
                            <div className="text-gray-600 text-xs sm:text-sm lg:text-base">Placement Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Student Organizations */}
            <section className="py-12 sm:py-14 lg:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
                        Student Organizations
                    </h2>
                    {safeData.organizations.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                            {safeData.organizations.map((org) => (
                                <div key={org.id} className="bg-white rounded-xl shadow-md p-5 sm:p-6 h-full">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 leading-snug">{org.name}</h3>
                                    <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">{org.description}</p>
                                    <div className="text-sm text-blue-600 font-semibold mb-3">
                                        {org.members || 0} Members
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-700 mb-2">Activities:</h4>
                                        <ul className="text-sm text-gray-600 leading-relaxed">
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
            <section className="py-12 sm:py-14 lg:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
                        Student Achievements
                    </h2>
                    {safeData.achievements.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
                            {safeData.achievements.map((achievement) => (
                                <div key={achievement.id} className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-5 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 leading-snug">{achievement.title}</h3>
                                    <div className="text-blue-600 font-semibold text-sm sm:text-base mb-2">
                                        {(achievement.winner || achievement.student || 'Student')} - {achievement.year}
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{achievement.description}</p>
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
            <section className="py-12 sm:py-14 lg:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
                        Recent Events
                    </h2>
                    {safeData.events.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
                            {safeData.events.map((event) => (
                                <div key={event.id} className="bg-white rounded-xl shadow-md p-5 sm:p-6">
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${event.type === 'academic' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                        }`}>
                                        {event.type ? event.type.charAt(0).toUpperCase() + event.type.slice(1) : 'General'}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 leading-snug">{event.title}</h3>
                                    <div className="text-sm text-gray-500 mb-3">{formatEventDate(event.date)}</div>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{event.description}</p>
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