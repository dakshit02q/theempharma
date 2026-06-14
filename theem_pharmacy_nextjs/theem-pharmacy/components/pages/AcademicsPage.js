'use client';

import PageHero from '@/components/PageHero';

export default function AcademicsPage({ academicCalendar }) {
    return (
        <main className="bg-[#f8fafc] min-h-screen pb-12">
            <PageHero 
                title="Academic Excellence" 
                subtitle="Nurturing scientific discipline through a rigorous academic calendar, industry-aligned curricula, and sophisticated pedagogical frameworks."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px] relative z-30">
                {/* Academic Calendar */}
                <section className="mb-14">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Institutional Schedule</span>
                                </div>
                            <h2 className="text-2xl lg:text-3xl font-black text-[var(--brand-primary)] tracking-tight">Academic Calendar 2024-25</h2>
                        </div>
                        <p className="text-gray-500 font-medium text-base max-w-xl mt-6 md:mt-0">
                            Stay synchronized with our critical academic milestones, examination protocols, and institutional observances.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                        {academicCalendar.map((event, i) => (
                            <div key={event.id} className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 group hover:border-[var(--bcp-teal)] transition-all duration-500">
                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-[var(--brand-primary-soft)] rounded-xl flex flex-col items-center justify-center border border-[var(--brand-primary)]/10">
                                            <span className="text-[10px] font-black text-[var(--brand-primary)] uppercase tracking-widest mb-1">
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                            </span>
                                            <span className="text-2xl font-black text-[var(--brand-primary)] tracking-tighter">
                                                {new Date(event.date).getDate()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-black text-[var(--brand-primary)] tracking-tight group-hover:text-[var(--bcp-teal)] transition-colors">{event.title}</h3>
                                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                                event.category === 'semester' ? 'bg-blue-50 text-blue-600' :
                                                event.category === 'exam' ? 'bg-red-50 text-red-600' :
                                                event.category === 'event' ? 'bg-green-50 text-green-600' :
                                                'bg-gray-50 text-gray-400'
                                            }`}>
                                                {event.category}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 font-medium text-sm leading-relaxed">{event.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Programs Overview */}
                <section className="mb-14">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Curriculum Framework</span>
                                </div>
                        <h2 className="text-2xl lg:text-3xl font-black text-[var(--brand-primary)] tracking-tight">Our Programs</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 group relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-[var(--brand-primary-soft)] rounded-xl flex items-center justify-center mb-6 text-[var(--brand-primary)]">
                                    <i className="fas fa-user-md text-xl"></i>
                                </div>
                                <h3 className="text-2xl font-black text-[var(--brand-primary)] tracking-tight mb-4">B.Pharmacy (4 Years)</h3>
                                <p className="text-gray-500 font-medium leading-relaxed mb-6">
                                    Comprehensive undergraduate program in pharmaceutical sciences with a strategic focus on drug discovery, formulation engineering, and global pharmaceutical care protocols.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        '60 Seat Annual Cohort',
                                        'Industrial-Linked Curriculum',
                                        'Global Research Synergy'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-[var(--bcp-teal)]">
                                            <i className="fas fa-check-circle"></i>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-primary-soft)] skew-x-[-20deg] translate-x-16 -translate-y-16 opacity-50"></div>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 group relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 text-green-600">
                                    <i className="fas fa-pills text-xl"></i>
                                </div>
                                <h3 className="text-2xl font-black text-[var(--brand-primary)] tracking-tight mb-4">D.Pharmacy (2 Years)</h3>
                                <p className="text-gray-500 font-medium leading-relaxed mb-6">
                                    Intensive diploma program architected for precision in practical pharmacy skills, pharmaceutical logistics, and community healthcare management.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        '60 Seat Annual Cohort',
                                        'Applied Clinical Protocols',
                                        'Institutional Internship Sync'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-[var(--bcp-teal)]">
                                            <i className="fas fa-check-circle"></i>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 skew-x-[-20deg] translate-x-16 -translate-y-16 opacity-50"></div>
                        </div>
                    </div>
                </section>

                {/* Admin Panel Notice */}
                <section>
                    <div className="bg-[var(--brand-primary)] rounded-2xl p-8 lg:p-14 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[var(--brand-accent)] mx-auto mb-6">
                                <i className="fas fa-network-wired text-xl"></i>
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-black tracking-tighter mb-4">Centralized Academic Sync</h3>
                            <p className="text-white/60 font-medium text-base leading-relaxed">
                                Our academic framework is synchronized in real-time via the institutional administration portal, ensuring absolute transparency and data integrity for scholars and faculty.
                            </p>
                        </div>
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
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
