import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Briefcase, 
  IndianRupee, 
  Sparkles, 
  Zap, 
  CheckCircle,
  HelpCircle,
  Cpu,
  RefreshCw
} from "lucide-react";
import { MarketIntelligence } from "../types";

interface RightAnalyticsProps {
  data: MarketIntelligence;
  isLoading: boolean;
}

export const RightAnalytics: React.FC<RightAnalyticsProps> = ({ data, isLoading }) => {
  // Custom theme colors matching our index.css variables
  const primaryColor = "#2563EB";
  const accentColor = "#06B6D4";
  const successColor = "#10B981";

  // Recharts custom Tooltip component for Perplexity-like luxury feel
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl shadow-2xl text-[12px] font-mono text-white">
          <p className="font-semibold text-slate-300">{payload[0].payload.year} demand</p>
          <p className="text-cyan-400 font-bold mt-0.5">Score: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Absolute Glow Background Backing the Mockup */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-[32px] blur-2xl opacity-70 z-0 pointer-events-none" />

      {/* Futuristic Dashboard Outer Frame */}
      <div className="relative z-10 glass-panel hover:border-slate-200/90 transition-all duration-300 rounded-3xl p-5 md:p-6 shadow-2xl border border-slate-100/80 backdrop-blur-xl">
        
        {/* Dashboard Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100/80 pb-4 mb-5">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <span className="h-4 w-[1px] bg-slate-200" />
            <div className="flex items-center space-x-1.5 bg-slate-100/80 px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-500 font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              <span>LIVE DEMOGRAPHY ENGINE</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>GEMINI-3.5-FLASH</span>
          </div>
        </div>

        {isLoading ? (
          /* High-Tech Shimmering Loading State */
          <div className="flex flex-col justify-center items-center py-20 px-6 space-y-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-slate-100 flex items-center justify-center">
                <RefreshCw className="w-7 h-7 text-blue-600 animate-spin" />
              </div>
              <div className="absolute -inset-1 rounded-full border-t border-b border-cyan-500 opacity-40 animate-pulse" />
            </div>
            
            <div className="text-center space-y-2">
              <h4 className="text-sm font-semibold text-slate-800 tracking-tight font-display">
                Pulsing Indian Tech Repositories...
              </h4>
              <p className="text-[11px] text-slate-400 font-mono max-w-xs leading-normal">
                Connecting to live job demography maps for <span className="text-cyan-500 font-semibold">{data.skillName}</span>
              </p>
            </div>

            {/* Glowing Dummy Grid Shimmer */}
            <div className="w-full space-y-3 pt-4">
              <div className="h-3 bg-slate-100 rounded-full animate-pulse w-3/4" />
              <div className="h-2.5 bg-slate-100 rounded-full animate-pulse w-full" />
              <div className="h-2.5 bg-slate-100 rounded-full animate-pulse w-5/6" />
            </div>
          </div>
        ) : (
          /* Live Dashboard Charts & Metrics */
          <div className="space-y-5 animate-fade-in">
            
            {/* Top Stat Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              
              {/* Demand Score Dial */}
              <div className="bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100 flex flex-col justify-between relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium font-mono">DEMAND SCORE</span>
                  <Zap className="w-3.5 h-3.5 text-yellow-500 animate-bounce" />
                </div>
                <div className="mt-2.5 flex items-baseline space-x-1">
                  <span className="text-2xl font-bold font-display text-slate-800 tracking-tight">
                    {data.demandScore}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/100</span>
                </div>
                {/* Visual score slider background */}
                <div className="w-full h-1 bg-slate-200/60 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000" 
                    style={{ width: `${data.demandScore}%` }}
                  />
                </div>
              </div>

              {/* YoY Growth Rate */}
              <div className="bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium font-mono">YOY GROWTH</span>
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="mt-2.5">
                  <span className="text-2xl font-bold font-display text-emerald-600 tracking-tight">
                    {data.growthRate}
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 font-mono mt-3 uppercase tracking-wider block">
                  Bengaluru/Hyd Hubs
                </span>
              </div>

              {/* Salary Index (Span 2 on mobile, 1 on desktop) */}
              <div className="bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100 flex flex-col justify-between col-span-2 sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium font-mono">AVG SALARY</span>
                  <IndianRupee className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div className="mt-2.5">
                  <span className="text-[20px] font-bold font-display text-slate-800 tracking-tight">
                    {data.salaryRange}
                  </span>
                </div>
                <span className="text-[9px] text-slate-500 font-medium mt-3 font-mono">
                  Lakhs Per Annum
                </span>
              </div>

            </div>

            {/* Line Trend Area Chart */}
            <div className="bg-white/80 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800 font-display">5-Year Demand Trend</span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tight">
                    Employment Adoption Trajectory
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400">
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1" />
                    Demand Index
                  </span>
                </div>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data.trendGraphData}
                    margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={primaryColor} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="year" 
                      stroke="#94a3b8" 
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="demand" 
                      stroke={primaryColor} 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#colorDemand)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Lower Details Deck */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Job Profile Allocation (Bar charts display) */}
              <div className="bg-slate-50/40 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <h5 className="text-[11px] font-bold text-slate-700 font-mono uppercase tracking-wider mb-3">
                    Top Job Profiles (India)
                  </h5>
                  <div className="space-y-3">
                    {data.topRoleProfiles.map((prof, index) => (
                      <div key={prof.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-700 truncate max-w-[120px]">{prof.name}</span>
                          <span className="text-slate-400 text-[11px] font-mono">{prof.salary}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-cyan-500 rounded-full" 
                              style={{ width: `${prof.share}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 w-5 text-right">{prof.share}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Core Projections & Prerequisites */}
              <div className="bg-slate-50/40 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
                    <h5 className="text-[11px] font-bold text-slate-700 font-mono uppercase tracking-wider">
                      Prerequisites Checklist
                    </h5>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {data.keyPrerequisites.map((req, i) => (
                      <div key={req} className="flex items-center space-x-2 text-xs text-slate-600 font-sans">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3.5 bg-blue-50/50 border border-blue-100/55 rounded-xl p-2.5">
                  <span className="text-[9px] font-mono font-bold text-blue-600 uppercase tracking-wider flex items-center space-x-1">
                    <Briefcase className="w-3 h-3 text-blue-500 shrink-0" />
                    <span>In Demand Role:</span>
                  </span>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5 font-display">
                    {data.roleInDemand}
                  </p>
                </div>
              </div>

            </div>

            {/* AI Forecast Text Block */}
            <div className="bg-slate-900 text-slate-300 rounded-2xl p-4 border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2.5 opacity-10">
                <Sparkles className="w-14 h-14 text-white" />
              </div>
              <div className="flex items-center space-x-1.5 mb-2 text-white font-display text-[11px] tracking-wider uppercase font-bold text-cyan-400">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>SkillPulse AI Projections — Analytics Brief</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300 font-sans">
                {data.futureDemandInsight}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
