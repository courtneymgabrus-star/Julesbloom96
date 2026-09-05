import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import aboutImage from '../assets/images/regenerated_image_1787261392626.jpg';

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
              src={aboutImage}
              alt="Juls"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://i.postimg.cc/wBkK19yX/About.jpg";
              }}
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
              "Advocate & Research Scientist",
              "Instructor at Highland Yoga (Sandy Springs & Alpharetta)",
              "Registered Yoga Teacher (RYT-200)",
              "Sound Healing Practicitoner"
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
            About Juls
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif italic text-4xl md:text-5xl text-wine leading-tight mb-8"
          >
            where trauma-informed care meets intentional practice.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-slate leading-[1.8] text-[0.95rem] font-medium"
          >
            <p>
            My work brings together yoga, sound, advocacy, and evidence-based research to create intentional spaces for healing, connection, and a deeper sense of safety within the body.
            </p>
            <p>
              I approach healing through a commitment to equity, collective care, and the freedom to exist fully and authentically. Care should be accessible, affirming, and rooted in the understanding that healing happens both within ourselves and in relationship with one another.
            </p>
            <p>
              Whether guiding an intimate sound bath, leading a vinyasa or yin flow, and holding space for nervous system restoration, my intention is simple: to create containers where your whole self can soften and bloom.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 pt-10 border-t border-blush/20 flex flex-wrap gap-8 items-center"
          >
            <div>
              <span className="font-serif italic text-2xl text-wine block">Juls</span>
              <span className="text-[0.65rem] uppercase tracking-widest text-slate font-medium">Founder & Facilitator</span>
            </div>
            <Link
              to="/research"
              className="text-[0.7rem] uppercase tracking-widest text-wine font-semibold border-b border-wine/40 pb-0.5 hover:border-wine transition-all"
            >
              Read Research & Publications →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
