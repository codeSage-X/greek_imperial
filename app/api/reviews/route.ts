import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs' // IMPORTANT for googleapis

type Review = {
  name: string
  whatsapp?: string
  phone?: string
  email: string
  feedback: string
  stars: number
}

export async function POST(req: Request) {
  try {
    const {
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY,
      GOOGLE_SHEET_ID,
    } = process.env

    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const PRIVATE_KEY = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')

    const review: Review = await req.json()

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Reviews!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          review.name,
          review.whatsapp || '',
          review.phone || '',
          review.email,
          review.feedback,
          review.stars,
          new Date().toISOString(),
        ]],
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { success: false, error: 'Failed to save review' },
      { status: 500 }
    )
  }
}
