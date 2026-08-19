import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[3/4] rounded-3xl bg-blush overflow-hidden shadow-2xl relative"
          >
             <img
              src="https://i.postimg.cc/wBkK19yX/About.jpg"
              alt="Jules"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            {[
              "Doctor of Public Health (DrPH)",
              "Registered Yoga Teacher (RYT-200)",
              "Advanced Sound Certification"
            ].map((cred, i) => (
              <div key={i} className="flex items-center gap-3 text-[0.82rem] text-slate font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-rose via-blush to-sage" />
                {cred}
              </div>
            ))}
          </motion.div>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-sage mb-3"
          >
            About Jules
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif italic text-4xl md:text-5xl text-wine leading-tight mb-8"
          >
            the science of healing<br />meets the wisdom of the body.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-slate text-[0.95rem] leading-[1.85]"
          >
            <p>
              As a queer woman with a doctorate in public health, Jules weaves together evidence-based practice with ancient somatic wisdom. Her approach is rooted in the belief that wellness is a social justice issue and healing is a radical act of reclamation.
            </p>
            <p>
              Based in Atlanta, she creates queer-affirming spaces where research meets ritual. Whether through a grounding vinyasa flow or a deep sonic meditation, her work is designed to help you return to the home of your own body.
            </p>

            <blockquote className="font-serif italic text-2xl text-wine py-8 border-y border-blush/40 tracking-wide my-8">
              "Healing isn't about fixing what's broken, but remembering what was always whole."
            </blockquote>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to="/gatherings#book-private" 
                className="inline-block bg-sage text-white px-9 py-3.5 rounded-full text-[0.7rem] uppercase tracking-[0.12em] font-semibold hover:bg-sage/90 transition-all shadow-sm"
              >
                Book a Session
              </Link>
              <a 
                href="#connect" 
                className="inline-block text-wine border border-wine px-9 py-3.5 rounded-full text-[0.7rem] uppercase tracking-[0.12em] font-semibold hover:bg-wine hover:text-white transition-all"
              >
                Send a Note
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
