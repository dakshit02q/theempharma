// Server Component for Placement Page
export default function PlacementPage({ statistics }) {
    const objectives = [
        {
            icon: '🎯',
            title: 'Facilitating Placements',
            description: 'Acting as a bridge between students and potential employers, organizing campus recruitment drives, and ensuring maximum placement opportunities for our graduates.',
            color: 'blue'
        },
        {
            icon: '💼',
            title: 'Career Guidance and Counseling',
            description: 'Providing personalized career counseling, helping students identify their strengths, and guiding them towards suitable career paths in the pharmaceutical industry.',
            color: 'green'
        },
        {
            icon: '📈',
            title: 'Enhancing Employability Skills',
            description: 'Conducting comprehensive training programs to develop industry-ready skills, ensuring our students meet the evolving demands of the pharmaceutical sector.',
            color: 'purple'
        },
        {
            icon: '🗣️',
            title: 'Soft Skills Training',
            description: 'Developing communication, leadership, teamwork, and interpersonal skills essential for professional success in corporate environments.',
            color: 'orange'
        },
        {
            icon: '⚙️',
            title: 'Technical Skill Enhancement',
            description: 'Providing hands-on training in pharmaceutical technologies, quality control, regulatory affairs, and other technical competencies required by employers.',
            color: 'teal'
        }
    ]

    const services = [
        {
            title: 'Campus Recruitment Drives',
            description: 'Regular on-campus recruitment events with leading pharmaceutical companies',
            icon: '🏢'
        },
        {
            title: 'Resume Building Workshops',
            description: 'Professional guidance on creating impactful resumes and cover letters',
            icon: '📝'
        },
        {
            title: 'Mock Interviews',
            description: 'Practice sessions with industry experts to build confidence and interview skills',
            icon: '🎤'
        },
        {
            title: 'Industry Interactions',
            description: 'Guest lectures, seminars, and networking sessions with industry professionals',
            icon: '🤝'
        },
        {
            title: 'Internship Coordination',
            description: 'Facilitating internship opportunities with pharmaceutical companies and research organizations',
            icon: '🔬'
        },
        {
            title: 'Career Counseling Sessions',
            description: 'One-on-one counseling to help students make informed career decisions',
            icon: '💡'
        }
    ]

    const colorClasses = {
        blue: { bg: 'bg-blue-50', icon: 'bg-blue-100', text: 'text-blue-600' },
        green: { bg: 'bg-green-50', icon: 'bg-green-100', text: 'text-green-600' },
        purple: { bg: 'bg-purple-50', icon: 'bg-purple-100', text: 'text-purple-600' },
        orange: { bg: 'bg-orange-50', icon: 'bg-orange-100', text: 'text-orange-600' },
        teal: { bg: 'bg-teal-50', icon: 'bg-teal-100', text: 'text-teal-600' }
    }

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Placement Cell</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Bridging the gap between academic learning and professional careers.
                        Your success is our mission with {statistics.placementRate}% placement record.
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">About Our Placement Cell</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            The Placement Cell at Theem College of Pharmacy is a dedicated department that plays a crucial role
                            in bridging the gap between academic learning and professional careers for pharmacy students.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We act as a liaison between students and potential employers, aiming to facilitate successful placements
                            and foster professional development. Our comprehensive approach ensures that every student is well-prepared
                            to embark on a rewarding career in the pharmaceutical industry.
                        </p>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Placement Record</h2>
                        <p className="text-gray-600 text-lg">Excellence in career outcomes</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                            <div className="text-5xl font-bold text-green-600 mb-3">{statistics.placementRate}%</div>
                            <div className="text-gray-600 font-semibold">Placement Rate</div>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                            <div className="text-5xl font-bold text-blue-600 mb-3">₹{(statistics.averagePackage / 100000).toFixed(1)}L</div>
                            <div className="text-gray-600 font-semibold">Average Package</div>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                            <div className="text-5xl font-bold text-purple-600 mb-3">₹{(statistics.topPackage / 100000).toFixed(1)}L</div>
                            <div className="text-gray-600 font-semibold">Highest Package</div>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                            <div className="text-5xl font-bold text-orange-600 mb-3">{statistics.recruitingCompanies}+</div>
                            <div className="text-gray-600 font-semibold">Recruiting Companies</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Objectives */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Core Objectives</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our placement cell is committed to comprehensive career development through these key objectives
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {objectives.map((objective, index) => {
                            const colors = colorClasses[objective.color]
                            return (
                                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                                    <div className={`${colors.bg} p-8 text-center`}>
                                        <div className={`w-20 h-20 ${colors.icon} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                            <span className="text-4xl">{objective.icon}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">{objective.title}</h3>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 leading-relaxed">{objective.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Services Offered */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Services We Offer</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Comprehensive support services to ensure your career success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-2xl">{service.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                                        <p className="text-gray-600 text-sm">{service.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Placement Process */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Placement Process</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            A systematic approach to ensure successful career transitions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                                1
                            </div>
                            <h3 className="text-xl font-bold mb-4">Career Counseling</h3>
                            <p className="text-gray-600">
                                Individual career guidance and industry insights to help students choose the right career path.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                                2
                            </div>
                            <h3 className="text-xl font-bold mb-4">Skill Development</h3>
                            <p className="text-gray-600">
                                Technical and soft skills training, resume building, and interview preparation workshops.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                                3
                            </div>
                            <h3 className="text-xl font-bold mb-4">Company Interface</h3>
                            <p className="text-gray-600">
                                Direct interaction with industry recruiters through campus drives and recruitment events.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                                4
                            </div>
                            <h3 className="text-xl font-bold mb-4">Offer & Support</h3>
                            <p className="text-gray-600">
                                Placement confirmation, offer negotiation support, and post-placement career guidance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-blue-50">
                <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Launch Your Career?</h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Join Theem College of Pharmacy and benefit from our excellent placement support and industry connections.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/admissions" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                            Apply Now
                        </a>
                        <a href="/contact" className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
                            Contact Placement Cell
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
