import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, RefreshCw, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.trim()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe. Please try again.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Newsletter Subscription Error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred.');
      setStatus('error');
    }
  };

  return (
    <section id="newsletter" className="py-24 px-6 bg-wine relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blush rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-blush mb-3"
        >
          Keep in touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif italic text-4xl text-white leading-tight mb-8"
        >
          the newsletter of<br />embodied wisdom.
        </motion.h2>
        
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="newsletter-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/10 border border-white/20 rounded-3xl p-6 text-white text-center space-y-2 backdrop-blur-md"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto text-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="font-serif italic text-2xl text-white">Welcome to the Circle</p>
              <p className="text-white/80 text-xs leading-relaxed max-w-md mx-auto">
                We've added <strong className="text-white">{email}</strong> to our circle. Look forward to ritual prompts and monthly reflections in your inbox.
              </p>
              <button
                type="button"
                onClick={() => { setStatus('idle'); setEmail(''); }}
                className="text-[0.65rem] uppercase tracking-widest text-blush underline hover:text-white pt-2 inline-block"
              >
                Subscribe another email
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="newsletter-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
            >
              {status === 'error' && (
                <div className="p-3 rounded-2xl bg-white/10 border border-red-300 text-white text-xs flex items-center justify-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-200 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'submitting'}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-4 text-white placeholder:text-white/50 text-sm outline-none focus:bg-white/15 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-white text-wine px-10 py-4 rounded-full text-[0.7rem] uppercase tracking-[0.15em] font-bold hover:bg-cream transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Us</span>
                      <Send className="w-3 h-3 text-wine" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-[0.65rem] mt-6 tracking-wide"
        >
          receive ritual prompts, somatic tools, and community updates.
        </motion.p>
      </div>
    </section>
  );
}
