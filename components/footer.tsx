
import { Instagram, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-8">
          
        <div className="flex flex-col col-span-2 md:col-span-1 text-center md:text-left items-center md:items-start">
        <div className="text-lg font-serif font-bold tracking-wider mb-2">
          GREEK IMPERIAL
        </div>
        <p className="text-sm font-light tracking-wide text-primary-foreground/80">
          Elevated Luxury Experience
        </p>
      </div>


          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest mb-4">
              NAVIGATION
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Menu', href: '/menu' },
                { label: 'Events', href: '/events' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-light hover:text-primary-foreground/80 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest mb-4">
              CONTACT
            </h3>

            <div className="space-y-3 text-sm font-light mb-6">
              <p>+234 703 055 2235</p>
              <p>hr.adaezejonas.creekngreek@gmail.com</p>
              <p className="text-xs text-primary-foreground/70">
                Port Harcourt, Nigeria
              </p>
            </div>

            <div className="flex gap-4">
              <a href="https://www.instagram.com/creekngreekph/" className="hover:opacity-80 transition-opacity">
                <Instagram className="h-5 w-5" />
              </a>
              {/* <Link href="#" className="hover:opacity-80 transition-opacity">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Facebook className="h-5 w-5" />
              </Link> */}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-xs font-light text-primary-foreground/60 text-center">
            © 2025 Greek Imperial. Part of Creek&apos;n&apos;Greek Luxury Resorts. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
