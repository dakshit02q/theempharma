'use client';

import PageHero from '@/components/PageHero';

export default function ResearchPage({ researchProjects = [], publications = [], facilities = [] }) {
    return (
        <main className="bg-[#f8fafc] min-h-screen pb-24">
            <PageHero 
                title="Research & Innovation" 
                subtitle="Advancing pharmaceutical sciences through cutting-edge discovery, intellectual property development, and high-impact industrial collaborations."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px] relative z-20">
                {/* Strategic Focus */}
                <section className="mb-32">
                    <div className="bg-[var(--brand-primary)] rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="h-10 w-1 bg-[var(--brand-accent)] rounded-full"></div>
                                <div>
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Strategic Framework</span>
                                </div>
                                    <h2 className="text-4xl lg:text-5xl font-black tracking-tighter">Core Scientific Focus Areas</h2>
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                                {[
                                    { title: 'Drug Discovery', icon: 'fa-pills', desc: 'Novel drug development and advanced formulation research.' },
                                    { title: 'Natural Products', icon: 'fa-leaf', desc: 'Phytochemical studies and standardization of herbal actives.' },
                                    { title: 'Clinical Research', icon: 'fa-microscope', desc: 'Evaluating therapeutic efficacy through rigorous clinical trials.' },
                                    { title: 'Biotechnology', icon: 'fa-dna', desc: 'Biopharmaceuticals and diagnostics in modern medicine.' }
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[var(--brand-accent)]">
                                            <i className={`fas ${item.icon} text-xl`}></i>
                                        </div>
                                        <h3 className="text-xl font-black tracking-tight">{item.title}</h3>
                                        <p className="text-white/60 text-sm font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                    </div>
                </section>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left Column: Projects & Publications */}
                    <div className="lg:col-span-8 space-y-32">
                        {/* Research Projects */}
                        <section>
                            <div className="mb-12 border-l-8 border-[var(--bcp-teal)] pl-8">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Active Research</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-black text-[var(--brand-primary)] tracking-tight">Research Projects</h2>
                            </div>
                            
                            <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-gray-200/50 border border-gray-100">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-[var(--bcp-teal)] text-white">
                                        <tr>
                                            <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider border-r border-white/10">Sr. No.</th>
                                            <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider border-r border-white/10">Project Title</th>
                                            <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider border-r border-white/10">Investigator</th>
                                            <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider">Funding Agency</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {researchProjects.length > 0 ? researchProjects.map((project, idx) => (
                                            <tr key={project.id || idx} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-6 text-sm font-black text-gray-400 border-r border-gray-50">{idx + 1}</td>
                                                <td className="px-8 py-6">
                                                    <div className="text-[var(--brand-primary)] font-black text-sm leading-tight mb-2 group-hover:text-[var(--bcp-teal)] transition-colors">{project.title}</div>
                                                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                                        {project.status || 'Active'}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-sm font-bold text-gray-600 border-x border-gray-50">{project.principalInvestigator}</td>
                                                <td className="px-8 py-6 text-sm font-black text-[var(--brand-primary)]">{project.fundingAgency || 'Institutional'}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="px-8 py-12 text-center text-gray-400 font-medium italic">
                                                    Research project repository synchronization in progress...
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Recent Publications */}
                        <section>
                            <div className="mb-12 border-l-8 border-[var(--bcp-teal)] pl-8">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Academic Output</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-black text-[var(--brand-primary)] tracking-tight">Publications</h2>
                            </div>
                            
                            <div className="space-y-6">
                                {publications.length > 0 ? publications.map((pub, idx) => (
                                    <div key={pub.id || idx} className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                                        <div className="flex items-start gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[var(--bcp-teal)] group-hover:bg-[var(--bcp-teal)] group-hover:text-white transition-all">
                                                <i className="fas fa-file-alt text-xl"></i>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-black text-[var(--brand-primary)] leading-tight mb-4 tracking-tight group-hover:text-[var(--bcp-teal)] transition-colors">{pub.title}</h3>
                                                <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
                                                    <div className="text-xs text-gray-500 font-medium">Authors: <span className="text-[var(--brand-primary)] font-black">{pub.authors}</span></div>
                                                    <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
                                                    <div className="flex items-center gap-2 text-[10px] font-black text-[var(--bcp-teal)] uppercase tracking-widest">
                                                        <i className="fas fa-book-open"></i> {pub.journal}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                        <i className="fas fa-calendar"></i> {pub.year}
                                                    </div>
                                                    <div className="px-3 py-1 rounded-lg bg-amber-50 text-[9px] font-black text-[var(--brand-accent)] uppercase tracking-widest border border-amber-100">
                                                        Impact Factor: {pub.impactFactor || '2.4+'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-gray-400 font-medium italic">Publication archive synchronization...</div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Facilities & Stats */}
                    <div className="lg:col-span-4 space-y-16">
                        <section className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                            <div className="mb-12 border-l-4 border-[var(--bcp-teal)] pl-4">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Research Assets</span>
                                </div>
                                <h2 className="text-3xl font-black text-[var(--brand-primary)] tracking-tight">Facilities</h2>
                            </div>
                            
                            <div className="space-y-12">
                                {facilities.map((fac, idx) => (
                                    <div key={fac.id || idx} className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)]">
                                                <i className={`fas ${fac.icon || 'fa-tools'}`}></i>
                                            </div>
                                            <h3 className="text-xl font-black text-[var(--brand-primary)] tracking-tight">{fac.name}</h3>
                                        </div>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">{fac.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {fac.equipment?.map((eq, i) => (
                                                <span key={i} className="px-3 py-1 bg-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-widest rounded-lg border border-gray-100">
                                                    {eq}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Call to Action Card */}
                        <section className="bg-[var(--brand-primary)] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 text-[var(--brand-accent)]">
                                    <i className="fas fa-shield-alt text-2xl"></i>
                                </div>
                                <h3 className="text-2xl font-black mb-6 tracking-tight">Institutional Research Board</h3>
                                <p className="text-white/60 text-sm font-medium leading-relaxed mb-10">
                                    Our ethical committee ensures all scientific investigations adhere to the highest standards of biosafety and professional protocols.
                                </p>
                                <button className="w-full py-5 rounded-2xl bg-[var(--brand-accent)] text-white text-sm font-bold uppercase tracking-wider shadow-xl shadow-amber-900/20 hover:scale-105 transition-all">
                                    Protocol Inquiry <i className="fas fa-paper-plane ml-2"></i>
                                </button>
                            </div>
                            {/* Abstract Pattern */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
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

