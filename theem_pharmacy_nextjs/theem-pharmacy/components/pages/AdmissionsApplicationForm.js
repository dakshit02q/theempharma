'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-client'

const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    courseId: '',
    qualifications: '',
    experienceYears: '',
}

function toOptionalInt(value) {
    if (value === '' || value === null || value === undefined) {
        return null
    }

    const parsed = Number.parseInt(String(value), 10)
    return Number.isNaN(parsed) ? null : parsed
}

export default function AdmissionsApplicationForm() {
    const [courses, setCourses] = useState([])
    const [formData, setFormData] = useState(initialFormData)
    const [isLoadingCourses, setIsLoadingCourses] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitState, setSubmitState] = useState({ type: '', message: '' })

    useEffect(() => {
        async function loadCourses() {
            try {
                const data = await apiClient.getCourses({ limit: 100, sortBy: 'name', sortOrder: 'asc' })
                setCourses(Array.isArray(data) ? data : [])
            } catch (error) {
                setCourses([])
            } finally {
                setIsLoadingCourses(false)
            }
        }

        loadCourses()
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitState({ type: '', message: '' })
        setIsSubmitting(true)

        try {
            const payload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                courseId: toOptionalInt(formData.courseId),
                qualifications: formData.qualifications.trim(),
                experienceYears: toOptionalInt(formData.experienceYears),
            }

            await apiClient.submitAdmission(payload)
            setSubmitState({
                type: 'success',
                message: 'Application submitted successfully. Our admissions team will contact you shortly.',
            })
            setFormData(initialFormData)
        } catch (error) {
            setSubmitState({
                type: 'error',
                message: error.message || 'Unable to submit application right now. Please try again.',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="py-20 bg-gray-50 border-t border-gray-200">
            <div className="max-w-5xl mx-auto px-4 lg:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Apply Online</h2>
                    <p className="text-gray-600 text-lg">
                        Submit your details and we will guide you through the complete admission process.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                    {submitState.type === 'success' && (
                        <div className="mb-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-green-800">
                            {submitState.message}
                        </div>
                    )}

                    {submitState.type === 'error' && (
                        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-800">
                            {submitState.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name *
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter first name"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name *
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter last name"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-2">
                                    Preferred Course
                                </label>
                                <select
                                    id="courseId"
                                    name="courseId"
                                    value={formData.courseId}
                                    onChange={handleInputChange}
                                    disabled={isLoadingCourses}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                >
                                    <option value="">{isLoadingCourses ? 'Loading courses...' : 'Select a course'}</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-2">
                                    Experience (Years)
                                </label>
                                <input
                                    id="experienceYears"
                                    name="experienceYears"
                                    type="number"
                                    min="0"
                                    max="40"
                                    value={formData.experienceYears}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="Optional"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-2">
                                Qualifications
                            </label>
                            <textarea
                                id="qualifications"
                                name="qualifications"
                                rows={4}
                                value={formData.qualifications}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your academic qualifications"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
