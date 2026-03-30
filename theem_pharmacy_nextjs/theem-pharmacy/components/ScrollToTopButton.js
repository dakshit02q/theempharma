'use client'
import { useState, useEffect } from 'react'

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false)

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group"
                    aria-label="Scroll to top"
                >
                    <i className="fas fa-chevron-up group-hover:-translate-y-0.5 transition-transform duration-200"></i>
                </button>
            )}
        </>
    )
}