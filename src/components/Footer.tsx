import Link from 'next/link';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';
import { RoyalCrestLogo } from './OrnamentalIcons';

export default function Footer() {
  return (
    <footer className="bg-[#38030B] text-[#E8C86B] border-t-2 border-[#C59B27] mt-auto font-serif">
      {/* Decorative Gold Border Line */}
      <div className="bg-[#6A091A] text-[10px] tracking-[0.3em] uppercase text-center py-2 border-b border-[#C59B27]/40 text-[#E8C86B]">
        ❖ ZEYANA — HERITAGE HANDLOOM SAREES & ROYAL ETHNIC WEAR ❖
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Crest */}
          <div className="space-y-4 text-center sm:text-left">
            <Link href="/" className="inline-block">
              <RoyalCrestLogo className="scale-95" />
            </Link>
            <p className="text-xs text-[#EBE2D0] leading-relaxed max-w-xs font-sans">
              Curating India&apos;s finest handloom sarees from master weavers across Varanasi, Kanchipuram, and Chanderi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-sm font-bold text-[#FFFDF8] uppercase tracking-[0.2em] mb-4 border-b border-[#C59B27]/30 pb-2">
              QUICK LINKS
            </h3>
            <ul className="space-y-2.5 text-xs text-[#EBE2D0]">
              {[
                { href: '/shop', label: 'EXPLORE COLLECTIONS' },
                { href: '/about', label: 'OUR HERITAGE' },
                { href: '/contact', label: 'BOUTIQUE CONTACT' },
                { href: '/cart', label: 'ROYAL BAG' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#E8C86B] transition-colors"
                  >
                    ❖ {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-serif text-sm font-bold text-[#FFFDF8] uppercase tracking-[0.2em] mb-4 border-b border-[#C59B27]/30 pb-2">
              FEATURED CRAFTS
            </h3>
            <ul className="space-y-2.5 text-xs text-[#EBE2D0]">
              {['Kanjivaram Silk Sarees', 'Royal Banarasi Brocades', 'Chanderi & Organza', 'Bridal Lehenga Choli', 'Festive Collection'].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href="/shop"
                      className="hover:text-[#E8C86B] transition-colors"
                    >
                      ❖ {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-sm font-bold text-[#FFFDF8] uppercase tracking-[0.2em] mb-4 border-b border-[#C59B27]/30 pb-2">
              ROYAL CONCIERGE
            </h3>
            <ul className="space-y-3 text-xs text-[#EBE2D0]">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <a href="tel:+919347365885" className="hover:text-[#E8C86B]">
                  +91 93473 65885
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <a href="mailto:concierge@zeyana.com" className="hover:text-[#E8C86B]">
                  concierge@zeyana.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <span>Hyderabad & Varanasi Flagship Stores, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#C59B27]/40 bg-[#290207] py-4 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#EBE2D0]">
          <p>© {new Date().getFullYear()} ZEYANA SAREES & MORE. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-[#E8C86B] fill-[#E8C86B]" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
