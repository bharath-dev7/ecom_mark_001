'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { SectionDivider } from '@/components/OrnamentalIcons';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 93473 65885',
      href: 'tel:+919347365885',
      description: 'Mon–Sat, 10am–7pm IST',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Concierge',
      value: 'Instant Chat',
      href: 'https://wa.me/919347365885',
      description: 'Instant assistance for orders & custom styling',
    },
    {
      icon: Mail,
      title: 'Boutique Email',
      value: 'concierge@zeyana.com',
      href: 'mailto:concierge@zeyana.com',
      description: 'Inquiries answered within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Boutique Flagship',
      value: 'Hyderabad & Varanasi',
      href: '#',
      description: 'Telangana & Uttar Pradesh, India',
    },
  ];

  return (
    <div className="bg-[#FAF6EE] min-h-screen font-serif text-[#241416]">
      {/* Header Banner */}
      <section className="py-12 bg-[#38030B] border-b-2 border-[#C59B27] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <SectionDivider title="ROYAL CONCIERGE & CONTACT" />
          <p className="text-xs sm:text-sm font-sans tracking-[0.2em] text-[#E8C86B] uppercase mt-2">
            WE ARE HONORED TO ASSIST YOUR STYLING & ORDER INQUIRIES
          </p>
        </div>
      </section>

      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Methods */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#6A091A] uppercase tracking-wider mb-6 border-b border-[#C59B27]/30 pb-2">
              REACH OUT TO OUR BOUTIQUE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, i) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-lg bg-[#FFFDF8] border border-[#E2D7C3] hover:border-[#C59B27] shadow-xs hover:shadow-md transition-all block group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#6A091A] text-[#E8C86B] border border-[#C59B27] flex items-center justify-center mb-3">
                    <method.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#6A091A] uppercase tracking-wider group-hover:text-[#C59B27] transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-sm font-bold text-[#C59B27] mt-1">
                    {method.value}
                  </p>
                  <p className="text-xs font-sans text-[#7C6354] mt-1">
                    {method.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFFDF8] p-6 rounded-lg border border-[#E2D7C3] shadow-sm"
          >
            <h2 className="font-serif text-2xl font-bold text-[#6A091A] uppercase tracking-wider mb-6 border-b border-[#C59B27]/30 pb-2">
              SEND A PRIVATE INQUIRY
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div>
                <label className="text-xs font-serif font-bold text-[#7C6354] uppercase tracking-wider mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Maharani Gayatri"
                  className="w-full px-4 py-2.5 rounded bg-[#FAF6EE] border border-[#C59B27]/40 text-sm text-[#241416] placeholder:text-[#7C6354] focus:border-[#6A091A] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-serif font-bold text-[#7C6354] uppercase tracking-wider mb-1 block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-2.5 rounded bg-[#FAF6EE] border border-[#C59B27]/40 text-sm text-[#241416] placeholder:text-[#7C6354] focus:border-[#6A091A] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-serif font-bold text-[#7C6354] uppercase tracking-wider mb-1 block">
                  Message / Custom Weave Inquiry
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specify fabric preferences, occasion dates, or styling queries..."
                  className="w-full px-4 py-2.5 rounded bg-[#FAF6EE] border border-[#C59B27]/40 text-sm text-[#241416] placeholder:text-[#7C6354] focus:border-[#6A091A] focus:outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="btn-maroon-gold w-full py-3 rounded-full font-serif font-bold text-xs tracking-widest flex items-center justify-center gap-2 uppercase shadow-md"
              >
                {submitted ? (
                  'MESSAGE DISPATCHED!'
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#E8C86B]" />
                    SEND ROYAL MESSAGE
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
