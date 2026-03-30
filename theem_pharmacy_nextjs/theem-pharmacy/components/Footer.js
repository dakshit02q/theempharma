    import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-white relative">
            {/* Footer Waves */}
            <div className="absolute top-0 left-0 w-full h-24 overflow-hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    className="w-full h-full"
                >
                    <path
                        fill="rgb(59, 130, 246)"
                        fillOpacity="0.1"
                        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>

            <div className="relative pt-24 pb-6">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* About Section */}
                        <div className="lg:col-span-1">
                            <div className="mb-6">
                                <Image
                                    src="/images/logo.png"
                                    alt="Theem College"
                                    width={80}
                                    height={80}
                                    className="mb-4"
                                />
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                THEEM - Shaping the future of pharmacy professionals through excellence in education and research.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                                    aria-label="Facebook"
                                >
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                                    aria-label="Twitter"
                                >
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                                    aria-label="Instagram"
                                >
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-gray-300 hover:text-white transition-colors duration-300"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admissions"
                                        className="text-gray-300 hover:text-white transition-colors duration-300"
                                    >
                                        Programs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-gray-300 hover:text-white transition-colors duration-300"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <i className="fas fa-map-marker-alt text-blue-400 mt-1"></i>
                                    <p className="text-gray-300">
                                        Theem College Campus<br />
                                        123 Education Street<br />
                                        Mumbai, Maharashtra 400001<br />
                                        India
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <i className="fas fa-phone-alt text-blue-400"></i>
                                    <p className="text-gray-300">+91 2222222</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <i className="fas fa-envelope text-blue-400"></i>
                                    <p className="text-gray-300">info@theem.ac.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            &copy; {currentYear} THEEM. All Rights Reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a
                                href="/privacy-policy"
                                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/terms-of-use"
                                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                            >
                                Terms of Use
                            </a>
                            <a
                                href="/sitemap"
                                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                            >
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer