'use client';

import PageHero from '@/components/PageHero';

export default function AlumniPage({ statistics }) {
    const stats = [
        { label: 'Global Network', value: `${statistics.totalAlumni}+`, icon: 'fa-users', subtitle: 'Proud Alumni Base' },
        { label: 'Industry Leaders', value: statistics.industryLeaders, icon: 'fa-crown', subtitle: 'CXOs & Directors' },
        { label: 'Entrepreneurs', value: statistics.entrepreneurs, icon: 'fa-lightbulb', subtitle: 'Venture Founders' },
        { label: 'Higher Education', value: statistics.higherEducation, icon: 'fa-graduation-cap', subtitle: 'PhDs & Scientists' },
        { label: 'Global Positions', value: statistics.internationalPositions, icon: 'fa-globe', subtitle: 'Overseas Placements' },
        { label: 'Researchers', value: statistics.researchers, icon: 'fa-microscope', subtitle: 'Innovation Leads' },
    ];

    const services = [
        { title: 'Collaboration Portal', desc: 'Connect with fellow alumni through our exclusive platform for global research and industrial synergy.', icon: 'fa-network-wired' },
        { title: 'Strategic Careers', desc: 'Ongoing professional guidance, high-tier job referrals, and career development resources.', icon: 'fa-briefcase' },
        { title: 'Institutional Events', desc: 'Regular scientific symposia, networking mixers, and regional chapter meets.', icon: 'fa-calendar-alt' },
        { title: 'Legacy Mentorship', desc: 'Opportunities to architect the future of current students through industry-veteran guidance.', icon: 'fa-chalkboard-teacher' },
        { title: 'Continuous Growth', desc: 'Access to advanced certifications, global webinars, and industry whitepapers.', icon: 'fa-book' },
        { title: 'Institutional Giving', desc: 'Supporting the next generation through scholarships and state-of-the-art infrastructure.', icon: 'fa-heart' },
    ];

    return (
        <main className="bg-[#f8fafc] min-h-screen pb-24">
            <PageHero 
                title="Global Alumni Network" 
                subtitle={`A prestigious community of ${statistics.totalAlumni}+ pharmaceutical professionals architecting the future of global healthcare.`}
            />

            <div className="relative z-20 mt-[-60px] lg:mt-[-80px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
                    {stats.map((stat, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 group hover:border-[var(--bcp-teal)] transition-all duration-500"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all">
                                    <i className={`fas ${stat.icon} text-xl`}></i>
                                </div>
                                <div className="text-sm font-bold uppercase tracking-wider text-gray-300">0{index+1}</div>
                            </div>
                            <div className="text-4xl font-black text-[var(--brand-primary)] tracking-tight mb-2">{stat.value}</div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--bcp-teal)] mb-4">{stat.label}</h3>
                            <p className="text-gray-500 font-medium text-sm leading-relaxed">{stat.subtitle}</p>
                        </div>
                    ))}
                </div>

                {/* Services Section */}
                <section className="mb-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Institutional Support</span>
                                </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-[var(--brand-primary)] tracking-tight">Alumni Services</h2>
                        </div>
                        <p className="text-gray-500 font-medium text-lg max-w-xl mt-8 md:mt-0">
                            We provide a sophisticated ecosystem to ensure our graduates continue to lead and thrive in the global pharmaceutical landscape.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {services.map((service, index) => (
                            <div key={index} className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] mb-8">
                                    <i className={`fas ${service.icon} text-lg`}></i>
                                </div>
                                <h3 className="text-2xl font-black text-[var(--brand-primary)] tracking-tight mb-4">{service.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section>
                    <div className="bg-[var(--brand-primary)] rounded-[4rem] overflow-hidden relative p-12 lg:p-24 text-center text-white shadow-2xl">
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Stay Integrated</span>
                                </div>
                            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-none">Register with the Alma Mater</h2>
                            <p className="text-white/60 font-medium text-xl leading-relaxed mb-12">
                                Access the global directory, scientific collaboration protocols, and exclusive career leadership events.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <button className="px-10 py-5 bg-[var(--brand-accent)] text-white text-sm font-bold uppercase tracking-wider rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-[var(--brand-accent)]/20">
                                    Alumni Registration
                                </button>
                                <button className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white text-sm font-bold uppercase tracking-wider rounded-2xl hover:bg-white/10 transition-all">
                                    Network Directory
                                </button>
                            </div>
                        </div>
                        
                        {/* Background Decoration */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl"></div>
                    </div>
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
