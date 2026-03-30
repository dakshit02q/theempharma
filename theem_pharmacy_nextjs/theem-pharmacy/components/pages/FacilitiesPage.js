'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const facilities = [
    {
        id: 'pharmaceutics',
        title: 'Pharmaceutics Laboratory',
        icon: '💊',
        color: 'blue',
        description: 'A specialized lab where students gain hands-on experience in designing, formulating, producing, and assessing different pharmaceutical dosage forms.',
        equipment: [
            'Dissolution Test Apparatus',
            'Disintegration Test Apparatus',
            'Tablet Hardness Tester',
            'Friability Test Apparatus',
            'Blenders',
            'Tablet Compression Machine',
            'Capsule Filling Machine',
            'Hot Air Oven',
            'Tray Drier',
            'Tablet Coating and Polishing Pan'
        ],
        image: '/images/facilities/pharmaceutics-lab.jpg'
    },
    {
        id: 'pharmacology',
        title: 'Pharmacology Laboratory',
        icon: '🔬',
        color: 'green',
        description: 'Specialized lab where students perform experiments to learn how medications affect living systems and understand drug mechanisms.',
        equipment: [
            'Isolated Organ Bath System',
            'Rota-Rod Apparatus',
            'Electroconvulsiometer',
            'Analgesiometers',
            'Sphygmomanometer & Stethoscope',
            'Telethermometer',
            'Histamine Chamber',
            'Spirometer'
        ],
        image: '/images/facilities/pharmacology-lab.jpg'
    },
    {
        id: 'pharmacognosy',
        title: 'Pharmacognosy Laboratory',
        icon: '🌿',
        color: 'emerald',
        description: 'Dedicated to the study of medicinal plants, crude medications, and other natural drug sources with focus on detection, assessment, and investigation.',
        equipment: [
            'Soxhlet Extraction Apparatus',
            'Projection Microscope',
            'Clevenger Apparatus',
            'Camera Lucida',
            'Reflux Condensers',
            'Muffle Furnace',
            'Standard Charts of T.S. of Various Crude Drugs'
        ],
        image: '/images/facilities/pharmacognosy-lab.jpg'
    },
    {
        id: 'pharmaceutical-chemistry',
        title: 'Pharmaceutical Chemistry Laboratory',
        icon: '⚗️',
        color: 'purple',
        description: 'Specialized laboratory for investigating chemical aspects of drug substances, playing a critical role in drug discovery, development, analysis, and quality control.',
        equipment: [
            'Distillation Unit',
            'Deionization Unit',
            'pH Meter',
            'Polarimeter',
            'Flame Photometer',
            'Melting Point Apparatus',
            'Refractometer'
        ],
        image: '/images/facilities/pharmaceutical-chemistry-lab.jpg'
    },
    {
        id: 'hap',
        title: 'Human Anatomy & Physiology Laboratory',
        icon: '🫀',
        color: 'red',
        description: 'Helps students connect theoretical knowledge with physical realities of the human body, fostering better awareness of health and illness.',
        equipment: [
            'Compound Microscope',
            'Projection Microscope',
            'Stethoscope',
            'Sphygmomanometer',
            'Human Skeleton',
            'Pulse Oximeter',
            'Hemoglobinometer',
            'Hemocytometer',
            'ESR & Wintrobe Tube Apparatus',
            'Models of Various Organs',
            'Permanent Slides of Various Organs & Tissues'
        ],
        image: '/images/facilities/hap-lab.jpg'
    },
    {
        id: 'machine-room',
        title: 'Machine Room',
        icon: '⚙️',
        color: 'slate',
        description: 'Dedicated workspace containing industrial and pilot-scale pharmaceutical manufacturing machinery, simulating real drug manufacturing facilities.',
        equipment: [
            'Tablet Punching Machine',
            'Capsule Filling Machine',
            'Ampoule Filling and Sealing Machine',
            'Collapsible Tube Filling Machine',
            'Collapsible Tube Sealing Machine',
            'Clarity Test Apparatus',
            'Bottle Filling Machine',
            'Bottle Washing Machine',
            'Friability Test Apparatus',
            'Disintegration Test Apparatus',
            'Monsanto and Pfizer Hardness Tester'
        ],
        image: '/images/facilities/machine-room.jpg'
    },
    {
        id: 'microbiology',
        title: 'Microbiology Laboratory',
        icon: '🦠',
        color: 'teal',
        description: 'Specialized lab for studying microorganisms and their relationship to drugs, human health, and disease, with focus on aseptic techniques and antimicrobial development.',
        equipment: [
            'Laminar Air Flow Unit',
            'Autoclave',
            'Hot Air Oven',
            'Membrane Filtration Assembly',
            'Colony Counter',
            'Zone Reader'
        ],
        image: '/images/facilities/microbiology-lab.jpg'
    },
    {
        id: 'computer',
        title: 'Computer Laboratory',
        icon: '💻',
        color: 'indigo',
        description: 'Essential for educating students in the increasingly digital and data-driven environment of modern pharmacy practice and research.',
        equipment: [
            'Fundamental Computer Skills Training',
            'Specialized Software Training',
            'Data Management and Analysis Tools',
            'High-Speed Internet Connection',
            'Modern Computing Systems'
        ],
        image: '/images/facilities/computer-lab.jpg'
    }
]

const library = {
    title: 'Library - Centre for Knowledge of Information',
    icon: '📚',
    description: 'Located in a clean and quiet atmosphere, our library is fully computerized with SOUL library management software for accuracy and speed.',
    features: [
        'Fully Computerized with SOUL Software',
        'Automated Barcode Technology (IPAC)',
        'Modern Digital Knowledge Centre',
        'Computers with Internet Connection',
        'Print/Xerox Facility',
        'Book Bank Scheme'
    ],
    image: '/images/facilities/library.jpg'
}

const colorClasses = {
    blue: { bg: 'bg-blue-50', icon: 'bg-blue-100', text: 'text-blue-600', accent: 'bg-blue-600' },
    green: { bg: 'bg-green-50', icon: 'bg-green-100', text: 'text-green-600', accent: 'bg-green-600' },
    emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-100', text: 'text-emerald-600', accent: 'bg-emerald-600' },
    purple: { bg: 'bg-purple-50', icon: 'bg-purple-100', text: 'text-purple-600', accent: 'bg-purple-600' },
    red: { bg: 'bg-red-50', icon: 'bg-red-100', text: 'text-red-600', accent: 'bg-red-600' },
    slate: { bg: 'bg-slate-50', icon: 'bg-slate-100', text: 'text-slate-600', accent: 'bg-slate-600' },
    teal: { bg: 'bg-teal-50', icon: 'bg-teal-100', text: 'text-teal-600', accent: 'bg-teal-600' },
    indigo: { bg: 'bg-indigo-50', icon: 'bg-indigo-100', text: 'text-indigo-600', accent: 'bg-indigo-600' }
}

export default function FacilitiesPage() {
    const [selectedFacility, setSelectedFacility] = useState(null)

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Laboratory Facilities</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Theem College of Pharmacy has been established with exceptional infrastructure.
                        Our state-of-the-art laboratories are the backbone of pharmaceutical education,
                        bringing real value through practical exposure.
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Excellence in Pharmaceutical Education</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Practical exposure brings real value to a pharmacy degree. Theem College has all the laboratories
                            equipped with the latest equipment and technology. Our specialized labs cover every aspect of
                            pharmaceutical sciences, ensuring comprehensive hands-on training for our students.
                        </p>
                    </div>
                </div>
            </section>

            {/* Laboratory Cards Grid */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilities.map((facility) => {
                            const colors = colorClasses[facility.color]
                            return (
                                <div
                                    key={facility.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl card-hover cursor-pointer"
                                    onClick={() => setSelectedFacility(facility)}
                                >
                                    {/* Icon Header */}
                                    <div className={`${colors.bg} p-8 text-center`}>
                                        <div className={`w-20 h-20 ${colors.icon} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                            <span className="text-4xl">{facility.icon}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">{facility.title}</h3>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                            {facility.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-semibold ${colors.text}`}>
                                                {facility.equipment.length} Equipment Available
                                            </span>
                                            <button className={`${colors.accent} text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity`}>
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Library Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Content */}
                            <div className="p-8 lg:p-12">
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-4xl">{library.icon}</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-4">{library.title}</h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    {library.description}
                                </p>

                                <div className="space-y-3">
                                    {library.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Image */}
                            <div className="relative h-full min-h-[400px] bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                                <span className="text-[150px] opacity-30">📚</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* English Language Lab */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">🗣️</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-6">Multimedia English Language Laboratory</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Apart from labs prescribed for study, we have a multimedia English Language Lab equipped
                                with all the sophisticated equipment, especially designed to train students in communicative
                                aspects of English. This facility enhances students' communication skills, essential for
                                professional success in the pharmaceutical industry.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-blue-50">
                <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Experience Our World-Class Facilities</h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Visit our campus to see our state-of-the-art laboratories and infrastructure firsthand.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="btn-primary">
                            Schedule a Campus Tour
                        </Link>
                        <Link href="/admissions" className="btn-secondary">
                            Apply Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Modal for Facility Details */}
            {selectedFacility && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedFacility(null)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className={`${colorClasses[selectedFacility.color].bg} p-8 relative`}>
                            <button
                                onClick={() => setSelectedFacility(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="flex items-center gap-4">
                                <span className="text-6xl">{selectedFacility.icon}</span>
                                <div>
                                    <h3 className="text-3xl font-bold text-gray-800">{selectedFacility.title}</h3>
                                    <p className="text-gray-600 mt-2">{selectedFacility.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8">
                            <h4 className="text-2xl font-bold mb-6">Available Equipment</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                {selectedFacility.equipment.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className={`flex-shrink-0 w-6 h-6 ${colorClasses[selectedFacility.color].accent} rounded-full flex items-center justify-center mt-0.5`}>
                                            <span className="text-white text-xs font-bold">{index + 1}</span>
                                        </div>
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .card-hover {
                    transform: translateY(0);
                }

                .card-hover:hover {
                    transform: translateY(-5px);
                }

                .btn-primary {
                    @apply bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300;
                }

                .btn-secondary {
                    @apply border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300;
                }
            `}</style>
        </div>
    )
}
