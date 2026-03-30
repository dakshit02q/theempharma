import Link from 'next/link'

// Server Component that receives courses data as props
export default function CoursesPage({ courses }) {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                        Our Academic Programs
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Choose from our comprehensive pharmacy programs designed to prepare
                        you for a successful career in pharmaceutical sciences
                    </p>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200"
                            >
                                {/* Course Header */}
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
                                    <h2 className="text-3xl font-bold mb-4">{course.name}</h2>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center">
                                            <i className="fas fa-clock mr-2"></i>
                                            <span>{course.duration}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Content */}
                                <div className="p-8">
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        {course.description}
                                    </p>

                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                            Eligibility Criteria
                                        </h3>
                                        <p className="text-gray-600">
                                            <i className="fas fa-check text-green-600 mr-2"></i>
                                            {course.eligibility}
                                        </p>
                                    </div>

                                    {/* Highlights */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                            Program Highlights
                                        </h3>
                                        <ul className="space-y-2">
                                            {(course.highlights || []).map((highlight, idx) => (
                                                <li key={idx} className="text-gray-600">
                                                    <i className="fas fa-star text-yellow-500 mr-2"></i>
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Link
                                        href="/admissions"
                                        className="btn-primary inline-flex items-center"
                                    >
                                        <span>Apply Now</span>
                                        <i className="fas fa-arrow-right ml-2"></i>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Why Our Programs Stand Out
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <i className="fas fa-users text-blue-600 text-3xl mb-3"></i>
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    Small Class Sizes
                                </h3>
                                <p className="text-gray-600">
                                    Personalized attention and mentorship from faculty members
                                </p>
                            </div>
                            <div>
                                <i className="fas fa-flask text-blue-600 text-3xl mb-3"></i>
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    Modern Facilities
                                </h3>
                                <p className="text-gray-600">
                                    State-of-the-art laboratories and research equipment
                                </p>
                            </div>
                            <div>
                                <i className="fas fa-briefcase text-blue-600 text-3xl mb-3"></i>
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    Industry Partnerships
                                </h3>
                                <p className="text-gray-600">
                                    Internship and placement opportunities with leading companies
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admission Timeline */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Admission Timeline
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-6">
                            <div className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <div className="w-1 h-20 bg-blue-200 mt-2"></div>
                                </div>
                                <div className="pb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        Application Submission
                                    </h3>
                                    <p className="text-gray-600">
                                        Submit your application through our online portal with all
                                        required documents
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        2
                                    </div>
                                    <div className="w-1 h-20 bg-blue-200 mt-2"></div>
                                </div>
                                <div className="pb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        Document Verification
                                    </h3>
                                    <p className="text-gray-600">
                                        Our admissions team will review and verify your submitted
                                        documents
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <div className="w-1 h-20 bg-blue-200 mt-2"></div>
                                </div>
                                <div className="pb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        Merit List & Interview
                                    </h3>
                                    <p className="text-gray-600">
                                        Selected candidates will be invited for an interview round
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        4
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        Admission Confirmation
                                    </h3>
                                    <p className="text-gray-600">
                                        Final admission offer and enrollment process
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Ready to Enroll?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Start your journey in pharmaceutical education today
                    </p>
                    <Link
                        href="/admissions"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                    >
                        <span>Apply Now</span>
                        <i className="fas fa-arrow-right ml-2"></i>
                    </Link>
                </div>
            </section>
        </div>
    )
}
