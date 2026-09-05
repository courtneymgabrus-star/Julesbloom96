import { motion } from 'motion/react';
import { BookOpen, Award, FileText, ExternalLink, Brain, Sparkles, Wind } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BotanicalDivider from '../components/BotanicalDivider';
import { usePageTitle } from '../hooks/usePageTitle';

const researchTopics = [
  {
    title: "Somatic Experiencing & Sound",
    description: "Exploring how specific frequencies in crystal singing bowls interact with the vagus nerve to promote trauma release.",
    icon: Wind,
    detail: "Our research focuses on the physiological shifts in heart rate variability (HRV) during 90-minute sound immersions."
  },
  {
    title: "Eco-Somatics in Wellness",
    description: "The impact of nature-based movement on chronic stress markers in high-performance professionals.",
    icon: Brain,
    detail: "Studying the synergistic effect of forest bathing combined with restorative yoga practices."
  },
  {
    title: "Polyvagal Theory in Practice",
    description: "Integrating modern neuroscience into traditional yoga frameworks for enhanced nervous system regulation.",
    icon: Sparkles,
    detail: "Developing clinical protocols for using pranayama to shift from sympathetic to parasympathetic states."
  }
];

export default function Research() {
  usePageTitle('Research & Evidence-Based Somatics', 'Explore Juls’ research publications, polyvagal frameworks, and neuro-somatic inquiries bridging modern science with sacred sound healing.');

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <section className="px-6 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[0.7rem] uppercase tracking-[0.2em] font-bold text-sage mb-4 block"
            >
              Academic & Clinical Foundations
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif italic text-4xl md:text-6xl text-wine mb-6"
            >
              Research & Evidence
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Bridging the gap between ancient somatic wisdom and contemporary neurobiology through rigorous research and ethical inquiry.
            </motion.p>
          </div>
        </section>

        <BotanicalDivider />

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {researchTopics.map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/40 border border-blush/20 p-8 rounded-3xl"
                >
                  <div className="w-12 h-12 bg-[#d4e5cc] rounded-2xl flex items-center justify-center text-sage mb-6">
                    <topic.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif italic text-2xl text-wine mb-4">{topic.title}</h3>
                  <p className="text-slate text-sm leading-relaxed mb-6">{topic.description}</p>
                  <div className="pt-6 border-t border-blush/10 text-xs text-slate/80 italic">
                    {topic.detail}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Research Framework Highlight */}
            <div className="bg-wine text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden mb-20 shadow-xl shadow-wine/10">
              <div className="max-w-2xl relative z-10">
                <span className="text-[0.65rem] uppercase tracking-widest text-blush font-bold mb-4 block">
                  Advocate & Research Scientist Focus
                </span>
                <h2 className="font-serif italic text-3xl md:text-5xl mb-6">
                  Community-Centered Somatic Resilience
                </h2>
                <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8">
                  My research centers on how somatic interventions and collective acoustic spaces dismantle systemic burnout patterns within queer, BIPOC, and caregiving communities. We transform theoretical health equity into tangible somatic safety.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-xs bg-white/10 px-4 py-2 rounded-full border border-white/20">
                    <Award className="w-4 h-4 text-blush" />
                    <span>Research Scientist & Advocate</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-white/10 px-4 py-2 rounded-full border border-white/20">
                    <FileText className="w-4 h-4 text-blush" />
                    <span>Peer-Reviewed Author</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
