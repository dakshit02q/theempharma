'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const FALLBACK_NAV_ITEMS = [
  { href: '/', label: 'Home', icon: 'fas fa-home' },
  {
    href: '/about',
    label: 'About Us',
    icon: 'fas fa-info-circle',
    children: [
      { href: '/about/vision', label: 'Vision' },
      { href: '/about/mission', label: 'Mission' },
      { href: '/about/quality-policy', label: 'Quality Policy' },
      { href: '/about/core-values', label: 'Core Values' },
      { href: '/about/board-of-governance', label: 'Board of Governance' },
      { href: '/about/messages', label: 'Messages' },
      { href: '/about/administrative-team', label: 'Administrative Team' },
      { href: '/about/code-of-conduct', label: 'Code Of Conduct' },
    ],
  },
  {
    href: '/admissions',
    label: 'Admission',
    icon: 'fas fa-file-alt',
    children: [
      { href: '/admissions/b-pharmacy', label: 'B.Pharmacy' },
      { href: '/admissions/d-pharmacy', label: 'D.Pharmacy' },
    ],
  },
  { href: '/gallery', label: 'Gallery', icon: 'fas fa-images' },
  { href: '/students', label: 'Students Corner', icon: 'fas fa-user-graduate' },
  {
    href: '/iic',
    label: 'IIC',
    icon: 'fas fa-lightbulb',
    children: [
      { href: '/iic/about', label: 'About IIC' },
      { href: '/iic/team', label: 'IIC Team' },
    ],
  },
  {
    href: '/institute-cells',
    label: 'Institute Cells',
    icon: 'fas fa-building',
    children: [
      { href: '/institute-cells/exam-cell', label: 'Exam Cell' },
      { href: '/institute-cells/anti-ragging-committee', label: 'Anti Ragging Committee' },
      { href: '/institute-cells/student-grievance-cell', label: 'Student Grievance Cell' },
    ],
  },
  { href: '/contact', label: 'Contact us', icon: 'fas fa-envelope' },
  { href: '/alumni', label: 'Alumni', icon: 'fas fa-graduation-cap' },
]

const HEADER_BANNER_SRC = '/THEEM COLLEGE OF PHARMACY AND RESEARCH header footer 30x7 cm-02.png'

const normalizeNavigationPayload = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return FALLBACK_NAV_ITEMS
  }

  return items.map((item) => ({
    href: item.slug || '#',
    label: item.label || 'Untitled',
    icon: item.icon || 'fas fa-link',
    children: Array.isArray(item.children)
      ? item.children.map((child) => ({
        href: child.slug || '#',
        label: child.label || 'Untitled',
      }))
      : [],
  }))
}

const isRouteActive = (pathname, href, children = []) => {
  if (pathname === href) {
    return true
  }

  return children.some((child) => pathname === child.href)
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState({})
  const [navItems, setNavItems] = useState(FALLBACK_NAV_ITEMS)
  const [announcementText, setAnnouncementText] = useState('No latest announcements at the moment.')
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

  useEffect(() => {
    let isActive = true

    const loadNavigation = async () => {
      try {
        const response = await fetch('/api/navigation', { cache: 'no-store' })
        const payload = await response.json()

        if (!isActive) {
          return
        }

        setNavItems(normalizeNavigationPayload(payload?.data))
      } catch {
        if (isActive) {
          setNavItems(FALLBACK_NAV_ITEMS)
        }
      }
    }

    const loadAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements?limit=20', { cache: 'no-store' })
        const payload = await response.json()

        if (!isActive) {
          return
        }

        const messages = Array.isArray(payload?.data)
          ? payload.data
            .map((item) => item?.message || item?.title || '')
            .map((text) => text.trim())
            .filter(Boolean)
          : []

        setAnnouncementText(
          messages.length > 0
            ? messages.join('   •   ')
            : 'No latest announcements at the moment.'
        )
      } catch {
        if (isActive) {
          setAnnouncementText('No latest announcements at the moment.')
        }
      }
    }

    loadNavigation()
    loadAnnouncements()
    const refreshId = setInterval(loadAnnouncements, 120000)

    return () => {
      isActive = false
      clearInterval(refreshId)
    }
  }, [])

  const toggleMobileGroup = (label) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle('dark-mode')
  }

  return (
    <>
      <header
        className={`main-header relative z-[60] w-full transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/95 backdrop-blur-lg'
          }`}
      >
        <div className="border-b border-gray-200 bg-white/95">
          <div className="w-full relative">
            <Link href="/" className="block w-full">
              <div className="relative w-full overflow-hidden bg-white">
                <Image
                  src={HEADER_BANNER_SRC}
                  alt="Theem College of Pharmacy and Research"
                  width={3544}
                  height={458}
                  priority
                  sizes="100vw"
                  className="w-full h-auto block object-contain"
                />
              </div>
            </Link>
          </div>
        </div>

        <div className="border-b border-gray-200 bg-white/95">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:hidden flex items-center justify-between py-2.5 sm:py-3 gap-3">
              <div className="inline-flex items-center rounded-md bg-[var(--brand-primary-soft)] px-2.5 py-1 text-xs sm:text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide">
                Menu
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <div className="hamburger flex flex-col space-y-1">
                  <span
                    className={`w-5 h-0.5 bg-[var(--brand-primary)] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                      }`}
                  />
                  <span
                    className={`w-5 h-0.5 bg-[var(--brand-primary)] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
                      }`}
                  />
                  <span
                    className={`w-5 h-0.5 bg-[var(--brand-primary)] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                      }`}
                  />
                </div>
              </button>
            </div>

            <div className="hidden lg:flex items-center justify-between py-3 gap-3">
              <nav className="flex items-center gap-4 xl:gap-6 text-sm xl:text-base whitespace-nowrap">
                {navItems.map((item) => (
                  <div key={`${item.href}-${item.label}`} className="relative group">
                    <Link
                      href={item.href}
                      className={`nav-link inline-flex items-center gap-1 ${isRouteActive(pathname, item.href, item.children) ? 'active' : ''}`}
                      aria-current={isRouteActive(pathname, item.href, item.children) ? 'page' : undefined}
                    >
                      {item.label}
                      {item.children?.length > 0 && (
                        <i className="fas fa-chevron-down text-[10px] mt-[1px]" aria-hidden="true" />
                      )}
                    </Link>

                    {item.children?.length > 0 && (
                      <div className="absolute top-full left-0 mt-2 min-w-[220px] rounded-lg border border-gray-200 bg-white shadow-lg py-2 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto transition-all duration-200 z-[70]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2 text-sm transition-colors ${pathname === child.href ? 'text-[var(--brand-primary)] bg-[#e8f5f8]' : 'text-gray-700 hover:text-[var(--brand-primary)] hover:bg-gray-50'}`}
                            aria-current={pathname === child.href ? 'page' : undefined}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="flex items-center space-x-4">
                <Link
                  href="/contact"
                  className="btn-apply bg-[var(--brand-primary)] text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-[var(--brand-primary-dark)] transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
                >
                  Apply Now
                </Link>

                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-100 hover:bg-[var(--brand-primary)] hover:text-white transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-sm`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="announcement-bar" role="status" aria-live="polite">
          <div className="announcement-label">Latest Announcements</div>
          <div className="announcement-marquee">
            <div className="announcement-track">
              <span>{announcementText}</span>
              <span aria-hidden="true">{announcementText}</span>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-full max-w-[92vw] sm:max-w-sm bg-white shadow-xl z-[70] transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-4 sm:p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <div className="text-sm font-bold text-gray-900">THEEM</div>
              <div className="text-xs text-gray-600">Navigation Menu</div>
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
              <div key={`${item.href}-${item.label}`} className="rounded-lg overflow-hidden border border-transparent">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={`flex-1 flex items-center py-3 px-4 transition-colors text-sm font-medium ${isRouteActive(pathname, item.href, item.children) ? 'bg-[#e8f5f8] text-[var(--brand-primary)]' : 'hover:bg-gray-100'}`}
                    aria-current={isRouteActive(pathname, item.href, item.children) ? 'page' : undefined}
                  >
                    <i className={`${item.icon} mr-3 w-4`} />
                    {item.label}
                  </Link>

                  {item.children?.length > 0 && (
                    <button
                      onClick={() => toggleMobileGroup(item.label)}
                      className="px-4 py-3 text-gray-500 hover:text-[var(--brand-primary)] transition-colors"
                      aria-label={`Toggle ${item.label} submenu`}
                      aria-expanded={expandedGroups[item.label] ? 'true' : 'false'}
                    >
                      <i className={`fas fa-chevron-${expandedGroups[item.label] ? 'up' : 'down'} text-xs`} />
                    </button>
                  )}
                </div>

                {item.children?.length > 0 && expandedGroups[item.label] && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block py-2.5 px-6 text-sm transition-colors ${pathname === child.href ? 'text-[var(--brand-primary)] bg-[#e8f5f8]' : 'text-gray-700 hover:bg-gray-100'}`}
                        aria-current={pathname === child.href ? 'page' : undefined}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t">
            <Link
              href="/admissions"
              className="block w-full bg-[var(--brand-primary)] text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-[var(--brand-primary-dark)] transition-all duration-300 text-sm"
            >
              Apply Now
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <i className="fas fa-phone-alt text-[var(--brand-primary)] w-4" />
                <span className="text-gray-600">+91 1111111</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <i className="fas fa-envelope text-[var(--brand-primary)] w-4" />
                <span className="text-gray-600">info@theempharmacy.edu</span>
              </div>
            </div>

            <div className="flex space-x-3 mt-4">
              {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
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

