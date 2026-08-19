import React, { useState, useMemo } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isBefore,
  startOfToday,
  parseISO,
  getDay
} from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, User, Mail, MessageSquare, Send, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EVENTS } from '../constants';

interface TimeSlot {
  time: string;
  available: boolean;
  reason?: string;
}

export default function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<'calendar' | 'details' | 'success' | 'error'>('calendar');
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Private 1-on-1 Somatic Sound Journey',
    message: ''
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleDateSelect = (day: Date) => {
    if (isBefore(day, startOfToday())) return;
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const getEventsForDay = (day: Date) => {
    return EVENTS.filter(event => isSameDay(parseISO(event.date), day));
  };

  // Generate dynamic, realistic time slots based on day of week and scheduled events
  const dynamicTimeSlots = useMemo((): TimeSlot[] => {
    if (!selectedDate) return [];

    const dayOfWeek = getDay(selectedDate); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const eventsOnDay = getEventsForDay(selectedDate);
    const isToday = isSameDay(selectedDate, startOfToday());
    const currentHour = new Date().getHours();

    let baseSlots: string[] = [];

    if (dayOfWeek === 0) {
      // Sunday Schedule: Gentle afternoon & twilight sound sessions
      baseSlots = ['11:00 AM', '01:30 PM', '03:30 PM', '05:30 PM'];
    } else if (dayOfWeek === 6) {
      // Saturday Schedule: Morning & afternoon immersions
      baseSlots = ['09:30 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:00 PM'];
    } else if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
      // Mon / Wed / Fri: Restorative & twilight slots
      baseSlots = ['10:00 AM', '12:30 PM', '03:00 PM', '05:30 PM', '07:00 PM'];
    } else {
      // Tue / Thu: Midday & evening somatic sessions
      baseSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM', '06:30 PM'];
    }

    // Determine availability
    return baseSlots.map((timeStr) => {
      // Parse slot hour for today check
      const [hourPart, minuteAndMeridiem] = timeStr.split(':');
      let hourNum = parseInt(hourPart, 10);
      if (minuteAndMeridiem.includes('PM') && hourNum !== 12) hourNum += 12;
      if (minuteAndMeridiem.includes('AM') && hourNum === 12) hourNum = 0;

      // If today and time has passed
      if (isToday && hourNum <= currentHour) {
        return { time: timeStr, available: false, reason: 'Time passed' };
      }

      // If public event is scheduled on this day during evening, conflict check
      if (eventsOnDay.length > 0 && (timeStr.includes('06:00 PM') || timeStr.includes('07:00 PM') || timeStr.includes('05:30 PM'))) {
        return { time: timeStr, available: false, reason: 'Public Ceremony Booked' };
      }

      // Deterministic realistic slot booking based on day + hour
      const seed = selectedDate.getDate() + hourNum;
      const isBooked = seed % 4 === 0;

      return {
        time: timeStr,
        available: !isBooked,
        reason: isBooked ? 'Reserved by client' : undefined,
      };
    });
  }, [selectedDate]);

  const handleProceed = () => {
    if (selectedDate && selectedTime) {
      setBookingStep('details');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
          type: formData.type,
          message: formData.message,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking. Please try again.');
      }

      setReferenceId(data.referenceId || '');
      setBookingStep('success');
    } catch (err: any) {
      console.error('Booking Submission Error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred.');
      setBookingStep('error');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl shadow-wine/5 overflow-hidden border border-blush/20">
      <div className="grid md:grid-cols-2">
        {/* Left Side: Calendar */}
        <div className="p-8 border-r border-blush/20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif italic text-2xl text-wine">
              {format(currentDate, 'MMMM yyyy')}
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={prevMonth}
                className="p-2 hover:bg-sage/10 rounded-full transition-colors text-sage cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-sage/10 rounded-full transition-colors text-sage cursor-pointer"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-4">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-[0.6rem] uppercase tracking-widest font-bold text-slate/80 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isPast = isBefore(day, startOfToday());
              const dayEvents = getEventsForDay(day);
              const hasEvents = dayEvents.length > 0;

              return (
                <button
                  key={day.toString()}
                  onClick={() => handleDateSelect(day)}
                  disabled={isPast}
                  className={`
                    flex flex-col items-center justify-center rounded-xl text-sm transition-all h-12 w-full cursor-pointer
                    ${!isCurrentMonth ? 'text-slate/30' : 'text-ink'}
                    ${isPast ? 'opacity-20 cursor-not-allowed' : 'hover:bg-sage/15'}
                    ${isSelected ? 'bg-wine text-white! font-bold shadow-lg shadow-wine/20' : ''}
                    relative
                  `}
                >
                  {format(day, 'd')}
                  {hasEvents && !isSelected && (
                    <div className="absolute bottom-1.5 w-1.5 h-1.5 bg-sage rounded-full" title="Public Gathering Scheduled" />
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 pt-8 border-t border-blush/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-sage rounded-full" />
                <span className="text-[0.55rem] uppercase tracking-widest font-bold text-slate">Public Ceremony</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-wine rounded-full" />
                <span className="text-[0.55rem] uppercase tracking-widest font-bold text-slate">Selected Date</span>
              </div>
            </div>
            <p className="text-xs text-slate leading-relaxed italic">
              Each session is crafted with trauma-informed, queer-affirming care. Jules will reach out to confirm your intention and logistics within 24 hours.
            </p>
          </div>
        </div>

        {/* Right Side: Slots or Details */}
        <div className="bg-sage/5 p-8 flex flex-col">
          <AnimatePresence mode="wait">
            {bookingStep === 'calendar' && (
              <motion.div
                key="slots"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col"
              >
                <div className="mb-6">
                  <h4 className="font-serif italic text-2xl text-wine mb-1">Available Windows</h4>
                  <p className="text-slate text-xs">
                    {selectedDate ? format(selectedDate, 'EEEE, MMMM do, yyyy') : 'Select a date from the calendar'}
                  </p>
                </div>

                {selectedDate ? (
                  <div className="space-y-2.5 flex-1 overflow-y-auto pr-1 max-h-[340px]">
                    {getEventsForDay(selectedDate).length > 0 && (
                      <div className="p-3.5 bg-sage/10 border border-sage/20 rounded-2xl flex gap-2.5 mb-3">
                        <AlertCircle className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-sage uppercase tracking-wider mb-0.5">Note</p>
                          <p className="text-xs text-slate leading-relaxed">
                            Public gathering scheduled: <strong>{getEventsForDay(selectedDate)[0].title}</strong>. Private availability may be limited.
                          </p>
                        </div>
                      </div>
                    )}

                    {dynamicTimeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`
                          w-full p-3.5 rounded-2xl border text-sm font-medium transition-all flex items-center justify-between cursor-pointer
                          ${!slot.available 
                            ? 'bg-slate/5 border-slate/15 text-slate/40 cursor-not-allowed' 
                            : selectedTime === slot.time
                              ? 'bg-wine text-white border-wine shadow-md shadow-wine/10'
                              : 'bg-white border-blush/20 text-ink hover:border-wine/30 group'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2.5">
                          <Clock className={`w-4 h-4 ${selectedTime === slot.time ? 'text-white' : 'text-sage group-hover:text-wine'}`} />
                          <span className="text-xs font-semibold">{slot.time}</span>
                        </div>
                        {slot.available ? (
                          <span className={`text-[0.6rem] uppercase tracking-widest ${selectedTime === slot.time ? 'text-white/80' : 'text-sage font-bold'}`}>
                            Available
                          </span>
                        ) : (
                          <span className="text-[0.6rem] uppercase tracking-widest text-slate/50">
                            {slot.reason || 'Booked'}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-14 h-14 bg-wine/10 rounded-full flex items-center justify-center mb-4 text-wine">
                      <Clock className="w-6 h-6" />
                    </div>
                    <p className="text-slate text-xs italic max-w-xs">
                      Choose an open day on the calendar to view tailored acoustic and somatic availability.
                    </p>
                  </div>
                )}

                <button
                  onClick={handleProceed}
                  disabled={!selectedDate || !selectedTime}
                  className="mt-6 w-full py-3.5 bg-wine text-white rounded-full font-bold text-[0.7rem] uppercase tracking-widest shadow-lg shadow-wine/20 transition-all hover:bg-wine/90 disabled:opacity-50 cursor-pointer"
                >
                  Continue to Reservation Details
                </button>
              </motion.div>
            )}

            {bookingStep === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <div className="mb-6">
                  <button 
                    onClick={() => setBookingStep('calendar')}
                    className="text-sage text-xs font-bold uppercase tracking-widest mb-3 hover:text-wine transition-colors cursor-pointer"
                  >
                    ← Back to Calendar
                  </button>
                  <h4 className="font-serif italic text-2xl text-wine mb-1">Reservation Info</h4>
                  <p className="text-slate text-xs font-medium">
                    {format(selectedDate!, 'MMMM do, yyyy')} at {selectedTime}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label htmlFor="booking-name" className="text-[0.6rem] uppercase tracking-widest font-bold text-slate px-1">
                      Full Name <span className="text-wine">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                      <input 
                        id="booking-name"
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        disabled={status === 'submitting'}
                        className="w-full bg-white border border-blush/20 rounded-xl py-2.5 pl-10 pr-4 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="booking-email" className="text-[0.6rem] uppercase tracking-widest font-bold text-slate px-1">
                      Email Address <span className="text-wine">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                      <input 
                        id="booking-email"
                        required
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        disabled={status === 'submitting'}
                        className="w-full bg-white border border-blush/20 rounded-xl py-2.5 pl-10 pr-4 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine"
                        placeholder="hello@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="booking-type" className="text-[0.6rem] uppercase tracking-widest font-bold text-slate px-1">
                      Gathering Offering <span className="text-wine">*</span>
                    </label>
                    <select 
                      id="booking-type"
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      disabled={status === 'submitting'}
                      className="w-full bg-white border border-blush/20 rounded-xl py-2.5 px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine appearance-none"
                    >
                      <option>Private 1-on-1 Somatic Sound Journey</option>
                      <option>Intimate Partnership / Couple Ceremony</option>
                      <option>Bachelor & Bachelorette Mindful Transition</option>
                      <option>Corporate Team Wellness & Nervous System Care</option>
                      <option>Custom Sanctuary Retreat Experience</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="booking-message" className="text-[0.6rem] uppercase tracking-widest font-bold text-slate px-1">
                      Intentions or Sensory Accommodations (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-sage" />
                      <textarea 
                        id="booking-message"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        disabled={status === 'submitting'}
                        className="w-full bg-white border border-blush/20 rounded-xl py-2.5 pl-10 pr-4 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine h-20 resize-none"
                        placeholder="Share your intentions or any physical/sensory requests..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 bg-wine text-white rounded-full font-bold text-[0.7rem] uppercase tracking-widest shadow-lg shadow-wine/20 transition-all hover:bg-wine/90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Processing Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Booking Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {bookingStep === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4"
              >
                <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center text-sage">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif italic text-3xl text-wine">Sanctuary Reserved</h4>
                <p className="text-slate text-xs leading-relaxed max-w-xs">
                  Thank you, <strong className="text-ink">{formData.name}</strong>. Your reservation request for <strong className="text-wine">{formData.type}</strong> on {format(selectedDate!, 'MMMM do')} at {selectedTime} has been submitted.
                </p>
                {referenceId && (
                  <div className="p-3 bg-white rounded-xl border border-blush/20 text-xs text-slate">
                    <span className="font-medium text-ink">Booking Reference:</span> {referenceId}
                  </div>
                )}
                <p className="text-slate text-[0.7rem] italic">
                  Jules will review and send confirmation to {formData.email} within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setBookingStep('calendar');
                    setSelectedDate(null);
                    setSelectedTime(null);
                    setFormData({ name: '', email: '', type: 'Private 1-on-1 Somatic Sound Journey', message: '' });
                  }}
                  className="text-wine text-[0.68rem] uppercase tracking-widest font-bold underline hover:opacity-70 transition-opacity pt-2"
                >
                  Book another session
                </button>
              </motion.div>
            )}

            {bookingStep === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif italic text-2xl text-wine">Submission Error</h4>
                <p className="text-slate text-xs leading-relaxed max-w-xs">
                  {errorMessage || 'Unable to submit booking request. Please check your connection and try again.'}
                </p>
                <button
                  onClick={() => setBookingStep('details')}
                  className="px-6 py-2.5 rounded-full bg-wine text-white text-xs uppercase tracking-widest font-semibold hover:bg-wine/90"
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
