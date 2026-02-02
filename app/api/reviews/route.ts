import { google } from 'googleapis'
import { NextResponse } from 'next/server'

type Review = {
  name: string
  whatsapp?: string
  phone?: string
  email: string
  feedback: string
  stars: number
}

// TODO: Replace with your Google Service Account credentials
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n')
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!

export async function POST(req: Request) {
  try {
    const review: Review = await req.json()

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: SERVICE_ACCOUNT_EMAIL,
        private_key: PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const values = [
      [
        review.name,
        review.whatsapp || '',
        review.phone || '',
        review.email,
        review.feedback,
        review.stars,
        new Date().toISOString(),
      ],
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Reviews!A:G', // Make sure you have a sheet named "Reviews"
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, error: 'Failed to save review' }, { status: 500 })
  }
}
