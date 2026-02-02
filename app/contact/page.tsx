'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin } from 'lucide-react'
import gsap from 'gsap'

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    contactMethod: 'email',
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
      stagger: 0.2,
      scrollTrigger: {
        trigger: elements,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section ref={addToRefs} className="relative py-24 bg-gradient-to-b from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-xl font-light text-foreground/70">We're Always Available</p>
        </div>
      </section>

      {/* Main Content */}
      <section ref={addToRefs} className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif font-bold mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                  placeholder="Full Name *"
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md font-light focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="Email *"
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md font-light focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <input
                  type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md font-light focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <select name="subject" value={formData.subject} onChange={handleChange}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md font-light focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="general">General Inquiry</option>
                  <option value="reservation">Table Reservation</option>
                  <option value="private">Private Event</option>
                  <option value="vip">VIP Booking</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  name="message" value={formData.message} onChange={handleChange}
                  placeholder="Message *" rows={5}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-md font-light focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  required
                />
                <div className="flex gap-4">
                  {['email', 'phone', 'whatsapp'].map(method => (
                    <label key={method} className="flex items-center gap-2">
                      <input type="radio" name="contactMethod" value={method}
                        checked={formData.contactMethod === method} onChange={handleChange} className="w-4 h-4" />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
                <Button type="submit" className="w-full font-light tracking-wide">Send Message</Button>
                {submitted && <div className="p-4 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">Thank you! We'll get back to you soon.</div>}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card ref={addToRefs} className="p-6 border border-border">
                <div className="flex gap-4"><Mail className="h-6 w-6 text-primary flex-shrink-0" />
                  <div><h3 className="font-semibold mb-1">Email Us</h3><p>info@greekimperial.com</p></div>
                </div>
              </Card>
              <Card ref={addToRefs} className="p-6 border border-border">
                <div className="flex gap-4"><Phone className="h-6 w-6 text-primary flex-shrink-0" />
                  <div><h3 className="font-semibold mb-1">Call Us</h3><p>+234 (0) 706 0893 264</p></div>
                </div>
              </Card>
              <Card ref={addToRefs} className="p-6 border border-border">
                <div className="flex gap-4"><MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  <div><h3 className="font-semibold mb-1">Visit Us</h3><p>Port Harcourt, Rivers State, Nigeria</p></div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
