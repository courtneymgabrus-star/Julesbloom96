import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft, Share2, CalendarPlus, Check, Sparkles, AlertCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { EVENTS } from '../constants';
import { usePageTitle } from '../hooks/usePageTitle';

export default function EventDetails() {
  const { eventId } = useParams();
  const event = EVENTS.find(e => e.id === eventId);

  usePageTitle(
    event ? `${event.title} | Juls in Bloom` : 'Gathering Not Found',
    event ? event.description : 'Details on upcoming somatic gatherings and sound ceremonies by Juls in Bloom.'
  );

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream gap-4 px-6 text-center">
        <h1 className="font-serif italic text-4xl text-wine">Gathering Not Found</h1>
        <p className="text-slate text-sm max-w-md">The event you are looking for may have passed or moved.</p>
        <Link to="/gatherings" className="mt-4 text-wine font-medium text-xs uppercase tracking-widest flex items-center gap-2 hover:opacity-80">
          <ArrowLeft className="w-4 h-4" /> Explore All Gatherings
        </Link>
      </div>
    );
  }

  const eventDate = parseISO(event.date);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/40" />
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-20 bg-gradient-to-t from-cream via-cream/80 to-transparent">
             <div className="max-w-6xl mx-auto">
                <Link to="/gatherings" className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-widest font-bold text-wine mb-6 hover:translate-x-[-4px] transition-transform">
                  <ArrowLeft className="w-4 h-4" /> Back to Gatherings
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <span className="inline-block text-[0.6rem] tracking-widest uppercase font-bold px-3 py-1 bg-sage/15 text-sage rounded-full mb-4">
                      {event.type}
                    </span>
                    <h1 className="font-serif italic text-4xl md:text-6xl text-wine leading-tight">
                      {event.title}
                    </h1>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_360px] gap-16 items-start">
            <div className="space-y-10">
              <div className="flex flex-wrap gap-8 py-8 border-y border-blush/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d4e5cc] rounded-full flex items-center justify-center text-sage">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-widest font-bold text-slate">Date</p>
                    <p className="text-ink font-medium text-sm">{format(eventDate, 'MMMM d, yyyy')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d4e5cc] rounded-full flex items-center justify-center text-sage">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-widest font-bold text-slate">Time</p>
                    <p className="text-ink font-medium text-sm">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d4e5cc] rounded-full flex items-center justify-center text-sage">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-widest font-bold text-slate">Location</p>
                    <p className="text-ink font-medium text-sm">{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 <h2 className="font-serif italic text-3xl text-wine">About This Gathering</h2>
                 <p className="text-slate text-[0.95rem] leading-[1.85] whitespace-pre-line">
                   {event.longDescription || event.description}
                 </p>
              </div>

              {event.whatToBring && event.whatToBring.length > 0 && (
                <div className="p-8 rounded-3xl bg-white border border-blush/20 space-y-4">
                  <h3 className="font-serif italic text-2xl text-wine flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sage" />
                    What to Bring
                  </h3>
                  <ul className="space-y-2.5">
                    {event.whatToBring.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate text-sm">
                        <Check className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-6 pt-4">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 text-[0.65rem] uppercase tracking-widest font-bold text-slate hover:text-wine transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" /> Share Event
                </button>
                <a 
                  href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&location=${encodeURIComponent(event.location)}&dates=${format(eventDate, "yyyyMMdd'T'HHmmss'Z'")}/${format(new Date(eventDate.getTime() + 5400000), "yyyyMMdd'T'HHmmss'Z'")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[0.65rem] uppercase tracking-widest font-bold text-slate hover:text-wine transition-colors"
                >
                  <CalendarPlus className="w-4 h-4" /> Add to Google Calendar
                </a>
              </div>
            </div>

            {/* Sidebar / Registration Action */}
            <aside className="bg-white border border-blush/20 rounded-3xl p-8 md:sticky md:top-28 shadow-sm">
              <h3 className="font-serif italic text-2xl text-wine mb-3">Reserve Sanctuary</h3>
              <p className="text-slate text-xs mb-6 leading-relaxed">
                Spaces are limited to preserve an intimate container. Register early to save your spot.
              </p>
              
              <div className="space-y-3 pb-6 border-b border-blush/20">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate uppercase tracking-widest text-[0.65rem] font-bold">Exchange</span>
                  <span className="text-ink font-serif italic text-2xl font-bold">{event.price}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate uppercase tracking-widest text-[0.65rem] font-bold">Availability</span>
                  <span className="text-sage font-medium text-xs">Open for Registration</span>
                </div>
              </div>

              <a 
                href={event.link}
                className="mt-6 block w-full text-center bg-wine text-white px-8 py-4 rounded-full text-[0.7rem] uppercase tracking-[0.15em] font-bold hover:bg-wine/90 transition-all shadow-md"
              >
                Register for Gathering
              </a>

              <div className="mt-6 p-4 rounded-2xl bg-sage/10 border border-sage/20 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                <p className="text-[0.68rem] text-slate leading-relaxed">
                  Queer-affirming & trauma-informed space. Sliding scale scholarship spots available upon inquiry.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
