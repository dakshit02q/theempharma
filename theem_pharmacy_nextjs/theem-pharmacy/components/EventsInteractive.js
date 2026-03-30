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

    const getCategoryColor = (category) => {
        switch (category) {
            case 'academic': return 'bg-blue-100 text-blue-800'
            case 'cultural': return 'bg-purple-100 text-purple-800'
            case 'industry': return 'bg-green-100 text-green-800'
            case 'community': return 'bg-orange-100 text-orange-800'
            case 'sports': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const filteredUpcomingEvents = activeCategory === 'all'
        ? upcomingEvents
        : upcomingEvents.filter(event => event.category === activeCategory)

    const filteredPastEvents = activeCategory === 'all'
        ? pastEvents
        : pastEvents.filter(event => event.category === activeCategory)

    return (
        <>
            {/* Event Categories Filter */}
            <section className="py-8 bg-white sticky top-20 z-40 border-b">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeCategory === category.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {category.name} ({category.count})
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Upcoming Events</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Don't miss out on these exciting upcoming events. Register now to secure your participation.
                        </p>
                    </div>

                    {filteredUpcomingEvents.length > 0 ? (
                        <div className="grid lg:grid-cols-2 gap-8">
                            {filteredUpcomingEvents.map((event) => (
                                <div key={event.id} className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-blue-600">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
                                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                        </span>
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                            Upcoming
                                        </span>
                                    </div>

                                    <div className="mb-6">
                                        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                                            <Image
                                                src={event.image || '/images/placeholder-event.jpg'}
                                                alt={event.title}
                                                width={400}
                                                height={200}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                                    <p className="text-gray-600 mb-6">{event.description}</p>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-gray-600">
                                            <i className="fas fa-calendar w-5 mr-3 text-blue-600"></i>
                                            <span>{formatDate(event.eventDate)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <i className="fas fa-clock w-5 mr-3 text-blue-600"></i>
                                            <span>{event.startTime} - {event.endTime}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <i className="fas fa-map-marker-alt w-5 mr-3 text-blue-600"></i>
                                            <span>{event.venue}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <i className="fas fa-user-tie w-5 mr-3 text-blue-600"></i>
                                            <span>Organized by: {event.organizer}</span>
                                        </div>
                                        {event.registrationRequired && (
                                            <div className="flex items-center text-gray-600">
                                                <i className="fas fa-users w-5 mr-3 text-blue-600"></i>
                                                <span>
                                                    {event.registeredCount}/{event.maxParticipants} registered
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex space-x-4">
                                        {event.registrationRequired ? (
                                            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                                <i className="fas fa-user-plus mr-2"></i>
                                                Register Now
                                            </button>
                                        ) : (
                                            <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                                <i className="fas fa-info-circle mr-2"></i>
                                                Learn More
                                            </button>
                                        )}
                                        <button className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                                            <i className="fas fa-share-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-calendar-times text-gray-400 text-3xl"></i>
                            </div>
                            <p className="text-gray-500 text-lg">No upcoming events in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Past Events */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Past Events</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Highlights from our recent events and activities that made a significant impact
                            on our academic and cultural community.
                        </p>
                    </div>

                    {filteredPastEvents.length > 0 ? (
                        <div className="space-y-8">
                            {filteredPastEvents.map((event) => (
                                <div key={event.id} className="bg-white rounded-2xl p-8 shadow-xl">
                                    <div className="flex flex-col lg:flex-row gap-8">
                                        <div className="lg:w-1/3">
                                            <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                                                <Image
                                                    src={event.image || '/images/placeholder-event.jpg'}
                                                    alt={event.title}
                                                    width={300}
                                                    height={200}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>

                                        <div className="lg:w-2/3">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
                                                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                                </span>
                                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                                                    Completed
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                                            <p className="text-gray-600 mb-6">{event.description}</p>

                                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                                <div className="space-y-3">
                                                    <div className="flex items-center text-gray-600">
                                                        <i className="fas fa-calendar w-5 mr-3 text-blue-600"></i>
                                                        <span>{formatDate(event.eventDate)}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <i className="fas fa-clock w-5 mr-3 text-blue-600"></i>
                                                        <span>{event.startTime} - {event.endTime}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <i className="fas fa-map-marker-alt w-5 mr-3 text-blue-600"></i>
                                                        <span>{event.venue}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex items-center text-gray-600">
                                                        <i className="fas fa-users w-5 mr-3 text-green-600"></i>
                                                        <span>{event.attendees} attendees</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <i className="fas fa-star w-5 mr-3 text-yellow-500"></i>
                                                        <span>{event.feedback}/5.0 feedback</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <i className="fas fa-user-tie w-5 mr-3 text-blue-600"></i>
                                                        <span>{event.organizer}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="bg-blue-100 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-200 transition-colors">
                                                <i className="fas fa-images mr-2"></i>
                                                View Gallery
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-calendar-times text-gray-400 text-3xl"></i>
                            </div>
                            <p className="text-gray-500 text-lg">No past events in this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
