import EventsInteractive from '@/components/EventsInteractive'
import PageHero from '@/components/PageHero'

// Server Component for Events Page
export default function EventsPage({ upcomingEvents, pastEvents, categories }) {
    return (
        <main className="bg-[#f8fafc] min-h-screen pb-12">
            <PageHero 
                title="Events & Activities" 
                subtitle="Stay updated with our sophisticated scientific conferences, industrial workshops, and vibrant campus activities that define our institutional excellence."
            />

            {/* Interactive Events Component - Client Rendered */}
            <div className="mt-[-60px] relative z-30">
                <EventsInteractive
                    upcomingEvents={upcomingEvents}
                    pastEvents={pastEvents}
                    categories={categories}
                />
            </div>

            {/* Event Calendar & Submission */}
            <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Calendar Card */}
                    <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-[var(--brand-primary-soft)] rounded-xl flex items-center justify-center text-[var(--brand-primary)] mb-6">
                            <i className="fas fa-calendar-alt text-xl"></i>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Institutional Schedule</span>
                                </div>
                        <h3 className="text-2xl font-black text-[var(--brand-primary)] tracking-tight mb-4">Interactive Calendar</h3>
                        <p className="text-gray-500 font-medium leading-relaxed mb-8 max-w-sm">
                            Access our centralized institutional calendar to view comprehensive schedules, set reminders, and synchronize with your personal planner.
                        </p>
                        <button className="w-full sm:w-auto px-8 py-3 bg-[var(--brand-primary)] text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-[var(--brand-accent)] transition-all">
                            Open Institutional Calendar <i className="fas fa-external-link-alt ml-2"></i>
                        </button>
                    </div>

                    {/* Submission Options */}
                    <div className="space-y-8">
                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all">
                                    <i className="fas fa-user-graduate"></i>
                                </div>
                                <h3 className="text-xl font-black text-[var(--brand-primary)] tracking-tight">Student Proposals</h3>
                            </div>
                            <p className="text-gray-500 font-medium leading-relaxed mb-6">
                                Student organizations and club leads can submit comprehensive event proposals for cultural, scientific, or social initiatives.
                            </p>
                            <button className="text-sm font-bold uppercase tracking-wider text-[var(--bcp-teal)] flex items-center gap-2 group-hover:gap-4 transition-all">
                                Submit Student Protocol <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>

                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all">
                                    <i className="fas fa-chalkboard-teacher"></i>
                                </div>
                                <h3 className="text-xl font-black text-[var(--brand-primary)] tracking-tight">Faculty Symposia</h3>
                            </div>
                            <p className="text-gray-500 font-medium leading-relaxed mb-6">
                                Faculty members and researchers can propose academic symposia, industrial workshops, and global conferences.
                            </p>
                            <button className="text-sm font-bold uppercase tracking-wider text-[var(--bcp-teal)] flex items-center gap-2 group-hover:gap-4 transition-all">
                                Propose Scientific Event <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admin Management Notice */}
            <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[var(--brand-primary)] rounded-2xl overflow-hidden relative p-8 lg:p-14 text-center text-white shadow-2xl">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[var(--brand-accent)] mx-auto mb-6">
                            <i className="fas fa-database text-xl"></i>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-black tracking-tighter mb-4">Real-time Institutional Management</h3>
                        <p className="text-white/60 font-medium text-base leading-relaxed mb-8">
                            All events are orchestrated via our integrated administrative ecosystem, ensuring synchronized updates across the institutional network and participant directories.
                        </p>
                        <div className="grid sm:grid-cols-3 gap-6">
                            {[
                                { title: 'Dynamic Orchestration', desc: 'Real-time protocol updates' },
                                { title: 'Registration Protocol', desc: 'Automated attendee tracking' },
                                { title: 'Institutional Sync', desc: 'Centralized calendar harmony' }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 text-left">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--brand-accent)] mb-2">{item.title}</h4>
                                    <p className="text-white/40 text-xs font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
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
