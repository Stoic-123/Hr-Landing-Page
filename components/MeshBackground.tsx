"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LightRaysProps {
  count?: number;
  color?: string;
  blur?: number;
  opacity?: number;
  speed?: number;
  length?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

function LightRays({
  count = 9,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  opacity = 0.65,
  speed = 14,
  length = "70vh",
  className,
  style,
}: LightRaysProps) {
  const lengthValue = typeof length === "number" ? `${length}px` : length;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={style}
    >
      <div className="absolute inset-0">
        {Array.from({ length: count }).map((_, i) => {
          const angle = -40 + (i / (count - 1)) * 80;
          const delay = (i / count) * speed;
          const width = 50 + Math.sin(i * 1.7) * 30;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transformOrigin: "top center",
                transform: `translateX(-50%) rotate(${angle}deg)`,
              }}
            >
              <div
                style={
                  {
                    width: `${width}px`,
                    height: lengthValue,
                    background: `linear-gradient(to bottom, ${color}, transparent)`,
                    filter: `blur(${blur}px)`,
                    transformOrigin: "top center",
                    animation: `lightRayPulse ${speed}s ease-in-out ${delay}s infinite`,
                    "--ray-opacity": opacity,
                  } as React.CSSProperties
                }
              />
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes lightRayPulse {
          0%, 100% {
            opacity: 0;
            transform: scaleY(0.8);
          }
          40%, 60% {
            opacity: var(--ray-opacity, 0.65);
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
}

const MeshBackground = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Smooth lerp toward target mouse position
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentRef.current.x - 300}px, ${currentRef.current.y - 300}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Light Rays */}
      <LightRays
        count={9}
        color="rgba(160, 210, 255, 0.2)"
        blur={40}
        opacity={0.55}
        speed={12}
        length="90vh"
      />

      {/* Mouse glow effect */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(253, 179, 96, 0.18) 0%, rgba(160, 210, 255, 0.10) 40%, transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default MeshBackground;
