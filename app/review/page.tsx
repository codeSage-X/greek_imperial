'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface ReviewForm {
  name: string
  phone: string
  email: string
  feedback: string
  stars: number
}

export default function ReviewPage() {
  const [formData, setFormData] = useState<ReviewForm>({
    name: '',
    phone: '',
    email: '',
    feedback: '',
    stars: 0,
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Google Maps place ID
  const GOOGLE_MAPS_PLACE_ID = 'ChIJAYprFRjPaRARGpOwgZJzVds'
  // URL to open review modal directly
  const GOOGLE_MAPS_REVIEW_MODAL_URL = `https://www.google.com/maps/place/?q=place_id:${GOOGLE_MAPS_PLACE_ID}&review=1`

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleStarClick = (star: number) => {
    setFormData({ ...formData, stars: star })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // ⭐ Frontend validation
    if (formData.stars < 1) {
      alert('Please select a star rating')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error('API ERROR:', data)
        alert(data?.error || 'Failed to submit review')
        return
      }

      console.log('Review saved:', data)
      setSubmitted(true)

      // Delay to allow backend processing
      setTimeout(() => {
        window.location.href = GOOGLE_MAPS_REVIEW_MODAL_URL
      }, 700)
    } catch (error) {
      console.error('NETWORK ERROR:', error)
      alert('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center">
          Leave a Review
        </h1>

        <p className="text-lg font-light text-foreground/70 text-center mb-12">
          Share your experience with Greek Imperial
        </p>

        <Card className="p-8 border border-border">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md"
              />
            </div>

          

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md"
              />
            </div>

            {/* Feedback */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Feedback * (max 250  characters)
                </label>
                <textarea
                  name="feedback"
                  required
                  rows={5}
                  maxLength={250} // ← restricts input
                  value={formData.feedback}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md resize-none"
                />
                <p className="text-sm text-foreground/50 mt-1">
                  {formData.feedback.length} / 300
                </p>
              </div>

            {/* Stars */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className={`h-8 w-8 cursor-pointer ${
                      formData.stars >= star
                        ? 'text-yellow-400'
                        : 'text-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <Button disabled={loading} className="w-full">
              {loading ? 'Submitting…' : 'Submit Review'}
            </Button>

            {submitted && (
              <p className="text-green-600 text-center mt-4">
                Review saved! Redirecting to Google Maps…
              </p>
            )}
          </form>
        </Card>
      </div>
    </main>
  )
}
