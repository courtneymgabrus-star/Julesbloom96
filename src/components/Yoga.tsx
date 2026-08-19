import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Yoga() {
  return (
    <section id="yoga" className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 md:order-1"
        >
          <p className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-sage mb-3">The Practice</p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-wine leading-tight mb-8">
            embodied movement<br />for every body.
          </h2>
          <div className="space-y-6 text-slate text-[0.95rem] leading-[1.85]">
            <p>
              My yoga sessions are centered on accessibility and trauma-informed principles. We focus not on "perfection" of the pose, but on the interior experience of the breath and the body.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Trauma-Informed Vinyasa",
                "Restorative & Yin Practices",
                "Somatic Boundary Work",
                "Queer-Affirming Group Classes"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Link 
                to="/gatherings#book-private" 
                className="inline-block bg-wine text-white px-8 py-3.5 rounded-full text-[0.7rem] uppercase tracking-[0.12em] font-semibold hover:bg-wine/90 transition-all shadow-sm"
              >
                Schedule Private Movement
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="order-1 md:order-2 aspect-[4/5] rounded-[2rem] bg-[#d4e5cc] overflow-hidden relative shadow-2xl"
        >
          <img 
            src="https://i.postimg.cc/zfThWc88/IMG-4031.jpg" 
            alt="Yoga Practice" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover mix-blend-multiply opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sage/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
