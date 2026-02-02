'use client'

import { useEffect, useRef, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import gsap from 'gsap'

export default function Menu() {
  const menuRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState('whiskey')

  const menuSections = [
    {
      id: 'whiskey',
      label: 'Whiskey',
      items: [
        { name: 'Black Label', price: '₦100,000' },
        { name: 'Gold Label', price: '₦150,000' },
        { name: 'Blue Label', price: '₦150,000' },
        { name: 'Johnnie Walker 18yrs', price: '₦900,000' },
        { name: 'Johnnie Walker Blonde', price: '₦60,000' },
        { name: 'Singleton 12yrs', price: '₦250,000' },
        { name: 'Singleton 15yrs', price: '₦120,000' },
        { name: 'Singleton 18yrs', price: '₦200,000' },
        { name: 'Jack Daniels', price: '₦350,000' },
        { name: 'Monkey Shoulder', price: '₦100,000' },
        { name: 'Smokey Monkey', price: '₦120,000' },
        { name: 'Macallan 12yrs', price: '₦125,000' },
        { name: 'Macallan 15yrs', price: '₦200,000' },
        { name: 'Macallan Rare Cask', price: '₦900,000' },
        { name: 'Glenmorangie 10yrs', price: '₦1,250,000' },
        { name: 'Glenmorangie 12yrs', price: '₦150,000' },
        { name: 'Glenmorangie 18yrs', price: '₦350,000' },
        { name: 'Glenmorangie Signet', price: '₦1,000,000' },
        { name: 'The Balvenie 14yrs', price: '₦300,000' },
        { name: 'American Honey', price: '₦50,000' },
        { name: 'Chivas 12yrs', price: '₦125,000' },
        { name: 'Chivas 15yrs', price: '₦180,000' },
        { name: 'Teeling Small Batch', price: '₦125,000' },
        { name: 'Teeling Single Grain', price: '₦100,000' },
        { name: 'Fercullen Small Batch Falls', price: '₦125,000' },
        { name: 'Fercullen Single Malt', price: '₦150,000' },
        { name: 'Fercullen 15yrs', price: '₦200,000' },
        { name: 'Glenfiddich 12yrs', price: '₦150,000' },
        { name: 'Glenfiddich 15yrs', price: '₦200,000' },
        { name: 'Glenfiddich 18yrs', price: '₦250,000' },
        { name: 'Glenfiddich 21yrs', price: '₦650,000' },
        { name: 'Glenfiddich 23yrs', price: '₦1,300,000' },
        { name: 'Glenlivet 12yrs', price: '₦150,000' },
        { name: 'Glenlivet 15yrs', price: '₦200,000' },
        { name: 'The Observatory 20yrs', price: '₦125,000' },
        { name: 'Jameson Black', price: '₦100,000' },
        { name: 'Jameson Green', price: '₦60,000' },
        { name: 'Kirkcowan Single Malt', price: '₦90,000' },
        { name: 'Gold Bar Original', price: '₦250,000' },
      ],
    },
    {
      id: 'cognac',
      label: 'Cognac',
      items: [
        { name: 'Hennessey VS', price: '₦125,000' },
        { name: 'Hennessy VSOP', price: '₦200,000' },
        { name: 'Hennessy XO', price: '₦800,000' },
        { name: 'Martell VS', price: '₦125,000' },
        { name: 'Martell Blue Swift', price: '₦200,000' },
        { name: 'Martell XO', price: '₦750,000' },
        { name: 'Rémy Martin VSOP', price: '₦180,000' },
        { name: 'Rémy Martin XO', price: '₦700,000' },
        { name: 'Deau VSOP', price: '₦104,000' },
        { name: 'Deau VS', price: '₦650,000' },
        { name: 'Teeling 21yrs', price: '₦650,000' },
      ],
    },
    {
      id: 'champagne',
      label: 'Champagne',
      items: [
        { name: 'Belaire', price: '₦125,000' },
        { name: 'Bottega', price: '₦125,000' },
        { name: 'Veuve Rich', price: '₦250,000' },
        { name: 'Veuve Clicquot Brut', price: '₦200,000' },
        { name: 'Moët Rosé', price: '₦240,000' },
        { name: 'Moët Ice', price: '₦250,000' },
        { name: 'Moët Brut', price: '₦180,000' },
        { name: 'Dom Pérignon', price: '₦1,000,000' },
        { name: 'Cristal', price: '₦1,100,000' },
        { name: 'Ace of Spades', price: '₦1,100,000' },
        { name: 'Angelus Premium', price: '₦150,000' },
      ],
    },
    {
      id: 'tequila',
      label: 'Tequila',
      items: [
        { name: 'Volcán Blanco', price: '₦175,000' },
        { name: 'Volcán XA', price: '₦650,000' },
        { name: 'Don Julio', price: '₦800,000' },
        { name: 'Don Julio Reposado', price: '₦350,000' },
        { name: 'Casamigos', price: '₦400,000' },
        { name: 'Olmeca Tequila', price: '₦70,000' },
        { name: 'Bun Amigo Tequila', price: '₦70,000' },
        { name: 'Sierra Tequila', price: '₦85,000' },
        { name: 'Aman Tequila Rosa', price: '₦250,000' },
        { name: 'Aman Tequila Blanco', price: '₦250,000' },
        { name: 'Aman Tequila Añejo', price: '₦600,000' },
        { name: 'Aman Tequila Cristalino', price: '₦600,000' },
      ],
    },
    {
      id: 'wine',
      label: 'Wine',
      items: [
        { name: 'Four Cousin (Sweet)', price: '₦25,000' },
        { name: 'Lamoth Parrot (Sweet)', price: '₦25,000' },
        { name: 'Carlo Rossi (Sour)', price: '₦25,000' },
        { name: 'Drostdy Hof', price: '₦25,000' },
        { name: 'Sweet Kiss (Sweet)', price: '₦25,000' },
        { name: '4th Street', price: '₦25,000' },
        { name: 'Declan', price: '₦25,000' },
      ],
    },
    {
      id: 'beer',
      label: 'Beer',
      items: [
        { name: 'Heineken', price: '₦3,000' },
        { name: 'Smirnoff Ice', price: '₦3,000' },
        { name: 'Desperado', price: '₦3,000' },
        { name: 'Star Radler', price: '₦3,000' },
        { name: 'Flying Fish', price: '₦3,000' },
        { name: 'Guinness', price: '₦3,000' },
      ],
    },
    {
      id: 'soft-drinks',
      label: 'Soft Drinks',
      items: [
        { name: 'Coke', price: '₦2,000' },
        { name: 'Sprite', price: '₦2,000' },
        { name: 'Malt', price: '₦2,500' },
        { name: 'Cranberry', price: '₦15,000' },
        { name: 'Water', price: '₦1,000' },
        { name: 'Junic Water', price: '₦2,000' },
        { name: 'Red Bull', price: '₦4,000' },
        { name: 'Red Bull Sugarfree', price: '₦4,000' },
        { name: 'Juvie Juice', price: '₦5,000' },
        { name: 'Hollandia Juice', price: '₦5,000' },
        { name: 'Chivita Juice', price: '₦5,000' },
      ],
    },
  ]

  const animateMenuItems = () => {
    const items = menuRef.current?.querySelectorAll('.menu-item')
    if (items && items.length > 0) {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: 'power3.out',
        }
      )
    }
  }

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(animateMenuItems, 50)
    return () => clearTimeout(timer)
  }, [activeTab])

  const handleTabChange = (value: string) => {
    // Reset items before animating
    const items = menuRef.current?.querySelectorAll('.menu-item')
    if (items) {
      gsap.set(items, { opacity: 0, y: 30, scale: 0.95 })
    }
    setActiveTab(value)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Our Menu</h1>
          <p className="text-xl font-light text-foreground/70">Premium Selections</p>
        </div>
      </section>

      {/* Menu Tabs */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-10 bg-transparent h-auto">
              {menuSections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="px-4 py-2 text-sm font-medium border border-border data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:border-foreground transition-all"
                >
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {menuSections.map((section) => (
              <TabsContent key={section.id} value={section.id}>
                <div ref={menuRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className="menu-item p-5 border border-border bg-muted/30 hover:border-foreground/50 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-base font-medium">{item.name}</h3>
                        <span className="text-foreground/80 font-semibold whitespace-nowrap ml-4 text-sm">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Note */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="p-8 border border-border bg-muted/30">
            <p className="font-light text-foreground/70">
              Prices subject to change. Contact us for reservations and VIP packages.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}