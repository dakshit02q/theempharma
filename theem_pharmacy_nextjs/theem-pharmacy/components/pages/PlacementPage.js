'use client';

import PageHero from '@/components/PageHero';
import Link from 'next/link';

export default function PlacementPage({ statistics }) {
    return (
        <main className="bg-[#f8fafc] min-h-screen pb-20">
            <PageHero 
                title="Career & Placement Cell" 
                subtitle={`Empowering students with industry-ready skills and facilitating premium career opportunities. Proudly maintaining a ${statistics.placementRate}% placement excellence.`}
            />

            {/* Statistics Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px] relative z-20">
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { label: 'Placement Rate', value: `${statistics.placementRate}%`, icon: 'fa-chart-line', color: 'teal' },
                        { label: 'Average Package', value: `₹${(statistics.averagePackage / 100000).toFixed(1)}L`, icon: 'fa-hand-holding-usd', color: 'blue' },
                        { label: 'Highest Package', value: `₹${(statistics.topPackage / 100000).toFixed(1)}L`, icon: 'fa-trophy', color: 'gold' },
                        { label: 'Recruiters', value: `${statistics.recruitingCompanies}+`, icon: 'fa-building', color: 'navy' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 text-center group hover:translate-y-[-5px] transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-6 text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors">
                                <i className={`fas ${stat.icon} text-lg`}></i>
                            </div>
                            <div className="text-4xl font-black text-[var(--brand-primary)] tracking-tight mb-2">{stat.value}</div>
                            <div className="text-sm font-bold uppercase tracking-wider text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Cell Overview */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Mission</span>
                                </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-[var(--brand-primary)] tracking-tight leading-tight">
                                Bridging Academy and Industry.
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                The Placement Cell at Theem College of Pharmacy acts as a strategic liaison, transforming academic potential into professional excellence. Our comprehensive ecosystem focuses on skill distillation and industry integration.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { title: 'Skill Distillation', desc: 'Refining technical and soft competencies.' },
                                { title: 'Industry Linkage', desc: 'Global recruitment network integration.' }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <h4 className="font-black text-[var(--brand-primary)] mb-2 uppercase text-xs tracking-widest">{item.title}</h4>
                                    <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-[var(--brand-primary-soft)] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <i className="fas fa-handshake text-[12rem] text-[var(--brand-primary)] opacity-10"></i>
                            </div>
                            {/* In a real app, an image of placement drive would go here */}
                        </div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--bcp-teal)] rounded-full blur-3xl opacity-20 z-0"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--brand-accent)] rounded-full blur-3xl opacity-20 z-0"></div>
                    </div>
                </div>
            </section>

            {/* Core Objectives - BCP Style Cards */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Objectives</span>
                                </div>
                        <h2 className="text-4xl font-black text-[var(--brand-primary)] tracking-tight">Strategic Mandate</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            { title: 'Placement Facilitation', desc: 'Organizing diverse recruitment drives and networking opportunities.', icon: 'fa-bullseye' },
                            { title: 'Career Counselling', desc: 'Personalized mentoring for professional trajectory alignment.', icon: 'fa-user-graduate' },
                            { title: 'Competency Building', desc: 'Intensive workshops for soft skills and technical mastery.', icon: 'fa-tools' },
                            { title: 'Industry Relations', desc: 'Sustaining high-level partnerships with global pharma leaders.', icon: 'fa-network-wired' },
                            { title: 'Alumni Integration', desc: 'Leveraging our network for mentorship and referrals.', icon: 'fa-users' },
                            { title: 'Research Connect', desc: 'Identifying research-oriented career pathways.', icon: 'fa-microscope' }
                        ].map((obj, i) => (
                            <div key={i} className="p-10 bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-50 group hover:border-[var(--bcp-teal)] transition-all">
                                <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] mb-6 group-hover:scale-110 transition-transform">
                                    <i className={`fas ${obj.icon} text-lg`}></i>
                                </div>
                                <h3 className="text-xl font-black text-[var(--brand-primary)] mb-4">{obj.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">{obj.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Background Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23223975' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </section>

            {/* Placement Protocol - BCP Style Timeline */}
            <section className="py-24 max-w-5xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Timeline</span>
                                </div>
                    <h2 className="text-4xl font-black text-[var(--brand-primary)] tracking-tight">Placement Lifecycle</h2>
                </div>
                
                <div className="relative">
                    <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-gray-100 hidden md:block"></div>
                    <div className="space-y-12">
                        {[
                            { step: '01', title: 'Counseling', desc: 'Initial career assessment and goal setting sessions.' },
                            { step: '02', title: 'Training', desc: 'Mock interviews, resume workshops, and technical refreshers.' },
                            { step: '03', title: 'Engagement', desc: 'Direct interaction with visiting corporate recruiters.' },
                            { step: '04', title: 'Deployment', desc: 'Offer management and professional transition support.' }
                        ].map((item, i) => (
                            <div key={i} className="relative flex flex-col md:flex-row items-center md:items-start gap-8 group">
                                <div className="w-24 h-24 rounded-[2rem] bg-white border-2 border-gray-100 shadow-xl flex items-center justify-center text-2xl font-black text-[var(--brand-primary)] group-hover:border-[var(--bcp-teal)] group-hover:text-[var(--bcp-teal)] transition-all z-10 flex-shrink-0">
                                    {item.step}
                                </div>
                                <div className="bg-white p-8 rounded-[2rem] shadow-lg shadow-gray-200/30 border border-gray-50 flex-grow group-hover:border-l-8 group-hover:border-l-[var(--bcp-teal)] transition-all">
                                    <h3 className="text-2xl font-black text-[var(--brand-primary)] mb-2">{item.title}</h3>
                                    <p className="text-gray-600 font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto bg-[var(--brand-primary)] rounded-[3rem] p-12 lg:p-20 text-center text-white shadow-2xl relative overflow-hidden">
                    <h2 className="text-4xl lg:text-5xl font-black mb-8 relative z-10">Launch Your Professional Journey.</h2>
                    <p className="text-white/70 text-lg font-medium mb-12 relative z-10 max-w-2xl mx-auto">
                        Connect with our Career Services team to explore global opportunities and refine your professional profile.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <Link href="/admissions" className="bg-[var(--brand-accent)] text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-wider text-sm hover:shadow-2xl transition-all">
                            Join the Program
                        </Link>
                        <Link href="/contact" className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-bold uppercase tracking-wider text-sm hover:bg-white/20 transition-all">
                            Contact Cell
                        </Link>
                    </div>
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-[-50%]"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl translate-x-[-50%] translate-y-1/2"></div>
                </div>
            </section>

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--brand-primary-soft)] skew-x-[-12deg] translate-x-32 z-0 opacity-30"></div>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23223975' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>
        </main>
    );
}
