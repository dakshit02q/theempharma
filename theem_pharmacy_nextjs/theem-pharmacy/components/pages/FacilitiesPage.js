'use client'

import { useState } from 'react'
import PageHero from '@/components/PageHero'
import Link from 'next/link'

const facilities = [
    {
        id: 'pharmaceutics',
        title: 'Pharmaceutics',
        subtitle: 'Dosage Form Design & Formulation',
        icon: 'fa-pills',
        description: 'A specialized lab where students gain hands-on experience in designing, formulating, producing, and assessing different pharmaceutical dosage forms.',
        equipment: ['Dissolution Test Apparatus', 'Disintegration Test Apparatus', 'Tablet Hardness Tester', 'Friability Test Apparatus', 'Tablet Compression Machine', 'Capsule Filling Machine', 'Tablet Coating & Polishing Pan']
    },
    {
        id: 'pharmacology',
        title: 'Pharmacology',
        subtitle: 'Drug Action & Mechanisms',
        icon: 'fa-microscope',
        description: 'Specialized lab where students perform experiments to learn how medications affect living systems and understand drug mechanisms.',
        equipment: ['Isolated Organ Bath System', 'Rota-Rod Apparatus', 'Electroconvulsiometer', 'Analgesiometers', 'Sphygmomanometer', 'Histamine Chamber', 'Spirometer']
    },
    {
        id: 'pharmacognosy',
        title: 'Pharmacognosy',
        subtitle: 'Natural Product Investigation',
        icon: 'fa-leaf',
        description: 'Dedicated to the study of medicinal plants, crude medications, and other natural drug sources with focus on detection, assessment, and investigation.',
        equipment: ['Soxhlet Extraction Apparatus', 'Projection Microscope', 'Clevenger Apparatus', 'Camera Lucida', 'Muffle Furnace', 'Standard Crude Drug Charts']
    },
    {
        id: 'pharmaceutical-chemistry',
        title: 'Pharm Chemistry',
        subtitle: 'Drug Analysis & Discovery',
        icon: 'fa-vial',
        description: 'Specialized laboratory for investigating chemical aspects of drug substances, playing a critical role in drug discovery, development, analysis, and quality control.',
        equipment: ['Distillation Unit', 'Deionization Unit', 'pH Meter', 'Polarimeter', 'Flame Photometer', 'Melting Point Apparatus', 'Refractometer']
    },
    {
        id: 'hap',
        title: 'Human Anatomy',
        subtitle: 'Physiology & Physical Realities',
        icon: 'fa-dna',
        description: 'Helps students connect theoretical knowledge with physical realities of the human body, fostering better awareness of health and illness.',
        equipment: ['Compound Microscope', 'Human Skeleton', 'Pulse Oximeter', 'Hemoglobinometer', 'Hemocytometer', 'Permanent Slides Archive', 'Organ Models']
    },
    {
        id: 'machine-room',
        title: 'Machine Room',
        subtitle: 'Industrial Scale Simulation',
        icon: 'fa-cogs',
        description: 'Dedicated workspace containing industrial and pilot-scale pharmaceutical manufacturing machinery, simulating real drug manufacturing facilities.',
        equipment: ['Tablet Punching Machine', 'Capsule Filling Machine', 'Ampoule Filling & Sealing', 'Collapsible Tube Sealing', 'Clarity Test Apparatus', 'Bottle Filling Machine']
    }
]

export default function FacilitiesPage() {
    const [selectedFacility, setSelectedFacility] = useState(null)

    return (
        <main className="bg-[#f8fafc] min-h-screen pb-12">
            <PageHero 
                title="Academic Infrastructure" 
                subtitle="Explore our world-class laboratory ecosystem, designed to bridge theoretical concepts with sophisticated practical application."
            />

            {/* Labs Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px] relative z-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.map((lab, i) => (
                        <div 
                            key={lab.id} 
                            onClick={() => setSelectedFacility(lab)}
                            className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 group cursor-pointer hover:border-[var(--bcp-teal)] transition-all duration-500"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all">
                                    <i className={`fas ${lab.icon} text-sm`}></i>
                                </div>
                                <div className="text-sm font-bold uppercase tracking-wider text-[var(--bcp-teal)]">0{i+1}</div>
                            </div>
                            <h3 className="text-xl font-black text-[var(--brand-primary)] tracking-tight mb-1">{lab.title}</h3>
                            <div className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">{lab.subtitle}</div>
                            <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3">
                                {lab.description}
                            </p>
                            <button className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)] flex items-center gap-2 group-hover:gap-4 transition-all">
                                Inventory List <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Library Section */}
            <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[var(--brand-primary)] rounded-2xl overflow-hidden relative shadow-2xl">
                    <div className="grid lg:grid-cols-2">
                        <div className="p-8 lg:p-14 text-white relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">Centre for Knowledge</span>
                                </div>
                            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-6">Institutional Library</h2>
                            <p className="text-white/70 font-medium text-base leading-relaxed mb-8">
                                Fully computerized with SOUL library management software, our library serves as the central information hub with automated barcode protocols and a vast digital knowledge repository.
                            </p>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {[
                                    'SOUL Automation',
                                    'IPAC Barcoding',
                                    'Digital Repository',
                                    'Book Bank Scheme',
                                    'High-speed Internet',
                                    'Global Journals'
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/90">
                                        <i className="fas fa-check-circle text-[var(--brand-accent)]"></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-full min-h-[400px] bg-white/5 flex items-center justify-center group">
                            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                <i className="fas fa-book-open text-[20rem] text-white opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000"></i>
                            </div>
                            <div className="relative z-10 text-center">
                                <div className="text-6xl font-black text-white mb-2 tracking-tighter">Knowledge</div>
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Hub & Repository</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                </div>
            </section>

            {/* Language Lab & Other Facilities */}
            <section className="py-14 max-w-5xl mx-auto px-4 text-center">
                <div className="p-8 lg:p-14 bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-[var(--brand-primary-soft)] rounded-xl flex items-center justify-center text-[var(--brand-primary)] mx-auto mb-6">
                            <i className="fas fa-broadcast-tower text-xl"></i>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-black text-[var(--brand-primary)] mb-4 tracking-tight">Multimedia Language Cell</h2>
                        <p className="text-gray-600 font-medium text-base leading-relaxed max-w-3xl mx-auto">
                            Beyond pharmaceutical labs, we host a sophisticated Multimedia English Language Laboratory. Specifically designed to distill communicative competencies essential for professional leadership in the global pharma landscape.
                        </p>
                    </div>
                </div>
            </section>

            {/* Modal for Facility Details */}
            {selectedFacility && (
                <div className="fixed inset-0 bg-[var(--brand-primary)]/90 backdrop-blur-md z-[100] flex items-center justify-center p-6" onClick={() => setSelectedFacility(null)}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-8 lg:p-12 relative overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelectedFacility(null)} className="absolute top-6 right-6 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <i className="fas fa-times text-gray-400"></i>
                        </button>
                        
                            <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)]">
                                    <i className={`fas ${selectedFacility.icon} text-2xl`}></i>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-[var(--brand-primary)] tracking-tight">{selectedFacility.title}</h3>
                                    <div className="text-sm font-bold uppercase tracking-wider text-[var(--bcp-teal)]">{selectedFacility.subtitle}</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Primary Inventory</h4>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {selectedFacility.equipment.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div className="w-2 h-2 rounded-full bg-[var(--bcp-teal)]"></div>
                                            <span className="text-sm font-bold text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--brand-primary-soft)] skew-x-[-12deg] translate-x-32 z-0 opacity-30"></div>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23223975' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>
        </main>
    )
}
