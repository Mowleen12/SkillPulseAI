import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles, TrendingUp, ChevronRight } from "lucide-react";

interface NavbarProps {
  onCtaClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCtaClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastScrollY.current && currentY > 60);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Dashboard", href: "#insights" },
    { label: "Skill Trends", href: "#trends" },
    { label: "Career Paths", href: "#careers" },
    { label: "Market Insights", href: "#insights" },
    { label: "Reports", href: "#metrics" },
  ];

  return (
    <>
      <motion.nav
        id="navbar"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 inset-x-0 z-50 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center"
      >
        {/* LOGO LINK */}
        <a href="/" className="flex items-center space-x-2.5 group relative">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white overflow-hidden shadow-md shadow-blue-500/20">
              <TrendingUp className="w-4.5 h-4.5 text-white" />
            </div>
            {/* Pulsing ring highlight */}
            <span className="absolute -inset-1 rounded-lg border border-blue-400 bg-blue-400/10 opacity-30 animate-ping pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-[22px] font-bold tracking-tight text-slate-900 font-display">
                SkillPulse
              </span>
              <span className="text-[22px] font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-display ml-1">
                AI
              </span>
            </div>
            <span className="text-[9px] font-mono font-semibold tracking-wider text-slate-400 uppercase -mt-1 block">
              Indian Job Market Intel
            </span>
          </div>
        </a>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-[14px] font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 py-1.5 group"
            >
              <span>{link.label}</span>
              {/* Underline expanding transition */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </div>

        {/* DESKTOP RIGHT CTA ACTION */}
        <div className="hidden lg:flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCtaClick}
            className="flex items-center space-x-1.5 px-6 py-2.5 rounded-full text-sm font-semibold capitalize tracking-tight text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md shadow-blue-500/20 hover:shadow-cyan-500/15 transition-all duration-200 cursor-pointer"
          >
            <span>Analyze Market</span>
            <ChevronRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* MOBILE MENU TRIGGER BUTTON */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-lg"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE FULL-SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[69px] bottom-0 z-40 bg-white/95 backdrop-blur-lg flex flex-col justify-between p-6 border-t border-slate-100 shadow-2xl lg:hidden h-[calc(100vh-69px)]"
          >
            {/* Mobile Nav Link List */}
            <div className="flex flex-col space-y-6 pt-6">
              {navLinks.map((link, index) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-2xl font-bold font-display text-slate-800 hover:text-blue-600 transition-colors duration-200 py-2 border-b border-slate-100"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-6 h-6 text-slate-400" />
                </motion.a>
              ))}
            </div>

            {/* Mobile bottom Call to Action */}
            <div className="space-y-4 pb-12">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5">
                <span className="text-[10px] font-mono font-bold tracking-wider text-blue-600 uppercase">
                  SkillPulse Intelligence
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  Analyze high-growth skills, salary insights & future opportunities live.
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCtaClick();
                }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl text-md font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20"
              >
                <span>Analyze Market →</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
