'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';

export default function GalleryShowcasePage({ title, subtitle, carouselItems, photoItems }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const safeCarousel = useMemo(() => Array.isArray(carouselItems) ? carouselItems : [], [carouselItems]);
    const safePhotos = useMemo(() => Array.isArray(photoItems) ? photoItems : [], [photoItems]);

    function goPrev() {
        if (safeCarousel.length === 0) return;
        setActiveIndex((prev) => (prev <= 0 ? safeCarousel.length - 1 : prev - 1));
    }

    function goNext() {
        if (safeCarousel.length === 0) return;
        setActiveIndex((prev) => (prev + 1) % safeCarousel.length);
    }

    const currentSlide = safeCarousel[activeIndex] || null;

    return (
        <main className="bg-[#f8fafc] min-h-screen pb-24">
            <PageHero title={title} subtitle={subtitle} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px] relative z-20">
                {/* Featured Carousel */}
                <section className="mb-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Highlights</span>
                                </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-[var(--brand-primary)] tracking-tight">Institutional Moments</h2>
                        </div>
                        {safeCarousel.length > 1 && (
                            <div className="flex gap-4 mt-8 md:mt-0">
                                <button
                                    onClick={goPrev}
                                    className="h-14 w-14 rounded-2xl bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white transition-all"
                                >
                                    <i className="fas fa-arrow-left"></i>
                                </button>
                                <button
                                    onClick={goNext}
                                    className="h-14 w-14 rounded-2xl bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white transition-all"
                                >
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        )}
                    </div>

                    {currentSlide ? (
                        <div className="relative group">
                            <article className="relative rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-gray-200/60 border-8 border-white aspect-[16/9] lg:aspect-[21/9]">
                                <Image
                                    src={currentSlide.image}
                                    alt={currentSlide.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)]/80 via-transparent to-transparent"></div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-12 lg:p-20 text-white">
                                    <div className="text-sm font-bold uppercase tracking-wider text-[var(--brand-accent)] mb-4">Featured Moment</div>
                                    <h3 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">{currentSlide.title}</h3>
                                    {currentSlide.caption && <p className="text-lg text-white/80 max-w-2xl font-medium leading-relaxed">{currentSlide.caption}</p>}
                                </div>
                            </article>
                            
                            {safeCarousel.length > 1 && (
                                <div className="flex justify-center mt-12 gap-3">
                                    {safeCarousel.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveIndex(index)}
                                            className={`h-1.5 rounded-full transition-all duration-700 ${index === activeIndex ? 'w-12 bg-[var(--brand-primary)]' : 'w-4 bg-gray-200 hover:bg-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-32 text-center bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/40">
                            <i className="fas fa-images text-6xl text-gray-100 mb-8 block"></i>
                            <h3 className="text-xl font-black text-gray-300 uppercase tracking-widest">Archival highlights coming soon</h3>
                        </div>
                    )}
                </section>

                {/* Photo Grid Section */}
                <section>
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Full Archive</span>
                                </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-[var(--brand-primary)] tracking-tight">Institutional Memory</h2>
                    </div>

                    {safePhotos.length === 0 ? (
                        <div className="p-32 text-center bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/40">
                            <i className="fas fa-camera text-6xl text-gray-100 mb-8 block"></i>
                            <h3 className="text-xl font-black text-gray-300 uppercase tracking-widest">Curating the visual history</h3>
                        </div>
                    ) : (
                        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                            {safePhotos.map((item, index) => (
                                <article key={item.id || index} className="group">
                                    <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl shadow-gray-200/50 border-4 border-white group-hover:translate-y-[-8px] transition-all duration-500">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-[var(--brand-primary)]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                                                <i className="fas fa-expand-alt text-xl"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 space-y-2">
                                        <div className="text-sm font-bold uppercase tracking-wider text-[var(--bcp-teal)]">Album Archive</div>
                                        <h3 className="text-2xl font-black text-[var(--brand-primary)] tracking-tight group-hover:text-[var(--bcp-teal)] transition-colors">{item.title}</h3>
                                        {item.caption && <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.caption}</p>}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--brand-primary-soft)] skew-x-[-12deg] translate-x-32 z-0 opacity-30"></div>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23223975' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>
        </main>
    );
}

