'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { ZoomIn, Play, Pause, Volume2, VolumeX } from 'lucide-react'

type FilterTab = 'all' | 'interior' | 'events' | 'vip' | 'atmosphere'

interface VideoState {
  id: number
  isPlaying: boolean
  isMuted: boolean
}

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [videoStates, setVideoStates] = useState<VideoState[]>([
    { id: 1, isPlaying: false, isMuted: false },
    { id: 2, isPlaying: false, isMuted: false },
  ])

  const galleryItems = [
    { id: 1, category: 'interior', title: 'Main Lounge', image: '/gallery_pic1.png' },
    { id: 2, category: 'events', title: 'DJ Performance', image: '/gallery_pic2.png' },
    { id: 3, category: 'vip', title: 'VIP Booth', image: '/gallery_pic3.png' },
    { id: 4, category: 'atmosphere', title: 'Evening Ambiance', image: '/gallery_pic4.png' },
    { id: 5, category: 'interior', title: 'Bar Area', image: '/gallery_pic5.png' },
    { id: 6, category: 'events', title: 'Crowd Energy', image: '/gallery_pic6.png' },
    { id: 7, category: 'vip', title: 'Premium Seating', image: '/gallery_pic7.png' },
    { id: 8, category: 'interior', title: 'Dance Floor', image: '/gallery_pic8.png' },
    { id: 9, category: 'atmosphere', title: 'Lighting Design', image: '/gallery_pic9.png' },
    { id: 10, category: 'events', title: 'Live Entertainment', image: '/gallery_pic10.png' },
    { id: 11, category: 'vip', title: 'Bottle Service', image: '/gallery_pic11.png' },
    { id: 12, category: 'atmosphere', title: 'Entrance Hall', image: '/gallery_pic12.png' },
  ]

  const filteredItems = activeTab === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab)

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">The Vibez</h1>
          <p className="text-xl font-light text-foreground/70">Captured Moments</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as FilterTab)}>
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5 bg-muted/30">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="interior">Interior</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="vip">VIP</TabsTrigger>
              <TabsTrigger value="atmosphere">Atmosphere</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden border border-border hover:border-foreground/50 transition-all cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm font-light text-foreground/70 capitalize">{item.category}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Club Vibes</h2>
          <div className="grid md:grid-cols-2 gap-8 py-16">
            {[
              { id: 1, title: 'Weekend Energy', duration: '2:45', src: '/vid2.mp4' },
              { id: 2, title: 'DJ Sessions', duration: '3:20', src: '/vid3.mp4' },
            ].map((video) => {
              const videoState = videoStates.find(v => v.id === video.id) || { isPlaying: false, isMuted: false }
              return (
                <Card key={video.id} className=" overflow-hidden border border-border group">
                  <div className="relative h-[80%] aspect-video bg-black flex items-center justify-center">
                    <video
                      data-id={video.id}
                      muted={videoState.isMuted}
                      controls={true}
                      className="w-full h-full object-cover"
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>

                    {/* Controls Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button
                        onClick={() => {
                          const videoElement = document.querySelector(`video[data-id="${video.id}"]`) as HTMLVideoElement
                          if (videoElement) {
                            videoState.isPlaying ? videoElement.pause() : videoElement.play()
                            setVideoStates(videoStates.map(v =>
                              v.id === video.id ? { ...v, isPlaying: !v.isPlaying } : v
                            ))
                          }
                        }}
                        className="p-3 rounded-full bg-white/90 hover:bg-white transition-all text-black"
                      >
                        {videoState.isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6" />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setVideoStates(videoStates.map(v =>
                            v.id === video.id ? { ...v, isMuted: !v.isMuted } : v
                          ))
                        }}
                        className="p-3 rounded-full bg-white/90 hover:bg-white transition-all text-black"
                      >
                        {videoState.isMuted ? (
                          <VolumeX className="h-6 w-6" />
                        ) : (
                          <Volume2 className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 h-[20%]">
                    <h3 className="font-semibold">{video.title}</h3>
                    <p className="text-sm font-light text-foreground/70">{video.duration}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
