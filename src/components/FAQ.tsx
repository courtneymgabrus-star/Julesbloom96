import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sparkles, Heart, Waves, HelpCircle, ShieldCheck } from "lucide-react";

interface FAQItem {
  id: string;
  category: "sound" | "queer-affirming" | "accessibility";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-sound-expect",
    category: "sound",
    question: "What happens during a sound healing session, and what should I expect?",
    answer:
      "During a sound bath, you will lie down or rest comfortably in a supported position using mats, bolsters, and blankets. Jules plays 432Hz frosted quartz crystal singing bowls, chime instruments, and ocean drums to create gentle acoustic resonant frequencies. The vibrations slow brainwave frequencies down to alpha and theta states, allowing the nervous system to shift from sympathetic (fight-or-flight) into deep parasympathetic restoration.",
  },
  {
    id: "faq-queer-affirming-meaning",
    category: "queer-affirming",
    question: "What does it mean for Jules in Bloom spaces to be 'queer-affirming and trauma-informed'?",
    answer:
      "Being queer-affirming and trauma-informed is woven into every breath of our gatherings. We center LGBTQIA+, trans, non-binary, and BIPOC community members through inclusive, gender-affirming language, zero body-policing, optional camera/eye-contact preferences, and full agency over your practice. You are never forced into any posture, expression, or sharing circle—your autonomy and comfort are sacred.",
  },
  {
    id: "faq-sound-science",
    category: "sound",
    question: "How do vibrational frequencies and crystal singing bowls support nervous system regulation?",
    answer:
      "Acoustic sound immersion utilizes sound entrainment and vibroacoustic resonance. The pure sinusoidal waves of quartz crystal bowls stimulate the vagus nerve, lower heart rate variability (HRV) stress markers, reduce cortisol levels, and ease chronic tension held in fascia and connective tissue, guiding the body into organic somatic homeostasis.",
  },
  {
    id: "faq-queer-consent-touch",
    category: "queer-affirming",
    question: "How are consent, physical touch, and boundaries handled during practices?",
    answer:
      "All sessions are strictly consent-forward. We do not perform hands-on adjustments unless explicit, verbal, or consent-token permission is actively given. Instructors offer verbal cues with multiple movement variations, prioritizing somatic exploration and ease over aesthetic perfection.",
  },
  {
    id: "faq-sound-what-to-bring",
    category: "accessibility",
    question: "What should I wear, and what should I bring to an in-person gathering?",
    answer:
      "Wear loose, comfortable clothing that keeps you warm—body temperatures naturally drop during deep relaxation. We recommend bringing a yoga mat, a cozy blanket, an eye covering or sleep mask, a refillable water bottle, and a journal if you enjoy grounding after meditation. Bolsters and props are also provided at studio events.",
  },
  {
    id: "faq-sound-safety",
    category: "sound",
    question: "Are sound healing sessions safe if I am pregnant or have sensory sensitivity?",
    answer:
      "Sound healing is gentle and non-invasive. However, if you are in your first trimester of pregnancy, have active epilepsy, or wear a medical implant (such as a pacemaker), please let us know beforehand so we can adjust distance, volume, and frequencies to ensure your complete comfort and safety.",
  },
  {
    id: "faq-accessibility-mobility",
    category: "accessibility",
    question: "Are beginners and all body sizes and mobility levels welcome?",
    answer:
      "Yes, unconditionally. Our practices do not require prior yoga, meditation, or breathwork experience. Poses can be adapted for chairs, wall support, or complete stillness. Every body shape, mobility level, and energy capacity is celebrated and met with warmth.",
  },
  {
    id: "faq-private-offerings",
    category: "queer-affirming",
    question: "Can I book private sound baths, queer community circles, or retreat sessions?",
    answer:
      "Yes! Jules offers customized 1-on-1 private somatic sound journeys, queer partnership celebrations, intentional community grief/joy circles, and corporate wellness consulting. Reach out through the booking form below to co-create a session tailored to your intentions.",
  },
];

export default function FAQ() {
  const [openIds, setOpenIds] = useState<string[]>(["faq-sound-expect", "faq-queer-affirming-meaning"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    selectedCategory === "all"
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === selectedCategory);

  return (
    <section id="faq" className="py-24 px-6 bg-[#f7f5f0] relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-sage mb-3 flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-3.5 h-3.5 text-sage" />
            <span>Curious Minds & Sanctuary Care</span>
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-serif italic text-4xl md:text-5xl text-wine leading-tight mb-4"
          >
            frequently asked questions.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          >
            Gentle answers about what to expect during sound baths, vibrational acoustic science, and our queer-affirming, trauma-informed sanctuary standards.
          </motion.p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All Questions", icon: <Sparkles className="w-3 h-3" /> },
            { id: "sound", label: "Sound Healing", icon: <Waves className="w-3 h-3" /> },
            { id: "queer-affirming", label: "Queer-Affirming & Care", icon: <Heart className="w-3 h-3" /> },
            { id: "accessibility", label: "Accessibility & What to Bring", icon: <ShieldCheck className="w-3 h-3" /> },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-wine text-white shadow-sm"
                  : "bg-white/80 text-slate hover:text-wine border border-blush/20 hover:bg-white"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-wine/30 shadow-sm"
                    : "bg-cream/60 border-blush/20 hover:bg-white hover:border-blush/40"
                }`}
              >
                <button
                  id={`accordion-btn-${faq.id}`}
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${faq.id}`}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-sage/10 text-sage text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="font-serif italic text-lg md:text-xl text-wine font-medium">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-wine text-white rotate-180" : "bg-cream text-slate"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`accordion-panel-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate text-sm leading-relaxed border-t border-blush/10 pl-15">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance Callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-3xl bg-[#ebf0e5] border border-sage/20 text-center space-y-3"
        >
          <p className="font-serif italic text-xl text-wine">Have a specific question or comfort request?</p>
          <p className="text-slate text-xs md:text-sm max-w-lg mx-auto">
            We are honored to accommodate your sensory, physical, or energetic needs before any gathering.
          </p>
          <div className="pt-2">
            <a
              href="#connect"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-wine text-white text-xs uppercase tracking-widest font-medium hover:bg-wine/90 transition-all shadow-xs"
            >
              Ask Jules Directly →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
