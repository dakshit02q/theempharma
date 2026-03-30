import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const { name, email, phone, subject, message } = await request.json()

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Create transporter (you'll need to configure this with your email service)
        // For now, we'll just log the contact form data
        console.log('Contact Form Submission:', {
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString()
        })

        // TODO: Uncomment and configure when you have email service setup
        // const transporter = nodemailer.createTransporter({
        //   host: process.env.SMTP_HOST,
        //   port: process.env.SMTP_PORT,
        //   secure: false,
        //   auth: {
        //     user: process.env.SMTP_USER,
        //     pass: process.env.SMTP_PASS,
        //   },
        // })

        // const mailOptions = {
        //   from: process.env.SMTP_FROM,
        //   to: process.env.CONTACT_EMAIL,
        //   subject: `Contact Form: ${subject}`,
        //   html: `
        //     <h2>New Contact Form Submission</h2>
        //     <p><strong>Name:</strong> ${name}</p>
        //     <p><strong>Email:</strong> ${email}</p>
        //     <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        //     <p><strong>Subject:</strong> ${subject}</p>
        //     <p><strong>Message:</strong></p>
        //     <p>${message.replace(/\n/g, '<br>')}</p>
        //   `,
        // }

        // await transporter.sendMail(mailOptions)

        // For now, simulate successful email sending
        await new Promise(resolve => setTimeout(resolve, 1000))

        return NextResponse.json(
            { message: 'Contact form submitted successfully' },
            { status: 200 }
        )

    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to submit contact form' },
            { status: 500 }
        )
    }
}

// Handle other HTTP methods
export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}