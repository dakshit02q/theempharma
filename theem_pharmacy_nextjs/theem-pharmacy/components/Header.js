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
      { href: '/about#vision', label: 'Vision' },
      { href: '/about#mission', label: 'Mission' },
      { href: '/about#quality-policy', label: 'Quality Policy' },
      { href: '/about#core-values', label: 'Core Values' },
      { href: '/about#board-of-governance', label: 'Board of Governance' },
      { href: '/about#messages', label: 'Messages' },
      { href: '/about#administrative-team', label: 'Administrative Team' },
      { href: '/about#code-of-conduct', label: 'Code Of Conduct' },
    ],
  },
  {
    href: '#',
    label: 'Academics',
    icon: 'fas fa-book-open',
    children: [
      {
        href: '#',
        label: 'Degree',
        children: [
          { href: '/academics/b-pharmacy', label: 'B. Pharma' },
        ],
      },
      {
        href: '#',
        label: 'Diploma',
        children: [
          { href: '/academics/d-pharmacy', label: 'D. Pharma' },
        ],
      },
    ],
  },
  {
    href: '#',
    label: 'Admissions',
    icon: 'fas fa-file-alt',
    children: [
      {
        href: '/admissions/b-pharmacy',
        label: 'B. Pharma',
      },
      {
        href: '/admissions/d-pharmacy',
        label: 'D. Pharma',
      },
    ],
  },
  { href: '/gallery', label: 'Gallery', icon: 'fas fa-images' },
  {
    href: '#',
    label: 'Students Corner',
    icon: 'fas fa-user-graduate',
    children: [
      { href: '/students/syllabus', label: 'Syllabus' },
      { href: '/students/library', label: 'Library' },
      { href: '/students/resources', label: 'Student Resources' },
    ],
  },
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
    href: '#',
    label: 'Institute Cells',
    icon: 'fas fa-building',
    children: [
      { href: '/institute-cells/exam-cell', label: 'Exam Cell' },
      { href: '/institute-cells/server-cell', label: 'Server Cell' },
      { href: '/institute-cells/anti-ragging-committee', label: 'Anti Ragging Cell' },
      { href: '/institute-cells/anti-discrimination-cell', label: 'Anti Discrimination Cell' },
      { href: '/institute-cells/student-grievance-cell', label: 'Student Grievance Cell' },
      { href: '/institute-cells/sc-st-cell', label: 'SC/ST Committee and WEGR Cell' },
      { href: '/institute-cells/cdc-cell', label: 'CDC Cell' },
    ],
  },
  { href: '/contact', label: 'Contact us', icon: 'fas fa-envelope' },
  { href: '/alumni', label: 'Alumni', icon: 'fas fa-graduation-cap' },
  { href: '/approvals', label: 'Approvals', icon: 'fas fa-certificate' },
]

const HEADER_BANNER_SRC = '/THEEM COLLEGE OF PHARMACY AND RESEARCH header footer 30x7 cm-02.png'

const ABOUT_SECTION_KEYS = new Set([
  'vision',
  'mission',
  'quality-policy',
  'core-values',
  'board-of-governance',
  'messages',
  'administrative-team',
  'code-of-conduct',
])

const mapAboutHrefToAnchor = (href) => {
  if (typeof href !== 'string' || href.length === 0) {
    return '#'
  }

  if (!href.startsWith('/about/')) {
    return href
  }

  const sectionKey = href.slice('/about/'.length)
  if (!ABOUT_SECTION_KEYS.has(sectionKey)) {
    return href
  }

  return `/about#${sectionKey}`
}

const normalizeAcademicsHref = (href, label, lineage = []) => {
  const safeHref = typeof href === 'string' ? href.trim() : '#'
  const lowerHref = safeHref.toLowerCase()
  const lowerLabel = (label || '').toLowerCase()
  const lowerLineage = lineage.map((item) => (item || '').toLowerCase())
  const isUnderAcademics = lowerLineage.includes('academics')

  if (!isUnderAcademics) {
    return mapAboutHrefToAnchor(safeHref || '#')
  }

  const isBPharm =
    lowerLabel.includes('b. pharma') ||
    lowerLabel.includes('b.pharma') ||
    lowerLabel.includes('b pharmacy') ||
    lowerHref.includes('/academics/b-pharm') ||
    lowerHref.includes('/academics/b-pharmacy')

  if (isBPharm) {
    return '/academics/b-pharmacy'
  }

  const isDPharm =
    lowerLabel.includes('d. pharma') ||
    lowerLabel.includes('d.pharma') ||
    lowerLabel.includes('d pharmacy') ||
    lowerHref.includes('/academics/d-pharm') ||
    lowerHref.includes('/academics/d-pharmacy')

  if (isDPharm) {
    return '/academics/d-pharmacy'
  }

  return mapAboutHrefToAnchor(safeHref || '#')
}

const normalizeAdmissionsItem = (item = {}, lineage = []) => {
  const label = (item.label || '').toLowerCase()
  const lowerLineage = lineage.map((entry) => (entry || '').toLowerCase())
  const isUnderAdmissions = lowerLineage.includes('admissions')
  const slug = typeof item.slug === 'string' ? item.slug.toLowerCase() : ''

  if (!isUnderAdmissions) {
    return null
  }

  const isBPharm =
    label.includes('b. pharma') ||
    label.includes('b.pharma') ||
    label.includes('b pharmacy') ||
    slug.includes('/admissions/b-pharm') ||
    slug.includes('/admissions/b-pharmacy')

  if (isBPharm) {
    return {
      href: '/admissions/b-pharmacy',
      label: item.label || 'B. Pharma',
      icon: item.icon || 'fas fa-link',
      children: [],
    }
  }

  const isDPharm =
    label.includes('d. pharma') ||
    label.includes('d.pharma') ||
    label.includes('d pharmacy') ||
    slug.includes('/admissions/d-pharm') ||
    slug.includes('/admissions/d-pharmacy')

  if (isDPharm) {
    return {
      href: '/admissions/d-pharmacy',
      label: item.label || 'D. Pharma',
      icon: item.icon || 'fas fa-link',
      children: [],
    }
  }

  return null
}

const getPathFromHref = (href) => {
  if (!href || href === '#') {
    return href
  }

  return href.split('#')[0]
}

const isHrefActive = (pathname, href) => {
  const hrefPath = getPathFromHref(href)
  return Boolean(hrefPath && hrefPath !== '#' && pathname === hrefPath)
}

const normalizeNavigationPayload = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return FALLBACK_NAV_ITEMS
  }

  const normalizeItem = (item, lineage = [], depth = 0) => {
    if (depth > 5) return null // Prevent deep recursion or cycles
    const currentLineage = [...lineage, item.label || '']
    const underAdmissions = lineage.map((entry) => (entry || '').toLowerCase()).includes('admissions') || (item.label || '').toLowerCase() === 'admissions'

    if (underAdmissions && (item.label || '').toLowerCase() !== 'admissions') {
      const normalizedAdmissionItem = normalizeAdmissionsItem(item, lineage)
      if (normalizedAdmissionItem) {
        return normalizedAdmissionItem
      }
    }

    let children = Array.isArray(item.children)
      ? item.children
        .map((child) => normalizeItem(child, currentLineage, depth + 1))
        .filter(Boolean)
      : []

    if ((item.label || '').toLowerCase() === 'admissions') {
      const flattened = Array.isArray(item.children)
        ? item.children
          .flatMap((child) => {
            const normalizedChild = normalizeAdmissionsItem(child, [item.label || ''])
            if (normalizedChild) {
              return [normalizedChild]
            }

            if (Array.isArray(child.children)) {
              return child.children
                .map((grandChild) => normalizeAdmissionsItem(grandChild, [item.label || '', child.label || '']))
                .filter(Boolean)
            }

            return []
          })
        : []

      const dedupedByHref = new Map()
      for (const child of flattened) {
        dedupedByHref.set(child.href, child)
      }
      children = Array.from(dedupedByHref.values())
    }

    return {
      href: normalizeAcademicsHref(item.slug || '#', item.label || '', lineage),
      label: item.label || 'Untitled',
      icon: item.icon || 'fas fa-link',
      children,
    }
  }

  const normalized = items.map((item) => normalizeItem(item, []))

  if (!normalized.some(item => item.href === '/alumni')) {
    normalized.push({
      href: '/alumni',
      label: 'Alumni',
      icon: 'fas fa-graduation-cap',
      children: [],
    })
  }

  if (!normalized.some(item => item.href === '/contact')) {
    normalized.push({
      href: '/contact',
      label: 'Contact us',
      icon: 'fas fa-envelope',
      children: [],
    })
  }

  if (!normalized.some(item => item.href === '/approvals')) {
    normalized.push({
      href: '/approvals',
      label: 'Approvals',
      icon: 'fas fa-certificate',
      children: [],
    })
  }

  const labels = new Set(normalized.map((item) => item.label))
  const hasExpectedTopLevelMenus =
    labels.has('Institute Cells') &&
    labels.has('Students Corner') &&
    labels.has('Academics') &&
    labels.has('Admissions')

  return hasExpectedTopLevelMenus ? normalized : FALLBACK_NAV_ITEMS
}

const isRouteActive = (pathname, href, children = [], depth = 0) => {
  if (depth > 5 || !pathname) return false
  if (isHrefActive(pathname, href)) {
    return true
  }

  const safeChildren = Array.isArray(children) ? children : []
  return safeChildren.some((child) => isRouteActive(pathname, child.href, child.children || [], depth + 1))
}

const getNavKey = (item, parentKey = '') => `${parentKey}${parentKey ? '>' : ''}${item.label}`

const Header = ({ initialNavItems = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState({})
  const [navItems, setNavItems] = useState(() => normalizeNavigationPayload(initialNavItems))
  const [announcementText, setAnnouncementText] = useState('No latest announcements at the moment.')
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 150)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsMobileMenuOpen(false), 0)
    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    // Sync navItems if initialNavItems changes (on navigation)
    setNavItems(normalizeNavigationPayload(initialNavItems));
  }, [initialNavItems]);

  useEffect(() => {
    let isActive = true

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

  const renderDesktopDropdownItems = (items, parentKey = '') => (
    <>
      {items.map((child) => {
        const childKey = getNavKey(child, parentKey)
        const hasChildren = child.children?.length > 0

        return (
          <div key={childKey} className="relative group/submenu">
            <Link
              href={child.href || '#'}
              className={`flex items-center justify-center gap-3 px-5 py-2.5 text-[13px] text-center font-semibold transition-all duration-200 ${isHrefActive(pathname, child.href) ? 'text-[var(--brand-primary)] bg-[#e8f5f8] border-l-2 border-[var(--brand-primary)]' : 'text-gray-600 hover:text-[var(--brand-primary)] hover:bg-gray-50 hover:pl-6 border-l-2 border-transparent'}`}
              aria-current={isHrefActive(pathname, child.href) ? 'page' : undefined}
            >
              <span>{child.label}</span>
              {hasChildren && <i className="fas fa-chevron-right text-[10px] text-gray-400 group-hover/submenu:text-[var(--brand-primary)] transition-colors absolute right-4" aria-hidden="true" />}
            </Link>

            {hasChildren && (
              <div className="absolute top-0 left-full min-w-[240px] rounded-2xl border border-gray-100 bg-white shadow-xl py-2 opacity-0 invisible pointer-events-none group-hover/submenu:opacity-100 group-hover/submenu:visible group-hover/submenu:pointer-events-auto transition-all duration-200 z-[75] ml-1">
                {renderDesktopDropdownItems(child.children, childKey)}
              </div>
            )}
          </div>
        )
      })}
    </>
  )

  const renderMobileItems = (items, depth = 0, parentKey = '') => (
    <>
      {items.map((item) => {
        const itemKey = getNavKey(item, parentKey)
        const hasChildren = item.children?.length > 0
        const leftPadding = depth === 0 ? 'px-4' : depth === 1 ? 'px-6' : 'px-8'

        return (
          <div key={itemKey} className={`${depth === 0 ? 'rounded-lg overflow-hidden border border-transparent' : ''}`}>
            <div className="flex items-center">
              <Link
                href={item.href || '#'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex-1 flex items-center py-3 ${leftPadding} transition-colors text-sm font-medium ${isRouteActive(pathname, item.href, item.children) ? 'bg-[#e8f5f8] text-[var(--brand-primary)]' : 'hover:bg-gray-100'}`}
                aria-current={isRouteActive(pathname, item.href, item.children) ? 'page' : undefined}
              >
                {depth === 0 && <i className={`${item.icon} mr-3 w-4`} />}
                {item.label}
              </Link>

              {hasChildren && (
                <button
                  onClick={() => toggleMobileGroup(itemKey)}
                  className="px-4 py-3 text-gray-500 hover:text-[var(--brand-primary)] transition-colors"
                  aria-label={`Toggle ${item.label} submenu`}
                  aria-expanded={expandedGroups[itemKey] ? 'true' : 'false'}
                >
                  <i className={`fas fa-chevron-${expandedGroups[itemKey] ? 'up' : 'down'} text-xs`} />
                </button>
              )}
            </div>

            {hasChildren && expandedGroups[itemKey] && (
              <div className="bg-gray-50 border-t border-gray-100">
                {renderMobileItems(item.children, depth + 1, itemKey)}
              </div>
            )}
          </div>
        )
      })}
    </>
  )

  if (isAdminRoute) {
    return null
  }

  return (
    <>
      <header
        className={`main-header relative z-[60] w-full`}
      >
        {/* Row 0: Top Info Bar - Hides on Scroll */}
        <div className={`bg-[#f8f9fa] border-b border-gray-100 hidden lg:block transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-10'}`}>
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between text-[11px] font-bold tracking-wider text-gray-500 uppercase">
            <div className="flex items-center space-x-6">
              <div className="flex items-center gap-2">
                <i className="fas fa-phone-alt text-[var(--brand-primary)]"></i>
                <span>+91 1111111111</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-envelope text-[var(--brand-primary)]"></i>
                <span>info@theempharmacy.edu</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center gap-4 border-r border-gray-200 pr-6">
                <a href="#" className="hover:text-[var(--brand-primary)] transition-colors">Career</a>
                <a href="#" className="hover:text-[var(--brand-primary)] transition-colors">Alumni</a>
                <a href="#" className="hover:text-[var(--brand-primary)] transition-colors">Tenders</a>
              </div>
              <div className="flex items-center gap-3">
                {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map(icon => (
                  <a key={icon} href="#" className="hover:text-[var(--brand-primary)] transition-colors">
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 1: College Identity Banner */}
        <div className="bg-white py-6 lg:py-10 border-b border-gray-50">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
            <Link href="/" className="block">
              <Image
                src={HEADER_BANNER_SRC}
                alt="Theem College of Pharmacy"
                width={800}
                height={160}
                className="h-16 lg:h-28 w-auto object-contain"
                priority
              />
            </Link>
          </div>
        </div>

        {/* Sticky Container for Nav and Announcements */}
        <div className={`sticky top-0 z-[70] transition-all duration-300 ${isScrolled ? 'shadow-2xl' : ''}`}>
          {/* Row 2: Navigation Bar */}
          <div className="bg-[var(--brand-primary)] hidden lg:block border-b border-white/5 relative z-50">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center relative z-10">
              <nav className="flex items-center">
                <div className="flex items-center space-x-1">
                  {navItems.map((item) => (
                    <div key={`${item.href}-${item.label}`} className="relative group">
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 text-sm text-center font-semibold tracking-normal text-white/80 hover:text-white transition-all hover:bg-white/5 rounded-t-2xl relative ${isRouteActive(pathname, item.href, item.children) ? 'text-white bg-white/10' : ''}`}
                      >
                        {item.label}
                        {isRouteActive(pathname, item.href, item.children) && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[var(--brand-accent)] rounded-t-md"></span>
                        )}
                      </Link>

                      {item.children?.length > 0 && (
                        <div className="absolute top-full left-0 min-w-[260px] rounded-b-2xl rounded-tr-2xl bg-white shadow-2xl py-3 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-[70] border border-gray-100">
                          {renderDesktopDropdownItems(item.children, item.label)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="w-px h-8 bg-white/20 mx-8"></div>
                <Link
                  href="/admissions"
                  className="bg-white text-[var(--brand-primary)] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[var(--brand-accent)] hover:text-white transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Apply Now
                </Link>
              </nav>
            </div>
          </div>

          {/* Row 3: Announcement Bar & Mobile Menu Control */}
          <div className="bg-[var(--brand-secondary)] py-2.5 overflow-hidden border-b border-white/5 shadow-md relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)] to-transparent opacity-50"></div>
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between lg:justify-start relative z-10">
              <div className="flex items-center flex-1">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mr-6 shrink-0 border border-white/10 shadow-inner">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse"></span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/90">Live Feed</span>
                </div>
                <div className="announcement-marquee flex-1">
                  <div className="announcement-track text-white/80 text-xs font-semibold tracking-wide">
                    <span>{announcementText}</span>
                    <span aria-hidden="true" className="ml-[100%]">{announcementText}</span>
                  </div>
                </div>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden ml-4 p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Toggle Navigation"
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
              </button>
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
            {renderMobileItems(navItems)}
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

