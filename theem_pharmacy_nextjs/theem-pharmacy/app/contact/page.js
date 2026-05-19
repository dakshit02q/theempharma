'use client'

import { useState } from 'react'
import PageHero from '@/components/PageHero'
import { apiClient } from '@/lib/api-client'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState('')

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
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo = [
        { title: 'Campus Address', content: 'Theem College of Pharmacy and Research, Boisar, Maharashtra, India', icon: 'fas fa-map-marker-alt', color: 'blue' },
        { title: 'Phone Support', content: '+91 98765 43210', icon: 'fas fa-phone', color: 'emerald', link: 'tel:+919876543210' },
        { title: 'Email Inquiries', content: 'info@theemcollege.edu', icon: 'fas fa-envelope', color: 'purple', link: 'mailto:info@theemcollege.edu' },
        { title: 'Office Hours', content: 'Mon - Fri: 9:00 AM - 5:00 PM', icon: 'fas fa-clock', color: 'amber' },
    ];

    return (
        <main className="bg-[#fcfdfe] min-h-screen pb-20">
            <PageHero 
                title="Connect With Us" 
                subtitle="Have questions? Our team is here to assist you with admissions, academic inquiries, and more."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px] relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Sidebar */}
                    <aside className="space-y-6">
                        {contactInfo.map((info, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 flex items-start gap-4 group hover:border-[var(--bcp-teal)] transition-all duration-300"
                            >
                                <div className="w-12 h-12 shrink-0 rounded-xl bg-[var(--brand-primary-soft)] flex items-center justify-center text-[var(--brand-primary)] group-hover:scale-110 transition-transform">
                                    <i className={`${info.icon} text-xl`}></i>
                                </div>
                                <div>
                                    <h3 className="font-black text-[var(--brand-primary)] text-sm uppercase tracking-wider mb-1">{info.title}</h3>
                                    {info.link ? (
                                        <a href={info.link} className="text-gray-600 hover:text-[var(--bcp-teal)] transition-colors break-all font-medium">
                                            {info.content}
                                        </a>
                                    ) : (
                                        <p className="text-gray-600 leading-relaxed font-medium">{info.content}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Quick Map Preview Card */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100">
                            <div className="h-56 bg-gray-100 relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103049.550799981!2d72.78818576158936!3d19.688285721088192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71ebb9116e5c5%3A0xe33b4d6900b0671c!2sTheem%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1777019600074!5m2!1sen!2sin"
                                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                                />
                            </div>
                            <div className="p-4 bg-gray-50 text-center">
                                <a 
                                    href="https://maps.google.com/?q=Theem+College+of+Engineering" 
                                    target="_blank" rel="noreferrer"
                                    className="text-xs font-black uppercase tracking-widest text-[var(--brand-primary)] hover:text-[var(--bcp-teal)]"
                                >
                                    Get Directions <i className="fas fa-external-link-alt ml-1"></i>
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-2xl shadow-gray-200/60 border-t-8 border-[var(--bcp-teal)]">
                            <div className="mb-10">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                                    <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Get in Touch</span>
                                </div>
                                <h2 className="text-4xl font-black text-[var(--brand-primary)] tracking-tight mb-4">Send a Message</h2>
                                <p className="text-gray-500 font-medium">Please fill out the form below and our representative will contact you shortly.</p>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl flex items-center gap-3">
                                    <i className="fas fa-check-circle text-xl"></i>
                                    <p className="font-bold">Thank you! Your message has been sent successfully.</p>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl flex items-center gap-3">
                                    <i className="fas fa-exclamation-circle text-xl"></i>
                                    <p className="font-bold">Error sending message. Please try again later.</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Full Name</label>
                                        <input
                                            type="text" name="name" value={formData.name} onChange={handleInputChange} required
                                            className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--bcp-teal)] focus:ring-4 focus:ring-[var(--bcp-teal)]/5 transition-all outline-none font-medium"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address</label>
                                        <input
                                            type="email" name="email" value={formData.email} onChange={handleInputChange} required
                                            className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--bcp-teal)] focus:ring-4 focus:ring-[var(--bcp-teal)]/5 transition-all outline-none font-medium"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Phone Number</label>
                                        <input
                                            type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                            className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--bcp-teal)] focus:ring-4 focus:ring-[var(--bcp-teal)]/5 transition-all outline-none font-medium"
                                            placeholder="+91 00000 00000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Subject</label>
                                        <select
                                            name="subject" value={formData.subject} onChange={handleInputChange} required
                                            className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--bcp-teal)] focus:ring-4 focus:ring-[var(--bcp-teal)]/5 transition-all outline-none bg-white font-medium"
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

                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Your Message</label>
                                    <textarea
                                        name="message" value={formData.message} onChange={handleInputChange} required rows={5}
                                        className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--bcp-teal)] focus:ring-4 focus:ring-[var(--bcp-teal)]/5 transition-all outline-none resize-none font-medium"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit" disabled={isSubmitting}
                                    className="w-full py-5 px-8 bg-[var(--brand-primary)] text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-[var(--brand-primary-dark)] hover:shadow-2xl hover:shadow-blue-900/20 hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:translate-y-0"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <i className="fas fa-circle-notch animate-spin"></i> Processing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <i className="fas fa-paper-plane"></i> Send Message
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* FAQ Section - Clean Institutional Style */}
                <section className="mt-32">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                            <span className="text-sm font-bold uppercase tracking-wider text-[var(--brand-primary)]">Support Center</span>
                        </div>
                        <h2 className="text-4xl font-black text-[var(--brand-primary)] tracking-tight">Frequently Asked Questions</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {[
                            { q: "What are the admission requirements?", a: "Minimum 50% in 12th (PCM/PCB) for B.Pharm and 45% for D.Pharm, along with valid entrance scores." },
                            { q: "When do admissions typically open?", a: "Applications usually open in April, with the process continuing through June/July each year." },
                            { q: "Do you provide hostel facilities?", a: "Yes, we offer safe and comfortable accommodation for both boys and girls with modern amenities." },
                            { q: "What about placement support?", a: "Our dedicated cell coordinates with top pharmaceutical companies for internships and final placements." }
                        ].map((faq, i) => (
                            <div 
                                key={i} 
                                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 group hover:border-[var(--bcp-teal)] transition-all duration-300"
                            >
                                <h3 className="text-xl font-black text-[var(--brand-primary)] mb-4 flex items-start gap-4 leading-tight">
                                    <span className="w-8 h-8 rounded-lg bg-[var(--bcp-teal)] flex items-center justify-center text-white text-[10px] font-black shrink-0 mt-1">Q</span>
                                    {faq.q}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-medium ml-12">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23223975' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        </main>
    )
}