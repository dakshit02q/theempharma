'use client';

import { useState } from 'react';
import PdfViewer from '@/components/PdfViewer';

export default function SectionCard({ id, title, content, document, icon, index = 0 }) {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    let parsedContent = null;
    try {
        if (content && (content.trim().startsWith('{') || content.trim().startsWith('['))) {
            parsedContent = JSON.parse(content);
        }
    } catch (e) {
        parsedContent = null;
    }

    const renderTextContent = (text) => (
        <div className="prose prose-lg max-w-none">
            {(text || '').split('\n\n').filter(Boolean).map((block, blockIdx) => {
                const lines = block.split('\n').filter(Boolean);
                return (
                    <div key={blockIdx} className="mb-8">
                        {lines.map((line, lineIdx) => {
                            const isSubHeader = lineIdx === 0 && line.length < 60 && !line.includes('.');
                            return isSubHeader ? (
                                <h4 key={lineIdx} className="text-xl font-bold text-[var(--brand-primary)] mb-4">{line}</h4>
                            ) : (
                                <p key={lineIdx} className="text-gray-600 leading-relaxed text-lg mb-4">{line}</p>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );

    const renderLayout = () => {
        if (!parsedContent || !parsedContent.layout) {
            return renderTextContent(content);
        }

        const { layout, items = [], headers = [], image, imageAlt, imageCaption, images = [] } = parsedContent;

        // Render top-level image(s) — shown above the layout content for any section
        const renderTopImage = () => {
            const sources = images.length > 0 ? images : (image ? [{ src: image, alt: imageAlt, caption: imageCaption }] : []);
            if (sources.length === 0) return null;
            return (
                <div className={`mb-10 ${sources.length > 1 ? 'grid grid-cols-1 sm:grid-cols-2 gap-6' : ''}`}>
                    {sources.map((img, i) => {
                        const src = typeof img === 'string' ? img : img.src;
                        const alt = typeof img === 'string' ? 'Section Image' : (img.alt || img.caption || 'Section Image');
                        const cap = typeof img === 'string' ? null : (img.caption || null);
                        return (
                            <figure key={i} className="group relative rounded-2xl overflow-hidden shadow-md border border-gray-100">
                                <img src={src} alt={alt} className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
                                {cap && (
                                    <figcaption className="absolute bottom-0 left-0 right-0 bg-[var(--brand-primary)]/80 text-white text-xs font-bold uppercase tracking-wider px-4 py-2">
                                        {cap}
                                    </figcaption>
                                )}
                            </figure>
                        );
                    })}
                </div>
            );
        };

        if (layout === 'grid') {
            return (
                <>
                    {renderTopImage()}
                    <div className="grid sm:grid-cols-2 gap-8">
                        {items.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[var(--bcp-teal)] transition-all group">
                                {item.icon && (
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[var(--bcp-teal)] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                        <i className={`fas ${item.icon} text-xl`}></i>
                                    </div>
                                )}
                                {item.image && (
                                    <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                        <img src={item.image} alt={item.title || 'Section Image'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                )}
                                <h4 className="text-xl font-black text-[var(--brand-primary)] mb-3">{item.title}</h4>
                                <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.description}</p>
                                {item.link && (
                                    <a href={item.link} className="inline-flex items-center gap-2 mt-6 text-sm font-bold uppercase tracking-wider text-[var(--bcp-teal)] hover:text-[var(--brand-accent)] transition-colors">
                                        Learn More <i className="fas fa-arrow-right"></i>
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            );
        }

        if (layout === 'table') {
            return (
                <>
                    {renderTopImage()}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[var(--brand-primary)] text-white">
                                <tr>
                                    {headers.map((header, idx) => (
                                        <th key={idx} className="px-6 py-4 text-sm font-bold uppercase tracking-wider border-r border-white/10 last:border-0">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {items.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                                        {Object.values(row).map((cell, cellIdx) => (
                                            <td key={cellIdx} className="px-6 py-4 text-sm font-medium text-gray-600 border-r border-gray-50 last:border-0">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            );
        }

        if (layout === 'accordion') {
            return (
                <>
                    {renderTopImage()}
                    <div className="space-y-4">
                        {items.map((item, idx) => (
                            <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                                <button
                                    onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-black text-[var(--brand-primary)] tracking-tight">{item.title}</span>
                                    <i className={`fas fa-chevron-${activeAccordion === idx ? 'up' : 'down'} text-[var(--brand-accent)]`}></i>
                                </button>
                                <div className={`transition-all duration-300 overflow-hidden ${activeAccordion === idx ? 'max-h-[1000px] border-t border-gray-50' : 'max-h-0'}`}>
                                    <div className="p-6 text-gray-500 font-medium leading-relaxed">
                                        {item.image && (
                                            <div className="relative w-full h-48 md:h-64 mb-6 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                                <img src={item.image} alt={item.title || 'Accordion Image'} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            );
        }

        if (layout === 'tabs') {
            return (
                <>
                    {renderTopImage()}
                    <div className="space-y-8">
                        <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl">
                            {items.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${activeTab === idx ? 'bg-white text-[var(--brand-primary)] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            {items[activeTab] && items[activeTab].image && (
                                <div className="relative w-full h-64 md:h-80 mb-8 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                                    <img src={items[activeTab].image} alt={items[activeTab].title || items[activeTab].label || 'Tab Image'} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <h4 className="text-xl font-black text-[var(--brand-primary)] mb-6">
                                {items[activeTab] ? (items[activeTab].title || items[activeTab].label) : ''}
                            </h4>
                            <div className="text-gray-500 font-medium leading-relaxed whitespace-pre-wrap">
                                {items[activeTab] ? items[activeTab].content : ''}
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        // Default fallback
        return (
            <>
                {renderTopImage()}
                {renderTextContent(content)}
            </>
        );
    };

    return (
        <article
            id={id}
            className="institutional-section scroll-mt-32"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border-t-8 border-[var(--bcp-teal)] overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                    <div className="p-6 lg:p-8">
                        {/* Section Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] group-hover:scale-110 transition-transform duration-500">
                                <i className={`${icon || 'fas fa-info-circle'} text-xl`} />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Section {String(index + 1).padStart(2, '0')}</span>
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-black text-[var(--brand-primary)] tracking-tight">
                                    {title}
                                </h2>
                            </div>
                        </div>

                        {/* Section Content */}
                        <div className="space-y-8">
                            <div className="space-y-6">
                                {renderLayout()}
                            </div>

                            {/* Resource / Document Area */}
                            {document && (
                                <div className="bg-[var(--brand-primary-soft)] rounded-xl p-6 lg:p-8 border border-[var(--brand-primary)]/10 shadow-inner">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                        <h4 className="text-lg md:text-xl font-black text-[var(--brand-primary)] tracking-tight flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                                <i className="fas fa-file-pdf text-2xl text-[var(--brand-accent)]"></i>
                                            </div>
                                            Official Document: {title}
                                        </h4>
                                        <a href={document} download className="inline-flex items-center justify-center gap-3 bg-white text-[var(--brand-primary)] border border-gray-100 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-[var(--brand-primary)] hover:text-white transition-all shadow-sm group">
                                            <i className="fas fa-download group-hover:-translate-y-1 transition-transform"></i> Download Protocol
                                        </a>
                                    </div>
                                    <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                                        <PdfViewer src={document} title={`${title} PDF`} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .institutional-section {
                    background-color: transparent;
                }
            `}</style>
        </article>
    );
}
