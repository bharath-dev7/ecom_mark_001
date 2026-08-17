'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API or email service
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
      title: 'WhatsApp',
      value: 'Chat with us',
      href: 'https://wa.me/919347365885',
      description: 'Quick responses, 24/7',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@saricollection.com',
      href: 'mailto:hello@saricollection.com',
      description: "We'll respond within 24 hours",
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Hyderabad, India',
      href: '#',
      description: 'Telangana, 500001',
    },
  ];

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="py-14 sm:py-20 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-cream)] mb-3"
          >
            Get in <span className="text-gradient-gold">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[var(--color-text-muted)] max-w-lg mx-auto"
          >
            Have a question about our sarees or need styling advice? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Methods */}
            <div>
              <h2 className="font-display text-2xl font-bold text-[var(--color-cream)] mb-8">
                Reach Out <span className="text-gradient-gold">Anytime</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactMethods.map((method, i) => (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 card-hover block group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 flex items-center justify-center mb-3">
                      <method.icon className="w-5 h-5 text-[var(--color-gold)]" />
                    </div>
                    <h3 className="font-display text-sm font-semibold text-[var(--color-cream)] group-hover:text-[var(--color-gold)] transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-sm text-[var(--color-gold)] mt-1">
                      {method.value}
                    </p>
                    <p className="text-xs text-[var(--color-text-dim)] mt-1">
                      {method.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-[var(--color-cream)] mb-8">
                Send a <span className="text-gradient-gold">Message</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you're looking for..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    submitted
                      ? 'bg-green-600 text-white'
                      : 'btn-gold'
                  }`}
                >
                  {submitted ? (
                    'Message Sent!'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
