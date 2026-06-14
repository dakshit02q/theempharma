'use client';

import PageHero from '@/components/PageHero';

const defaultStudentsData = {
    statistics: {
        totalStudents: 0,
        activeOrganizations: 0,
        eventsPerYear: 0,
        placementRate: 0,
    },
    organizations: [],
    achievements: [],
    events: [],
};

function formatEventDate(dateValue) {
    if (!dateValue) return 'Date to be announced';
    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) return String(dateValue);
    return parsedDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default function StudentsPage({ studentsData = defaultStudentsData, isFallback = false }) {
    const safeData = {
        statistics: {
            ...defaultStudentsData.statistics,
            ...(studentsData?.statistics || {}),
        },
        organizations: Array.isArray(studentsData?.organizations) ? studentsData.organizations : [],
        achievements: Array.isArray(studentsData?.achievements) ? studentsData.achievements : [],
        events: Array.isArray(studentsData?.events) ? studentsData.events : [],
    };

    return (
        <main className="bg-[#f8fafc] min-h-screen pb-12">
            <PageHero 
                title="Student Life & Excellence" 
                subtitle="Nurturing future pharmaceutical leaders through a vibrant campus ecosystem of innovation, leadership, and diverse extracurricular orchestration."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px] relative z-30">
                {/* Data Source Notice */}
                <div className={`mb-12 px-6 py-3 rounded-2xl border text-sm font-bold uppercase tracking-wider text-center ${isFallback ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
                    {isFallback ? 'Archive Mode: Synchronizing Live Repository...' : 'Live Protocol: Verified Institutional Data'}
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                    {[
                        { label: 'Enrolled Scholars', value: `${safeData.statistics.totalStudents || 0}+`, icon: 'fa-user-graduate', color: 'primary' },
                        { label: 'Active Organizations', value: safeData.statistics.activeOrganizations || 0, icon: 'fa-sitemap', color: 'teal' },
                        { label: 'Annual Events', value: safeData.statistics.eventsPerYear || 0, icon: 'fa-calendar-star', color: 'accent' },
                        { label: 'Placement Index', value: `${safeData.statistics.placementRate || 0}%`, icon: 'fa-briefcase', color: 'primary' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 text-center group">
                            <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] mx-auto mb-4 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all">
                                <i className={`fas ${stat.icon} text-sm`}></i>
                            </div>
                            <div className="text-2xl font-black text-[var(--brand-primary)] tracking-tight mb-1">{stat.value}</div>
                            <div className="text-sm font-bold uppercase tracking-wider text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Left Column: Organizations */}
                    <div className="lg:col-span-8 space-y-14">
                        <section>
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Student Governance</span>
                                </div>
                                <h2 className="text-2xl font-black text-[var(--brand-primary)] tracking-tight">Institutional Organizations</h2>
                            </div>
                            
                            {safeData.organizations.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {safeData.organizations.map((org) => (
                                        <div key={org.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                                            <h3 className="text-xl font-black text-[var(--brand-primary)] tracking-tight mb-3 group-hover:text-[var(--bcp-teal)] transition-colors">{org.name}</h3>
                                            <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">{org.description}</p>
                                            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                                <div className="text-sm font-bold uppercase tracking-wider text-[var(--bcp-teal)]">
                                                    {org.members || 0} Members
                                                </div>
                                                <div className="flex -space-x-3">
                                                    {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100"></div>)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 bg-white rounded-2xl border border-dashed border-gray-200 text-center">
                                    <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Organization data pending synchronization</p>
                                </div>
                            )}
                        </section>

                        {/* Recent Events List */}
                        <section>
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Campus Activities</span>
                                </div>
                                <h2 className="text-2xl font-black text-[var(--brand-primary)] tracking-tight">Recent Orchestrations</h2>
                            </div>

                            <div className="space-y-6">
                                {safeData.events.map((event) => (
                                    <div key={event.id} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${event.type === 'academic' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                                    {event.type || 'General'}
                                                </span>
                                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{formatEventDate(event.date)}</span>
                                            </div>
                                            <h3 className="text-xl font-black text-[var(--brand-primary)] tracking-tight">{event.title}</h3>
                                        </div>
                                        <button className="px-6 py-3 rounded-xl bg-gray-50 text-sm font-bold uppercase tracking-wider text-gray-500 hover:bg-[var(--brand-primary)] hover:text-white transition-all">
                                            Event Details
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Achievements */}
                    <div className="lg:col-span-4">
                        <section className="sticky top-32">
                            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
                                <div className="mb-8">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Wall of Fame</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-[var(--brand-primary)] tracking-tight">Student Laurels</h2>
                                </div>

                                <div className="space-y-6">
                                    {safeData.achievements.length > 0 ? safeData.achievements.map((achievement) => (
                                        <div key={achievement.id} className="space-y-2 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black text-[var(--bcp-teal)] uppercase tracking-widest">{achievement.year}</span>
                                                <i className="fas fa-medal text-[var(--brand-accent)]"></i>
                                            </div>
                                            <h3 className="text-lg font-black text-[var(--brand-primary)] tracking-tight leading-tight">{achievement.title}</h3>
                                            <div className="text-xs font-bold text-gray-400">
                                                {(achievement.winner || achievement.student || 'Student Scholar')}
                                            </div>
                                            <p className="text-gray-500 text-xs font-medium leading-relaxed">{achievement.description}</p>
                                        </div>
                                    )) : (
                                        <p className="text-gray-400 font-medium italic text-sm">Honors archive updating...</p>
                                    )}
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="mt-8 bg-[var(--brand-primary)] rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden">
                                <h3 className="text-xl font-black mb-4 tracking-tight relative z-10">Join the Student Council</h3>
                                <p className="text-white/60 text-sm font-medium leading-relaxed mb-8 relative z-10">
                                    Shape the campus culture and build leadership equity by participating in student governance.
                                </p>
                                <button className="w-full py-4 rounded-2xl bg-[var(--brand-accent)] text-white text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform relative z-10">
                                    Apply for Leadership
                                </button>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-8 -translate-y-8 blur-2xl"></div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--brand-primary-soft)] skew-x-[-12deg] translate-x-32 z-0 opacity-30"></div>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23223975' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>
        </main>
    );
}