'use client';

import { useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';
import SectionCard from '@/components/SectionCard';
import CommitteeSection from '@/components/CommitteeSection';

export default function AboutPage({ initialContent = [], initialCommittee = [] }) {
    const [content, setContent] = useState(initialContent);
    const [committee, setCommittee] = useState(initialCommittee);
    const [isSyncing, setIsSyncing] = useState(false);

    // Sync state when props change (on navigation)
    useEffect(() => {
        setContent(initialContent);
        setCommittee(initialCommittee);

        // Safety check: If navigated and found empty, try a quick client-side fetch
        if (initialContent.length === 0 && initialCommittee.length === 0) {
            const fetchSafetyData = async () => {
                setIsSyncing(true);
                try {
                    const [cRes, mRes] = await Promise.all([
                        fetch('/api/content/about', { cache: 'no-store' }),
                        fetch('/api/committee', { cache: 'no-store' })
                    ]);
                    const cData = await cRes.json();
                    const mData = await mRes.json();
                    if (cData.success) setContent(cData.data);
                    if (mData.success) setCommittee(mData.data);
                } catch (err) {
                    console.error("Safety sync failed:", err);
                } finally {
                    setIsSyncing(false);
                }
            };
            fetchSafetyData();
        }
    }, [initialContent, initialCommittee]);

    if (content.length === 0 && committee.length === 0 && !isSyncing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfdfe]">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">No content available at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-[#f8fafc] min-h-screen pb-20 relative overflow-hidden">
            <PageHero
                title="About Our Institute"
                subtitle="Dedicated to fostering excellence in pharmaceutical education, research, and professional ethics since inception."
            />

            <div className="w-full relative z-20">
                <div className="flex flex-col">
                    {/* Dynamic Sections */}
                    {content.map((section, index) => (
                        <div
                            key={section.id || index}
                            className="reveal-on-scroll"
                        >
                            <SectionCard
                                id={section.sectionKey}
                                title={section.title}
                                content={section.content}
                                document={section.document}
                                icon={section.icon || 'fas fa-info-circle'}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Leadership Section */}
            <div className="mt-12">
                <CommitteeSection members={committee} />
            </div>

            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--brand-primary-soft)] skew-x-[-12deg] translate-x-32 z-0 opacity-30"></div>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23223975' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>
        </main>
    );
}
