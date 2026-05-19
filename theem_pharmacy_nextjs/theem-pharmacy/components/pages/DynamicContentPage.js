'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import PageHero from '@/components/PageHero';
import SectionCard from '@/components/SectionCard';

export default function DynamicContentPage({ title, subtitle, sections: initialSections = [] }) {
    const [sections, setSections] = useState(initialSections);
    const [isSyncing, setIsSyncing] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setSections(initialSections);

        const fetchLatestData = async () => {
            setIsSyncing(true);
            try {
                const slug = pathname.replace(/^\/+/, '') || 'home';
                const res = await fetch(`/api/content/${slug}?t=${Date.now()}`, {
                    cache: 'no-store',
                    headers: { 'Pragma': 'no-cache' }
                });
                const result = await res.json();
                if (result.success && Array.isArray(result.data)) {
                    setSections(result.data);
                }
            } catch (err) {
                console.error('Dynamic content sync failed:', err);
            } finally {
                setIsSyncing(false);
            }
        };

        fetchLatestData();
    }, [pathname, initialSections]);

    return (
        <main className="bg-[#f8fafc] min-h-screen">
            <PageHero title={title} subtitle={subtitle} />

            <div className="relative z-20 mt-[-60px] lg:mt-[-80px]">
                {sections.length > 0 ? (
                    <div className="flex flex-col">
                        {sections.map((section, index) => (
                            <div
                                key={`${section.sectionKey || 'section'}-${section.id || index}`}
                                className="reveal-on-scroll"
                            >
                                <SectionCard
                                    id={section.id}
                                    title={section.title}
                                    content={section.content}
                                    document={section.document}
                                    icon={section.icon || 'fas fa-info-circle'}
                                    index={index}
                                />
                            </div>
                        ))}
                    </div>
                ) : isSyncing ? (
                    <div className="flex flex-col items-center justify-center py-20 lg:py-32 gap-6">
                        <div className="w-12 h-12 border-4 border-[var(--brand-primary-soft)] border-t-[var(--brand-primary)] rounded-full animate-spin" />
                        <p className="text-sm font-bold uppercase tracking-wider text-gray-400">Syncing Campus Insights…</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 border border-gray-100">
                            <i className="fas fa-file-signature text-3xl text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-black text-[var(--brand-primary)] mb-4">Academic Documentation in Progress</h3>
                        <p className="text-gray-500 font-medium max-w-md mx-auto">We are currently curating the official documentation and insights for this section. Please visit again shortly.</p>
                    </div>
                )}
            </div>

            {/* Institutional Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--brand-primary-soft)] skew-x-[-12deg] translate-x-32 z-0 opacity-30"></div>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23223975' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>
        </main>
    );
}


