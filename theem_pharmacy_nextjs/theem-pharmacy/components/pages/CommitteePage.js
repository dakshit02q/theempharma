'use client';

import Image from 'next/image';
import PageHero from '@/components/PageHero';

export default function CommitteePage({ committeeMembers }) {
    return (
        <main className="bg-[#f8fafc] min-h-screen pb-24">
            <PageHero 
                title="Committee & Governance" 
                subtitle="The structural integrity of our institution is maintained by a distinguished panel of pharmaceutical leaders and academic visionaries."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px] relative z-30">
                {/* Governance Architecture Overview */}
                <section className="mb-32">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Institutional Leadership', desc: 'Strategic direction and governance oversight', icon: 'fa-user-tie', color: 'primary' },
                            { title: 'Academic Excellence', desc: 'Curriculum development and quality assurance', icon: 'fa-graduation-cap', color: 'teal' },
                            { title: 'Research Innovation', desc: 'Promoting institutional research culture', icon: 'fa-flask', color: 'accent' },
                            { title: 'Industry Relations', desc: 'Strategic industrial partnership orchestration', icon: 'fa-handshake', color: 'primary' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 text-center group hover:scale-105 transition-all">
                                <div className="w-16 h-16 rounded-2xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] mx-auto mb-6 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all">
                                    <i className={`fas ${item.icon} text-2xl`}></i>
                                </div>
                                <h3 className="text-xl font-black text-[var(--brand-primary)] tracking-tight mb-4">{item.title}</h3>
                                <p className="text-gray-500 text-xs font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Distinguished Committee Members */}
                <section className="mb-32">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Executive Board</span>
                                </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-[var(--brand-primary)] tracking-tight">Governance Council</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {committeeMembers.map((member) => (
                            <div key={member.id} className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 group">
                                <div className="flex flex-col md:flex-row gap-10">
                                    <div className="flex-shrink-0">
                                        <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-[var(--brand-primary-soft)] relative">
                                            <Image
                                                src={member.image || '/images/placeholder-avatar.jpg'}
                                                alt={member.name}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                        <div className="mt-6 flex justify-center gap-4">
                                            <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[var(--brand-primary)] hover:text-white transition-all">
                                                <i className="fas fa-envelope"></i>
                                            </a>
                                            <a href={`tel:${member.phone}`} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[var(--brand-primary)] hover:text-white transition-all">
                                                <i className="fas fa-phone"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="mb-6">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-[var(--bcp-teal)] mb-1">Institutional Post</div>
                                            <h3 className="text-3xl font-black text-[var(--brand-primary)] tracking-tight group-hover:text-[var(--bcp-teal)] transition-colors">{member.name}</h3>
                                            <div className="text-[10px] font-black text-[var(--brand-accent)] uppercase tracking-widest mt-1">{member.position}</div>
                                        </div>
                                        
                                        <div className="text-gray-500 font-medium text-sm leading-relaxed mb-8 flex-1 italic">
                                            "{member.bio}"
                                        </div>

                                        <div className="pt-6 border-t border-gray-50 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[var(--bcp-teal)] animate-pulse"></div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Governing Member</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Admin Management Protocol */}
                <section>
                    <div className="bg-[var(--brand-primary)] rounded-[4rem] p-12 lg:p-24 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-[var(--brand-accent)] mx-auto mb-8">
                                <i className="fas fa-shield-alt text-2xl"></i>
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-black tracking-tighter mb-6">Governing Data Integrity</h3>
                            <p className="text-white/60 font-medium text-lg leading-relaxed mb-12">
                                All committee credentials and governance mandates are orchestrated through our secure administrative repository, ensuring absolute transparency in institutional leadership.
                            </p>
                            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 rounded-2xl border border-white/10 text-sm font-bold uppercase tracking-wider">
                                <i className="fas fa-check-circle text-[var(--brand-accent)]"></i> Synchronized with Institutional Registry
                            </div>
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
