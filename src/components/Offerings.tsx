import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sun, Waves, Flower2, Microscope } from 'lucide-react';

const OfferingsList = [
  {
    title: 'Yoga',
    label: 'Practice',
    description: 'Grounding flows and intentional movement for all bodies - trauma-informed, queer-affirming, and accessible.',
    icon: <Sun className="w-5 h-5 text-wine" />,
    href: '#yoga',
    isExternalPage: false,
  },
  {
    title: 'Sound Healing',
    label: 'Healing',
    description: 'Crystal singing bowls and vibrational medicine to quiet the nervous system and open the heart.',
    icon: <Waves className="w-5 h-5 text-wine" />,
    href: '#sound',
    isExternalPage: false,
  },
  {
    title: 'Intentional Events & Retreats',
    label: 'Gathering',
    description: 'Retreats, ceremonies, workshops, and sacred gatherings designed to nourish community and connection.',
    icon: <Flower2 className="w-5 h-5 text-wine" />,
    href: '/gatherings',
    isExternalPage: true,
  },
  {
    title: 'Advocacy & Research Science',
    label: 'Research',
    description: 'Speaking engagements, neuro-somatic inquiries, and community advocacy research with equity at the center.',
    icon: <Microscope className="w-5 h-5 text-wine" />,
    href: '/research',
    isExternalPage: true,
  },
];

export default function Offerings() {
  return (
    <section id="offerings" className="py-24 px-6 bg-[#ebf0e5]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-sage mb-3"
        >
          What I Offer
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif italic text-4xl md:text-5xl text-wine leading-tight mb-12"
        >
          practices for the<br />whole person.
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {OfferingsList.map((item, i) => {
            const Content = (
              <div className="bg-cream rounded-2xl p-10 flex flex-col gap-4 group hover:-translate-y-1 hover:shadow-xl hover:shadow-wine/5 transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-[#d4e5cc] rounded-full flex items-center justify-center mb-2">
                  {item.icon}
                </div>
                <span className="text-[0.62rem] tracking-[0.18em] uppercase font-semibold text-sage">{item.label}</span>
                <h3 className="font-serif italic text-2xl text-wine">{item.title}</h3>
                <p className="text-slate text-[0.88rem] leading-7 font-medium">{item.description}</p>
                <div className="mt-auto pt-4 flex items-center gap-2 text-[0.68rem] uppercase tracking-widest font-semibold text-wine transition-colors">
                  Learn more <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {item.isExternalPage ? (
                  <Link to={item.href} className="block h-full">
                    {Content}
                  </Link>
                ) : (
                  <a href={item.href} className="block h-full">
                    {Content}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
