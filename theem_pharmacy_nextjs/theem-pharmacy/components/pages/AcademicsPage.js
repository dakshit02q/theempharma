// Server Component for Academics Page
export default function AcademicsPage({ academicCalendar }) {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Academic Calendar & Syllabus</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Stay updated with academic schedules, examination dates, and important institutional activities.
                    </p>
                </div>
            </section>

            {/* Academic Calendar */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Academic Calendar 2024-25</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Important dates and events for the current academic year.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {academicCalendar.map((event) => (
                            <div key={event.id} className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-blue-600">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                                            <span className="text-xs text-blue-600 font-semibold">
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                            </span>
                                            <span className="text-2xl font-bold text-blue-600">
                                                {new Date(event.date).getDate()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${event.category === 'semester' ? 'bg-blue-100 text-blue-800' :
                                                event.category === 'exam' ? 'bg-red-100 text-red-800' :
                                                    event.category === 'event' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {event.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Programs Overview */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Programs</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Comprehensive pharmaceutical education programs designed for excellence.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <i className="fas fa-user-md text-blue-600 text-2xl"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">B.Pharmacy (4 Years)</h3>
                            <p className="text-gray-600 mb-4">
                                Comprehensive undergraduate program in pharmaceutical sciences with focus on
                                drug development, formulation, and pharmaceutical care.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <span>60 seats available</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <span>Industry-aligned curriculum</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <span>Research opportunities</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <i className="fas fa-pills text-green-600 text-2xl"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">D.Pharmacy (2 Years)</h3>
                            <p className="text-gray-600 mb-4">
                                Intensive diploma program focusing on practical pharmacy skills, drug
                                dispensing, and pharmaceutical care services.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <span>60 seats available</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <span>Practical-oriented training</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <span>Industry internships</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admin Panel Notice */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                        <h3 className="text-2xl font-bold mb-4">Connected to Admin Panel</h3>
                        <p className="text-xl opacity-90">
                            Academic calendar and syllabus information are managed through our administrative system.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
