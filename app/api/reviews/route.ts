import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs' // REQUIRED for googleapis

type Review = {
  name: string
  phone?: string
  email: string
  feedback: string
  stars: number | string
}

// -------------------
// POST: Add a review
// -------------------
export async function POST(req: Request) {
  try {
    const {
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY,
      GOOGLE_SHEET_ID,
    } = process.env

    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
      throw new Error('Missing Google Sheets environment variables')
    }

    const review: Review = await req.json()

    if (!review?.name || !review?.email || !review?.feedback) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const stars = Number(review.stars)
    if (Number.isNaN(stars) || stars < 1 || stars > 5) {
      return NextResponse.json({ error: 'Stars must be a number between 1 and 5' }, { status: 400 })
    }

    const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Sheet1!A:F',          // 6 columns
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS', // Always append at bottom
      requestBody: {
        values: [[
          review.name || '',
          review.phone || '',
          review.email || '',
          review.feedback || '',
          stars,
          new Date().toISOString(),
        ]],
      },
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('❌ [REVIEWS POST ERROR]', err)
    return NextResponse.json({ success: false, error: err?.message || 'Failed to save review' }, { status: 500 })
  }
}

// -------------------
// GET: Fetch all reviews
// -------------------
export async function GET() {
  try {
    const {
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY,
      GOOGLE_SHEET_ID,
    } = process.env

    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
      throw new Error('Missing Google Sheets environment variables')
    }

    const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Sheet1!A:F', // Match the 6 columns
    })

    const rows = response.data.values || []

    // Skip header row if you have headers
    const dataRows = rows[0]?.[0] === 'Name' ? rows.slice(1) : rows

    const reviews = dataRows.map((row) => ({
      name: row[0] || '',
      phone: row[1] || '',
      email: row[2] || '',
      feedback: row[3] || '',
      stars: Number(row[4]) || 0,
      date: row[5] || '',
    }))

    return NextResponse.json(reviews)
  } catch (err: any) {
    console.error('❌ [REVIEWS GET ERROR]', err)
    return NextResponse.json({ error: err?.message || 'Failed to fetch reviews' }, { status: 500 })
  }
}
