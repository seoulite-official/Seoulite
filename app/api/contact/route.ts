import { NextResponse, NextRequest } from 'next/server'
import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_FORM_RECIPIENT = process.env.CONTACT_FORM_RECIPIENT || 'admin@seoulite.local'

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

import { createContactMessage } from '@/app/lib/server/contactMessages';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Send email using Resend (only if API key is configured)
    if (resend) {
      await resend.emails.send({
        from: 'Seoulite Contact Form <onboarding@resend.dev>',
        to: CONTACT_FORM_RECIPIENT,
        subject: `New contact form submission from ${name}`,
        replyTo: email,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      })
    } else {
      // Fallback: log the submission if Resend is not configured
      console.log('Contact form submission (Resend not configured):', { name, email, message })
    }

    // Save the message to the database
      await createContactMessage({ name, email, message });
      return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}