import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import EventCalendar from './EventCalendar';
import { LayoutList, Calendar as CalendarIcon } from 'lucide-react';
import { EVENTS } from '../constants';

const events = EVENTS;

export default function Events() {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  return (
    <section id="events" className="py-24 px-6 bg-[#ebf0e5]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-sage mb-3"
            >
              Gatherings
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif italic text-4xl md:text-5xl text-wine leading-tight"
            >
              upcoming sessions<br />& ceremonies.
            </motion.h2>
          </div>

          <div className="flex bg-white/50 p-1.5 rounded-full border border-white/40 shadow-inner self-start md:self-auto">
            <button 
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-[0.65rem] uppercase tracking-widest font-bold transition-all ${
                view === 'list' ? 'bg-wine text-white shadow-md' : 'text-slate hover:text-wine'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" /> List
            </button>
            <button 
              onClick={() => setView('calendar')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-[0.65rem] uppercase tracking-widest font-bold transition-all ${
                view === 'calendar' ? 'bg-wine text-white shadow-md' : 'text-slate hover:text-wine'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" /> Calendar
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'list' ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-1 bg-cream/30 rounded-3xl overflow-hidden border border-cream/50 shadow-sm"
            >
              {events.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-cream p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8 hover:bg-cream/80 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center min-w-[80px]">
                    <span className="text-[0.6rem] uppercase tracking-widest text-sage font-semibold">{event.month}</span>
                    <span className="font-serif text-4xl text-wine italic leading-none">{event.day}</span>
                  </div>

                  <div className="flex-1 space-y-1">
                    <span className="inline-block text-[0.58rem] tracking-widest uppercase font-semibold px-2.5 py-1 bg-[#d4e5cc] text-sage rounded-full mb-1">
                      {event.type}
                    </span>
                    <Link to={`/events/${event.id}`}>
                      <h3 className="font-serif italic text-xl text-ink hover:text-wine transition-colors cursor-pointer">{event.title}</h3>
                    </Link>
                    <p className="text-slate text-sm">{event.location}</p>
                  </div>

                  <Link
                    to={`/events/${event.id}`}
                    className="text-[0.68rem] uppercase tracking-widest font-semibold text-wine border border-wine px-6 py-3 rounded-full hover:bg-wine hover:text-white transition-all text-center"
                  >
                    View Details
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EventCalendar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
