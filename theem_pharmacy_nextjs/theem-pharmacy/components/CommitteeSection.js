'use client';

import Image from 'next/image';

export default function CommitteeSection({ members }) {
    if (!members || members.length === 0) return null;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20 reveal-on-scroll">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Governance</span>
                                </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-[var(--brand-primary)] tracking-tight mb-4">Institutional Leadership</h2>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                        The visionary minds steering our institute towards global pharmaceutical excellence.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {members.map((member, index) => (
                        <article 
                            key={member.id || index}
                            className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center group hover:shadow-2xl hover:border-[var(--bcp-teal)] transition-all duration-500"
                        >
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-[var(--brand-primary-soft)] rounded-full scale-110 group-hover:scale-125 transition-transform duration-700 opacity-50"></div>
                                <div className="relative w-40 h-40 rounded-full p-2 bg-white shadow-lg overflow-hidden">
                                    <Image
                                        src={member.image || '/images/placeholder-avatar.jpg'}
                                        alt={member.name}
                                        fill
                                        className="rounded-full object-cover p-1 transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="absolute bottom-1 right-1 w-10 h-10 bg-[var(--bcp-teal)] rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white">
                                    <i className="fas fa-award text-xs"></i>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="text-[10px] font-black text-[var(--bcp-teal)] uppercase tracking-[0.25em]">
                                    {member.position}
                                </div>
                                <h3 className="text-2xl font-black text-[var(--brand-primary)] tracking-tight">
                                    {member.name}
                                </h3>
                                {member.bio && (
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium px-4">
                                        {member.bio}
                                    </p>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-50 w-full">
                                <button className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)] hover:text-[var(--bcp-teal)] transition-colors flex items-center gap-2 mx-auto">
                                    Full Profile <i className="fas fa-chevron-right text-[8px]"></i>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23223975' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        </section>
    );
}

