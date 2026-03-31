import EventsPage from '@/components/pages/EventsPage'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { generateOGMetadata, generateTwitterMetadata, generateStructuredData } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
    return {
        title: 'Events & Activities | THEEM College of Pharmacy - Campus Events & Programs',
        description: 'Stay updated with exciting events, conferences, workshops, and cultural activities at THEEM College of Pharmacy. Join our vibrant campus community.',
        keywords: [
            'college events',
            'pharmacy conferences',
            'campus activities',
            'cultural programs',
            'academic events',
            'workshops and seminars',
            'student events',
            'institutional activities'
        ],
        openGraph: generateOGMetadata('events', {
            title: 'Events & Activities | THEEM College of Pharmacy',
            description: 'Stay updated with exciting events and campus activities.',
            path: '/events',
        }),
        twitter: generateTwitterMetadata('events', {
            title: 'Events & Activities | THEEM College of Pharmacy',
            description: 'Stay updated with exciting events and campus activities.',
        }),
        alternates: {
            canonical: 'https://theempharmacy.edu/events',
        },
    }
}

async function getEventsData() {
    try {
        // Fetch events from the database API
        const baseUrl =
            process.env.NEXT_PUBLIC_API_URL ||
            (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
        const response = await fetch(`${baseUrl}/api/events`, {
            cache: 'no-store' // Ensure fresh data on each request
        })

        if (!response.ok) {
            throw new Error('Failed to fetch events')
        }

        const result = await response.json()

        if (!result.success || !result.data) {
            throw new Error('Invalid response format')
        }

        const allEvents = result.data
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0) // Reset time to start of day for accurate comparison

        // Separate upcoming and past events
        const upcomingEvents = allEvents.filter(event => {
            const eventDate = new Date(event.eventDate)
            eventDate.setHours(0, 0, 0, 0)
            return eventDate >= currentDate
        }).sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))

        const pastEvents = allEvents.filter(event => {
            const eventDate = new Date(event.eventDate)
            eventDate.setHours(0, 0, 0, 0)
            return eventDate < currentDate
        }).sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))

        // Calculate category counts
        const categoryCounts = allEvents.reduce((acc, event) => {
            const category = event.category || 'general'
            acc[category] = (acc[category] || 0) + 1
            return acc
        }, {})

        // Build categories array
        const categories = [
            { id: 'all', name: 'All Events', count: allEvents.length }
        ]

        // Add categories that have events
        Object.entries(categoryCounts).forEach(([id, count]) => {
            const categoryNames = {
                academic: 'Academic',
                cultural: 'Cultural',
                industry: 'Industry',
                community: 'Community',
                sports: 'Sports',
                general: 'General'
            }
            categories.push({
                id,
                name: categoryNames[id] || id.charAt(0).toUpperCase() + id.slice(1),
                count
            })
        })

        return {
            upcomingEvents,
            pastEvents,
            categories
        }
    } catch (error) {
        console.error('Error fetching events data:', error)

        // Return empty data structure if fetch fails
        return {
            upcomingEvents: [],
            pastEvents: [],
            categories: [
                { id: 'all', name: 'All Events', count: 0 }
            ]
        }
    }
}

// Server Component with data fetching
export default async function Events() {
    const eventsData = await getEventsData()
    const structuredData = generateStructuredData('organization')

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <EventsPage {...eventsData} />
            <ScrollToTopButton />
        </>
    )
}
