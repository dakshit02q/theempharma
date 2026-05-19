'use client'
import { useEffect, useRef } from 'react'

export default function CursorAnimation() {
    const animationIdRef = useRef(null)
    const mousePosRef = useRef({ x: 0, y: 0 })
    const followerPosRef = useRef({ x: 0, y: 0 })
    const isRunningRef = useRef(false)

    useEffect(() => {
        const cursor = document.getElementById('cursor')
        const cursorFollower = document.getElementById('cursor-follower')

        if (!cursor || !cursorFollower) return

        // Check if device supports cursor (skip on touch)
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        if (isTouchDevice) {
            cursor.style.display = 'none'
            cursorFollower.style.display = 'none'
            return
        }

        let lastMoveTime = 0
        const THROTTLE_MS = 16 // ~60fps throttle

        const handleMouseMove = (e) => {
            const now = performance.now()
            if (now - lastMoveTime < THROTTLE_MS) return
            lastMoveTime = now

            mousePosRef.current.x = e.clientX
            mousePosRef.current.y = e.clientY
            cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`
        }

        const animateFollower = () => {
            if (!isRunningRef.current) return

            const speed = 0.15
            const mouseX = mousePosRef.current.x
            const mouseY = mousePosRef.current.y

            followerPosRef.current.x += (mouseX - followerPosRef.current.x) * speed
            followerPosRef.current.y += (mouseY - followerPosRef.current.y) * speed

            cursorFollower.style.transform = `translate(${followerPosRef.current.x - 15}px, ${followerPosRef.current.y - 15}px)`
            animationIdRef.current = requestAnimationFrame(animateFollower)
        }

        isRunningRef.current = true
        document.addEventListener('mousemove', handleMouseMove, { passive: true })
        animationIdRef.current = requestAnimationFrame(animateFollower)

        return () => {
            isRunningRef.current = false
            document.removeEventListener('mousemove', handleMouseMove)
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current)
                animationIdRef.current = null
            }
        }
    }, [])

    return null
}
