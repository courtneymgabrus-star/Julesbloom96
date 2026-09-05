import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';
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
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800";
              }}
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
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="text-wine mt-1 bg-blush/30 p-2 rounded-xl">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="font-serif italic text-xl text-ink mb-1">{b.title}</h3>
                    <p className="text-slate text-xs leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              to="/gatherings#book-private" 
              className="inline-block bg-sage text-white px-8 py-3.5 rounded-full text-[0.7rem] uppercase tracking-[0.12em] font-semibold hover:bg-sage/90 transition-all shadow-sm"
            >
              Book a Sound Bath Experience
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
