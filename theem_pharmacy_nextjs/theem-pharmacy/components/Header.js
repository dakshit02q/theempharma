'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home', icon: 'fas fa-home' },
  { href: '/about', label: 'About', icon: 'fas fa-info-circle' },
  { href: '/committee', label: 'Committee', icon: 'fas fa-users' },
  { href: '/admissions', label: 'Admissions', icon: 'fas fa-file-alt' },
  { href: '/academics', label: 'Academics', icon: 'fas fa-book' },
  { href: '/research', label: 'Research', icon: 'fas fa-microscope' },
  { href: '/students', label: 'Students', icon: 'fas fa-user-graduate' },
  { href: '/placement', label: 'Placement', icon: 'fas fa-briefcase' },
  { href: '/alumni', label: 'Alumni', icon: 'fas fa-graduation-cap' },
  { href: '/events', label: 'Events', icon: 'fas fa-calendar-alt' },
  { href: '/contact', label: 'Contact', icon: 'fas fa-envelope' },
]

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsMobileMenuOpen(false), 0)
    return () => clearTimeout(timer)
  }, [pathname])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle('dark-mode')
  }

  return (
    <>
      <header
        className={`main-header fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/95 backdrop-blur-lg'
        }`}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4 gap-3">
            <div className="flex items-center min-w-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Theem College"
                  width={60}
                  height={60}
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15"
                />
                <div className="ml-2 sm:ml-3 hidden sm:block">
                  <div className="text-sm sm:text-base font-bold text-gray-900 truncate">THEEM</div>
                  <div className="text-xs text-gray-600 hidden md:block">College of Pharmacy</div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - single line, no wrap */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm xl:text-base whitespace-nowrap">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                href="/contact"
                className="hidden md:block btn-apply bg-gradient-to-r from-red-500 to-red-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
              >
                Apply Now
              </Link>

              <button
                onClick={toggleTheme}
                className="hidden md:block p-2 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition-all duration-300"
                aria-label="Toggle theme"
              >
                <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-sm`} />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <div className="hamburger flex flex-col space-y-1">
                  <span
                    className={`w-5 h-0.5 bg-blue-600 transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                  />
                  <span
                    className={`w-5 h-0.5 bg-blue-600 transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`w-5 h-0.5 bg-blue-600 transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 sm:p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center">
              <Image src="/images/logo.png" alt="Theem College" width={40} height={40} className="w-10 h-10" />
              <div className="ml-2">
                <div className="text-sm font-bold text-gray-900">THEEM</div>
                <div className="text-xs text-gray-600">College of Pharmacy</div>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close mobile menu"
            >
              <i className="fas fa-times text-lg" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center py-3 px-4 rounded-lg transition-colors text-sm font-medium ${
                  pathname === item.href ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                }`}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                <i className={`${item.icon} mr-3 w-4`} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t">
            <Link
              href="/admissions"
              className="block w-full bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm"
            >
              Apply Now
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <i className="fas fa-phone-alt text-blue-600 w-4" />
                <span className="text-gray-600">+91 1111111</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <i className="fas fa-envelope text-blue-600 w-4" />
                <span className="text-gray-600">info@theempharmacy.edu</span>
              </div>
            </div>

            <div className="flex space-x-3 mt-4">
              {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                >
                  <i className={`fab fa-${icon} text-xs`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header

