import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, Calendar, ExternalLink, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function Connect() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: (data.get('name') as string) || formData.name,
      email: (data.get('email') as string) || formData.email,
      message: (data.get('message') as string) || formData.message,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form. Please try again.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Contact Form Submission Error:', err);
      setErrorMessage(err.message || 'An unexpected network error occurred.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="connect" className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-sage mb-3"
        >
          Connect
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif italic text-4xl md:text-5xl text-wine leading-tight mb-16"
        >
          let's begin.
        </motion.h2>

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-20 items-start">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success-box"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/80 border border-sage/30 rounded-3xl p-8 md:p-10 shadow-sm space-y-5"
              >
                <div className="w-12 h-12 bg-sage/15 rounded-full flex items-center justify-center text-sage">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif italic text-3xl text-wine">Message Sent with Reverence</h3>
                <p className="text-slate text-sm leading-relaxed">
                  Thank you, <strong className="text-ink">{formData.name}</strong>. Your note has been safely received. Juls will review your inquiry and reach back out to <span className="text-wine font-medium">{formData.email}</span> within 24–48 hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 inline-flex items-center gap-2 text-wine font-medium text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form-box"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {status === 'error' && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Unable to send message</p>
                      <p className="mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-[0.62rem] tracking-[0.14em] uppercase font-medium text-slate" htmlFor="contact-name">
                    Name <span className="text-wine">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === 'submitting'}
                    className="bg-white/50 border border-blush/30 rounded-xl px-5 py-4 outline-none focus:border-wine/50 transition-colors placeholder:text-slate/40 text-sm font-sans disabled:opacity-50"
                    placeholder="your full name"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[0.62rem] tracking-[0.14em] uppercase font-medium text-slate" htmlFor="contact-email">
                    Email <span className="text-wine">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={status === 'submitting'}
                    className="bg-white/50 border border-blush/30 rounded-xl px-5 py-4 outline-none focus:border-wine/50 transition-colors placeholder:text-slate/40 text-sm font-sans disabled:opacity-50"
                    placeholder="hello@example.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.62rem] tracking-[0.14em] uppercase font-medium text-slate" htmlFor="contact-message">
                    How can I support you? <span className="text-wine">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={status === 'submitting'}
                    className="bg-white/50 border border-blush/30 rounded-xl px-5 py-4 outline-none focus:border-wine/50 transition-colors placeholder:text-slate/40 text-sm font-sans min-h-[150px] resize-none disabled:opacity-50"
                    placeholder="Tell me about your journey..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-wine text-white px-9 py-4 rounded-full text-[0.7rem] uppercase tracking-[0.15em] font-semibold hover:bg-wine/90 transition-all shadow-md self-start flex items-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {status === 'submitting' ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-[#d4e5cc] rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-wine" />
                </div>
                <div>
                  <h4 className="text-[0.65rem] uppercase tracking-[0.15em] font-semibold text-ink mb-1">Email</h4>
                  <a href="mailto:julesinbloom96@gmail.com" className="text-slate text-sm hover:text-wine transition-colors font-medium">
                    julesinbloom96@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-[#d4e5cc] rounded-full flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-wine" />
                </div>
                <div>
                  <h4 className="text-[0.65rem] uppercase tracking-[0.15em] font-semibold text-ink mb-1">Direct Scheduling</h4>
                  <a
                    href="https://calendly.com/julesinbloom96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-wine text-sm font-semibold flex items-center gap-1.5 hover:underline"
                  >
                    <span>calendly.com/julesinbloom96</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-[#d4e5cc] rounded-full flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5 text-wine" />
                </div>
                <div>
                  <h4 className="text-[0.65rem] uppercase tracking-[0.15em] font-semibold text-ink mb-1">Instagram</h4>
                  <a
                    href="https://instagram.com/julesinbloom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate text-sm hover:text-wine transition-colors font-medium"
                  >
                    @julesinbloom
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-blush/20 space-y-2">
              <p className="text-slate text-xs">
                <span className="font-semibold text-ink">Studio Teaching:</span> Highland Yoga (Sandy Springs & Alpharetta locations)
              </p>
              <p className="text-slate text-xs italic">
                Serving the greater Atlanta area, North Georgia, and online community.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
