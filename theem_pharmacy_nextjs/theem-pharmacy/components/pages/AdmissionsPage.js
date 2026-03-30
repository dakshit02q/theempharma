import Link from 'next/link'

// Server Component for Admissions Page
export default function AdmissionsPage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Admissions</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Begin your journey in pharmaceutical sciences with our comprehensive programs designed to shape future healthcare professionals.
                    </p>
                </div>
            </section>

            {/* Programs Overview */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Programs</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Choose from our carefully designed pharmacy programs that combine theoretical knowledge with practical experience.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* B.Pharm Program */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-100">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i className="fas fa-user-md text-blue-600 text-3xl"></i>
                                </div>
                                <h3 className="text-3xl font-bold mb-2">Bachelor of Pharmacy</h3>
                                <span className="text-blue-600 font-semibold text-lg">B.Pharm (4 Years)</span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-lg mb-3">Program Highlights</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-3"></i>
                                            <span className="text-gray-600">60 seats available</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-3"></i>
                                            <span className="text-gray-600">4-year comprehensive program</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-3"></i>
                                            <span className="text-gray-600">Industry-aligned curriculum</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-3"></i>
                                            <span className="text-gray-600">State-of-the-art laboratories</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-3"></i>
                                            <span className="text-gray-600">Research opportunities</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-3">Eligibility Criteria</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <i className="fas fa-dot-circle text-blue-500 mr-3 mt-1 text-sm"></i>
                                            <span className="text-gray-600">12th pass with Physics, Chemistry, Biology/Mathematics</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fas fa-dot-circle text-blue-500 mr-3 mt-1 text-sm"></i>
                                            <span className="text-gray-600">Minimum 50% aggregate marks (45% for reserved categories)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fas fa-dot-circle text-blue-500 mr-3 mt-1 text-sm"></i>
                                            <span className="text-gray-600">Valid entrance exam score (MHT-CET/NEET)</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-3">Career Opportunities</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Hospital Pharmacist</span>
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Clinical Research</span>
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Drug Inspector</span>
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Pharmaceutical Industry</span>
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Regulatory Affairs</span>
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Academia</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* D.Pharm Program */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-100">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i className="fas fa-pills text-green-600 text-3xl"></i>
                                </div>
                                <h3 className="text-3xl font-bold mb-2">Diploma in Pharmacy</h3>
                                <span className="text-green-600 font-semibold text-lg">D.Pharm (2 Years)</span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-lg mb-3">Program Highlights</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-3"></i>
                                            <span className="text-gray-600">60 seats available</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-3"></i>
                                            <span className="text-gray-600">2-year intensive program</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-3"></i>
                                            <span className="text-gray-600">Practical-oriented training</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-3"></i>
                                            <span className="text-gray-600">Modern laboratory facilities</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-3"></i>
                                            <span className="text-gray-600">Industry internships</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-3">Eligibility Criteria</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <i className="fas fa-dot-circle text-green-500 mr-3 mt-1 text-sm"></i>
                                            <span className="text-gray-600">12th pass with Physics, Chemistry, Biology/Mathematics</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fas fa-dot-circle text-green-500 mr-3 mt-1 text-sm"></i>
                                            <span className="text-gray-600">Minimum 45% aggregate marks (40% for reserved categories)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fas fa-dot-circle text-green-500 mr-3 mt-1 text-sm"></i>
                                            <span className="text-gray-600">State entrance exam or merit-based admission</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-3">Career Opportunities</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">Retail Pharmacist</span>
                                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">Hospital Pharmacy</span>
                                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">Medical Representative</span>
                                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">Pharmaceutical Sales</span>
                                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">Quality Control</span>
                                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">Government Jobs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admission Process */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Admission Process</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Follow these simple steps to secure your admission at Theem College of Pharmacy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-blue-600 font-bold text-xl">1</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Application</h3>
                            <p className="text-gray-600">
                                Submit your application form with required documents and application fee.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-green-600 font-bold text-xl">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Entrance Exam</h3>
                            <p className="text-gray-600">
                                Appear for the required entrance examination (MHT-CET/NEET for B.Pharm).
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-purple-600 font-bold text-xl">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Merit List</h3>
                            <p className="text-gray-600">
                                Check merit list publication based on entrance exam scores and academic performance.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-yellow-600 font-bold text-xl">4</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Admission</h3>
                            <p className="text-gray-600">
                                Complete admission formalities and fee payment to confirm your seat.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Important Dates */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Important Dates</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Stay updated with the admission timeline and important deadlines.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="text-center p-6 bg-blue-50 rounded-xl">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-calendar text-blue-600"></i>
                                </div>
                                <h3 className="font-bold text-lg mb-2">Application Start</h3>
                                <p className="text-blue-600 font-semibold">April 2025</p>
                            </div>

                            <div className="text-center p-6 bg-green-50 rounded-xl">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-clock text-green-600"></i>
                                </div>
                                <h3 className="font-bold text-lg mb-2">Application Deadline</h3>
                                <p className="text-green-600 font-semibold">June 2025</p>
                            </div>

                            <div className="text-center p-6 bg-purple-50 rounded-xl">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-list text-purple-600"></i>
                                </div>
                                <h3 className="font-bold text-lg mb-2">Merit List</h3>
                                <p className="text-purple-600 font-semibold">July 2025</p>
                            </div>

                            <div className="text-center p-6 bg-yellow-50 rounded-xl">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-file-alt text-yellow-600"></i>
                                </div>
                                <h3 className="font-bold text-lg mb-2">Document Verification</h3>
                                <p className="text-yellow-600 font-semibold">July 2025</p>
                            </div>

                            <div className="text-center p-6 bg-red-50 rounded-xl">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-money-bill text-red-600"></i>
                                </div>
                                <h3 className="font-bold text-lg mb-2">Fee Payment</h3>
                                <p className="text-red-600 font-semibold">August 2025</p>
                            </div>

                            <div className="text-center p-6 bg-indigo-50 rounded-xl">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-graduation-cap text-indigo-600"></i>
                                </div>
                                <h3 className="font-bold text-lg mb-2">Classes Begin</h3>
                                <p className="text-indigo-600 font-semibold">August 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Apply?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Take the first step towards your pharmaceutical career today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Contact Admissions
                        </Link>
                        <Link href="/about" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
