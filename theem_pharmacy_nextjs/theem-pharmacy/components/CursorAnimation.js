'use client'
import { useEffect } from 'react'

export default function CursorAnimation() {
    useEffect(() => {
        // Cursor functionality
        const cursor = document.getElementById('cursor')
        const cursorFollower = document.getElementById('cursor-follower')

        if (!cursor || !cursorFollower) return

        // Check if device supports cursor
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        if (isTouchDevice) {
            cursor.style.display = 'none'
            cursorFollower.style.display = 'none'
            return
        }

        let mouseX = 0, mouseY = 0
        let followerX = 0, followerY = 0
        let animationId

        const handleMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
            cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`
        }

        const animateFollower = () => {
            const speed = 0.15
            followerX += (mouseX - followerX) * speed
            followerY += (mouseY - followerY) * speed
            cursorFollower.style.transform = `translate(${followerX - 15}px, ${followerY - 15}px)`
            animationId = requestAnimationFrame(animateFollower)
        }

        document.addEventListener('mousemove', handleMouseMove)
        animateFollower()

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            if (animationId) cancelAnimationFrame(animationId)
        }
    }, [])

    return null // This component only provides functionality, no visual output
}