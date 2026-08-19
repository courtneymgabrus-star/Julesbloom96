import { motion } from 'motion/react';
import { Users, Sparkles, Heart, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Events from '../components/Events';
import BookingCalendar from '../components/BookingCalendar';
import BotanicalDivider from '../components/BotanicalDivider';
import { usePageTitle } from '../hooks/usePageTitle';

const groupOfferings = [
  {
    title: "Private Sessions",
    description: "One-on-one or small group sessions tailored to your specific needs. Perfect for deepening your practice or focused healing work.",
    icon: Users,
    tag: "Personalized"
  },
  {
    title: "Bachelor & Bachelorette",
    description: "Mindful celebrations to honor transitions. We create bespoke sound baths and gentle movement experiences for your bridal or groom party.",
    icon: Sparkles,
    tag: "Celebration"
  },
  {
    title: "Corporate Wellness",
    description: "Nervous system regulation for teams. Workshops designed to reduce burnout and increase collective harmony in the workplace.",
    icon: Heart,
    tag: "Professional"
  }
];

export default function Gatherings() {
  usePageTitle('Gatherings & Private Bookings', 'Explore upcoming sound ceremonies, retreats, and reserve private group sound baths or one-on-one somatic sessions in Atlanta.');

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Header */}
        <section className="px-6 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[0.7rem] uppercase tracking-[0.2em] font-bold text-sage mb-4 block"
            >
              Ceremonies & Private Immersions
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif italic text-4xl md:text-6xl text-wine mb-6"
            >
              Gatherings & Sanctuaries
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Whether joining a public lunar ceremony or reserving an intimate private sound journey, step into a dedicated container of restoration.
            </motion.p>
          </div>
        </section>

        <BotanicalDivider />

        {/* Public Gatherings Section */}
        <Events />

        <BotanicalDivider />

        {/* Private Offerings Overview */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[0.65rem] uppercase tracking-widest font-bold text-sage mb-2 block">Bespoke Experiences</span>
              <h2 className="font-serif italic text-3xl md:text-4xl text-wine">Private Gatherings & Celebrations</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {groupOfferings.map((offering, index) => (
                <motion.div
                  key={offering.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/40 border border-blush/20 p-8 rounded-3xl relative overflow-hidden"
                >
                  <div className="w-12 h-12 bg-[#d4e5cc] rounded-2xl flex items-center justify-center text-sage mb-6">
                    <offering.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[0.6rem] uppercase tracking-widest font-bold text-sage mb-2 block">{offering.tag}</span>
                  <h3 className="font-serif italic text-2xl text-wine mb-4">{offering.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{offering.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Booking Flow Anchor */}
            <div id="book-private" className="scroll-mt-24 pt-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage/10 text-sage rounded-full text-[0.65rem] uppercase tracking-widest font-bold mb-3">
                  <Calendar className="w-3.5 h-3.5" /> Real-Time Sanctuary Scheduling
                </div>
                <h3 className="font-serif italic text-3xl md:text-4xl text-wine mb-3">Reserve Private Session</h3>
                <p className="text-slate text-sm max-w-lg mx-auto">
                  Select an open date to view tailored acoustic windows for 1-on-1 somatic journeys or private group circles.
                </p>
              </div>
              <BookingCalendar />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
