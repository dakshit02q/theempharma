'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from '@/components/Carousel';
import EnquiryModal from '@/components/EnquiryModal';
import NewsSlider from '@/components/NewsSlider';

function parseSection(sections, key, fallback) {
    if (!sections || !Array.isArray(sections)) return fallback;
    const section = sections.find(s => s.sectionKey === key);
    if (!section || !section.content) return fallback;
    try {
        return JSON.parse(section.content);
    } catch (e) {
        return fallback;
    }
}

export default function HomePage({ homeData }) {
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
    const sections = homeData?.sections || [];

    const defaultHeroSlides = [
        {
            src: "/images/wonderlane-6zlgM-GUd6I-unsplash.jpg",
            alt: "Theem Institutional Hub",
            label: "Admission Protocol 2024-25",
            heading: "Orchestrating <br/><span class=\"text-[var(--brand-accent)]\">Pharmacy</span> <br/> Excellence.",
            description: "Empowering the next generation of pharmaceutical scientists through advanced research paradigms, ethical governance, and industrial synergy.",
            primaryCtaText: "Enroll Now",
            primaryCtaLink: "/admissions",
            secondaryCtaText: "Institutional Profile",
            secondaryCtaLink: "/about"
        },
        {
            src: "/images/camilo-botia-k4vFDPJoDZk-unsplash.jpg",
            alt: "Institutional Laboratory",
            label: "Advanced Learning",
            heading: "State of the Art <br/><span class=\"text-[var(--brand-accent)]\">Laboratories</span>",
            description: "Equipped with the latest technology to foster critical thinking and practical skills in pharmaceutical sciences.",
            primaryCtaText: "Explore Facilities",
            primaryCtaLink: "/facilities",
            secondaryCtaText: "Academic Programs",
            secondaryCtaLink: "/academics"
        },
        {
            src: "/images/roberto-sorin-RS0-h_pyByk-unsplash.jpg",
            alt: "Advanced Learning Ecosystem",
            label: "Research Ecosystem",
            heading: "Pioneering <br/><span class=\"text-[var(--brand-accent)]\">Discoveries</span>",
            description: "A collaborative ecosystem where research, discipline, and industrial innovation converge to define the pharmaceutical elite.",
            primaryCtaText: "Our Research",
            primaryCtaLink: "/research",
            secondaryCtaText: "Contact Us",
            secondaryCtaLink: "/contact"
        }
    ];

    const hero = parseSection(sections, 'hero', { slides: defaultHeroSlides });
    const heroSlides = Array.isArray(hero?.slides) && hero.slides.length > 0 ? hero.slides : defaultHeroSlides;

    const metrics = parseSection(sections, 'metrics', {
        items: [
            { label: 'Scholastic Seats', value: '120+', icon: 'fa-user-graduate', color: 'primary' },
            { label: 'Advanced Programs', value: '02', icon: 'fa-microscope', color: 'teal' },
            { label: 'Placement Target', value: '100%', icon: 'fa-briefcase', color: 'accent' },
            { label: 'Founded Epoch', value: '2024', icon: 'fa-university', color: 'primary' }
        ]
    });

    const programs = parseSection(sections, 'programs', {
        heading: 'Professional Programs',
        subheading: 'Academic Architecture',
        items: [
            {
                title: 'Bachelor of Pharmacy (B.Pharm)',
                duration: '04 Years Degree Protocol',
                description: 'A comprehensive undergraduate paradigm architected for pharmaceutical mastery and advanced clinical research integration.',
                icon: 'fa-user-md',
                seats: '60 Annual Seats',
                link: '/academics/b-pharmacy'
            },
            {
                title: 'Diploma in Pharmacy (D.Pharm)',
                duration: '02 Years Applied Diploma',
                description: 'An intensive technical protocol designed to engineer practical proficiency in pharmaceutical logistics and community healthcare.',
                icon: 'fa-pills',
                seats: '60 Annual Seats',
                link: '/academics/d-pharmacy'
            }
        ]
    });

    const synergy = parseSection(sections, 'synergy', {
        heading1: 'Architecting the Future of Science.',
        desc1: 'Theem College of Pharmacy is not merely an educational entity; it is a collaborative ecosystem where research, discipline, and industrial innovation converge to define the pharmaceutical elite.',
        image1: '/images/camilo-botia-k4vFDPJoDZk-unsplash.jpg',
        heading2: 'Sophisticated Learning Hubs.',
        desc2: 'Our infrastructure is architected to foster critical thinking, with state-of-the-art diagnostic labs, digital repositories, and clinical simulation zones.',
        image2: '/images/national-cancer-institute-L7en7Lb-Ovc-unsplash.jpg'
    });

    const cta = parseSection(sections, 'cta', {
        heading: 'Begin Your Professional <br /> Orchestration.',
        description: 'Synchronize your career with the highest standards of pharmaceutical excellence. Institutional intake for the 2024-25 cycle is now active.'
    });

    const defaultNewsItems = [
        {
            title: "National Pharmacy Week Celebration",
            category: "Event",
            date: "Oct 15, 2024",
            excerpt: "Join us in celebrating the vital role of pharmacists in healthcare with a week-long series of seminars, health camps, and student competitions.",
            link: "/events/pharmacy-week",
            image: ""
        },
        {
            title: "Research Grant Awarded to Pharmacology Dept",
            category: "News",
            date: "Sep 28, 2024",
            excerpt: "Theem College of Pharmacy receives a prestigious grant for advanced research in targeted drug delivery systems.",
            link: "/news/research-grant",
            image: ""
        },
        {
            title: "Industrial Visit to Sun Pharma Facilities",
            category: "Academic",
            date: "Sep 10, 2024",
            excerpt: "Final year B.Pharm students will be visiting the state-of-the-art manufacturing facilities to bridge the gap between theoretical knowledge and industrial practices.",
            link: "/events/industrial-visit",
            image: ""
        },
        {
            title: "Guest Lecture: AI in Drug Discovery",
            category: "Seminar",
            date: "Aug 22, 2024",
            excerpt: "Renowned scientist Dr. Sharma will conduct an interactive session on how Artificial Intelligence is revolutionizing modern pharmaceutical research.",
            link: "/events/guest-lecture",
            image: ""
        }
    ];

    const newsData = parseSection(sections, 'news', {
        heading: "Latest Bulletins",
        subheading: "Institutional News & Events",
        items: defaultNewsItems
    });

    return (
        <main className="bg-[#f8fafc] overflow-hidden relative">
            {/* Persistent Enquiry Sidebar */}
            <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100]">
                <button onClick={() => setIsEnquiryModalOpen(true)} className="bg-[var(--brand-accent)] text-white px-2 py-8 rounded-l-3xl shadow-2xl flex flex-col items-center gap-4 group hover:pl-6 transition-all duration-500">
                    <i className="fas fa-paper-plane text-xs group-hover:rotate-12 transition-transform"></i>
                    <span className="[writing-mode:vertical-lr] font-black uppercase tracking-[0.4em] text-[9px]">Enquire</span>
                </button>
            </div>

            <EnquiryModal isOpen={isEnquiryModalOpen} onClose={() => setIsEnquiryModalOpen(false)} />

            {/* High-Impact Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-center pt-20">
                {/* Full-width Carousel Background */}
                <div className="absolute inset-0 z-0">
                    <Carousel
                        slides={heroSlides}
                        autoPlayInterval={6000}
                        className="w-full h-full"
                        renderContent={(slide) => (
                            <>
                                {/* Dark Overlay for Text Readability - crossfades with slide */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-0 pointer-events-none"></div>
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full relative z-20 flex flex-col justify-center">
                                    <div className="max-w-3xl space-y-10 text-center lg:text-left py-20">
                                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-white/20">
                                            <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-pulse"></span>
                                            <span className="text-sm font-bold uppercase tracking-wider text-white">{slide.label}</span>
                                        </div>

                                        <h1
                                            className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter"
                                            dangerouslySetInnerHTML={{ __html: slide.heading }}
                                        />

                                        <p className="text-xl text-white/80 font-medium leading-relaxed max-w-xl">
                                            {slide.description}
                                        </p>

                                        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                                            <Link href={slide.primaryCtaLink} className="bg-[var(--brand-accent)] text-white px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-2xl hover:scale-105 transition-all">
                                                {slide.primaryCtaText} <i className="fas fa-arrow-right ml-2"></i>
                                            </Link>
                                            <Link href={slide.secondaryCtaLink} className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-wider hover:bg-white/20 transition-all">
                                                {slide.secondaryCtaText}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    />
                </div>
            </section>

            {/* Institutional Metrics */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {metrics.items.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="w-20 h-20 bg-white rounded-3xl shadow-lg border border-gray-100 flex items-center justify-center mb-8 group-hover:-translate-y-3 transition-all duration-500">
                                    <i className={`fas ${stat.icon} text-2xl text-[var(--brand-primary)]`}></i>
                                </div>
                                <div className="text-5xl font-black text-[var(--brand-primary)] mb-3 tracking-tighter">{stat.value}</div>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Directory: Quick Navigation */}
            <section className="py-20 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: 'Academic Sync', icon: 'fa-calendar-alt', path: '/academics' },
                            { label: 'Scholastic Hub', icon: 'fa-book-reader', path: '/students/syllabus' },
                            { label: 'Exam Protocols', icon: 'fa-file-signature', path: '/institute-cells/exam-cell' },
                            { label: 'Digital Assets', icon: 'fa-laptop-medical', path: '/students/resources' },
                            { label: 'Alumni Network', icon: 'fa-users-cog', path: '/alumni' },
                            { label: 'Contact Us', icon: 'fa-phone', path: '/contact' },
                        ].map((link, i) => (
                            <Link key={i} href={link.path} className="flex flex-col items-center p-8 rounded-[2.5rem] border border-gray-50 hover:border-[var(--brand-primary)] hover:bg-gray-50/50 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-gray-50 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all">
                                    <i className={`fas ${link.icon} text-lg`}></i>
                                </div>
                                <span className="text-sm font-bold uppercase tracking-wider text-center text-gray-500 group-hover:text-[var(--brand-primary)] transition-colors">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Academic Paradigms Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                            <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">{programs.subheading}</span>
                        </div>
                        <h2 className="text-5xl lg:text-6xl font-black text-[var(--brand-primary)] tracking-tight">{programs.heading}</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16">
                        {programs.items.map((program, i) => (
                            <div key={i} className="group bg-white rounded-[4rem] p-12 lg:p-16 shadow-2xl shadow-gray-200/50 hover:shadow-blue-900/10 transition-all duration-700 border border-gray-50 relative overflow-hidden flex flex-col">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--brand-primary-soft)] rounded-bl-[6rem] -mr-16 -mt-16 opacity-30 group-hover:opacity-100 transition-opacity"></div>

                                <div className="w-20 h-20 rounded-3xl bg-[var(--brand-primary-soft)] flex items-center justify-center mb-10 text-[var(--brand-primary)] shadow-sm">
                                    <i className={`fas ${program.icon} text-3xl`}></i>
                                </div>

                                <div className="space-y-6 mb-12 flex-1">
                                    <div className="inline-block px-4 py-1.5 rounded-xl bg-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">{program.duration}</div>
                                    <h3 className="text-4xl font-black text-[var(--brand-primary)] leading-[1.1] tracking-tight">{program.title}</h3>
                                    <p className="text-gray-500 font-medium text-lg leading-relaxed">{program.description}</p>

                                    <div className="flex items-center gap-6 pt-6">
                                        <div className="flex items-center gap-2 text-[var(--bcp-teal)] font-black text-[10px] uppercase tracking-widest">
                                            <i className="fas fa-check-circle"></i> PCI Endorsed
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                                        <div className="flex items-center gap-2 text-[var(--brand-accent)] font-black text-[10px] uppercase tracking-widest">
                                            <i className="fas fa-users"></i> {program.seats}
                                        </div>
                                    </div>
                                </div>

                                <Link href={program.link} className="mt-auto inline-flex items-center justify-between w-full p-8 bg-gray-50 rounded-[2.5rem] group/btn hover:bg-[var(--brand-primary)] transition-all duration-500">
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)] group-hover/btn:text-white transition-colors">Learn More</span>
                                    <i className="fas fa-chevron-right text-xs text-[var(--brand-primary)] group-hover/btn:text-white group-hover/btn:translate-x-2 transition-all"></i>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* News and Events Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 mb-16 md:flex justify-between items-end">
                    <div>
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                            <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">{newsData.subheading}</span>
                        </div>
                        <h2 className="text-5xl font-black text-[var(--brand-primary)] tracking-tight">{newsData.heading}</h2>
                    </div>
                    <Link href="/news" className="hidden md:inline-flex items-center text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-[var(--brand-accent)] transition-colors">
                        View All Archives <i className="fas fa-arrow-right ml-2"></i>
                    </Link>
                </div>
                <NewsSlider items={newsData.items} />
            </section>

            {/* Institutional Synergy: About & Facilities */}
            <section className="py-32 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
                        <div className="space-y-10">
                            <div>
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Institutional Identity</span>
                                </div>
                                <h2 className="text-5xl lg:text-6xl font-black text-[var(--brand-primary)] tracking-tight leading-[0.95]">{synergy.heading1}</h2>
                            </div>
                            <p className="text-xl text-gray-500 font-medium leading-relaxed">
                                {synergy.desc1}
                            </p>
                            <Link href="/about" className="inline-flex items-center gap-4 px-10 py-5 bg-[var(--brand-primary)] text-white rounded-2xl text-sm font-bold uppercase tracking-wider hover:translate-x-2 transition-all">
                                Discover Institutional Core <i className="fas fa-long-arrow-alt-right"></i>
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="rounded-[4rem] overflow-hidden shadow-3xl border-[12px] border-white">
                                <Image src="/images/camilo-botia-k4vFDPJoDZk-unsplash.jpg" alt="Institutional Laboratory" width={800} height={600} className="w-full h-[500px] object-cover" />
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--brand-accent)] rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
                                <span className="text-white font-black text-center text-[10px] uppercase tracking-widest leading-tight">Elite <br /> Accreditation</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="rounded-[4rem] overflow-hidden shadow-3xl border-[12px] border-white">
                                <Image src="/images/roberto-sorin-RS0-h_pyByk-unsplash.jpg" alt="Advanced Learning Ecosystem" width={800} height={600} className="w-full h-[500px] object-cover" />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-10">
                            <div>
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Ecosystem Integrity</span>
                                </div>
                                <h2 className="text-5xl lg:text-6xl font-black text-[var(--brand-primary)] tracking-tight leading-[0.95]">{synergy.heading2}</h2>
                            </div>
                            <p className="text-xl text-gray-500 font-medium leading-relaxed">
                                {synergy.desc2}
                            </p>
                            <Link href="/facilities" className="inline-flex items-center gap-4 px-10 py-5 border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] rounded-2xl text-sm font-bold uppercase tracking-wider hover:bg-[var(--brand-primary)] hover:text-white transition-all">
                                Explore Infrastructure <i className="fas fa-microscope"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Institutional Call to Action */}
            <section className="py-32 relative">
                <div className="max-w-5xl mx-auto px-4 relative z-10">
                    <div className="bg-[var(--brand-primary)] rounded-[5rem] overflow-hidden p-16 lg:p-24 text-center text-white shadow-3xl relative">
                        <div className="relative z-10">
                            <h2
                                className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-tight"
                                dangerouslySetInnerHTML={{ __html: cta.heading }}
                            />
                            <p className="text-white/60 text-xl font-medium mb-12 max-w-2xl mx-auto">
                                {cta.description}
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link href="/admissions" className="bg-[var(--brand-accent)] text-white px-12 py-6 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-xl hover:scale-105 transition-all">
                                    Secure Admission <i className="fas fa-signature ml-2"></i>
                                </Link>
                                <Link href="/contact" className="bg-white/10 text-white border border-white/20 px-12 py-6 rounded-2xl text-sm font-bold uppercase tracking-wider hover:bg-white/20 transition-all">
                                    Contact Registry
                                </Link>
                            </div>
                        </div>
                        {/* Abstract Background for CTA */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                    </div>
                </div>
                {/* Visual Depth Background */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white skew-y-3 origin-bottom-left -z-0"></div>
            </section>
        </main>
    );
}
