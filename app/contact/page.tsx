'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import gsap from 'gsap'

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'general',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
  }

  useEffect(() => {
    const elements = sectionsRef.current
    gsap.from(elements, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Email failed')
      setSubmitted(true)
      setFormData({ fullName: '', email: '', subject: 'general', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      console.error(err)
      alert('Failed to send email. Please try again.')
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section ref={addToRefs} className="relative py-24 bg-gradient-to-b from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Contact Us</h1>
        </div>
      </section>

      {/* Main Content */}
      <section ref={addToRefs} className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div id="contact-form" className="space-y-6 border-1 border-slate-600 p-8 rounded-lg">
              <h2 className="text-2xl font-serif font-bold">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name *"
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email *"
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="general">General Inquiry</option>
                  <option value="reservation">Table Reservation</option>
                  <option value="private">Private Event</option>
                  <option value="vip">VIP Booking</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message *"
                  rows={5}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  required
                />
                <Button type="submit" className="w-full font-light tracking-wide">
                  Send Message
                </Button>
                {submitted && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
                    Thank you! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Email */}
              <Card
                ref={addToRefs}
                className="p-6 bg-zinc-900 border border-zinc-700/50 rounded-2xl hover:border-zinc-600 transition-colors cursor-pointer"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="flex flex-row items-center gap-5">
                  <Mail className="h-7 w-7 text-zinc-400 flex-shrink-0" strokeWidth={1.5} />
                  <div className="text-left">
                    <h3 className="font-semibold text-white">Email Us</h3>
                    <p className="text-sm text-zinc-400">info@greekimperial.com</p>
                  </div>
                </div>
              </Card>

              {/* WhatsApp */}
              <Card
                ref={addToRefs}
                className="p-6 bg-zinc-900 border border-zinc-700/50 rounded-2xl hover:border-zinc-600 transition-colors cursor-pointer"
                onClick={() => window.open('https://wa.me/2347060893264', '_blank')}
              >
                <div className="flex flex-row items-center gap-5">
                  <MessageCircle className="h-7 w-7 text-green-500 flex-shrink-0" strokeWidth={1.5} />
                  <div className="text-left">
                    <h3 className="font-semibold text-white">WhatsApp</h3>
                    <p className="text-sm text-zinc-400">+234 706 0893 264</p>
                  </div>
                </div>
              </Card>

              {/* Visit Us */}
              <Card
                ref={addToRefs}
                className="p-6 bg-zinc-900 border border-zinc-700/50 rounded-2xl hover:border-zinc-600 transition-colors cursor-pointer"
                onClick={() =>
                  window.open(
                    'https://www.google.com/maps/place/Greek+Imperial+Nightlife,+Port+Harcourt',
                    '_blank'
                  )
                }
              >
                <div className="flex flex-row items-center gap-5">
                  <MapPin className="h-7 w-7 text-zinc-400 flex-shrink-0" strokeWidth={1.5} />
                  <div className="text-left">
                    <h3 className="font-semibold text-white">Visit Us</h3>
                    <p className="text-sm text-zinc-400">Port Harcourt, Rivers State, Nigeria</p>
                  </div>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}