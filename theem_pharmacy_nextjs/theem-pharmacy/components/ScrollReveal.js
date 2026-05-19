'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
    const pathname = usePathname();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: Unobserve after revealing to prevent re-animating on every scroll
                    // observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 });

        // Add a slight delay to ensure the DOM has updated after navigation
        const timeoutId = setTimeout(() => {
            const elements = document.querySelectorAll('.reveal-on-scroll');
            elements.forEach((el) => observer.observe(el));
        }, 100);

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [pathname]);

    return null;
}
