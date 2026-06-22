import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  TrendingUp, 
  Download, 
  Check, 
  Map, 
  Bot, 
  Briefcase,
  Layers,
  FileText,
  RefreshCw
} from "lucide-react";

interface CityIntelligence {
  name: string;
  totalPostings: string;
  medianSalary: string;
  topTrendStack: string[];
  hiringVelocity: "Explosive" | "High" | "Moderate";
  gccConcentration: string;
  localHubHighlight: string;
}

const REGIONAL_CITY_DATA: Record<string, CityIntelligence> = {
  "Bengaluru": {
    name: "Bengaluru (Silicon Valley of India)",
    totalPostings: "14,800+ Active Roles",
    medianSalary: "₹18.5 LPA",
    topTrendStack: ["PyTorch", "Rust", "Agentic Networks", "LLMOps", "React"],
    hiringVelocity: "Explosive",
    gccConcentration: "Over 450+ Active Global Capability Centers",
    localHubHighlight: "Aggressive early adopter ecosystem with heavy premium on AI fine-tuning capabilities"
  },
  "Hyderabad": {
    name: "Hyderabad (HITEC City Focus)",
    totalPostings: "8,900+ Active Roles",
    medianSalary: "₹16.2 LPA",
    topTrendStack: ["AWS Core", "Kubernetes", "Snowflake", "Security Labs", "TypeScript"],
    hiringVelocity: "High",
    gccConcentration: "Massive scale centers for Microsoft, Amazon, Google",
    localHubHighlight: "Enterprise cloud systems orchestration, heavy platform stability focus"
  },
  "Pune / Mumbai": {
    name: "Pune & Mumbai (BFSI / Fintech Gateway)",
    totalPostings: "6,500+ Active Roles",
    medianSalary: "₹15.0 LPA",
    topTrendStack: ["Security Protocols", "Ethical Hacking", "Distributed Ledger", "Kubernetes"],
    hiringVelocity: "High",
    gccConcentration: "Major global banks and financial clearing houses",
    localHubHighlight: "Strict zero-trust compliance standards, offering strong benefits for SecOps"
  },
  "NCR (Noida & Gurugram)": {
    name: "NCR (Delhi, Gurugram & Noida)",
    totalPostings: "4,200+ Active Roles",
    medianSalary: "₹13.8 LPA",
    topTrendStack: ["Python Pipelines", "dbt Data Modeling", "NLP Analytics", "Salesforce API"],
    hiringVelocity: "Moderate",
    gccConcentration: "Broad outsourcing and global service system delivery hubs",
    localHubHighlight: "Large scale enterprise automation services and custom cloud integration programs"
  }
};

export const RegionalReports: React.FC = () => {
  const [activeCity, setActiveCity] = useState<string>("Bengaluru");
  
  // Custom interactive report builder states
  const [clientName, setClientName] = useState("");
  const [reportSelection, setReportSelection] = useState<string[]>(["Agentic AI"]);
  const [generatedReport, setGeneratedReport] = useState<any>(null);
  const [reportLoading, setReportLoading] = useState(false);

  const cityData = REGIONAL_CITY_DATA[activeCity];

  // Handler to toggle skill choices inside report form
  const handleReportSkillSelection = (skillName: string) => {
    if (reportSelection.includes(skillName)) {
      setReportSelection(reportSelection.filter((s) => s !== skillName));
    } else {
      setReportSelection([...reportSelection, skillName]);
    }
  };

  // Trigger report generation sequence
  const handleCompileCustomReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportLoading(true);
    
    setTimeout(() => {
      setGeneratedReport({
        title: `Indian Tech Demography Report — Curated for ${clientName || "Professional Candidate"}`,
        cityFocus: activeCity,
        targetSkills: reportSelection,
        dateGenerated: "June 2026 - Instant Live Build",
        confidenceMetric: "99.4% Verified",
        compensationIndex: activeCity === "Bengaluru" ? "₹18-35 LPA Range" : "₹14-25 LPA Range"
      });
      setReportLoading(false);
    }, 1200);
  };

  return (
    <section id="insights" className="py-20 bg-slate-50 relative border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-blue-50/80 border border-blue-100/70 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold text-blue-600 uppercase tracking-widest">
            <Map className="w-3.5 h-3.5" />
            <span>INDIAN GEOGRAPHICAL INTEL</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-800 font-display">
            Regional Hub Demography
          </h2>
          <p className="text-slate-500 font-light max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Understand key localized variations in developer salaries, target toolings, and corporate GCC concentration.
          </p>
        </div>

        {/* 2-Column layout: City Tabs + City details Left, Interactive custom report builder right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT: Regional interactive map block */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-100 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span>TARGET METROPOLITAN LOCATIONS</span>
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Verified Localities
                </span>
              </div>

              {/* City Tab buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.keys(REGIONAL_CITY_DATA).map((cityName) => {
                  const isActive = cityName === activeCity;
                  return (
                    <button
                      key={cityName}
                      onClick={() => setActiveCity(cityName)}
                      className={`px-3 py-2.5 rounded-xl text-center text-xs font-semibold tracking-tight transition-all duration-300 outline-none cursor-pointer border ${
                        isActive
                          ? "bg-slate-900 border-slate-900 text-white shadow-md scale-[1.03]"
                          : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200/60"
                      }`}
                    >
                      {cityName}
                    </button>
                  );
                })}
              </div>

              {/* Selected City metrics display block */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCity}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl border border-slate-100/80 p-5 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 font-display">{cityData.name}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{cityData.gccConcentration}</p>
                    </div>
                    <span className={`text-[10px] uppercase font-mono font-bold px-2 py-1 rounded ${
                      cityData.hiringVelocity === "Explosive"
                        ? "bg-red-50 text-red-500 border border-red-100"
                        : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    }`}>
                      Velocity: {cityData.hiringVelocity}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-mono text-slate-400 block font-semibold">EST. OPENINGS VOLUME</span>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{cityData.totalPostings}</p>
                    </div>
                    
                    <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-mono text-slate-400 block font-semibold">MEDIAN COMPENSATION</span>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{cityData.medianSalary} Year-one Base</p>
                    </div>
                  </div>

                  {/* Regional Trend Stacks */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase block tracking-wider">
                      Regional Trend Stacks Requested:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cityData.topTrendStack.map((stack) => (
                        <span 
                          key={stack}
                          className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100/50"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights paragraph */}
                  <div className="bg-slate-900 text-slate-300 rounded-xl p-3.5 text-xs leading-relaxed">
                    <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">Local Intel Summary</span>
                    {cityData.localHubHighlight}
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* RIGHT: Interactive custom study report builder */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 rounded-3xl border border-indigo-100 bg-white/95 shadow-xl flex flex-col justify-between h-full">
              
              <div>
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">
                    CUSTOM REPORT BUILDER
                  </h4>
                </div>

                <form onSubmit={handleCompileCustomReport} className="space-y-4">
                  
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-tight block">Enter Candidate Name:</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                  </div>

                  {/* Custom checkable skills */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-tight block">
                      Inclusions Select:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Agentic AI", "LLMOps", "React / RSC", "AWS DevOps", "Databricks Pipelines", "Web Security"].map((skill) => {
                        const checked = reportSelection.includes(skill);
                        return (
                          <button
                            type="button"
                            key={skill}
                            onClick={() => handleReportSkillSelection(skill)}
                            className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-colors duration-150 cursor-pointer ${
                              checked 
                                ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-bold" 
                                : "bg-slate-50 hover:bg-slate-100/50 border-slate-100 text-slate-600"
                            }`}
                          >
                            <span>{skill}</span>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              checked ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300"
                            }`}>
                              {checked && <Check className="w-2.5 h-2.5" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs py-3 rounded-xl uppercase tracking-wider font-mono flex items-center justify-center space-x-2 mt-4 cursor-pointer shadow-md shadow-blue-500/10"
                  >
                    {reportLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Compiling Intelligence Metrics...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                        <span>Build Custom Report</span>
                      </>
                    )}
                  </button>

                </form>
              </div>

              {/* Dynamic report result preview wrapper or inline placeholder */}
              <div className="mt-6 pt-4 border-t border-slate-100/80">
                <AnimatePresence mode="wait">
                  {generatedReport ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-indigo-900 text-indigo-100 rounded-2xl p-4 space-y-3 shadow-md"
                    >
                      <div className="flex items-center justify-between border-b border-indigo-800 pb-2">
                        <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest block">
                          GENERATED INTEL BRIEF
                        </span>
                        <span className="text-[9px] font-mono bg-cyan-400 text-indigo-900 py-0.5 px-1.5 rounded font-bold">
                          {generatedReport.confidenceMetric}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-xs">
                        <span className="text-indigo-300 font-mono block">CANDIDATE:</span>
                        <p className="font-bold text-white text-sm">{generatedReport.title}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-[11px] pt-1.5 font-mono">
                        <div>
                          <span className="text-indigo-300 text-[10px] block font-semibold uppercase">HUB FOCUS</span>
                          <span className="text-white font-bold">{generatedReport.cityFocus}</span>
                        </div>
                        <div>
                          <span className="text-indigo-300 text-[10px] block font-semibold uppercase">COMPENSATION TARGET</span>
                          <span className="text-emerald-400 font-bold">{generatedReport.compensationIndex}</span>
                        </div>
                      </div>

                      <div className="border-t border-indigo-800 pt-2 text-[11px]">
                        <span className="text-indigo-300 block font-semibold uppercase font-mono mb-1">BRIDGE ROADMAP focus:</span>
                        <div className="flex flex-wrap gap-1">
                          {generatedReport.targetSkills.map((sk: string) => (
                            <span key={sk} className="bg-indigo-800/80 text-white py-0.5 px-2 rounded-md font-sans">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-[10px] font-mono italic text-indigo-200 pt-1 border-t border-indigo-800">
                        * Ready to present to hiring partners inside Bengaluru Tech clusters.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-center text-xs text-slate-400">
                      Submit parameters above to generate instant customized report metrics.
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
