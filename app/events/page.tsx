'use client'

import { useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import gsap from 'gsap'

export default function Events() {
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

  const upcomingEvents = [
    {
      date: '02/14',
      name: "Valentine's Night",
      img: '/event.png',
      description: 'An evening of romance and elegance with live music and premium champagne service',
    },
    {
      date: '02/21',
      name: 'Imperial Saturdays',
      img: '/event.png',
      description: 'Our weekly premium party night featuring international resident DJs and VIP experiences',
    },
    {
      date: '03/07',
      name: 'Afrobeats Takeover',
      img: '/event.png',
      description: 'Special themed night celebrating the best of African music and culture',
    },
    {
      date: '03/21',
      name: 'Spring Gala',
      img: '/event.png',
      description: 'An exclusive evening of sophistication, elegance, and premium entertainment',
    },
  ]

  const pastEvents = [
    { id: 1, title: 'New Year Countdown 2025', date: '01/01', img: '/event.png' },
    { id: 2, title: 'Grand Opening', date: '12/20/2024', img: '/event.png' },
    { id: 3, title: 'VIP Preview Night', date: '12/15/2024', img: '/event.png' },
    { id: 4, title: 'Soft Launch Event', date: '12/10/2024', img: '/event.png' },
    { id: 5, title: 'Industry Night', date: '12/05/2024', img: '/event.png' },
    { id: 6, title: 'Inaugural Celebration', date: '12/01/2024', img: '/event.png' },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section ref={addToRefs} className="relative py-24 bg-gradient-to-b from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Events</h1>
          <p className="text-xl font-light text-foreground/70">Unforgettable Nights</p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section ref={addToRefs} className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Upcoming Events</h2>
            <p className="text-foreground/70 font-light">Join us for unforgettable nights of luxury and entertainment</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} ref={addToRefs} className="overflow-hidden border border-border hover:border-foreground/50 transition-colors">
                <div className="relative h-64 w-full bg-muted/50">
                  <Image src={event.img} alt={event.name} fill className="object-cover" priority />
                </div>
                <div className="p-6">
                  <span className="text-sm font-semibold tracking-widest text-primary mb-2 block">{event.date}</span>
                  <h3 className="text-2xl font-serif font-bold mb-2">{event.name}</h3>
                  <p className="font-light text-foreground/70 mb-4">{event.description}</p>
                  <Button variant="outline" className="w-full font-light bg-transparent">
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section ref={addToRefs} className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Past Events</h2>
            <p className="text-foreground/70 font-light">Relive our most memorable nights</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map(event => (
              <Card key={event.id} ref={addToRefs} className="overflow-hidden border border-border hover:border-foreground/50 transition-colors">
                <div className="relative h-40 w-full bg-muted/50">
                  <Image src={event.img} alt={event.title} fill className="object-cover" priority />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-primary mb-2">{event.date}</p>
                  <h3 className="font-semibold">{event.title}</h3>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="font-light bg-transparent">Load More</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
