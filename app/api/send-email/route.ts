import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs' // REQUIRED for nodemailer in Next.js

export async function POST(req: NextRequest) {
  const { fullName, email, subject, message } = await req.json()

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true, // ✅ REQUIRED for Gmail 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`, // ✅ must be Gmail
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email, // ✅ replies go to user
      subject: `[Contact Form] ${subject}`,
      text: message,
      html: `
        <p>${message}</p>
        <hr />
        <p><strong>From:</strong> ${fullName} (${email})</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
