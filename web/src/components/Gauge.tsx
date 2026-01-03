"use client";

import { motion } from "framer-motion";

interface GaugeProps {
  value: number; // 300 to 850
  min?: number;
  max?: number;
}

export function Gauge({ value, min = 300, max = 850 }: GaugeProps) {
  // Normalize value to 0-1 range
  const normalized = Math.min(Math.max((value - min) / (max - min), 0), 1);

  // Round value for display
  const displayValue = Math.round(value);

  return (
    <div className="relative flex h-48 w-80 flex-col items-center justify-end overflow-hidden pb-4">
      {/* SVG Gauge */}
      <svg className="absolute top-0 h-full w-full" viewBox="0 0 200 110">
        <defs>
          <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Background Track */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* Filled Track (using stroke-dasharray for animation) */}
        <motion.path
          key={`arc-${value}`}
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gauge-gradient)"
          strokeWidth="20"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: normalized }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      {/* Score Text */}
      <div className="absolute bottom-0 flex flex-col items-center">
        <motion.span
          key={`score-${value}`}
          className="text-5xl font-bold text-slate-900"
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {displayValue}
        </motion.span>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Credit Score
        </span>
      </div>
    </div>
  );
}
