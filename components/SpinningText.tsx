"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpinningTextProps {
  children: string;
  className?: string;
  duration?: number;
  radius?: number;
  fontSize?: string;
}

export const SpinningText: React.FC<SpinningTextProps> = ({
  children,
  className,
  duration = 20,
  radius = 60,
  fontSize = "12px",
}) => {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: radius * 1.6, height: radius * 1.6 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full overflow-visible"
        >
          <path
            id="spinning-text-path"
            d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            fill="none"
          />
          <text 
            className="fill-current font-medium tracking-[0.3em] uppercase"
            style={{ fontSize }}
          >
            <textPath href="#spinning-text-path" startOffset="0%">
              {children}
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
};
