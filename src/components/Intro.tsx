import { motion } from 'motion/react';

export default function Intro() {
  return (
    <section id="intro" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-sage mb-4">Welcome</p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-wine leading-tight mb-6">
            a place to land,<br />breathe, and return<br />to yourself.
          </h2>
          <p className="text-slate max-w-sm text-[0.95rem] leading-[1.85]">
            Jules is a Doctor of Public Health, registered yoga teacher, and sound healer devoted to building bridges between evidence-based wellness and embodied, community-rooted healing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <blockquote className="font-serif italic text-2xl md:text-3xl text-wine leading-relaxed border-l-2 border-blush pl-8">
            "the body holds the answers science is only beginning to ask."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
