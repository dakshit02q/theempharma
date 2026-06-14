'use client';

import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Image from 'next/image'

export default function CoursesPage({ courses }) {
    return (
        <main className="bg-[#f8fafc] min-h-screen pb-12">
            <PageHero 
                title="Academic Programs" 
                subtitle="Excellence in pharmaceutical education through diverse programs tailored for future industry leaders."
            />

            {/* Course Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px] relative z-20">
                <div className="grid lg:grid-cols-2 gap-8">
                    {courses.map((course, index) => (
                        <article 
                            key={course.id || index}
                            className="bg-white rounded-2xl shadow-2xl shadow-gray-200/60 border-t-8 border-[var(--bcp-teal)] overflow-hidden group hover:translate-y-[-8px] transition-all duration-500 flex flex-col"
                        >
                            {/* Course Header */}
                            <div className="p-6 lg:p-8 pb-0">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="space-y-1">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Program</span>
                                </div>
                                        <h2 className="text-3xl font-black text-[var(--brand-primary)] tracking-tight">{course.name}</h2>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all duration-500">
                                        <i className="fas fa-graduation-cap text-xl"></i>
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 leading-relaxed font-medium mb-8 text-base">
                                    {course.description}
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[var(--bcp-teal)] shadow-sm">
                                            <i className="fas fa-calendar-alt"></i>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Duration</p>
                                            <p className="font-bold text-[var(--brand-primary)]">{course.duration}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[var(--bcp-teal)] shadow-sm">
                                            <i className="fas fa-check-double"></i>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Eligibility</p>
                                            <p className="font-bold text-[var(--brand-primary)]">{course.eligibility}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Program Highlights */}
                            <div className="px-6 lg:px-8 pb-8 flex-grow">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)] mb-6 flex items-center gap-2">
                                    <span className="w-6 h-[1px] bg-[var(--brand-primary)]"></span>
                                    Key Program Insights
                                </h3>
                                <ul className="grid sm:grid-cols-2 gap-4">
                                    {(course.highlights || []).map((highlight, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-600 font-medium">
                                            <i className="fas fa-check-circle text-[var(--bcp-teal)] text-[10px]"></i>
                                            <span className="text-sm">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-6 lg:p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                <Link 
                                    href={`/courses/${course.name.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-')}`}
                                    className="text-xs font-black uppercase tracking-widest text-[var(--brand-primary)] hover:text-[var(--bcp-teal)] flex items-center gap-2 transition-colors"
                                >
                                    Course Details <i className="fas fa-arrow-right text-[8px]"></i>
                                </Link>
                                <Link 
                                    href="/admissions"
                                    className="py-3 px-6 bg-[var(--brand-primary)] text-white rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-[var(--brand-primary-dark)] shadow-lg shadow-blue-900/10 transition-all"
                                >
                                    Apply Now
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Professional Stats / Features */}
            <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[var(--brand-primary)] rounded-2xl p-8 lg:p-14 text-white relative overflow-hidden">
                    <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                        {[
                            { label: 'Excellence', title: 'Modern Facilities', desc: 'State-of-the-art laboratories and research equipment for practical mastery.', icon: 'fas fa-vial' },
                            { label: 'Growth', title: 'Global Placements', desc: 'Strong industry ties ensuring 90%+ placement rate in top pharma firms.', icon: 'fas fa-briefcase' },
                            { label: 'Innovation', title: 'Expert Faculty', desc: 'Learn from doctorates and researchers with decades of experience.', icon: 'fas fa-user-tie' }
                        ].map((feature, i) => (
                            <div key={i} className="space-y-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6">
                                    <i className={`${feature.icon} text-xl`}></i>
                                </div>
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">{feature.label}</span>
                                </div>
                                <h3 className="text-xl font-black">{feature.title}</h3>
                                <p className="text-white/70 font-medium leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                </div>
            </section>

            {/* Admission Timeline - BCP Style */}
            <section className="py-14 max-w-5xl mx-auto px-4">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Process</span>
                                </div>
                    <h2 className="text-2xl font-black text-[var(--brand-primary)] tracking-tight">Admission Cycle</h2>
                </div>
                
                <div className="space-y-4">
                    {[
                        { step: '01', title: 'Application Portal', desc: 'Securely submit your credentials through our centralized digital portal.' },
                        { step: '02', stepColor: 'bg-[var(--bcp-teal)]', title: 'Verification', desc: 'Official review of academic documentation and entrance examination scores.' },
                        { step: '03', title: 'Counselling', desc: 'Interactive session to align candidate goals with program objectives.' },
                        { step: '04', title: 'Enrollment', desc: 'Finalizing admission protocols and institutional integration.' }
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 shadow-xl shadow-gray-200/30 flex items-center gap-6 group hover:border-[var(--bcp-teal)] transition-all">
                            <div className={`w-12 h-12 rounded-xl ${item.stepColor || 'bg-[var(--brand-primary)]'} text-white flex items-center justify-center text-lg font-black shadow-lg group-hover:scale-110 transition-transform`}>
                                {item.step}
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-[var(--brand-primary)] mb-1">{item.title}</h3>
                                <p className="text-gray-500 font-medium">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--brand-primary-soft)] skew-x-[-12deg] translate-x-32 z-0 opacity-30"></div>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23223975' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>
        </main>
    )
}
