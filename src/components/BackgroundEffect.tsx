import React, { useMemo, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface BackgroundEffectProps {
  mouseOffset: { x: number; y: number };
}

interface FloatingNode {
  id: number;
  label: string;
  x: number; // percentage
  y: number; // percentage
  size: number;
  color: string;
  isAccent?: boolean;
}

export const BackgroundEffect: React.FC<BackgroundEffectProps> = ({ mouseOffset }) => {
  // Use motion values + spring for zero-lag, zero-rerender smooth cursor tracking
  const rawX = useMotionValue(-400);
  const rawY = useMotionValue(-400);
  const cursorX = useSpring(rawX, { stiffness: 600, damping: 40, mass: 0.4 });
  const cursorY = useSpring(rawY, { stiffness: 600, damping: 40, mass: 0.4 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 130);
      rawY.set(e.clientY + window.scrollY - 130);
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [rawX, rawY]);

  // Generate a set of stable background nodes using useMemo
  const nodes: FloatingNode[] = useMemo(() => [
    { id: 1, label: "PyTorch", x: 12, y: 18, size: 8, color: "rgba(37, 99, 235, 0.15)" },
    { id: 2, label: "Agentic AI", x: 25, y: 75, size: 10, color: "rgba(6, 182, 212, 0.18)", isAccent: true },
    { id: 3, label: "TypeScript", x: 78, y: 15, size: 7, color: "rgba(37, 99, 235, 0.12)" },
    { id: 4, label: "Kubernetes", x: 84, y: 65, size: 9, color: "rgba(6, 182, 212, 0.15)" },
    { id: 5, label: "LLMOps", x: 45, y: 22, size: 11, color: "rgba(37, 99, 235, 0.2)", isAccent: true },
    { id: 6, label: "AWS Cloud", x: 18, y: 42, size: 8, color: "rgba(6, 182, 212, 0.13)" },
    { id: 7, label: "Rust Core", x: 88, y: 35, size: 8, color: "rgba(37, 99, 235, 0.15)" },
    { id: 8, label: "Prometheus", x: 62, y: 82, size: 7, color: "rgba(16, 185, 129, 0.1)" },
    { id: 9, label: "LangGraph", x: 55, y: 55, size: 9, color: "rgba(6, 182, 212, 0.15)", isAccent: true }
  ], []);

  // Generate connection links between nearby nodes
  const links = useMemo(() => {
    const arr = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 45) { // connect nodes closer than 45% screen width
          arr.push({ id: `${i}-${j}`, from: nodes[i], to: nodes[j] });
        }
      }
    }
    return arr;
  }, [nodes]);

  return (
    <div id="bg-experience" className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-slate-50/50">
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-60" />

      {/* Decorative Radial Glowing Backdrops */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-300/20 to-cyan-200/20 blur-3xl" />
      <div className="absolute bottom-1/3 right-10 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-cyan-300/15 to-blue-200/15 blur-3xl" />

      {/* Real-time Interactive Spotlight / Cursor Flow Aura — driven by motion spring, zero lag */}
      <motion.div
        className="pointer-events-none absolute w-[260px] h-[260px] rounded-full bg-gradient-to-r from-blue-500/40 to-cyan-400/30 blur-2xl"
        style={{ x: cursorX, y: cursorY }}
      />

      {/* Connection lines SVG reacting to mouse offset */}
      <svg className="absolute inset-0 w-full h-full opacity-45">
        {links.map((link) => {
          return (
            <g key={link.id}>
              <motion.line
                x1={link.from.x + "%"}
                y1={link.from.y + "%"}
                x2={link.to.x + "%"}
                y2={link.to.y + "%"}
                stroke="rgba(148, 163, 184, 0.22)"
                strokeWidth={1.5}
                animate={{
                  x: mouseOffset.x * 25,
                  y: mouseOffset.y * 25,
                }}
                transition={{ type: "spring", damping: 30, stiffness: 85 }}
              />
            </g>
          );
        })}
      </svg>

      {/* Interactive Floating Nodes */}
      {nodes.map((node) => {
        return (
          <motion.div
            key={node.id}
            className="absolute flex items-center justify-center pointer-events-none"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
            animate={{
              x: mouseOffset.x * (node.isAccent ? 50 : 25),
              y: mouseOffset.y * (node.isAccent ? 50 : 25),
              rotate: mouseOffset.x * 10
            }}
            transition={{ type: "spring", damping: 25, stiffness: 75 }}
          >
            {/* Blinking Aura/Glow for accent tags */}
            {node.isAccent && (
              <div 
                className="absolute inset-0 rounded-full bg-cyan-400/22 blur-md animate-ping"
                style={{ width: `${node.size * 5}px`, height: `${node.size * 5}px` }}
              />
            )}

            <div
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full shadow-md text-[11px] font-mono border whitespace-nowrap bg-white/90 backdrop-blur-md transition-shadow hover:shadow-lg ${
                node.isAccent 
                  ? "border-cyan-200 text-cyan-600 font-bold" 
                  : "border-slate-200/70 text-slate-500"
              }`}
            >
              {/* Dynamic status dot inside node */}
              <span 
                className={`w-1.5 h-1.5 rounded-full ${
                  node.isAccent ? "bg-cyan-500 animate-pulse" : "bg-slate-300"
                }`} 
              />
              <span>{node.label}</span>
            </div>
          </motion.div>
        );
      })}

      {/* Fluid Floating Data Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => {
          const size = 3 + (i % 3);
          const duration = 15 + (i * 3);
          const delay = i * -1.5;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-blue-400/30 blur-[0.5px]"
              style={{
                width: size,
                height: size,
                left: `${(i * 9.7) % 100}%`,
                top: `${(i * 13.9) % 100}%`,
                animation: `float-slow ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
