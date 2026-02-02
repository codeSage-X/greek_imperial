'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface ReviewForm {
  name: string
  whatsapp: string
  phone: string
  email: string
  feedback: string
  stars: number
}

export default function ReviewPage() {
  const [formData, setFormData] = useState<ReviewForm>({
    name: '',
    whatsapp: '',
    phone: '',
    email: '',
    feedback: '',
    stars: 0,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const GOOGLE_MAPS_PLACE_ID = 'ChIJAYprFRjPaRARGpOwgZJzVds'
  const GOOGLE_MAPS_REVIEW_URL = `https://www.google.com/maps/place/?q=place_id:${GOOGLE_MAPS_PLACE_ID}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleStarClick = (star: number) => {
    setFormData({ ...formData, stars: star })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Submit to your API route
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)

        // Redirect to Google Maps review page
        window.location.href = GOOGLE_MAPS_REVIEW_URL
      } else {
        alert('Failed to submit review. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred. Please try again.')
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
              <label className="block text-sm font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 font-light"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-semibold mb-2">WhatsApp Number</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+234 XXX XXX XXXX"
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 font-light"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 XXX XXX XXXX"
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 font-light"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 font-light"
              />
            </div>

            {/* Feedback */}
            <div>
              <label className="block text-sm font-semibold mb-2">Feedback *</label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Write your review here..."
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 font-light resize-none"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-semibold mb-2">Rating *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-8 w-8 cursor-pointer transition-colors ${
                      formData.stars >= star ? 'text-yellow-400' : 'text-foreground/50'
                    }`}
                    onClick={() => handleStarClick(star)}
                  />
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full font-light tracking-wide" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Review'}
            </Button>

            {submitted && (
              <p className="text-green-600 font-light mt-4 text-center">
                Thank you for your review! Redirecting to Google Maps...
              </p>
            )}
          </form>
        </Card>
      </div>
    </main>
  )
}
