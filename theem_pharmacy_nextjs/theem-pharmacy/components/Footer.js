'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Footer = () => {
    const pathname = usePathname()
    const currentYear = new Date().getFullYear()

    if (pathname?.startsWith('/admin')) {
        return null
    }

    return (
        <footer className="bg-[var(--brand-primary)] text-white relative">
            <div className="h-1 bg-[var(--brand-accent)] w-full"></div>

            <div className="relative pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Institutional Identity */}
                        <div className="space-y-6">
                            <div className="bg-white p-2 rounded-xl inline-block shadow-lg">
                                <Image
                                    src="/THEEM COLLEGE OF PHARMACY AND RESEARCH header footer 30x7 cm-02.png"
                                    alt="Theem College"
                                    width={220}
                                    height={50}
                                    className="h-10 w-auto object-contain"
                                />
                            </div>
                            <p className="text-white/70 text-xs leading-relaxed font-medium">
                                Committed to excellence in pharmaceutical education, research, and healthcare innovation since inception. Empowering future pharmacists.
                            </p>
                            <div className="flex space-x-3">
                                {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[var(--brand-accent)] hover:text-[var(--brand-primary)] transition-all duration-300 border border-white/5"
                                    >
                                        <i className={`fab fa-${icon} text-sm`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Navigation */}
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-[var(--brand-accent)]">Quick Links</h3>
                            <ul className="space-y-4 text-xs font-bold">
                                {[
                                    { label: 'About Institution', href: '/about' },
                                    { label: 'Academic Programs', href: '/academics' },
                                    { label: 'Admission Portal', href: '/admissions' },
                                    { label: 'Career Placements', href: '/placement' },
                                    { label: 'Library & Resources', href: '/students/library' }
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link href={link.href} className="text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Regulatory & Committees */}
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-[var(--brand-accent)]">Approvals</h3>
                            <ul className="space-y-4 text-xs font-bold">
                                {[
                                    { label: 'PCI Approvals', href: '/approvals' },
                                    { label: 'Anti-Ragging Cell', href: '/institute-cells/anti-ragging-committee' },
                                    { label: 'Student Grievance', href: '/institute-cells/student-grievance-cell' },
                                    { label: 'SC/ST Cell', href: '/institute-cells/sc-st-cell' },
                                    { label: 'Exam Portal', href: '/institute-cells/exam-cell' }
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link href={link.href} className="text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Details */}
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-[var(--brand-accent)]">Connect</h3>
                            <div className="space-y-6 text-xs font-bold">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                        <i className="fas fa-map-marker-alt text-[var(--brand-accent)]"></i>
                                    </div>
                                    <p className="text-white/60 leading-relaxed">
                                        Village Betegaon, Chilhar Road, Boisar (E), Tal. Palghar, Dist. Palghar - 401 501.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                        <i className="fas fa-phone-alt text-[var(--brand-accent)]"></i>
                                    </div>
                                    <p className="text-white/60">+91 1111111111</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                        <i className="fas fa-envelope text-[var(--brand-accent)]"></i>
                                    </div>
                                    <p className="text-white/60">info@theempharmacy.edu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-Footer */}
            <div className="bg-black/20 py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                            &copy; {currentYear} THEEM COLLEGE OF PHARMACY. All Rights Reserved.
                        </div>
                        <div className="flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
                            <Link href="/privacy-policy" className="text-white/40 hover:text-white transition-colors">Privacy</Link>
                            <Link href="/terms-of-use" className="text-white/40 hover:text-white transition-colors">Terms</Link>
                            <Link href="/sitemap" className="text-white/40 hover:text-white transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer