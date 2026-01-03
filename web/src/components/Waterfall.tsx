"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaterfallProps {
  contributions: Record<string, number>;
}

export function Waterfall({ contributions }: WaterfallProps) {
  // Convert to array and sort by absolute impact
  const items = Object.entries(contributions)
    .map(([key, value]) => ({ key, value, abs: Math.abs(value) }))
    .sort((a, b) => b.abs - a.abs);

  const maxVal = Math.max(...items.map((i) => i.abs), 1);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item.key} className="group flex items-center gap-3 text-sm">
          {/* Label */}
          <div
            className="w-32 shrink-0 truncate text-right font-medium text-slate-600"
            title={item.key}
          >
            {formatLabel(item.key)}
          </div>

          {/* Bar Container */}
          <div className="relative flex h-8 flex-1 items-center bg-slate-50 rounded-md px-2">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200"></div>

            {/* Bar */}
            <motion.div
              className={cn(
                "h-4 rounded-full",
                item.value >= 0 ? "bg-emerald-500" : "bg-rose-500"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${(item.abs / maxVal) * 50}%` }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              style={{
                marginLeft:
                  item.value >= 0
                    ? "50%"
                    : `calc(50% - ${(item.abs / maxVal) * 50}%)`,
              }}
            />
          </div>

          {/* Value */}
          <div
            className={cn(
              "w-12 shrink-0 text-right font-semibold",
              item.value >= 0 ? "text-emerald-600" : "text-rose-600"
            )}
          >
            {item.value > 0 ? "+" : ""}
            {item.value.toFixed(0)}
          </div>
        </div>
      ))}
    </div>
  );
}

function formatLabel(key: string) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
