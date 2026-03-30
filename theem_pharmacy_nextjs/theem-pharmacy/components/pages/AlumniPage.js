// Server Component for Alumni Page
export default function AlumniPage({ statistics }) {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Alumni Network</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Join our proud network of {statistics.totalAlumni}+ alumni making significant
                        contributions to the pharmaceutical industry worldwide.
                    </p>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Alumni Impact</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our alumni have established themselves as leaders in pharmaceutical industry,
                            healthcare, research, and entrepreneurship across the globe.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-xl text-center border-b-4 border-blue-600">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-users text-blue-600 text-2xl"></i>
                            </div>
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">{statistics.totalAlumni}+</h3>
                            <p className="text-gray-600 font-semibold">Total Alumni</p>
                            <p className="text-sm text-gray-500 mt-2">Across all programs since inception</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl text-center border-b-4 border-green-600">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-crown text-green-600 text-2xl"></i>
                            </div>
                            <h3 className="text-4xl font-bold text-green-600 mb-2">{statistics.industryLeaders}</h3>
                            <p className="text-gray-600 font-semibold">Industry Leaders</p>
                            <p className="text-sm text-gray-500 mt-2">C-level executives and senior managers</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl text-center border-b-4 border-purple-600">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-lightbulb text-purple-600 text-2xl"></i>
                            </div>
                            <h3 className="text-4xl font-bold text-purple-600 mb-2">{statistics.entrepreneurs}</h3>
                            <p className="text-gray-600 font-semibold">Entrepreneurs</p>
                            <p className="text-sm text-gray-500 mt-2">Successful startup founders and business owners</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl text-center border-b-4 border-orange-600">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-graduation-cap text-orange-600 text-2xl"></i>
                            </div>
                            <h3 className="text-4xl font-bold text-orange-600 mb-2">{statistics.higherEducation}</h3>
                            <p className="text-gray-600 font-semibold">Higher Education</p>
                            <p className="text-sm text-gray-500 mt-2">PhD and advanced degree holders</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl text-center border-b-4 border-red-600">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-globe text-red-600 text-2xl"></i>
                            </div>
                            <h3 className="text-4xl font-bold text-red-600 mb-2">{statistics.internationalPositions}</h3>
                            <p className="text-gray-600 font-semibold">Global Positions</p>
                            <p className="text-sm text-gray-500 mt-2">Working in international companies</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl text-center border-b-4 border-indigo-600">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-microscope text-indigo-600 text-2xl"></i>
                            </div>
                            <h3 className="text-4xl font-bold text-indigo-600 mb-2">{statistics.researchers}</h3>
                            <p className="text-gray-600 font-semibold">Researchers</p>
                            <p className="text-sm text-gray-500 mt-2">Active in pharmaceutical research</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alumni Services */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Alumni Services</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            We provide comprehensive support and services to help our alumni
                            stay connected and continue their professional development.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <i className="fas fa-network-wired text-blue-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Alumni Network</h3>
                            <p className="text-gray-600">
                                Connect with fellow alumni through our global network platform
                                for professional networking and collaboration opportunities.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <i className="fas fa-briefcase text-green-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Career Support</h3>
                            <p className="text-gray-600">
                                Ongoing career guidance, job referrals, and professional development
                                resources for alumni at all career stages.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                                <i className="fas fa-calendar-alt text-purple-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Alumni Events</h3>
                            <p className="text-gray-600">
                                Regular reunions, networking events, and professional development
                                workshops exclusively for our alumni community.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                                <i className="fas fa-chalkboard-teacher text-orange-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Mentorship Program</h3>
                            <p className="text-gray-600">
                                Opportunities to mentor current students and connect experienced
                                alumni with recent graduates for career guidance.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                <i className="fas fa-book text-red-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Continuing Education</h3>
                            <p className="text-gray-600">
                                Access to continuing education programs, webinars, and professional
                                certifications to stay current with industry trends.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                                <i className="fas fa-heart text-indigo-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Alumni Giving</h3>
                            <p className="text-gray-600">
                                Opportunities to support current students through scholarships,
                                mentorship, and infrastructure development initiatives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admin Panel Notice */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-database text-white text-2xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Connected to Admin Panel</h3>
                        <p className="text-xl opacity-90 mb-6">
                            Alumni information, achievements, and network data are managed through our
                            comprehensive administrative system for real-time updates and connectivity.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 text-left">
                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Alumni Database</h4>
                                <p className="text-sm opacity-80">Comprehensive alumni records and achievements tracking</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Network Management</h4>
                                <p className="text-sm opacity-80">Alumni connectivity and networking platform integration</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Event Coordination</h4>
                                <p className="text-sm opacity-80">Alumni event planning and participation management</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alumni Registration CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Stay Connected</h2>
                    <p className="text-xl mb-8 text-gray-600">
                        Join our alumni network and stay connected with your alma mater and fellow graduates.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-4">Register as Alumni</h3>
                            <p className="mb-6 opacity-90">
                                Update your information and join our global alumni network for networking and opportunities.
                            </p>
                            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                Register Now
                            </button>
                        </div>
                        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-4">Alumni Directory</h3>
                            <p className="mb-6 opacity-90">
                                Access our alumni directory to connect with fellow graduates and expand your professional network.
                            </p>
                            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                Access Directory
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
