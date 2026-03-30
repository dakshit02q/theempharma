import Image from 'next/image'
import Link from 'next/link'

// This is a Server Component - it will be rendered on the server for SSR
export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-16 sm:pt-20 overflow-hidden">
                {/* Background Shapes */}
                <div className="absolute inset-0 hero-bg-shapes"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Hero Content */}
                    <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                            <span className="block text-reveal">Excellence in</span>
                            <span className="block text-reveal gradient-text">Pharmaceutical</span>
                            <span className="block text-reveal">Education</span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Shaping the future of pharmacy professionals through innovation, research, and quality education at Theem College of Pharmacy and Research.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                            <Link href="/about" className="btn-primary inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base">
                                <span>Discover Theem</span>
                                <i className="fas fa-arrow-right ml-2"></i>
                            </Link>
                            <Link href="/admissions" className="btn-secondary inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base">
                                <span>Our Programs</span>
                                <i className="fas fa-graduation-cap ml-2"></i>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
                        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl">
                            <Image
                                src="/images/wonderlane-6zlgM-GUd6I-unsplash.jpg"
                                alt="Theem Campus"
                                width={600}
                                height={500}
                                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                        </div>

                        {/* Floating Cards - Hidden on mobile for better performance */}
                        <div className="hidden lg:block absolute -top-4 -right-4 xl:-top-6 xl:-right-6 bg-white p-4 xl:p-6 rounded-xl xl:rounded-2xl shadow-lg animate-float">
                            <div className="flex items-center space-x-3 xl:space-x-4">
                                <div className="w-10 h-10 xl:w-12 xl:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-award text-blue-600 text-lg xl:text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-sm xl:text-base">Excellence</h3>
                                    <p className="text-xs xl:text-sm text-gray-600">In Education</p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block absolute -bottom-4 -left-4 xl:-bottom-6 xl:-left-6 bg-white p-4 xl:p-6 rounded-xl xl:rounded-2xl shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                            <div className="flex items-center space-x-3 xl:space-x-4">
                                <div className="w-10 h-10 xl:w-12 xl:h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-microscope text-green-600 text-lg xl:text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-sm xl:text-base">Research</h3>
                                    <p className="text-xs xl:text-sm text-gray-600">Innovation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8">
                            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold gradient-text mb-2">120</div>
                            <div className="text-gray-600 font-medium text-sm sm:text-base">Total Seats</div>
                        </div>
                        <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8">
                            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold gradient-text mb-2">2</div>
                            <div className="text-gray-600 font-medium text-sm sm:text-base">Programs</div>
                        </div>
                        <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8">
                            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold gradient-text mb-2">100%</div>
                            <div className="text-gray-600 font-medium text-sm sm:text-base">Placement Goal</div>
                        </div>
                        <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8">
                            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold gradient-text mb-2">2024</div>
                            <div className="text-gray-600 font-medium text-sm sm:text-base">Established</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Preview Section */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="space-y-6 order-2 lg:order-1">
                            <div>
                                <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">About Theem</span>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4 sm:mb-6">Pioneering Pharmaceutical Education</h2>
                            </div>

                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                                Theem College of Pharmacy and Research stands out as a premier institution for pharmacy education in Boisar.
                                Established in 2024, our college is committed to academic excellence and holistic personal development.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start sm:items-center space-x-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 sm:mt-0">
                                        <i className="fas fa-graduation-cap text-blue-600 text-sm sm:text-base"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm sm:text-base">Quality Education</h4>
                                        <p className="text-gray-600 text-sm sm:text-base">Industry-aligned curriculum with expert faculty</p>
                                    </div>
                                </div>

                                <div className="flex items-start sm:items-center space-x-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 sm:mt-0">
                                        <i className="fas fa-microscope text-green-600 text-sm sm:text-base"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm sm:text-base">Research Excellence</h4>
                                        <p className="text-gray-600 text-sm sm:text-base">State-of-the-art research facilities</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/about" className="btn-primary inline-flex items-center px-6 py-3 text-sm sm:text-base">
                                Learn More
                                <i className="fas fa-arrow-right ml-2"></i>
                            </Link>
                        </div>

                        <div className="relative order-1 lg:order-2">
                            <Image
                                src="/images/camilo-botia-k4vFDPJoDZk-unsplash.jpg"
                                alt="About Theem"
                                width={600}
                                height={400}
                                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl sm:rounded-2xl shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">Our Programs</span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4 sm:mb-6">Choose Your Path</h2>
                        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                            Discover our comprehensive pharmacy programs designed to prepare you for a successful career in healthcare.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {/* B.Pharm Program */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-user-md text-blue-600 text-xl sm:text-2xl"></i>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold mb-2">B.Pharm</h3>
                                <span className="text-blue-600 font-semibold text-sm sm:text-base">4 Years</span>
                            </div>

                            <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
                                Comprehensive pharmaceutical education with state-of-the-art laboratories and industry-aligned curriculum.
                            </p>

                            <ul className="space-y-2 mb-6 sm:mb-8">
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-3 text-sm"></i>
                                    <span className="text-gray-600 text-sm sm:text-base">60 seats available</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-3 text-sm"></i>
                                    <span className="text-gray-600 text-sm sm:text-base">Expert faculty members</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-3 text-sm"></i>
                                    <span className="text-gray-600 text-sm sm:text-base">Modern facilities</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-3 text-sm"></i>
                                    <span className="text-gray-600 text-sm sm:text-base">Industry exposure</span>
                                </li>
                            </ul>

                            <Link href="/admissions" className="btn-secondary w-full text-center py-3 text-sm sm:text-base">
                                Learn More
                            </Link>
                        </div>

                        {/* D.Pharm Program */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg card-hover border-2 border-blue-200">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-pills text-green-600 text-xl sm:text-2xl"></i>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold mb-2">D.Pharm</h3>
                                <span className="text-green-600 font-semibold text-sm sm:text-base">2 Years</span>
                            </div>

                            <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
                                Practical-oriented training with modern laboratory facilities and experienced faculty.
                            </p>

                            <ul className="space-y-2 mb-6 sm:mb-8">
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-3 text-sm"></i>
                                    <span className="text-gray-600 text-sm sm:text-base">60 seats available</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-3 text-sm"></i>
                                    <span className="text-gray-600 text-sm sm:text-base">Hands-on training</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-3 text-sm"></i>
                                    <span className="text-gray-600 text-sm sm:text-base">Industry partnerships</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-3 text-sm"></i>
                                    <span className="text-gray-600 text-sm sm:text-base">Career support</span>
                                </li>
                            </ul>

                            <Link href="/admissions" className="btn-primary w-full text-center py-3 text-sm sm:text-base">
                                Apply Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90">
                        Join us in shaping the future of pharmaceutical education and research.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                        <Link href="/admissions" className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base">
                            Apply Now
                        </Link>
                        <Link href="/contact" className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm sm:text-base">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
