import Image from 'next/image'
import Link from 'next/link'

// This is a Server Component - it will be rendered on the server for SSR
export default function AboutPage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Theem College</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Pioneering pharmaceutical education and research since 2024, dedicated to shaping the future of healthcare professionals.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To provide world-class pharmaceutical education that combines theoretical knowledge with practical experience,
                                preparing students to become competent and ethical pharmacy professionals who contribute meaningfully to society&apos;s health and well-being.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We are committed to fostering innovation, research excellence, and developing leaders who will shape the future of pharmaceutical sciences.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To emerge as a leading institution in pharmaceutical education and research, recognized globally for our commitment to
                                academic excellence, innovation, and producing graduates who make significant contributions to healthcare and society.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We envision a future where our alumni lead transformative changes in pharmaceutical sciences, healthcare delivery, and medical research.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Why Choose Theem?</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Discover what makes Theem College of Pharmacy the ideal choice for your pharmaceutical education journey.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg text-center card-hover">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-microscope text-blue-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Modern Laboratories</h3>
                            <p className="text-gray-600">
                                State-of-the-art laboratory facilities equipped with the latest technology for hands-on learning and research.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg text-center card-hover">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-chalkboard-teacher text-green-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Expert Faculty</h3>
                            <p className="text-gray-600">
                                Experienced faculty members with industry expertise and academic excellence guiding your educational journey.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg text-center card-hover">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-industry text-purple-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Industry Connections</h3>
                            <p className="text-gray-600">
                                Strong partnerships with pharmaceutical companies providing internships and placement opportunities.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg text-center card-hover">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-book-open text-yellow-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Updated Curriculum</h3>
                            <p className="text-gray-600">
                                Industry-aligned curriculum designed to meet current and future needs of the pharmaceutical sector.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg text-center card-hover">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-users text-red-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Small Class Sizes</h3>
                            <p className="text-gray-600">
                                Personalized attention with optimal student-to-faculty ratio ensuring quality education for every student.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg text-center card-hover">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-graduation-cap text-indigo-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Career Support</h3>
                            <p className="text-gray-600">
                                Comprehensive career guidance and placement assistance to help you achieve your professional goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Leadership Team</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Meet the experienced leaders who guide Theem College towards excellence in pharmaceutical education.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="relative mb-6">
                                <Image
                                    src="/images/chairman.png"
                                    alt="Chairman"
                                    width={200}
                                    height={200}
                                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                                />
                            </div>
                            <h3 className="text-xl text-blue-600 font-semibold mb-2">Chairman</h3>
                            <h3 className="text-xl font-bold mb-2">Anwar Hussain J. Thim</h3>
                            <p className="text-blue-600 font-semibold mb-3">Board of Directors</p>
                            <p className="text-gray-600 text-sm">
                                Leading the institution with vision and strategic guidance for excellence in pharmaceutical education.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="relative mb-6">
                                <Image
                                    src="/images/director.png"
                                    alt="Director"
                                    width={200}
                                    height={200}
                                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                                />
                            </div>
                            <h3 className="text-xl text-blue-600 font-semibold mb-2">Director</h3>
                            <h3 className="text-xl font-bold mb-2">Dr. N.K. Rana </h3>
                            <p className="text-blue-600 font-semibold mb-3">Academic Affairs</p>
                            <p className="text-gray-600 text-sm">
                                Overseeing academic operations and ensuring quality education delivery across all programs.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="relative mb-6">
                                <Image
                                    src="/images/principal.png"
                                    alt="Principal"
                                    width={200}
                                    height={200}
                                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                                />
                            </div>
                            <h3 className="text-xl text-blue-600 font-semibold mb-2">Principal</h3>
                            <h3 className="text-xl font-bold mb-2">Dr. Raja Rajeshwari Kamisetti</h3>
                            <p className="text-blue-600 font-semibold mb-3">College Administration</p>
                            <p className="text-gray-600 text-sm">
                                Managing day-to-day operations and fostering a positive learning environment for students.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="relative mb-6">
                                <Image
                                    src="/images/Secretary.png"
                                    alt="Secretary"
                                    width={200}
                                    height={200}
                                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                                />
                            </div>
                            <h3 className="text-xl text-blue-600 font-semibold mb-2">Secretary</h3>
                            <h3 className="text-xl font-bold mb-2">Mohammed Sharif A.Thim</h3>
                            <p className="text-blue-600 font-semibold mb-3">Administrative Affairs</p>
                            <p className="text-gray-600 text-sm">
                                Coordinating administrative functions and ensuring smooth operations across all departments.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-blue-50">
                <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Take the first step towards a rewarding career in pharmaceutical sciences with Theem College.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/admissions" className="btn-primary">
                            Explore Programs
                        </Link>
                        <Link href="/contact" className="btn-secondary">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
