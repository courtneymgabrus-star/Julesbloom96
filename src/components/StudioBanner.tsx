import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Search, MapPin, Palette, Brain, ArrowRight, Sparkles } from "lucide-react";

export default function StudioBanner() {
  return (
    <section className="py-20 px-6 bg-wine/5">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-blush/20 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sage/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wine/10 text-wine text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5" />
                Intelligent Sanctuary Studio
              </span>

              <h2 className="font-serif italic text-3xl md:text-5xl text-wine leading-tight">
                Explore Botanical & Somatic Intelligence
              </h2>

              <p className="text-slate text-sm md:text-base leading-relaxed max-w-xl">
                Experience real-time Google Search and Maps grounded research, design bespoke sacred altar layouts, and explore trauma-informed nervous system guidance.
              </p>

              <div className="pt-2">
                <Link
                  to="/studio"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-wine text-white text-xs uppercase tracking-widest font-medium hover:bg-wine/90 transition-all shadow-sm group"
                >
                  <span>Launch Studio Suite</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid sm:grid-cols-2 gap-3.5">
              <Link
                to="/studio"
                className="p-4 rounded-2xl bg-cream/50 hover:bg-cream border border-blush/20 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-sage/15 flex items-center justify-center text-sage mb-2.5">
                  <Search className="w-4 h-4" />
                </div>
                <h3 className="font-serif italic text-base text-wine font-medium">Search Grounding</h3>
                <p className="text-[0.7rem] text-slate mt-1">
                  Live botanical & lunar scientific inquiries.
                </p>
              </Link>

              <Link
                to="/studio"
                className="p-4 rounded-2xl bg-cream/50 hover:bg-cream border border-blush/20 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-wine/10 flex items-center justify-center text-wine mb-2.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="font-serif italic text-base text-wine font-medium">Maps Grounding</h3>
                <p className="text-[0.7rem] text-slate mt-1">
                  Atlanta sanctuaries, parks & place links with live coordinates.
                </p>
              </Link>

              <Link
                to="/studio"
                className="p-4 rounded-2xl bg-cream/50 hover:bg-cream border border-blush/20 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-blush/20 flex items-center justify-center text-wine mb-2.5">
                  <Palette className="w-4 h-4" />
                </div>
                <h3 className="font-serif italic text-base text-wine font-medium">Altar Visualizer</h3>
                <p className="text-[0.7rem] text-slate mt-1">
                  Sensory palettes, crystal pairings & layout geometry.
                </p>
              </Link>

              <Link
                to="/studio"
                className="p-4 rounded-2xl bg-cream/50 hover:bg-cream border border-blush/20 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-sage/15 flex items-center justify-center text-sage mb-2.5">
                  <Brain className="w-4 h-4" />
                </div>
                <h3 className="font-serif italic text-base text-wine font-medium">Somatic Inquiry</h3>
                <p className="text-[0.7rem] text-slate mt-1">
                  Trauma-informed nervous system & polyvagal guidance.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
