import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Sparkles, AlertCircle, RefreshCw, Zap, ArrowRight, ArrowRightLeft, ShieldCheck, DollarSign } from "lucide-react";

interface SkillCompareMetric {
  name: string;
  demandIndex: number;
  growth: string;
  avgSalary: string;
  primaryHub: string;
  keyEnabler: string;
}

const COMPARATIVE_DATA: Record<string, SkillCompareMetric> = {
  "Agentic AI": { name: "Agentic AI", demandIndex: 96, growth: "+48%", avgSalary: "₹18-35 LPA", primaryHub: "Bengaluru", keyEnabler: "LangGraph, CrewAI" },
  "LLMOps": { name: "LLMOps", demandIndex: 92, growth: "+61%", avgSalary: "₹20-38 LPA", primaryHub: "Hyderabad", keyEnabler: "MLflow, Weights & Biases" },
  "React / Next.js": { name: "React / Next.js", demandIndex: 88, growth: "+28%", avgSalary: "₹12-22 LPA", primaryHub: "Pune", keyEnabler: "React Server Components" },
  "Kubernetes / Platform": { name: "Kubernetes / Platform", demandIndex: 90, growth: "+40%", avgSalary: "₹15-28 LPA", primaryHub: "Bengaluru", keyEnabler: "Terraform, ArgoCD" },
  "Databricks / Spark": { name: "Databricks / Spark", demandIndex: 93, growth: "+52%", avgSalary: "₹18-32 LPA", primaryHub: "Noida / Gurugram", keyEnabler: "Delta Lake, PySpark" },
  "Ethical Security": { name: "Ethical Security", demandIndex: 86, growth: "+42%", avgSalary: "₹16-30 LPA", primaryHub: "Mumbai", keyEnabler: "SIEM, OSCP standards" }
};

export const SkillTrends: React.FC = () => {
  const [skillA, setSkillA] = useState<string>("Agentic AI");
  const [skillB, setSkillB] = useState<string>("React / Next.js");

  const dataA = COMPARATIVE_DATA[skillA];
  const dataB = COMPARATIVE_DATA[skillB];

  return (
    <section id="trends" className="py-20 bg-slate-50/40 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-cyan-50/80 border border-cyan-100/70 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold text-cyan-600 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>METRIC COMPARATOR</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-800 font-display">
            Side-by-side Skill Matrix
          </h2>
          <p className="text-slate-500 font-light max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Instantly compare critical job market metrics across India’s core engineering disciplines to formulate high-conviction learning paths.
          </p>
        </div>

        {/* Outer Comparative Container - Double Glass Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Comparative Selectors & Quick Trends Left Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-100 space-y-5">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-blue-500" />
                <span>SELECT TARGET POOLS</span>
              </span>

              <div className="space-y-4">
                {/* Skill A dropdown select */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 block">Evaluate Base Skill (A):</label>
                  <select 
                    value={skillA}
                    onChange={(e) => setSkillA(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer"
                  >
                    {Object.keys(COMPARATIVE_DATA).map((key) => (
                      <option key={key} value={key} disabled={key === skillB}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skill B dropdown select */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 block">Compare Against Target (B):</label>
                  <select 
                    value={skillB}
                    onChange={(e) => setSkillB(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer"
                  >
                    {Object.keys(COMPARATIVE_DATA).map((key) => (
                      <option key={key} value={key} disabled={key === skillA}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                <p className="text-xs leading-relaxed text-slate-600">
                  <span className="font-bold text-blue-700">Analyst Tip:</span> Pairing skills across different domains (e.g. Frontend with Agentic Frameworks) is driving the highest salary acceleration index currently in private Indian tech firms.
                </p>
              </div>
            </div>

            {/* Quick stats highlight list */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-100 flex-1 flex flex-col justify-center space-y-4">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                NATIONAL MARKET INDEX
              </span>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-medium border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Tier-1 Cities Premium</span>
                  <span className="text-slate-800 font-bold font-mono">+12% to +25% Avg</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Fastest Recruiter Velocity</span>
                  <span className="text-blue-600 font-extrabold font-mono">Agentic AI</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-500">Highest Supply Gap</span>
                  <span className="text-cyan-600 font-extrabold font-mono">LLMOps Engineers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Cards Grid - Right Side (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CARD A */}
            <motion.div 
              layout
              className="glass-panel p-6 rounded-3xl border border-blue-100 bg-white/90 shadow-lg flex flex-col justify-between min-h-[360px]"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-100 py-1 px-2 rounded">
                    BASE METRIC (A)
                  </span>
                  <Zap className="w-5 h-5 text-blue-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 font-display mb-1">{dataA.name}</h3>
                <span className="text-xs text-slate-400 font-mono mb-4 block">Key Tooling: {dataA.keyEnabler}</span>
                
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  {/* Demand Index Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Demand Score</span>
                      <span className="text-slate-800 font-mono">{dataA.demandIndex}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${dataA.demandIndex}%` }} />
                    </div>
                  </div>

                  {/* Growth Rate */}
                  <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2">
                    <span className="text-slate-500 font-medium">YoY Growth Index</span>
                    <span className="text-emerald-600 font-bold font-mono text-sm">{dataA.growth}</span>
                  </div>

                  {/* Salary range */}
                  <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2">
                    <span className="text-slate-500 font-medium">Average Compensation</span>
                    <span className="text-slate-800 font-bold font-mono text-sm">{dataA.avgSalary}</span>
                  </div>

                  {/* Top Hub */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Primary Hiring Hub</span>
                    <span className="text-slate-800 font-semibold">{dataA.primaryHub}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-slate-50 p-3 rounded-xl border border-slate-100/70 text-center">
                <span className="text-[11px] font-mono text-slate-500">Stable, solid choice for 2026</span>
              </div>
            </motion.div>

            {/* CARD B */}
            <motion.div 
              layout
              className="glass-panel p-6 rounded-3xl border border-cyan-100 bg-white/90 shadow-lg flex flex-col justify-between min-h-[360px]"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono font-bold text-cyan-600 bg-cyan-50 border border-cyan-100 py-1 px-2 rounded">
                    TARGET METRIC (B)
                  </span>
                  <Sparkles className="w-5 h-5 text-cyan-500 animate-pulse" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 font-display mb-1">{dataB.name}</h3>
                <span className="text-xs text-slate-400 font-mono mb-4 block">Key Tooling: {dataB.keyEnabler}</span>
                
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  {/* Demand Index Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Demand Score</span>
                      <span className="text-slate-800 font-mono">{dataB.demandIndex}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${dataB.demandIndex}%` }} />
                    </div>
                  </div>

                  {/* Growth Rate */}
                  <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2">
                    <span className="text-slate-500 font-medium">YoY Growth Index</span>
                    <span className="text-emerald-600 font-bold font-mono text-sm">{dataB.growth}</span>
                  </div>

                  {/* Salary range */}
                  <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2">
                    <span className="text-slate-500 font-medium">Average Compensation</span>
                    <span className="text-slate-800 font-bold font-mono text-sm">{dataB.avgSalary}</span>
                  </div>

                  {/* Top Hub */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Primary Hiring Hub</span>
                    <span className="text-slate-800 font-semibold">{dataB.primaryHub}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-slate-50 p-3 rounded-xl border border-slate-100/70 text-center">
                <span className="text-[11px] font-mono text-slate-500">High growth trajectory expected</span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
