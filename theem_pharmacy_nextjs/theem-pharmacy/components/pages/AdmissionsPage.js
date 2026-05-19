'use client';

import Link from 'next/link'
import PageHero from '@/components/PageHero'

export default function AdmissionsPage() {
    return (
        <main className="bg-[#f8fafc] min-h-screen pb-20">
            <PageHero 
                title="Admissions 2025" 
                subtitle="Join a community of aspiring pharmacists. Our streamlined admission process ensures a merit-based and transparent integration into academic life."
            />

            {/* Programs Overview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px] relative z-20">
                <div className="grid lg:grid-cols-2 gap-12">
                    {[
                        {
                            name: 'Bachelor of Pharmacy',
                            code: 'B.Pharm',
                            duration: '4 Years',
                            seats: '60 Seats',
                            color: 'var(--bcp-teal)',
                            highlights: ['60 seats available', 'Comprehensive 4-year program', 'Industry-aligned curriculum', 'Research opportunities'],
                            eligibility: ['12th pass with PCM/PCB', 'Min 50% aggregate (45% reserved)', 'Valid MHT-CET/NEET score']
                        },
                        {
                            name: 'Diploma in Pharmacy',
                            code: 'D.Pharm',
                            duration: '2 Years',
                            seats: '60 Seats',
                            color: 'var(--brand-accent)',
                            highlights: ['60 seats available', 'Intensive 2-year program', 'Practical-oriented training', 'Industry internships'],
                            eligibility: ['12th pass with PCM/PCB', 'Min 45% aggregate (40% reserved)', 'Merit-based admission']
                        }
                    ].map((program, i) => (
                        <article key={i} className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/60 border-t-8 overflow-hidden group hover:translate-y-[-8px] transition-all duration-500" style={{ borderTopColor: program.color }}>
                            <div className="p-8 lg:p-12">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="space-y-1">
                                        <div className="text-sm font-bold uppercase tracking-wider opacity-50">Program Overview</div>
                                        <h3 className="text-3xl lg:text-4xl font-black text-[var(--brand-primary)] tracking-tight">{program.name}</h3>
                                        <div className="text-[var(--bcp-teal)] font-black text-xs uppercase tracking-widest">{program.code} ({program.duration})</div>
                                    </div>
                                    <div className="w-16 h-16 rounded-2xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all">
                                        <i className={`fas ${i === 0 ? 'fa-user-md' : 'fa-pills'} text-2xl`}></i>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)] mb-4 flex items-center gap-2">
                                            <span className="w-4 h-4 rounded-full bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] text-[6px]"><i className="fas fa-star"></i></span>
                                            Program Highlights
                                        </h4>
                                        <ul className="grid sm:grid-cols-2 gap-3">
                                            {program.highlights.map((h, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                                    <i className="fas fa-check text-[var(--bcp-teal)] text-[10px]"></i>
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)] mb-4 flex items-center gap-2">
                                            <span className="w-4 h-4 rounded-full bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] text-[6px]"><i className="fas fa-info"></i></span>
                                            Eligibility Criteria
                                        </h4>
                                        <ul className="space-y-2">
                                            {program.eligibility.map((e, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                                                    <i className="fas fa-circle text-[var(--bcp-teal)] text-[6px] mt-2"></i>
                                                    {e}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-sm font-bold uppercase tracking-wider text-gray-400">{program.seats} Total</span>
                                <Link href="/contact" className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)] hover:text-[var(--bcp-teal)] flex items-center gap-2">
                                    Inquiry <i className="fas fa-chevron-right text-[8px]"></i>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Admission Process Timeline */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[var(--brand-primary)] rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
                    <div className="text-center mb-16 relative z-10">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Step-by-Step</span>
                                </div>
                        <h2 className="text-4xl font-black tracking-tight">Admission Protocol</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {[
                            { step: '01', title: 'Application', desc: 'Submit form with required academic transcripts.', icon: 'fa-file-alt' },
                            { step: '02', title: 'Entrance', desc: 'Appear for MHT-CET/NEET or merit evaluation.', icon: 'fa-pen-nib' },
                            { step: '03', title: 'Counselling', desc: 'Verification of documents and seat allocation.', icon: 'fa-users' },
                            { step: '04', title: 'Enrollment', desc: 'Finalize admission with fee payment protocols.', icon: 'fa-university' }
                        ].map((item, i) => (
                            <div key={i} className="space-y-4 text-center">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <i className={`fas ${item.icon} text-2xl`}></i>
                                </div>
                                <h3 className="text-xl font-black">{item.title}</h3>
                                <p className="text-white/60 text-sm font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                </div>
            </section>

            {/* Important Dates Calendar Style */}
            <section className="py-24 max-w-5xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Calendar</span>
                                </div>
                    <h2 className="text-4xl font-black text-[var(--brand-primary)] tracking-tight">Important Dates</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { date: 'April 2025', event: 'Application Start', icon: 'fa-calendar-plus', color: 'blue' },
                        { date: 'June 2025', event: 'Deadline', icon: 'fa-calendar-times', color: 'rose' },
                        { date: 'July 2025', event: 'Merit List', icon: 'fa-list-ol', color: 'teal' },
                        { date: 'July 2025', event: 'Verification', icon: 'fa-id-card', color: 'amber' },
                        { date: 'August 2025', event: 'Fee Payment', icon: 'fa-receipt', color: 'emerald' },
                        { date: 'August 2025', event: 'Classes Begin', icon: 'fa-book-reader', color: 'indigo' }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col items-center text-center group hover:border-[var(--bcp-teal)] transition-all">
                            <div className={`w-12 h-12 rounded-xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-4 transition-transform group-hover:rotate-12`}>
                                <i className={`fas ${item.icon} text-lg`}></i>
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{item.event}</h4>
                            <div className="text-xl font-black text-[var(--brand-primary)]">{item.date}</div>
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
