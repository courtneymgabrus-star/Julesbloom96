import { motion, useScroll } from 'motion/react';
import { useRef } from 'react';

const pastEvents = [
  {
    title: 'Alabama Potluck-Inclusive Rock Climbing & Somatics',
    date: 'April 2026',
    location: 'Cherokee Mountain, Alabama',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Queer Wellness & Nervous System Workshop',
    date: 'February 2026',
    location: 'Midtown Atlanta',
    image: 'https://images.unsplash.com/photo-1545208393-2160295eb44e?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Solstice Sound Ceremony & Altar',
    date: 'December 2025',
    location: 'Inman Park Sanctuary',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Trauma-Informed Vagal Toning Training',
    date: 'November 2025',
    location: 'Virtual Sanctuary',
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Community Breathwork & Forest Walking',
    date: 'October 2025',
    location: 'Piedmont Park, Atlanta',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
  },
];

export default function PastEventsCarousel() {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-sage mb-3"
        >
          Archives
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif italic text-4xl md:text-5xl text-wine leading-tight"
        >
          moments of community<br />& embodied connection.
        </motion.h2>
      </div>

      <div 
        ref={targetRef}
        className="flex gap-6 overflow-x-scroll no-scrollbar px-6 md:px-[calc((100vw-1152px)/2)] scroll-smooth snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {pastEvents.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="shrink-0 w-[300px] md:w-[450px] aspect-[4/3] relative rounded-[2rem] overflow-hidden snap-center group"
          >
            <img 
              src={event.image} 
              alt={event.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[0.6rem] uppercase tracking-widest font-bold text-[#d4e5cc] mb-1">
                {event.date} • {event.location}
              </span>
              <h3 className="font-serif italic text-2xl group-hover:translate-x-2 transition-transform duration-500 text-white">
                {event.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 flex justify-between items-center">
        <p className="text-slate text-[0.7rem] tracking-widest uppercase font-medium">
          Drag or swipe to explore
        </p>
        <div className="flex gap-4">
           <div className="flex gap-2">
             {pastEvents.map((_, i) => (
               <div key={i} className="w-1.5 h-1.5 rounded-full bg-blush/40" />
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
