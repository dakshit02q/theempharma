'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function NewsSlider({ items = [] }) {
    const scrollContainerRef = useRef(null)

    const slide = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400
            scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
        }
    }

    if (!items || items.length === 0) return null

    return (
        <div className="relative">
            <div className="flex justify-end gap-3 mb-8 px-4 max-w-7xl mx-auto">
                <button onClick={() => slide('left')} className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-500 hover:border-[var(--brand-primary)] hover:text-white hover:bg-[var(--brand-primary)] transition-all bg-white shadow-sm focus:outline-none">
                    <i className="fas fa-chevron-left"></i>
                </button>
                <button onClick={() => slide('right')} className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-500 hover:border-[var(--brand-primary)] hover:text-white hover:bg-[var(--brand-primary)] transition-all bg-white shadow-sm focus:outline-none">
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 px-4 max-w-7xl mx-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, index) => (
                    <div key={index} className="min-w-[280px] md:min-w-[340px] snap-center bg-white rounded-2xl p-5 shadow-xl shadow-gray-200/50 border border-gray-100 group hover:border-[var(--brand-accent)] transition-all duration-300 flex flex-col shrink-0">
                        {item.image ? (
                            <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative bg-gray-100">
                                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)] shadow-sm">
                                    {item.category || 'News'}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative bg-gradient-to-br from-[var(--brand-primary-soft)] to-blue-50 flex items-center justify-center">
                                <i className="fas fa-newspaper text-4xl text-[var(--brand-primary)] opacity-20"></i>
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)] shadow-sm">
                                    {item.category || 'News'}
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                            <span><i className="far fa-calendar-alt mr-1 text-[var(--brand-accent)]"></i> {item.date}</span>
                        </div>
                        <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight group-hover:text-[var(--brand-primary)] transition-colors">{item.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4 font-medium flex-1">{item.excerpt}</p>
                        <Link href={item.link || '#'} className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)] group-hover:text-[var(--brand-accent)] transition-colors mt-auto w-fit">
                            Read Full Story <i className="fas fa-arrow-right ml-2 text-xs transition-transform group-hover:translate-x-1"></i>
                        </Link>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}
