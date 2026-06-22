import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Cpu, 
  Briefcase, 
  Layers, 
  IndianRupee,
  Activity
} from "lucide-react";

interface CareerBridgePathway {
  id: string;
  fromTitle: string;
  toTitle: string;
  fromSalary: string;
  toSalary: string;
  premiumPct: string;
  bridgeDuration: string;
  stepsToTransition: string[];
  growthScoreOut: number;
  marketJustification: string;
}

const CAREER_TRAJECTORIES: CareerBridgePathway[] = [
  {
    id: "fe-aiui",
    fromTitle: "Frontend / React Engineer",
    toTitle: "AI Interfaces & Agentic UI Engineer",
    fromSalary: "₹6–14 LPA",
    toSalary: "₹18–32 LPA",
    premiumPct: "+120%",
    bridgeDuration: "3-4 Months",
    stepsToTransition: [
      "Master stream-response chunking interfaces (Vercel AI SDK)",
      "Learn state-machine design for multi-agent feedback loops",
      "Gain proficiency in vector embeddings and indexing search",
      "Adopt modern web layouts with optimized canvas/WebGL visual tools"
    ],
    growthScoreOut: 94,
    marketJustification: "Global capability centers (GCCs) in Bengaluru are urgently shifting legacy interfaces into real-time collaborative generative workspace models."
  },
  {
    id: "da-de",
    fromTitle: "Data Analyst / SQL Reporter",
    toTitle: "Cloud Data Infrastructure Architect",
    fromSalary: "₹5–9 LPA",
    toSalary: "₹14–26 LPA",
    premiumPct: "+180%",
    bridgeDuration: "4-5 Months",
    stepsToTransition: [
      "Acquire deep skill in Apache Spark streaming structures",
      "Master dbt data transformation and pipeline test frameworks",
      "Learn Databricks or Snowflake cluster scaling optimization",
      "Gain experience with Python pipeline orchestration engine (Airflow/Dagster)"
    ],
    growthScoreOut: 91,
    marketJustification: "The explosive volume of unstructured data gathered for model tuning requires strong scalable pipe orchestrators across top-tier fintech startups."
  },
  {
    id: "sys-sre",
    fromTitle: "Systems Admin / IT Tech",
    toTitle: "Kubernetes Platform SRE Analyst",
    fromSalary: "₹4–8 LPA",
    toSalary: "₹12–24 LPA",
    premiumPct: "+200%",
    bridgeDuration: "3 Months",
    stepsToTransition: [
      "Obtain hands-on certified Kubernetes Administrator (CKA)",
      "Implement Infrastructure-as-code models utilizing Terraform",
      "Construct automated CI/CD build channels with GitHub Actions",
      "Adopt Prometheus & Grafana distributed metric alerting stacks"
    ],
    growthScoreOut: 89,
    marketJustification: "Enterprises in Hyderabad and Mumbai are moving fully onto multicloud container networks, wanting security-aligned platform technicians."
  }
];

export const CareerPaths: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string>("fe-aiui");

  const currentPath = CAREER_TRAJECTORIES.find((p) => p.id === selectedPath) || CAREER_TRAJECTORIES[0];

  return (
    <section id="careers" className="py-20 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-indigo-50/80 border border-indigo-100/70 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold text-indigo-600 uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 animate-spin" />
            <span>BRIDGE PLANNING ENGINE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-800 font-display">
            High-Growth Career Paths
          </h2>
          <p className="text-slate-500 font-light max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Upgrade your legacy technology title to a futuristic role in demand. View step-by-step career path projections with salary premiums.
          </p>
        </div>

        {/* Pathway Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Vertical Toggle Select List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Select A Target Pathway
            </span>
            
            {CAREER_TRAJECTORIES.map((pathway) => {
              const isActive = pathway.id === selectedPath;
              return (
                <button
                  key={pathway.id}
                  onClick={() => setSelectedPath(pathway.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between outline-none cursor-pointer ${
                    isActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/15 scale-[1.01]"
                      : "bg-slate-50 hover:bg-slate-100/80 border-slate-100 text-slate-700"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive ? "bg-indigo-500 text-white" : "bg-slate-200 text-slate-600"
                      }`}>
                        {pathway.premiumPct} Premium
                      </span>
                    </div>
                    <span className="text-xs font-medium text-slate-400 block pt-1">Target Role:</span>
                    <h4 className="text-sm md:text-base font-bold font-display leading-snug">
                      {pathway.toTitle}
                    </h4>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? "text-indigo-400 translate-x-1" : "text-slate-400"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Interactive Trajectory Visualization Board (8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPath.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/20 to-blue-50/10 shadow-xl space-y-6"
              >
                {/* Header Information inside Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-indigo-100/50 pb-5 gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                      UPGRADE STAGE PLANNING
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 font-display">
                      {currentPath.toTitle}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <div className="bg-indigo-600 text-white font-mono text-center font-bold px-3.5 py-1 rounded-xl shadow-md min-w-[80px]">
                      <span className="text-xs block text-indigo-200 font-medium">PREMIUM</span>
                      <span className="text-sm sm:text-base font-extrabold">{currentPath.premiumPct}</span>
                    </div>
                    
                    <div className="bg-slate-800 text-white font-mono text-center px-3.5 py-1 rounded-xl min-w-[80px]">
                      <span className="text-xs block text-slate-400 font-medium font-mono">EST TIME</span>
                      <span className="text-sm font-semibold">{currentPath.bridgeDuration}</span>
                    </div>
                  </div>
                </div>

                {/* The Transition Bridge salary roadmap */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* From vs To details */}
                  <div className="bg-white/80 p-5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                        LEGACY ENTRYPOINT
                      </span>
                      <p className="font-semibold text-slate-500 text-sm mt-0.5">{currentPath.fromTitle}</p>
                      
                      <div className="flex items-center space-x-1.5 mt-3 text-slate-400">
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">Avg Baseline: {currentPath.fromSalary}</span>
                      </div>
                    </div>
                    
                    <div className="mt-5 border-t border-slate-50 pt-3 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Low Demand Index</span>
                      <span className="text-amber-500 font-bold">Stable</span>
                    </div>
                  </div>

                  {/* Upgraded Goal */}
                  <div className="bg-indigo-600 p-5 rounded-2xl text-white flex flex-col justify-between shadow-md">
                    <div>
                      <span className="text-[9px] font-mono text-indigo-200 font-bold uppercase tracking-wider block">
                        UPGRADED POSITION (2026 DEMAND)
                      </span>
                      <p className="font-bold text-white text-md mt-0.5 font-display">{currentPath.toTitle}</p>
                      
                      <div className="flex items-center space-x-1.5 mt-3 text-white">
                        <IndianRupee className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-bold text-white">Salary Potential: {currentPath.toSalary}</span>
                      </div>
                    </div>
                    
                    <div className="mt-5 border-t border-indigo-500 pt-3 flex items-center justify-between text-xs font-mono">
                      <span className="text-indigo-200">High Growth Multiplier</span>
                      <span className="text-emerald-300 font-bold">Accelerating</span>
                    </div>
                  </div>

                </div>

                {/* Transition Checklist steps */}
                <div className="space-y-3.5">
                  <div className="flex items-center space-x-2 text-indigo-800">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-bold font-mono tracking-wider uppercase">
                      Curated Bridge Curriculum 
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {currentPath.stepsToTransition.map((step, index) => (
                      <div 
                        key={index} 
                        className="flex items-start space-x-3 bg-white/70 p-3.5 rounded-xl border border-slate-100"
                      >
                        <div className="w-5.5 h-5.5 bg-indigo-50 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold text-indigo-600 shrink-0 mt-0.5">
                          0{index + 1}
                        </div>
                        <span className="text-xs text-slate-600 leading-normal">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market justification explanation */}
                <div className="bg-slate-900 text-slate-300 rounded-2xl p-4.5 flex items-start space-x-3 border border-slate-800">
                  <Cpu className="w-5 h-5 text-indigo-400 mt-1 shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest block">
                      INDIAN RECRUITER REALITY SYNC
                    </span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      &ldquo;{currentPath.marketJustification}&rdquo;
                    </p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
