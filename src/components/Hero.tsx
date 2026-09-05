import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import heroLogo from '../assets/images/regenerated_image_1787107351523.png';

export default function Hero() {
  return (
    <section id="home" className="min-h-[100svh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden pt-32 pb-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 bg-[oklch(96%_0.015_60)]">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_55%_40%_at_15%_20%,oklch(88%_0.08_350/0.5)_0%,transparent_60%),radial-gradient(ellipse_50%_45%_at_85%_15%,oklch(88%_0.07_55/0.45)_0%,transparent_55%),radial-gradient(ellipse_55%_40%_at_90%_75%,oklch(88%_0.09_155/0.45)_0%,transparent_58%),radial-gradient(ellipse_50%_45%_at_10%_80%,oklch(88%_0.08_220/0.4)_0%,transparent_55%)]" />
      </div>

      {/* Ripple Rings */}
      <div className="absolute inset-0 pointer-events-none -z-5 overflow-hidden">
         {[...Array(4)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute left-1/2 top-1/2 border rounded-full opacity-0"
             initial={{ width: 0, height: 0, x: '-50%', y: '-50%', opacity: 0 }}
             animate={{
               width: ['0%', '150%'],
               height: ['0%', '150%'],
               opacity: [0, 0.4, 0],
             }}
             transition={{
               duration: 7,
               repeat: Infinity,
               delay: i * 1.75,
               ease: "easeOut"
             }}
             style={{
               borderColor: i === 0 ? '#D98997' : i === 1 ? '#376327' : i === 2 ? '#942f53' : '#D9ADC2',
               borderWidth: '1px'
             }}
           />
         ))}
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 flex justify-center items-center"
      >
        <img 
          src={heroLogo || "/logo.png"} 
          alt="Juls in Bloom Logo" 
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Safe fallback if local binary is unavailable
            e.currentTarget.src = "https://i.postimg.cc/3xwr4sfh/Divine-Jules.png";
          }}
          className="w-56 md:w-80 max-w-full h-auto mx-auto object-contain drop-shadow-sm"
          width="320"
          height="140"
          // @ts-ignore
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-[0.68rem] tracking-[0.22em] uppercase text-sage font-semibold mb-3"
      >
        yoga teacher & sound healing · atlanta, georgia
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="font-serif italic text-5xl md:text-8xl leading-tight text-wine mb-6"
      >
        rooted in research.<br />led by spirit.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-slate max-w-md mx-auto mb-10 tracking-wide text-[0.95rem] font-medium"
      >
        a queer-affirming sanctuary where research science and advocacy meet somatic and sacred practice.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link 
          to="/gatherings#book-private" 
          className="bg-sage text-white px-9 py-3.5 rounded-full text-[0.7rem] uppercase tracking-[0.12em] font-semibold hover:bg-sage/90 transition-all shadow-sm"
        >
          Book a Session
        </Link>
        <a 
          href="#offerings" 
          className="text-wine border border-wine px-9 py-3.5 rounded-full text-[0.7rem] uppercase tracking-[0.12em] font-semibold hover:bg-wine hover:text-white transition-all"
        >
          Explore Offerings
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-blush to-transparent animate-pulse" />
        <span className="text-[0.6rem] uppercase tracking-[0.15em] text-blush font-semibold">scroll</span>
      </motion.div>
    </section>
  );
}
