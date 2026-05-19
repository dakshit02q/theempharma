'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Carousel({ slides, autoPlayInterval = 5000, className = '', renderContent }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!slides || slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [slides, autoPlayInterval]);

    if (!slides || slides.length === 0) return null;

    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={slides[currentIndex].src}
                        alt={slides[currentIndex].alt || "Carousel Image"}
                        fill
                        className="object-cover"
                        priority={currentIndex === 0}
                    />
                    {renderContent && (
                        <div className="absolute inset-0 z-20">
                            {renderContent(slides[currentIndex], currentIndex)}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)]/60 via-transparent to-transparent z-10 pointer-events-none"></div>
            
            {/* Carousel Indicators */}
            {slides.length > 1 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-500 ${
                                idx === currentIndex 
                                    ? "bg-[var(--brand-accent)] w-8 shadow-lg shadow-black/50" 
                                    : "bg-white/60 hover:bg-white/90 w-2"
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
