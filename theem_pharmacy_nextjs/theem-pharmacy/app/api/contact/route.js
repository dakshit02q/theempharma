import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response'
import { getMissingFields } from '@/lib/api/validation'
import nodemailer from 'nodemailer'

function toPort(value, fallback = 587) {
    const parsed = Number.parseInt(String(value), 10)
    return Number.isNaN(parsed) ? fallback : parsed
}

function isSmtpConfigured() {
    return Boolean(
        process.env.SMTP_HOST &&
        process.env.SMTP_PORT &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS &&
        (process.env.SMTP_FROM || process.env.SMTP_USER) &&
        (process.env.CONTACT_EMAIL || process.env.SMTP_USER)
    )
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

async function forwardContactEmail({ name, email, phone, subject, message, submissionId }) {
    if (!isSmtpConfigured()) {
        return { attempted: false, sent: false, reason: 'SMTP not configured' }
    }

    const smtpPort = toPort(process.env.SMTP_PORT)
    const isSecure = smtpPort === 465

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: isSecure,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone || 'Not provided')
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')

    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        replyTo: email,
        subject: `[Theem Contact] ${subject}`,
        text: [
            `Submission ID: ${submissionId || 'N/A'}`,
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || 'Not provided'}`,
            `Subject: ${subject}`,
            '',
            message,
        ].join('\n'),
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Submission ID:</strong> ${escapeHtml(submissionId || 'N/A')}</p>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <p><strong>Message:</strong><br/>${safeMessage}</p>
        `,
    })

    return { attempted: true, sent: true }
}

export async function POST(request) {
    try {
        const { name, email, phone, subject, message } = await request.json()

        // Validate required fields
        const missingFields = getMissingFields(
            { name, email, subject, message },
            ['name', 'email', 'subject', 'message']
        )

        if (missingFields.length > 0) {
            return apiError('Missing required fields', {
                status: 400,
                details: { missingFields },
            })
        }

        const newSubmission = await db
            .insert(contactSubmissions)
            .values({
                name,
                email,
                phone,
                subject,
                message,
                status: 'new',
            })
            .returning()

        const submission = newSubmission[0]

        let smtpResult = { attempted: false, sent: false }
        try {
            smtpResult = await forwardContactEmail({
                name,
                email,
                phone,
                subject,
                message,
                submissionId: submission?.id,
            })
        } catch (smtpError) {
            console.error('SMTP forward failed (non-blocking):', smtpError)
            smtpResult = {
                attempted: true,
                sent: false,
                reason: 'SMTP send failed',
            }
        }

        return apiSuccess(
            {
                id: submission?.id,
                name,
                email,
                phone,
                subject,
                smtpForwarded: smtpResult.sent,
            },
            {
                message: 'Contact form submitted successfully',
                meta: {
                    smtpAttempted: smtpResult.attempted,
                    smtpReason: smtpResult.reason,
                },
            }
        )

    } catch (error) {
        return handleApiError(error, 'Contact form error:', 'Failed to submit contact form')
    }
}

// Handle other HTTP methods
export async function GET() {
    return apiError('Method not allowed', { status: 405 })
}