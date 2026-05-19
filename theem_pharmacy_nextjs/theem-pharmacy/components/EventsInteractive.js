'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function EventsInteractive({ upcomingEvents, pastEvents, categories }) {
    const [activeCategory, setActiveCategory] = useState('all')

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const filteredUpcomingEvents = activeCategory === 'all'
        ? upcomingEvents
        : upcomingEvents.filter(event => event.category === activeCategory)

    const filteredPastEvents = activeCategory === 'all'
        ? pastEvents
        : pastEvents.filter(event => event.category === activeCategory)

    return (
        <div className="space-y-32">
            {/* Event Categories Filter */}
            <section className="sticky top-20 z-40">
                <div className="max-w-fit mx-auto px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full shadow-2xl shadow-gray-200/50 border border-gray-100/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeCategory === category.id
                                    ? 'bg-[var(--brand-primary)] text-white shadow-lg shadow-[var(--brand-primary)]/20'
                                    : 'text-gray-400 hover:text-[var(--brand-primary)] hover:bg-gray-50'
                                }`}
                        >
                            {category.name} <span className="opacity-40 ml-1">({category.count})</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Institutional Pipeline</span>
                                </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-[var(--brand-primary)] tracking-tight">Upcoming Protocols</h2>
                </div>

                {filteredUpcomingEvents.length > 0 ? (
                    <div className="grid lg:grid-cols-2 gap-12">
                        {filteredUpcomingEvents.map((event, i) => (
                            <div key={event.id} className="bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 group flex flex-col md:flex-row">
                                <div className="md:w-2/5 relative min-h-[300px] overflow-hidden">
                                    <Image
                                        src={event.image || '/images/placeholder-event.jpg'}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)] shadow-sm">
                                        {event.category}
                                    </div>
                                </div>

                                <div className="md:w-3/5 p-10 flex flex-col">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-[var(--bcp-teal)] uppercase tracking-widest mb-4">
                                        <i className="fas fa-calendar-check"></i> {formatDate(event.eventDate)}
                                    </div>
                                    <h3 className="text-2xl font-black text-[var(--brand-primary)] tracking-tight mb-4 group-hover:text-[var(--bcp-teal)] transition-colors line-clamp-2">{event.title}</h3>
                                    <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3">{event.description}</p>
                                    
                                    <div className="space-y-3 mb-8 text-sm font-bold uppercase tracking-wider text-gray-400">
                                        <div className="flex items-center gap-3">
                                            <i className="fas fa-clock text-[var(--brand-accent)]"></i>
                                            <span>{event.startTime} - {event.endTime}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <i className="fas fa-map-marker-alt text-[var(--brand-accent)]"></i>
                                            <span>{event.venue}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <button className={`w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all ${event.registrationRequired 
                                            ? 'bg-[var(--brand-primary)] text-white hover:bg-[var(--bcp-teal)]' 
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                            {event.registrationRequired ? 'Protocol Registration' : 'View Details'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
                        <i className="fas fa-calendar-times text-4xl text-gray-100 mb-6 block"></i>
                        <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No scheduled events in this category</p>
                    </div>
                )}
            </section>

            {/* Past Events Archive */}
            <section className="bg-gray-50/50 py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Archival Repository</span>
                                </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-[var(--brand-primary)] tracking-tight">Institutional Memory</h2>
                    </div>

                    {filteredPastEvents.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredPastEvents.map((event) => (
                                <article key={event.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="aspect-video relative overflow-hidden">
                                        <Image
                                            src={event.image || '/images/placeholder-event.jpg'}
                                            alt={event.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-[var(--brand-primary)]/20"></div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-sm font-bold uppercase tracking-wider text-[var(--bcp-teal)]">{formatDate(event.eventDate)}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Completed</span>
                                        </div>
                                        <h3 className="text-xl font-black text-[var(--brand-primary)] tracking-tight mb-4 group-hover:text-[var(--bcp-teal)] transition-colors line-clamp-2">{event.title}</h3>
                                        <p className="text-gray-500 font-medium text-xs leading-relaxed mb-6 line-clamp-2">{event.description}</p>
                                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                <i className="fas fa-users text-[var(--brand-accent)]"></i> {event.attendees} Participated
                                            </div>
                                            <button className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Gallery <i className="fas fa-arrow-right ml-1"></i></button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-400 font-black uppercase tracking-widest text-sm italic">Historical archive synchronization in progress...</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
