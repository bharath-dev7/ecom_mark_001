import Link from 'next/link';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] mt-auto">
      {/* Top divider */}
      <div className="divider-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-3xl font-bold text-gradient-gold">
                सारी
              </span>
              <span className="block font-display text-sm text-[var(--color-text-muted)] italic mt-1">
                Collection
              </span>
            </Link>
            <p className="text-sm text-[var(--color-text-dim)] leading-relaxed max-w-xs">
              Curating India&apos;s finest handloom sarees from master weavers
              across the country. Every thread weaves a story of tradition and
              elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold text-[var(--color-cream)] uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/shop', label: 'Shop All' },
                { href: '/about', label: 'Our Story' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/cart', label: 'Shopping Bag' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-gold)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-sm font-semibold text-[var(--color-cream)] uppercase tracking-wider mb-4">
              Collections
            </h3>
            <ul className="space-y-2.5">
              {['Silk Sarees', 'Cotton Sarees', 'Georgette Sarees', 'Wedding Collection', 'Casual Wear'].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href="/shop"
                      className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-gold)] transition-colors duration-200"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-sm font-semibold text-[var(--color-cream)] uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[var(--color-gold)] mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+919347365885"
                  className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-gold)] transition-colors"
                >
                  +91 93473 65885
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[var(--color-gold)] mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:hello@saricollection.com"
                  className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-gold)] transition-colors"
                >
                  hello@saricollection.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--color-gold)] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[var(--color-text-dim)]">
                  Hyderabad, Telangana, India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-text-dim)]">
            © {new Date().getFullYear()} सारी Collection. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-dim)] flex items-center gap-1">
            Made with{' '}
            <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
