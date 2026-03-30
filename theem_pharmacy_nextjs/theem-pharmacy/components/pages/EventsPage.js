import EventsInteractive from '@/components/EventsInteractive'

// Server Component for Events Page
export default function EventsPage({ upcomingEvents, pastEvents, categories }) {
    return (
        <div className="pt-20">
            {/* Hero Section - Server Rendered */}
            <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Events & Activities</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Stay updated with our exciting events, conferences, workshops, and activities
                        that enhance the academic and cultural experience at THEEM.
                    </p>
                </div>
            </section>

            {/* Interactive Events Component - Client Rendered */}
            <EventsInteractive
                upcomingEvents={upcomingEvents}
                pastEvents={pastEvents}
                categories={categories}
            />

            {/* Event Calendar */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Event Calendar</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Stay informed about all upcoming events with our comprehensive event calendar.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-calendar-alt text-blue-600 text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Interactive Calendar</h3>
                        <p className="text-gray-600 mb-6">
                            Access our interactive calendar to view all events, set reminders, and plan your participation.
                        </p>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            <i className="fas fa-external-link-alt mr-2"></i>
                            Open Calendar
                        </button>
                    </div>
                </div>
            </section>

            {/* Admin Panel Notice */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-cogs text-white text-2xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Updated Through Admin Panel</h3>
                        <p className="text-xl opacity-90 mb-6">
                            All event information is managed and updated in real-time through our comprehensive
                            administrative system, ensuring accurate and up-to-date event details.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 text-left">
                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Event Management</h4>
                                <p className="text-sm opacity-80">Real-time event creation and updates</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Registration System</h4>
                                <p className="text-sm opacity-80">Automated registration and attendee tracking</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Calendar Integration</h4>
                                <p className="text-sm opacity-80">Synchronized with institutional calendar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Event Submission */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Organize an Event</h2>
                    <p className="text-xl mb-8 text-gray-600">
                        Have an idea for an event? Submit your proposal and help enrich our campus community.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-xl text-left">
                            <h3 className="text-xl font-bold mb-4">For Students</h3>
                            <p className="text-gray-600 mb-4">
                                Student organizations can submit event proposals for cultural, academic,
                                or social activities.
                            </p>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                Submit Student Event
                            </button>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-xl text-left">
                            <h3 className="text-xl font-bold mb-4">For Faculty</h3>
                            <p className="text-gray-600 mb-4">
                                Faculty members can propose academic events, workshops, seminars,
                                and conferences.
                            </p>
                            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                Submit Faculty Event
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
