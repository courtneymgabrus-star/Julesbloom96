import { motion } from 'motion/react';
import { Sparkles, Music, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SoundHealing() {
  const benefits = [
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Nervous System Regulation", desc: "Recalibrate your body's stress response through deep harmonic resonance." },
    { icon: <Sparkles className="w-5 h-5" />, title: "Cellular Healing", desc: "Vibrational frequencies interact with the body's water content for deep rest." },
    { icon: <Heart className="w-5 h-5" />, title: "Emotional Release", desc: "A safe container to process and release stored somatic tension." },
  ];

  return (
    <section id="sound" className="py-24 px-6 bg-[#fcf9f2]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square rounded-full bg-blush/20 p-8 flex items-center justify-center relative"
          >
            <div className="w-full h-full border-2 border-dashed border-wine/20 rounded-full animate-[spin_20s_linear_infinite] absolute" />
             <img 
              src="https://i.postimg.cc/dVGPqJjq/juls-bowls.jpg" 
              alt="Crystal Singing Bowls" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-full shadow-inner relative z-10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-sage mb-3">Sensory Therapy</p>
            <h2 className="font-serif italic text-4xl md:text-5xl text-wine leading-tight mb-8">
              the alchemy of sound.
            </h2>
            <p className="text-slate text-[0.95rem] leading-[1.85] mb-8 font-medium">
              Using Frosted Alchemy Crystal bowls, I guide you into a state of deep Theta brainwaves—a space of profound restorative rest where the mind grows quiet and the body can begin its innate healing process.
            </p>

            <div className="grid gap-6 mb-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-wine shrink-0 shadow-sm">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink text-sm mb-1">{benefit.title}</h4>
                    <p className="text-slate text-xs leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/gatherings#book-private"
              className="inline-block bg-sage text-white px-8 py-3.5 rounded-full text-[0.7rem] uppercase tracking-[0.12em] font-semibold hover:bg-sage/90 transition-all shadow-sm"
            >
              Reserve Sound Bath Experience
            </Link>
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center py-16 px-8 bg-white/40 rounded-[3rem] border border-blush/20 shadow-sm"
        >
          <Music className="w-8 h-8 text-wine mx-auto mb-6 opacity-40" />
          <p className="font-serif italic text-2xl md:text-3xl text-wine leading-relaxed mb-8">
            "Jules' sound baths are unlike anything I've experienced. I felt a profound sense of return to my own body—a quiet safety I haven't found elsewhere."
          </p>
          <div className="text-[0.65rem] uppercase tracking-widest font-bold text-sage">
            — Sarah M., Private Client
          </div>
        </motion.div>
      </div>
    </section>
  );
}
