/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Sparkles, 
  Check, 
  MapPin, 
  Mic, 
  TrendingUp, 
  Briefcase, 
  ArrowRight,
  ShieldCheck,
  Server,
  Code2,
  Lock,
  SearchCheck,
  Globe,
  Plus,
  ArrowUp
} from "lucide-react";
import { Navbar } from "./components/Navbar";
import { BackgroundEffect } from "./components/BackgroundEffect";
import { RightAnalytics } from "./components/RightAnalytics";
import { SkillTrends } from "./components/SkillTrends";
import { CareerPaths } from "./components/CareerPaths";
import { RegionalReports } from "./components/RegionalReports";
import { CATEGORIES, PRELOADED_ANALYTICS } from "./data/categoriesData";
import { MarketIntelligence, SkillCategory } from "./types";

// Dynamic Typewriter Hook as requested
export function useTypewriter(text: string, speed = 35, startDelay = 500) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);

    const startTimeout = setTimeout(() => {
      let currentIdx = 0;
      const interval = setInterval(() => {
        if (currentIdx < text.length) {
          setDisplayed((prev) => prev + text.charAt(currentIdx));
          currentIdx++;
        } else {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// Fluent count-up counter matching Stripe-like premium aesthetic
function CountUp({ end, duration = 1500, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const rate = Math.min(progress / duration, 1);
      // Ease out quadratic
      const easedRate = rate * (2 - rate);
      setCount(Math.floor(easedRate * end));
      if (rate < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function App() {
  // Parallax tracking states
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Dashboard active analysis data
  const [activeIntelligence, setActiveIntelligence] = useState<MarketIntelligence>(
    PRELOADED_ANALYTICS["AI & Machine Learning"]
  );
  const [isApiLoading, setIsApiLoading] = useState(false);

  // States for search & categories
  const [selectedCategories, setSelectedCategories] = useState<SkillCategory[]>(["AI & Machine Learning"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchNotification, setSearchNotification] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Focus reference for search bar animation glow
  const [searchFocus, setSearchFocus] = useState(false);

  // Back to top arrow states
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Capture mouse coordinates for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return; // Disable parallax on mobile
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Static hero heading — no typewriter to prevent partial-word rendering on reload

  // Multi-select pill click handler
  const handleCategoryToggle = (category: SkillCategory) => {
    if (selectedCategories.includes(category)) {
      // Remove unless it's the last one
      if (selectedCategories.length > 1) {
        const next = selectedCategories.filter((c) => c !== category);
        setSelectedCategories(next);
        // Sync active dashboard to the first category remaining
        setActiveIntelligence(PRELOADED_ANALYTICS[next[0]]);
      }
    } else {
      const next = [...selectedCategories, category];
      setSelectedCategories(next);
      // Automatically load the preloaded metrics on selection
      setActiveIntelligence(PRELOADED_ANALYTICS[category]);
    }
  };

  // Submit search query or current selected pills to fullstack endpoint
  const analyzeMarketData = async (queryToSubmit?: string) => {
    setIsApiLoading(true);
    setSearchNotification("");

    const term = queryToSubmit?.trim() || searchQuery.trim();
    const bodyPayload = {
      query: term || undefined,
      categories: term ? undefined : selectedCategories
    };

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setActiveIntelligence(data);

      if (data._isFallback) {
        setSearchNotification("Rendered simulated local tech pool stats.");
      } else {
        setSearchNotification(`Successfully synced verified live insights for '${data.skillName}'`);
      }
    } catch (err: any) {
      console.error("[SkillPulse UI] Error bringing intelligence:", err.message);
      setSearchNotification("Local intelligence engine activated.");
    } finally {
      setIsApiLoading(false);
    }
  };

  // Handle clicking predefined search shortcuts
  const handleQuickSearch = (keyword: string) => {
    setSearchQuery(keyword);
    analyzeMarketData(keyword);
  };

  // Simulated voice synthesis state
  const handleVoiceTrigger = () => {
    if (isListening) return;
    setIsListening(true);
    const options = ["Kubernetes Specialist", "Rust Developer", "Agentic AI Architect", "Data Engineer"];
    const randomOption = options[Math.floor(Math.random() * options.length)];
    
    setTimeout(() => {
      setSearchQuery(randomOption);
      setIsListening(false);
      analyzeMarketData(randomOption);
    }, 1500);
  };

  // Scroll smooth to analysis section
  const handleSmoothCtaScroll = () => {
    const section = document.getElementById("insights-hub");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      id="root-wrapper"
      className="relative bg-white text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-950 antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen"
    >
      {/* 1. Global Navigation Navbar */}
      <Navbar onCtaClick={handleSmoothCtaScroll} />

      {/* 2. Interactive Future Graph Background Effect */}
      <BackgroundEffect mouseOffset={mouseOffset} />

      {/* 3. Main Hero Content Layout */}
      <main id="hero-layout" className="relative z-10 flex flex-col w-full min-h-screen pt-[72px] lg:pt-[84px]">
        
        {/* Core Screen Columns Grid */}
        <div id="main-wrapper" className="w-full max-w-7xl mx-auto px-6 py-8 md:py-12 lg:py-16 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* COLUMN LEFT: SAAS VALUE METRICS & ACTIONS */}
            <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
              
              {/* Premium Metropolitan Intelligence Info Badging */}
              <div 
                className="inline-flex self-start items-center space-x-2 bg-blue-50/70 border border-blue-100/60 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold text-blue-600 tracking-tight"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="uppercase tracking-widest">METRO MARKET REPORT V3.5</span>
              </div>

              {/* Spectacular Headline with Typewriter Hook */}
              <div className="space-y-4 max-w-3xl">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-bold tracking-tight text-slate-900 leading-[1.05] font-display whitespace-pre-line"
                >
                  {"Discover the skills\nIndia is hiring for."}
                </motion.h1>

                {/* Subtitle / Descriptive Text */}
                <p className="text-md sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl font-light">
                  Analyze real-time hiring trends across India's technology ecosystem. Discover high-growth skills, explore in-demand career paths, compare salary insights, and predict future opportunities using AI-powered market intelligence.
                </p>
              </div>

              {/* Categories Pills Container */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                    1. Tap Domains to filter active demography
                  </span>
                  {selectedCategories.length > 1 && (
                    <button 
                      onClick={() => setSelectedCategories(["AI & Machine Learning"])}
                      className="text-[11px] font-mono text-blue-600 hover:underline flex items-center space-x-1 font-semibold"
                    >
                      <span>Reset Select</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => {
                    const isSelected = selectedCategories.includes(category);
                    return (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs sm:text-sm rounded-full font-medium transition-all duration-300 outline-none cursor-pointer border ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-md border-blue-600 shadow-blue-500/15 scale-[1.03]"
                            : "bg-white text-slate-600 hover:text-slate-950 border-slate-100 hover:border-slate-300 shadow-sm"
                        }`}
                      >
                        {isSelected && (
                          <motion.span 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            className="shrink-0"
                          >
                            <Check className="w-3.5 h-3.5 text-white" />
                          </motion.span>
                        )}
                        <span>{category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Banner: AnimatePresence Dynamic Analytics Target Block */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {selectedCategories.length === 0 ? (
                    <motion.div
                      key="nothing-selected"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="glass-panel border-amber-100 bg-amber-50/40 p-4.5 rounded-2xl flex items-center text-amber-800 text-xs sm:text-sm space-x-3.5"
                    >
                      <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                      <p>Select one or more domains above to analyze current market demand.</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="ready-to-analyze"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="glass-panel bg-gradient-to-r from-blue-50/30 to-cyan-50/20 border-blue-100 p-4.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block">
                          SELECTED POOLS FOR SYNCHRONOUS AI TARGETING
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          {selectedCategories.map((c) => (
                            <span 
                              key={c} 
                              className="text-xs font-semibold text-slate-800 bg-slate-100/90 py-0.5 px-2 rounded"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => analyzeMarketData()}
                        className="self-start sm:self-center bg-slate-900 text-white font-semibold text-xs px-5 py-3 rounded-xl flex items-center space-x-2 shadow-md hover:bg-black uppercase tracking-wider font-mono cursor-pointer transition-colors duration-150"
                      >
                        <span>View Insights</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Modern Live AI Search Box Inputs */}
              <div className="space-y-3">
                <span className="text-[12px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                  2. Custom Search Intelligence
                </span>
                
                <div 
                  className={`relative flex items-center bg-white border rounded-2xl p-2 transition-all duration-300 ${
                    searchFocus 
                      ? "ring-4 ring-blue-500/10 border-blue-500" 
                      : "border-slate-200/80 shadow-md shadow-slate-100/50"
                  }`}
                >
                  <Search className="w-5.5 h-5.5 text-slate-400 ml-2.5 shrink-0" />
                  
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        analyzeMarketData();
                      }
                    }}
                    placeholder="Search skills, roles, technologies (e.g. Python, AWS, Kubernetes)..."
                    className="w-full bg-transparent border-none text-slate-800 text-sm focus:outline-none focus:ring-0 placeholder-slate-400/80 px-3 py-2"
                  />

                  {/* Simulated Listening Soundwave during voice triggers */}
                  {isListening && (
                    <div className="flex items-center space-x-0.5 px-2.5">
                      <span className="w-1 h-3 bg-cyan-500 rounded-full animate-pulse" />
                      <span className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" />
                      <span className="w-1 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
                    </div>
                  )}

                  {/* Voice Search Button */}
                  <button
                    onClick={handleVoiceTrigger}
                    className="p-2 text-slate-400 hover:text-slate-600 focus:outline-none hover:bg-slate-50 rounded-xl mr-1 cursor-pointer transition"
                    title="Voice Search Shortcut"
                  >
                    <Mic className={`w-4.5 h-4.5 ${isListening ? "text-red-500 animate-pulse" : ""}`} />
                  </button>

                  <button
                    onClick={() => analyzeMarketData()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-xl flex items-center space-x-1.5 shadow-md shadow-blue-500/10 cursor-pointer text-nowrap"
                  >
                    <span>Analyze</span>
                  </button>
                </div>

                {/* Micro search notification alerts */}
                {searchNotification && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] font-mono font-medium text-blue-600 flex items-center space-x-1 bg-blue-50/40 p-2 rounded-lg border border-blue-100/40"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                    <span>{searchNotification}</span>
                  </motion.div>
                )}

                {/* Highly structured Quick Examples link clicks */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-medium text-slate-400">Try searching:</span>
                  {["Python", "AI Engineer", "AWS", "Kubernetes", "Data Scientist"].map((shortcut) => (
                    <button
                      key={shortcut}
                      onClick={() => handleQuickSearch(shortcut)}
                      className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-100/80 cursor-pointer font-medium transition"
                    >
                      {shortcut}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* COLUMN RIGHT: INTEL VISUALIZATION & FLOATING SAAS GRAPH CARDS */}
            <div id="insights-hub" className="lg:col-span-5 relative">
              
              {/* Central Dynamic Visual Graph Dashboard Frame */}
              <div className="relative z-10 w-full">
                <RightAnalytics data={activeIntelligence} isLoading={isApiLoading} />
              </div>

              {/* Floating Glassmorphic Context Cards offset on the margins (Desktops) */}
              {/* Card 1: Trending Skill */}
              <motion.div
                className="hidden xl:flex absolute -left-20 top-1/4 z-20 glass-panel border border-teal-100/80 bg-white/90 p-4.5 rounded-2xl shadow-xl flex-col font-sans space-y-1 w-44 animate-float-slow"
                style={{
                  transform: `translate(${mouseOffset.x * -12}px, ${mouseOffset.y * -12}px)`,
                }}
              >
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-teal-600">
                  🔥 Trending Skill
                </span>
                <span className="text-sm font-extrabold text-slate-800 font-display">
                  Agentic AI
                </span>
                <div className="flex items-center space-x-1.5 pt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-emerald-600">+48% YoY</span>
                </div>
              </motion.div>

              {/* Card 2: Most Demanded Role */}
              <motion.div
                className="hidden xl:flex absolute -right-16 top-10 z-20 glass-panel border border-blue-100/80 bg-white/90 p-4.5 rounded-2xl shadow-xl flex-col font-sans space-y-1 w-48 animate-float-fast"
                style={{
                  transform: `translate(${mouseOffset.x * 20}px, ${mouseOffset.y * 20}px)`,
                }}
              >
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-blue-600">
                  💼 Most Demanded
                </span>
                <span className="text-sm font-extrabold text-slate-800 font-display">
                  AI Specialist
                </span>
                <span className="text-xs text-slate-400 font-mono">12,400 open posts</span>
              </motion.div>

              {/* Card 3: Fastest Growing Technology */}
              <motion.div
                className="hidden xl:flex absolute -left-16 bottom-20 z-20 glass-panel border border-cyan-100/80 bg-white/90 p-4.5 rounded-2xl shadow-xl flex-col font-sans space-y-1 w-44 animate-float-fast"
                style={{
                  transform: `translate(${mouseOffset.x * -24}px, ${mouseOffset.y * -24}px)`,
                }}
              >
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-cyan-600">
                  📈 Fastest Growing
                </span>
                <span className="text-sm font-extrabold text-slate-800 font-display">
                  LLMOps
                </span>
                <span className="text-xs text-emerald-600 font-mono font-bold">+61% Acceleration</span>
              </motion.div>

              {/* Card 4: Highest Paying */}
              <motion.div
                className="hidden xl:flex absolute -right-20 bottom-12 z-20 glass-panel border border-purple-100/80 bg-white/90 p-4.5 rounded-2xl shadow-xl flex-col font-sans space-y-1 w-48 animate-float-slow"
                style={{
                  transform: `translate(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-purple-600">
                    💰 Highest Paying
                  </span>
                  <Plus className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <span className="text-sm font-extrabold text-slate-800 font-display">
                  Generative AI
                </span>
                <span className="text-xs font-bold text-indigo-700 font-mono">
                  ₹18–35 LPA avg
                </span>
              </motion.div>

            </div>

          </div>
        </div>

        {/* 4. Trust Indicators Section (At bottom of Hero Screen) */}
        <div id="metrics" className="relative z-10 border-t border-slate-100/95 bg-slate-50/40 backdrop-blur-sm mt-auto">
          <div className="w-full max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100 items-center">
              
              <div className="p-3">
                <div className="text-3xl md:text-4xl font-extrabold font-display text-blue-600">
                  <CountUp end={1000} suffix="+" />
                </div>
                <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Job Listings Analyzed
                </p>
              </div>

              <div className="p-3 pt-6 md:pt-3">
                <div className="text-3xl md:text-4xl font-extrabold font-display text-slate-800">
                  <CountUp end={1000} suffix="+" />
                </div>
                <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Skills Tracked
                </p>
              </div>

              <div className="p-3 pt-6 md:pt-3">
                <div className="text-3xl md:text-4xl font-extrabold font-display text-slate-800">
                  <CountUp end={500} suffix="+" />
                </div>
                <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Technology Roles
                </p>
              </div>

              <div className="p-3 pt-6 md:pt-3 flex flex-col justify-center items-center">
                <div className="flex items-center space-x-1 text-emerald-600">
                  <ShieldCheck className="w-5.5 h-5.5" />
                  <span className="text-lg md:text-xl font-bold font-display uppercase tracking-wide">
                    Updated Daily
                  </span>
                </div>
                <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Live National Sync
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* 4.5. New Dynamic Intelligence Sections */}
        <SkillTrends />
        <CareerPaths />
        <RegionalReports />

      </main>

      {/* 5. Sleek visual footer info */}
      <footer className="relative z-10 bg-white border-t border-slate-100 p-6 text-center text-xs text-slate-400 font-mono">
        <p>© 2026 SkillPulse AI. Created by Mowleen Armstrong. Powered for Indian GCC ecosystem.</p>
      </footer>

      {/* Floating Go Back Up Arrow with Fade Animation */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scroll-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 p-3.5 bg-slate-900 text-white rounded-full shadow-xl hover:bg-black border border-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
