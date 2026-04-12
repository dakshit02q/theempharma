'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollToTopButton from '@/components/ScrollToTopButton'
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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('')

        try {
            await apiClient.submitContact(formData)
            setSubmitStatus('success')
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            })
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Get in touch with us for admissions, inquiries, or any information about Theem College of Pharmacy and Research.
                    </p>
                </div>
            </section>

            {/* Contact Information & Form */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-1">
                            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <i className="fas fa-map-marker-alt text-blue-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Address</h3>
                                        <p className="text-gray-600">
                                            Theem College of Pharmacy and Research<br />
                                            Boisar, Maharashtra, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <i className="fas fa-phone text-green-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Phone</h3>
                                        <p className="text-gray-600">
                                            <a href="tel:+919876543210" className="hover:text-blue-600 transition-colors">
                                                +91 98765 43210
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <i className="fas fa-envelope text-purple-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Email</h3>
                                        <p className="text-gray-600">
                                            <a href="mailto:info@theemcollege.edu" className="hover:text-blue-600 transition-colors">
                                                info@theemcollege.edu
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <i className="fas fa-clock text-yellow-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Office Hours</h3>
                                        <p className="text-gray-600">
                                            Monday - Friday: 9:00 AM - 5:00 PM<br />
                                            Saturday: 9:00 AM - 1:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="mt-12">
                                <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                                <div className="space-y-3">
                                    <Link href="/admissions" className="block text-gray-600 hover:text-blue-600 transition-colors">
                                        <i className="fas fa-arrow-right mr-2"></i>
                                        Admissions Information
                                    </Link>
                                    <Link href="/about" className="block text-gray-600 hover:text-blue-600 transition-colors">
                                        <i className="fas fa-arrow-right mr-2"></i>
                                        About Our College
                                    </Link>
                                    <a href="tel:+919876543210" className="block text-gray-600 hover:text-blue-600 transition-colors">
                                        <i className="fas fa-arrow-right mr-2"></i>
                                        Speak with Admissions
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

                                {submitStatus === 'success' && (
                                    <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
                                        <i className="fas fa-check-circle mr-2"></i>
                                        Thank you for your message! We&apos;ll get back to you soon.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                                        <i className="fas fa-exclamation-circle mr-2"></i>
                                        There was an error sending your message. Please try again.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your email address"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="admissions">Admissions Inquiry</option>
                                                <option value="information">General Information</option>
                                                <option value="facilities">Facilities & Infrastructure</option>
                                                <option value="faculty">Faculty Information</option>
                                                <option value="placement">Placement & Career</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Please describe your inquiry in detail..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                                Sending Message...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-paper-plane mr-2"></i>
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Find Us</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Visit our campus located in the heart of Boisar, easily accessible by road and public transportation.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="aspect-video bg-gray-200 flex items-center justify-center">
                            <div className="text-center">
                                <i className="fas fa-map-marked-alt text-6xl text-gray-400 mb-4"></i>
                                <h3 className="text-2xl font-bold text-gray-600 mb-2">Interactive Map</h3>
                                <p className="text-gray-500">
                                    Map integration will be added here<br />
                                    Theem College of Pharmacy and Research, Boisar
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 lg:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
                        <p className="text-gray-600 text-lg">
                            Find answers to common questions about our college and admission process.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-3">What are the admission requirements?</h3>
                            <p className="text-gray-600">
                                For B.Pharm: 12th pass with PCM/PCB and minimum 50% marks. For D.Pharm: 12th pass with PCM/PCB and minimum 45% marks.
                                Valid entrance exam scores are required.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-3">When do admissions open?</h3>
                            <p className="text-gray-600">
                                Admissions typically open in April every year. The application deadline is usually in June,
                                followed by merit list publication in July.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-3">What facilities does the college provide?</h3>
                            <p className="text-gray-600">
                                We offer state-of-the-art laboratories, modern classrooms, library, computer lab,
                                and dedicated spaces for research activities.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-3">Is placement assistance provided?</h3>
                            <p className="text-gray-600">
                                Yes, we have a dedicated placement cell that assists students with career guidance,
                                internships, and job placements in pharmaceutical companies and hospitals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <ScrollToTopButton />
        </div>
    )
}