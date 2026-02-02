'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronDown, Wine, Music, Sparkles, Volume2, VolumeX } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  useEffect(() => {
    // Hero Animation on page load
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll('.animate-onload')
      gsap.from(heroElements, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      })
    }

    // Scroll Animations for other sections
    const sections = document.querySelectorAll('.animate-onscroll')
    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        duration: 1,
        ease: 'power3.out',
      })
    })
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/club_vid.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Sound Control Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-8 right-8 z-20 p-3 rounded-full border border-white/30 hover:border-white/60 bg-black/40 hover:bg-black/60 transition-all"
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-white" />
          ) : (
            <Volume2 className="h-5 w-5 text-white" />
          )}
        </button>

        <div ref={heroRef} className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8 animate-onload">
            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/logo.png"
                alt="Greek Imperial Logo"
                width={250}
                height={250}
                className="w-[150px] md:w-[250px] h-auto" // Responsive: smaller on mobile
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-4 text-white animate-onload">
              GREEK IMPERIAL
            </h1>
            <p className="text-lg md:text-2xl font-light tracking-wide text-white/80 animate-onload">
              Where Nightlife Meets Luxury
            </p>
          </div>

          <div className="flex gap-4 justify-center mb-12 flex-wrap animate-onload">
            <Link href="/contact">
              <Button size="lg" className="font-light tracking-wide bg-white text-black hover:bg-gray-100">
                Reserve a Table
              </Button>
            </Link>
            <Link href="/events">
              <Button
                size="lg"
                variant="outline"
                className="font-light tracking-wide bg-transparent border-white text-white hover:bg-white/10"
              >
                View Events
              </Button>
            </Link>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce animate-onload">
            <ChevronDown className="h-6 w-6 text-white/60" />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-background animate-onscroll">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Port Harcourt's Premier Nightlife</h2>
          <p className="text-lg font-light text-foreground/70 leading-relaxed">
            Experience sophisticated elegance at Greek Imperial, where every detail is crafted to deliver an unforgettable evening. 
            From our world-class DJs to premium cocktails and VIP experiences, we redefine luxury nightlife in Nigeria.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30 animate-onscroll">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Why Choose Greek Imperial</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'VIP Experience',
                description: 'Private booths, bottle service, and exclusive access to premium lounges',
              },
              {
                icon: Music,
                title: 'World-Class DJs',
                description: 'International and local talent delivering unforgettable music experiences',
              },
              {
                icon: Wine,
                title: 'Premium Drinks',
                description: 'Curated selection of champagne, spirits, and signature cocktails',
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-8 text-center border border-border hover:border-foreground/50 transition-colors">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-serif font-bold mb-3">{feature.title}</h3>
                  <p className="font-light text-foreground/70">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-24 bg-background animate-onscroll">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Our Events</h2>
            <p className="text-foreground/70 font-light">Join us for unforgettable nights of luxury and entertainment</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {[
              {
                date: '02/14',
                name: 'Valentines Night',
                img: '/event.png',
                description: 'An evening of romance and elegance with live music and premium champagne service',
              },
              {
                date: '02/21',
                name: 'Imperial Saturdays',
                img: '/event.png',
                description: 'Our weekly premium party night featuring international resident DJs and VIP experiences',
              },
            ].map((event, index) => (
              <Card
                key={index}
                className="overflow-hidden border border-border hover:border-foreground/50 transition-colors"
              >
                <div className="relative h-64 w-full bg-red-400">
                  <Image
                    src={event.img}
                    alt="event"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="p-6">
                  <span className="text-sm font-semibold tracking-widest text-primary mb-2 block">
                    {event.date}
                  </span>
                  <h3 className="text-2xl font-serif font-bold mb-2">
                    {event.name}
                  </h3>
                  <p className="font-light text-foreground/70 mb-4">
                    {event.description}
                  </p>
                  <Link href="/events">
                    <Button variant="outline" className="w-full font-light bg-transparent">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/events">
              <Button size="lg" variant="outline" className="font-light tracking-wide bg-transparent">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ...Rest of sections remain, add className="animate-onscroll" to sections you want animated */}
    </main>
  )
}
