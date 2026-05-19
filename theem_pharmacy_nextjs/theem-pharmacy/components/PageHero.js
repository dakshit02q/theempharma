'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function PageHero({ title, subtitle, breadcrumbs = [], imageSrc = '/images/roberto-sorin-RS0-h_pyByk-unsplash.jpg' }) {
    const pathname = usePathname();

    const defaultBreadcrumbs = pathname
        .split('/')
        .filter(Boolean)
        .map((path, index, array) => {
            const href = `/${array.slice(0, index + 1).join('/')}`;
            const label = path
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            return { label, href };
        });

    const activeBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

    return (
        <section className="institutional-hero">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center h-full pt-32 pb-16 lg:pt-40 lg:pb-24">
                    {/* Hero Content */}
                    <div className="space-y-6">
                        <nav className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--bcp-teal)] mb-4" aria-label="Breadcrumb">
                            <Link href="/" className="hover:text-[var(--brand-primary)] transition-colors">Home</Link>
                            {activeBreadcrumbs.map((crumb, index) => (
                                <span key={crumb.href} className="flex items-center gap-2">
                                    <i className="fas fa-chevron-right text-[8px] opacity-50" />
                                    {index === activeBreadcrumbs.length - 1 ? (
                                        <span className="text-gray-400">{crumb.label}</span>
                                    ) : (
                                        <Link href={crumb.href} className="hover:text-[var(--brand-primary)] transition-colors">{crumb.label}</Link>
                                    )}
                                </span>
                            ))}
                        </nav>

                        <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--brand-primary)] rounded-full"></div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--brand-primary)] leading-[1.1] pl-8 tracking-tight">
                                {title}
                            </h1>
                        </div>

                        {subtitle && (
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl pl-8">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Hero Image - BCP Style */}
                    <div className="relative hidden lg:block">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white rotate-2 group">
                            <Image
                                src={imageSrc}
                                alt={title}
                                width={800}
                                height={600}
                                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-primary)]/20 to-transparent"></div>
                        </div>
                        {/* Decorative background shape */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--bcp-teal)] opacity-10 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[#f8fafc] -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--brand-primary-soft)] skew-x-[-12deg] translate-x-32 z-0 opacity-50"></div>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23223975' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>

            <style jsx>{`
                .institutional-hero {
                    position: relative;
                    width: 100%;
                    background-color: #f8fafc;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
}
