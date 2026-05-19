'use client'

import { useState } from 'react'
import { apiClient } from '@/lib/api-client'

export default function EnquiryModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState('')

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('')

        try {
            await apiClient.submitContact(formData)
            setSubmitStatus('success')
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
            setTimeout(() => {
                onClose()
                setSubmitStatus('')
            }, 3000)
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl relative z-10 shadow-2xl animate-fade-in border-t-8 border-[var(--brand-accent)]">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                    <i className="fas fa-times"></i>
                </button>
                
                <div className="mb-8 pr-12">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Quick Enquiry</span>
                                </div>
                    <h2 className="text-3xl font-black text-[var(--brand-primary)] tracking-tight">How can we help?</h2>
                </div>

                {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl flex items-center gap-3">
                        <i className="fas fa-check-circle text-xl"></i>
                        <p className="font-bold">Thank you! Your enquiry has been sent.</p>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl flex items-center gap-3">
                        <i className="fas fa-exclamation-circle text-xl"></i>
                        <p className="font-bold">Error sending enquiry. Please try again later.</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Full Name</label>
                            <input
                                type="text" name="name" value={formData.name} onChange={handleInputChange} required
                                className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--brand-accent)] focus:ring-4 focus:ring-[var(--brand-accent)]/10 transition-all outline-none font-medium text-sm"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address</label>
                            <input
                                type="email" name="email" value={formData.email} onChange={handleInputChange} required
                                className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--brand-accent)] focus:ring-4 focus:ring-[var(--brand-accent)]/10 transition-all outline-none font-medium text-sm"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Phone Number</label>
                            <input
                                type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--brand-accent)] focus:ring-4 focus:ring-[var(--brand-accent)]/10 transition-all outline-none font-medium text-sm"
                                placeholder="+91 00000 00000"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Subject</label>
                            <select
                                name="subject" value={formData.subject} onChange={handleInputChange} required
                                className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--brand-accent)] focus:ring-4 focus:ring-[var(--brand-accent)]/10 transition-all outline-none bg-white font-medium text-sm"
                            >
                                <option value="">Select Inquiry Type</option>
                                <option value="admissions">Admissions</option>
                                <option value="academic">Academic Programs</option>
                                <option value="facilities">Infrastructure</option>
                                <option value="placements">Placements</option>
                                <option value="other">General Inquiry</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Your Message</label>
                        <textarea
                            name="message" value={formData.message} onChange={handleInputChange} required rows={3}
                            className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--brand-accent)] focus:ring-4 focus:ring-[var(--brand-accent)]/10 transition-all outline-none resize-none font-medium text-sm"
                            placeholder="How can we help you?"
                        />
                    </div>

                    <button
                        type="submit" disabled={isSubmitting}
                        className="w-full py-4 px-8 mt-2 bg-[var(--brand-accent)] text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-[var(--brand-primary)] hover:shadow-2xl hover:shadow-blue-900/20 transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <i className="fas fa-circle-notch animate-spin"></i> Processing...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <i className="fas fa-paper-plane"></i> Submit Enquiry
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
