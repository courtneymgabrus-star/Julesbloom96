import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Search,
  MapPin,
  Sparkles,
  Brain,
  Palette,
  ExternalLink,
  Loader2,
  Compass,
  CheckCircle2,
  AlertCircle,
  Leaf,
  Navigation,
  Flower2
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BotanicalDivider from "../components/BotanicalDivider";
import ReactMarkdown from "react-markdown";
import { usePageTitle } from "../hooks/usePageTitle";

type StudioTab = "search" | "maps" | "vision" | "thinking";

export default function SanctuaryStudio() {
  usePageTitle(
    "Sanctuary Studio | Jules in Bloom",
    "Explore real-time botanical search grounding, Atlanta sanctuary map guides, sacred altar visualizer blueprints, and trauma-informed somatic inquiry tools."
  );

  const [activeTab, setActiveTab] = useState<StudioTab>("search");

  // Search Grounding State (gemini-3.7-flash + googleSearch)
  const [searchPrompt, setSearchPrompt] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    text: string;
    groundingChunks: any[];
    searchQueries: string[];
  } | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Maps Grounding State (gemini-3.7-flash + googleMaps)
  const [mapsPrompt, setMapsPrompt] = useState("");
  const [useUserLocation, setUseUserLocation] = useState(true);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [mapsLoading, setMapsLoading] = useState(false);
  const [mapsResult, setMapsResult] = useState<{
    text: string;
    groundingChunks: any[];
  } | null>(null);
  const [mapsError, setMapsError] = useState<string | null>(null);

  // Botanical Vision / Altar Blueprint State (gemini-3.7-flash)
  const [visionPrompt, setVisionPrompt] = useState("");
  const [visionTheme, setVisionTheme] = useState("sacred_altar");
  const [visionLoading, setVisionLoading] = useState(false);
  const [visionResult, setVisionResult] = useState<string | null>(null);
  const [visionError, setVisionError] = useState<string | null>(null);

  // Deep Somatic Reasoning State (gemini-3.7-flash)
  const [thinkingPrompt, setThinkingPrompt] = useState("");
  const [thinkingContext, setThinkingContext] = useState("");
  const [thinkingLoading, setThinkingLoading] = useState(false);
  const [thinkingResult, setThinkingResult] = useState<string | null>(null);
  const [thinkingError, setThinkingError] = useState<string | null>(null);

  // Search Grounding Handler
  const handleSearch = async (overridePrompt?: string) => {
    const query = overridePrompt || searchPrompt;
    if (!query.trim()) return;

    setSearchLoading(true);
    setSearchError(null);

    try {
      const res = await fetch("/api/gemini/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search request failed");

      setSearchResult(data);
    } catch (err: any) {
      setSearchError(err.message || "Failed to retrieve real-time search data");
    } finally {
      setSearchLoading(false);
    }
  };

  // Maps Grounding Handler
  const handleMaps = async (overridePrompt?: string) => {
    const query = overridePrompt || mapsPrompt;
    if (!query.trim()) return;

    setMapsLoading(true);
    setMapsError(null);

    let coords = userCoords;
    if (useUserLocation && !coords && "geolocation" in navigator) {
      try {
        const pos: GeolocationPosition = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserCoords(coords);
      } catch (e) {
        console.warn("Location permission not granted, using Atlanta coordinates:", e);
      }
    }

    try {
      const res = await fetch("/api/gemini/maps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: query,
          latitude: coords ? coords.lat : 33.7490,
          longitude: coords ? coords.lng : -84.3880,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Maps request failed");

      setMapsResult(data);
    } catch (err: any) {
      setMapsError(err.message || "Failed to retrieve grounded map locations");
    } finally {
      setMapsLoading(false);
    }
  };

  // Botanical Vision / Altar Blueprint Handler
  const handleVision = async (overridePrompt?: string) => {
    const query = overridePrompt || visionPrompt;
    if (!query.trim()) return;

    setVisionLoading(true);
    setVisionError(null);

    try {
      const res = await fetch("/api/gemini/vision-concept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: query,
          theme: visionTheme,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Vision generation failed");

      setVisionResult(data.text);
    } catch (err: any) {
      setVisionError(err.message || "Failed to generate botanical visual concept");
    } finally {
      setVisionLoading(false);
    }
  };

  // Somatic Reasoning Handler
  const handleThinking = async (overridePrompt?: string) => {
    const query = overridePrompt || thinkingPrompt;
    if (!query.trim()) return;

    setThinkingLoading(true);
    setThinkingError(null);

    try {
      const res = await fetch("/api/gemini/thinking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: query,
          context: thinkingContext,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Reasoning request failed");

      setThinkingResult(data.text);
    } catch (err: any) {
      setThinkingError(err.message || "Failed to execute somatic reasoning");
    } finally {
      setThinkingLoading(false);
    }
  };

  return (
    <div className="bg-cream min-h-screen selection:bg-blush/30">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <section className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wine/10 border border-wine/15 text-wine text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-wine" />
            Sanctuary Intelligence Suite
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-serif italic text-4xl md:text-5xl text-wine mb-4"
          >
            Botanical & Somatic Studio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate text-base md:text-lg leading-relaxed"
          >
            Explore real-time Google Search and Maps data, sacred botanical altar blueprints, and trauma-informed somatic inquiries.
          </motion.p>
        </section>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
          <button
            id="tab-search"
            onClick={() => setActiveTab("search")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
              activeTab === "search"
                ? "bg-wine text-white shadow-sm"
                : "bg-white/80 text-slate hover:text-wine border border-blush/20 hover:bg-white"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Grounding</span>
          </button>

          <button
            id="tab-maps"
            onClick={() => setActiveTab("maps")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
              activeTab === "maps"
                ? "bg-wine text-white shadow-sm"
                : "bg-white/80 text-slate hover:text-wine border border-blush/20 hover:bg-white"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Maps Grounding</span>
          </button>

          <button
            id="tab-vision"
            onClick={() => setActiveTab("vision")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
              activeTab === "vision"
                ? "bg-wine text-white shadow-sm"
                : "bg-white/80 text-slate hover:text-wine border border-blush/20 hover:bg-white"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Botanical Altar Visualizer</span>
          </button>

          <button
            id="tab-thinking"
            onClick={() => setActiveTab("thinking")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
              activeTab === "thinking"
                ? "bg-wine text-white shadow-sm"
                : "bg-white/80 text-slate hover:text-wine border border-blush/20 hover:bg-white"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Somatic Reasoning</span>
          </button>
        </div>

        {/* Tab 1: Google Search Grounding */}
        {activeTab === "search" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-blush/20 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sage/15 flex items-center justify-center text-sage">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif italic text-2xl text-wine">Search Grounding</h3>
                  <p className="text-xs text-slate">Real-time botanical & holistic research</p>
                </div>
              </div>

              <p className="text-xs text-slate leading-relaxed">
                Query up-to-date botanical research, seasonal Georgia flora conditions, lunar astrological alignments, and sound bath acoustic science.
              </p>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate">
                  Inquiry Topic
                </label>
                <textarea
                  id="search-input"
                  value={searchPrompt}
                  onChange={(e) => setSearchPrompt(e.target.value)}
                  placeholder="e.g. What are the current lunar alignments and optimal botanical herbs for parasympathetic soothing tonight?"
                  rows={4}
                  className="w-full p-4 text-sm bg-cream/50 border border-blush/30 rounded-2xl focus:outline-none focus:border-wine transition-all resize-none text-ink"
                />
              </div>

              <div className="space-y-2">
                <span className="text-[0.7rem] uppercase tracking-wider text-slate font-medium block">
                  Suggested Real-Time Prompts
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Current moon phase and somatic ritual for Atlanta tonight",
                    "Evidence on 528Hz vs 432Hz crystal singing bowls for vagal tone",
                    "Native Georgia medicinal herbs in season for calming teas",
                    "Recent clinical findings on restorative somatic movement for burnout",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setSearchPrompt(preset);
                        handleSearch(preset);
                      }}
                      className="text-left text-xs bg-cream/70 hover:bg-wine/10 hover:text-wine text-slate px-3 py-1.5 rounded-xl border border-blush/20 transition-all"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="search-submit-button"
                onClick={() => handleSearch()}
                disabled={searchLoading || !searchPrompt.trim()}
                className="w-full py-3.5 px-6 rounded-full bg-wine text-white font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-wine/90 disabled:opacity-50 transition-all shadow-sm"
              >
                {searchLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Searching Web Sources...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Run Search Grounded Query</span>
                  </>
                )}
              </button>

              {searchError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Query Error</p>
                    <p className="mt-0.5">{searchError}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-blush/20 shadow-sm min-h-[480px] flex flex-col">
              <div className="flex items-center justify-between border-b border-blush/15 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-sage" />
                  <h4 className="font-serif italic text-xl text-wine">Grounded Synthesis</h4>
                </div>
                {searchResult && (
                  <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-sage/15 text-sage font-semibold uppercase tracking-wider">
                    Live Verified
                  </span>
                )}
              </div>

              {searchLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-12 h-12 rounded-full border-2 border-wine border-t-transparent animate-spin" />
                  <p className="font-serif italic text-xl text-wine">Consulting Real-Time Botanical Sources...</p>
                  <p className="text-xs text-slate max-w-sm">
                    Querying live botanical indexes and scientific publications via Google Search tools.
                  </p>
                </div>
              ) : searchResult ? (
                <div className="space-y-6 flex-1">
                  <div className="prose prose-sm max-w-none text-slate leading-relaxed space-y-3">
                    <ReactMarkdown>{searchResult.text}</ReactMarkdown>
                  </div>

                  {/* Search Queries Used */}
                  {searchResult.searchQueries && searchResult.searchQueries.length > 0 && (
                    <div className="p-4 rounded-2xl bg-cream/60 border border-blush/20">
                      <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate block mb-2">
                        Google Search Queries Executed
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {searchResult.searchQueries.map((q, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white text-wine px-2.5 py-1 rounded-lg border border-blush/20 font-mono text-[0.7rem]"
                          >
                            "{q}"
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grounding Web Sources */}
                  {searchResult.groundingChunks && searchResult.groundingChunks.length > 0 && (
                    <div className="border-t border-blush/15 pt-4">
                      <span className="text-[0.65rem] font-bold uppercase tracking-wider text-wine block mb-3">
                        Grounded Web Sources & Citations
                      </span>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {searchResult.groundingChunks.map((chunk, idx) => {
                          const web = chunk.web;
                          if (!web) return null;
                          return (
                            <a
                              key={idx}
                              href={web.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-start justify-between p-3 rounded-xl bg-cream/40 border border-blush/20 hover:border-wine/30 hover:bg-white transition-all text-left"
                            >
                              <div className="overflow-hidden pr-2">
                                <p className="text-xs font-medium text-ink group-hover:text-wine transition-colors truncate">
                                  {web.title || web.uri}
                                </p>
                                <p className="text-[0.65rem] text-slate truncate mt-0.5">{web.uri}</p>
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 text-slate group-hover:text-wine shrink-0 mt-0.5" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate/70">
                  <Search className="w-12 h-12 stroke-[1] text-sage/40 mb-3" />
                  <p className="font-serif italic text-lg text-wine/70">Awaiting Your Inquiry</p>
                  <p className="text-xs text-slate mt-1 max-w-sm">
                    Enter a research question or select one of the suggested prompts to retrieve live search-grounded answers.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 2: Google Maps Grounding */}
        {activeTab === "maps" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-blush/20 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-wine/10 flex items-center justify-center text-wine">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif italic text-2xl text-wine">Maps Grounding</h3>
                  <p className="text-xs text-slate">Local Atlanta sanctuaries & peaceful outdoor spots</p>
                </div>
              </div>

              <p className="text-xs text-slate leading-relaxed">
                Discover serene Atlanta sanctuary spaces, outdoor yoga groves, botanical gardens, crystal apothecaries, and sound healing venues with direct Google Maps place links.
              </p>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-cream/60 border border-blush/20 text-xs">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-wine" />
                  <span className="text-slate font-medium">Use my current location</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useUserLocation}
                    onChange={(e) => setUseUserLocation(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-wine"></div>
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate">
                  Sanctuary & Location Search
                </label>
                <textarea
                  id="maps-input"
                  value={mapsPrompt}
                  onChange={(e) => setMapsPrompt(e.target.value)}
                  placeholder="e.g. Find peaceful outdoor botanical gardens and secluded park groves in Atlanta suitable for morning somatic breathwork."
                  rows={3}
                  className="w-full p-4 text-sm bg-cream/50 border border-blush/30 rounded-2xl focus:outline-none focus:border-wine transition-all resize-none text-ink"
                />
              </div>

              <div className="space-y-2">
                <span className="text-[0.7rem] uppercase tracking-wider text-slate font-medium block">
                  Atlanta Sanctuary Destinations
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Find quiet forested parks in Atlanta for outdoor somatic movement",
                    "Botanical gardens and healing green spaces near Candler Park Atlanta",
                    "Holistic wellness studios and crystal shops in Inman Park Atlanta",
                    "Secluded nature retreat centers within 2 hours of Atlanta",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setMapsPrompt(preset);
                        handleMaps(preset);
                      }}
                      className="text-left text-xs bg-cream/70 hover:bg-wine/10 hover:text-wine text-slate px-3 py-1.5 rounded-xl border border-blush/20 transition-all"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="maps-submit-button"
                onClick={() => handleMaps()}
                disabled={mapsLoading || !mapsPrompt.trim()}
                className="w-full py-3.5 px-6 rounded-full bg-wine text-white font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-wine/90 disabled:opacity-50 transition-all shadow-sm"
              >
                {mapsLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Retrieving Google Maps Places...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4" />
                    <span>Find Grounded Places</span>
                  </>
                )}
              </button>

              {mapsError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Maps Grounding Error</p>
                    <p className="mt-0.5">{mapsError}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-blush/20 shadow-sm min-h-[480px] flex flex-col">
              <div className="flex items-center justify-between border-b border-blush/15 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-wine" />
                  <h4 className="font-serif italic text-xl text-wine">Grounded Locations & Maps Links</h4>
                </div>
                {mapsResult && (
                  <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-wine/10 text-wine font-semibold uppercase tracking-wider">
                    Maps Verified
                  </span>
                )}
              </div>

              {mapsLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-12 h-12 rounded-full border-2 border-wine border-t-transparent animate-spin" />
                  <p className="font-serif italic text-xl text-wine">Mapping Botanical & Wellness Spaces...</p>
                  <p className="text-xs text-slate max-w-sm">
                    Extracting verified Google Maps places, reviews, and coordinates via Google Maps tools.
                  </p>
                </div>
              ) : mapsResult ? (
                <div className="space-y-6 flex-1">
                  <div className="prose prose-sm max-w-none text-slate leading-relaxed space-y-3">
                    <ReactMarkdown>{mapsResult.text}</ReactMarkdown>
                  </div>

                  {/* Grounding Maps Place Chunks with Links */}
                  {mapsResult.groundingChunks && mapsResult.groundingChunks.length > 0 && (
                    <div className="border-t border-blush/15 pt-5">
                      <span className="text-[0.7rem] font-bold uppercase tracking-wider text-wine block mb-3">
                        Verified Google Maps Places & Navigation Links
                      </span>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {mapsResult.groundingChunks.map((chunk, idx) => {
                          const maps = chunk.maps;
                          if (!maps) return null;
                          return (
                            <a
                              key={idx}
                              href={maps.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex flex-col justify-between p-4 rounded-2xl bg-cream/40 border border-blush/20 hover:border-wine/40 hover:bg-white transition-all shadow-xs"
                            >
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg bg-wine/10 flex items-center justify-center text-wine shrink-0">
                                    <MapPin className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="text-xs font-semibold text-ink group-hover:text-wine transition-colors">
                                    {maps.title || "View on Google Maps"}
                                  </span>
                                </div>
                                <ExternalLink className="w-3.5 h-3.5 text-slate group-hover:text-wine shrink-0" />
                              </div>

                              {maps.placeAnswerSources?.reviewSnippets && maps.placeAnswerSources.reviewSnippets.length > 0 && (
                                <p className="text-[0.65rem] text-slate italic line-clamp-2 mt-1 bg-white/70 p-2 rounded-lg border border-blush/10">
                                  "{maps.placeAnswerSources.reviewSnippets[0].snippet}"
                                </p>
                              )}

                              <span className="text-[0.65rem] text-wine font-medium mt-2.5 inline-flex items-center gap-1 group-hover:underline">
                                Open in Google Maps →
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate/70">
                  <MapPin className="w-12 h-12 stroke-[1] text-wine/40 mb-3" />
                  <p className="font-serif italic text-lg text-wine/70">No Locations Queried Yet</p>
                  <p className="text-xs text-slate mt-1 max-w-sm">
                    Enter a neighborhood, park preference, or botanical search to pull grounded Google Maps points of interest.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Botanical Altar Visualizer & Blueprint */}
        {activeTab === "vision" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-blush/20 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blush/25 flex items-center justify-center text-wine">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif italic text-2xl text-wine">Botanical Visualizer</h3>
                  <p className="text-xs text-slate">Sacred altar arrangements & sensory architecture</p>
                </div>
              </div>

              <p className="text-xs text-slate leading-relaxed">
                Design bespoke botanical altar blueprints, sound bath arrangement geometries, harmonic crystal pairings, and sensory color harmonies.
              </p>

              {/* Theme Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate">
                  Sanctuary Theme
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "sacred_altar", label: "Sacred Altar" },
                    { id: "sound_bath", label: "Sound Bath Grove" },
                    { id: "lunar_mandala", label: "Lunar Mandala" },
                    { id: "restorative_space", label: "Restorative Corner" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setVisionTheme(t.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium transition-all border ${
                        visionTheme === t.id
                          ? "bg-wine text-white border-wine"
                          : "bg-cream/50 text-slate border-blush/20 hover:bg-white"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate">
                  Vision & Intention
                </label>
                <textarea
                  id="vision-prompt-input"
                  value={visionPrompt}
                  onChange={(e) => setVisionPrompt(e.target.value)}
                  placeholder="e.g. Design a restorative full moon sound healing altar with quartz singing bowls, wild lavender, eucalyptus, warm amber candles, and sacred geometry."
                  rows={4}
                  className="w-full p-4 text-sm bg-cream/50 border border-blush/30 rounded-2xl focus:outline-none focus:border-wine transition-all resize-none text-ink"
                />
              </div>

              {/* Presets */}
              <div className="space-y-2">
                <span className="text-[0.7rem] uppercase tracking-wider text-slate font-medium block">
                  Curated Sanctuary Presets
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Full Moon Sound Bath Altar with Frosted Crystal Bowls & White Sage",
                    "Georgia Wildflower & Pine Needle Nervous System Reset Grove",
                    "Sunset Candlelit Restorative Yoga & Chamomile Mandala",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setVisionPrompt(preset);
                        handleVision(preset);
                      }}
                      className="text-left text-xs bg-cream/70 hover:bg-wine/10 hover:text-wine text-slate px-3 py-1.5 rounded-xl border border-blush/20 transition-all"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="vision-submit-button"
                onClick={() => handleVision()}
                disabled={visionLoading || !visionPrompt.trim()}
                className="w-full py-3.5 px-6 rounded-full bg-wine text-white font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-wine/90 disabled:opacity-50 transition-all shadow-sm"
              >
                {visionLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Designing Sanctuary Blueprint...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Altar & Botanical Blueprint</span>
                  </>
                )}
              </button>

              {visionError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Notice</p>
                    <p className="mt-0.5">{visionError}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Visual Blueprint Output */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-blush/20 shadow-sm min-h-[480px] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-blush/15 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Flower2 className="w-4 h-4 text-wine" />
                  <h4 className="font-serif italic text-xl text-wine">Botanical Architecture & Sensory Palette</h4>
                </div>
                {visionResult && (
                  <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-wine/10 text-wine font-semibold uppercase tracking-wider">
                    Blueprint Ready
                  </span>
                )}
              </div>

              {visionLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-12 h-12 rounded-full border-2 border-wine border-t-transparent animate-spin" />
                  <p className="font-serif italic text-xl text-wine">Synthesizing Botanical Layout...</p>
                  <p className="text-xs text-slate max-w-sm">
                    Pairing herbal species, crystal acoustic resonance, geometry, and color palettes.
                  </p>
                </div>
              ) : visionResult ? (
                <div className="space-y-4 flex-1">
                  <div className="prose prose-sm max-w-none text-slate leading-relaxed space-y-3">
                    <ReactMarkdown>{visionResult}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate/70">
                  <Palette className="w-12 h-12 stroke-[1] text-blush/60 mb-3" />
                  <p className="font-serif italic text-lg text-wine/70">Altar Canvas Awaiting Intention</p>
                  <p className="text-xs text-slate mt-1 max-w-sm">
                    Enter an altar concept or select a sanctuary preset to generate a full botanical blueprint.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 4: Somatic Reasoning & Inquiry */}
        {activeTab === "thinking" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-blush/20 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sage/15 flex items-center justify-center text-sage">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif italic text-2xl text-wine">Somatic Reasoning</h3>
                  <p className="text-xs text-slate">Trauma-informed nervous system regulation</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sage/10 border border-sage/20 text-xs text-sage flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-wine">Polyvagal & Somatic Mapping</p>
                  <p className="text-slate mt-0.5">
                    Synthesizes polyvagal pacing, vagus nerve stimulation, and restorative sequence design.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate">
                  Client / Case Context (Optional)
                </label>
                <textarea
                  id="thinking-context-input"
                  value={thinkingContext}
                  onChange={(e) => setThinkingContext(e.target.value)}
                  placeholder="e.g. High sympathetic arousal, chronic neck/shoulder tension from desk work, seeks gentle breathwork and restorative poses..."
                  rows={2}
                  className="w-full p-3.5 text-xs bg-cream/40 border border-blush/30 rounded-2xl focus:outline-none focus:border-wine transition-all resize-none text-ink"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate">
                  Somatic Inquiry
                </label>
                <textarea
                  id="thinking-prompt-input"
                  value={thinkingPrompt}
                  onChange={(e) => setThinkingPrompt(e.target.value)}
                  placeholder="e.g. Design a tailored 4-week neuro-somatic reset protocol combining polyvagal breath pacing, 528Hz crystal singing bowl transitions, and restorative movement."
                  rows={4}
                  className="w-full p-4 text-sm bg-cream/50 border border-blush/30 rounded-2xl focus:outline-none focus:border-wine transition-all resize-none text-ink"
                />
              </div>

              <div className="space-y-2">
                <span className="text-[0.7rem] uppercase tracking-wider text-slate font-medium block">
                  Curated Clinical Scenarios
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Formulate a trauma-informed nervous system regulation protocol for burnout",
                    "Synthesize polyvagal theory with pranayama for vagus nerve activation",
                    "Architect a bespoke sound immersion structure combining 432Hz bowls and silence intervals",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setThinkingPrompt(preset);
                        handleThinking(preset);
                      }}
                      className="text-left text-xs bg-cream/70 hover:bg-wine/10 hover:text-wine text-slate px-3 py-1.5 rounded-xl border border-blush/20 transition-all"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="thinking-submit-button"
                onClick={() => handleThinking()}
                disabled={thinkingLoading || !thinkingPrompt.trim()}
                className="w-full py-3.5 px-6 rounded-full bg-wine text-white font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-wine/90 disabled:opacity-50 transition-all shadow-sm"
              >
                {thinkingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Somatic Protocol...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    <span>Run Somatic Analysis</span>
                  </>
                )}
              </button>

              {thinkingError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Reasoning Error</p>
                    <p className="mt-0.5">{thinkingError}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-blush/20 shadow-sm min-h-[480px] flex flex-col">
              <div className="flex items-center justify-between border-b border-blush/15 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-sage" />
                  <h4 className="font-serif italic text-xl text-wine">Protocol & Practice Synthesis</h4>
                </div>
                {thinkingResult && (
                  <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-sage/15 text-sage font-semibold uppercase tracking-wider">
                    Synthesized
                  </span>
                )}
              </div>

              {thinkingLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-12 h-12 rounded-full border-2 border-sage border-t-transparent animate-spin" />
                  <p className="font-serif italic text-xl text-wine">Synthesizing Somatic Protocol...</p>
                  <p className="text-xs text-slate max-w-sm">
                    Evaluating polyvagal considerations, pacing, and restorative sequencing.
                  </p>
                </div>
              ) : thinkingResult ? (
                <div className="space-y-6 flex-1">
                  <div className="prose prose-sm max-w-none text-slate leading-relaxed space-y-3">
                    <ReactMarkdown>{thinkingResult}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate/70">
                  <Brain className="w-12 h-12 stroke-[1] text-sage/40 mb-3" />
                  <p className="font-serif italic text-lg text-wine/70">Awaiting Somatic Inquiry</p>
                  <p className="text-xs text-slate mt-1 max-w-sm">
                    Formulate a nervous system inquiry or case context to generate step-by-step guidance.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <BotanicalDivider />
      </main>

      <Footer />
    </div>
  );
}
