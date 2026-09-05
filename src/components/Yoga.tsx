import { motion } from 'motion/react';
import { CheckCircle2, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Yoga() {
  const points = [
    "Trauma-informed, consent-led pacing",
    "Evidence-based polyvagal regulation techniques",
    "Accessible options for all mobility levels",
    "Focus on internal felt sense over external aesthetic"
  ];

  const studios = [
    {
      name: "Highland Yoga – Sandy Springs",
      neighborhood: "Sandy Springs, GA",
      description: "Heated vinyasa, slow flows, and restorative evening somatic sessions.",
      link: "https://www.instagram.com/highlandyoga"
    },
    {
      name: "Highland Yoga – Alpharetta",
      neighborhood: "Alpharetta, GA",
      description: "Mindful flows, breath-centered movement, and community wellness classes.",
      link: "https://www.instagram.com/highlandyoga"
    }
  ];

  return (
    <section id="yoga" className="py-24 px-6 bg-cream border-t border-blush/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <p className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-sage mb-3">Somatic Movement</p>
            <h2 className="font-serif italic text-4xl md:text-5xl text-wine leading-tight mb-8">
              embodied movement for every nervous system.
            </h2>
            <div className="space-y-6 text-slate text-[0.95rem] leading-[1.8] font-medium">
              <p>
                My yoga offerings center on somatic agency. Rather than asking your body to contort into rigid shapes, we use movement as an exploratory conversation with your nervous system.
              </p>
              <p>
                Integrating breathwork, slow intentional flow, and deep restorative rests, classes are crafted to support trauma recovery, neurodivergent regulation, and physical rejuvenation.
              </p>
              <ul className="space-y-3 pt-2 text-ink text-sm font-sans">
                {points.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Link 
                  to="/gatherings#book-private" 
                  className="inline-block bg-wine text-white px-8 py-3.5 rounded-full text-[0.7rem] uppercase tracking-[0.12em] font-semibold hover:bg-wine/90 transition-all shadow-sm"
                >
                  Schedule Private Movement
                </Link>
                <a
                  href="#studios"
                  className="inline-block border border-sage text-sage px-8 py-3.5 rounded-full text-[0.7rem] uppercase tracking-[0.12em] font-semibold hover:bg-sage hover:text-white transition-all shadow-sm"
                >
                  View Studio Classes ↓
                </a>
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
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800";
              }}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover mix-blend-multiply opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sage/20 to-transparent" />
          </motion.div>
        </div>

        {/* Highland Yoga Studio Teaching Section */}
        <motion.div
          id="studios"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 border border-blush/30 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-blush/20 mb-8">
            <div>
              <div className="flex items-center gap-2 text-sage text-[0.62rem] uppercase tracking-[0.2em] font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Weekly Studio Classes</span>
              </div>
              <h3 className="font-serif italic text-3xl md:text-4xl text-wine">
                Practice with Juls at Highland Yoga
              </h3>
              <p className="text-slate text-sm font-medium mt-2 max-w-xl">
                Juls currently teaches regular weekly classes across both Highland Yoga studios in the Atlanta metro area.
              </p>
            </div>
            <a
              href="https://www.instagram.com/highlandyoga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2d4f21] text-white px-7 py-3.5 rounded-full text-[0.68rem] uppercase tracking-[0.14em] font-semibold hover:bg-sage transition-all self-start md:self-auto shrink-0 shadow-sm"
            >
              <span>@highlandyoga</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {studios.map((studio, idx) => (
              <div
                key={idx}
                className="bg-cream/80 border border-blush/30 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-wine/30 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2 text-wine text-xs font-semibold mb-2">
                    <MapPin className="w-4 h-4 text-wine shrink-0" />
                    <span>{studio.neighborhood}</span>
                  </div>
                  <h4 className="font-serif italic text-2xl text-ink mb-2 group-hover:text-wine transition-colors">
                    {studio.name}
                  </h4>
                  <p className="text-slate text-sm leading-relaxed mb-6 font-medium">
                    {studio.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-blush/20 flex items-center justify-between">
                  <span className="text-[0.65rem] uppercase tracking-wider font-semibold text-slate">
                    Drop-ins & Memberships
                  </span>
                  <a
                    href={studio.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-wine text-[0.68rem] uppercase tracking-widest font-semibold flex items-center gap-1.5 hover:underline"
                  >
                    <span>View Schedule</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
