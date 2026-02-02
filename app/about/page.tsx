'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Card } from '@/components/ui/card'
import { Users, Music, Shield, Volume2, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const elements = sectionsRef.current
    gsap.from(elements, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: elements,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section ref={addToRefs} className="relative py-24 bg-gradient-to-b from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">About Greek Imperial</h1>
          <p className="text-xl font-light text-foreground/70">Elevated Luxury Since 2025</p>
        </div>
      </section>

      {/* Our Story */}
      <section ref={addToRefs} className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden border border-border flex items-center justify-center bg-black">
              <Image src="/logo.png" alt="Greek Imperial Logo" fill className="object-contain p-10" priority />
            </div>

            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">Our Story</h2>
              <p className="font-light text-foreground/70 leading-relaxed mb-4">
                Greek Imperial was established in 2025 as a premier destination for luxury nightlife in Port Harcourt.
                As part of the Creek'n'Greek Luxury Resorts family, we combine sophisticated elegance with world-class entertainment.
              </p>
              <p className="font-light text-foreground/70 leading-relaxed">
                Every element of Greek Imperial—from our architectural design to our carefully curated beverage selection—
                reflects our commitment to delivering an unforgettable experience. We are more than a nightclub; we are a lifestyle destination where memories are created.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Hours */}
      <section ref={addToRefs} className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">Operating Hours</h2>
          <Card className="p-8 border border-border">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4 font-light">
                  {[
                    { day: 'Thursday', hours: '10:00 PM - 4:00 AM' },
                    { day: 'Friday', hours: '10:00 PM - 5:00 AM' },
                    { day: 'Saturday', hours: '10:00 PM - 5:00 AM' },
                    { day: 'Sunday', hours: '8:00 PM - 2:00 AM' },
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between">
                      <span className="font-semibold">{item.day}</span>
                      <span className="text-foreground/70">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-light text-foreground/70 mb-3">
                  <span className="font-semibold text-foreground">Monday - Wednesday:</span> Closed (Available for Private Events)
                </p>
                <p className="font-light text-foreground/70">
                  <span className="font-semibold text-foreground">Note:</span> Sunday service restricted to special events only.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* What We Offer */}
      <section ref={addToRefs} className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'VIP Sections', description: 'Exclusive private booths with dedicated service' },
              { icon: Music, title: 'Bottle Service', description: 'Premium selection with expert mixology' },
              { icon: Shield, title: 'Private Events', description: 'Host your celebration in our luxury space' },
              { icon: Volume2, title: 'Live DJs', description: 'International and local talent every night' },
              { icon: Music, title: 'Premium Sound', description: 'State-of-the-art audio and visual systems' },
              { icon: MapPin, title: 'Secure Parking', description: 'Valet and secure parking available' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={index}
                  ref={addToRefs}
                  className="p-8 text-center border border-border hover:border-foreground/50 transition-colors"
                >
                  <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="font-light text-foreground/70">{item.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Dress Code */}
      <section ref={addToRefs} className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">Dress Code</h2>
          <Card className="p-8 border border-border">
            <div className="text-center">
              <p className="text-xl font-semibold mb-4">Smart Casual to Formal</p>
              <p className="font-light text-foreground/70 mb-6">
                We maintain an elevated dress code to preserve the sophisticated atmosphere of our venue.
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="font-light text-foreground/70">
                  <span className="font-semibold text-foreground">NOT Permitted:</span> Sportswear, slippers, shorts, or casual athletic wear
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Age Policy */}
      <section ref={addToRefs} className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">Age Policy</h2>
          <Card className="p-8 border border-border">
            <div className="text-center">
              <p className="text-3xl font-bold mb-4 text-primary">21+</p>
              <p className="font-light text-foreground/70 mb-4">
                Strictly enforced. Valid government-issued ID is required for all guests.
              </p>
              <p className="font-light text-foreground/70">
                This policy is in place to ensure the safety and enjoyment of all our guests in our premium adult venue.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}
