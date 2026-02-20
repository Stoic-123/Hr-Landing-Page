"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const morphTime = 2;
const cooldownTime = 3.0;

type MorphingTextProps = {
  texts: string[];
  className?: string;
};

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(cooldownTime);
  const timeRef = useRef(0);

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setMorph = useCallback((fraction: number) => {
    const t1 = text1Ref.current;
    const t2 = text2Ref.current;
    if (t1 && t2) {
      // t2 fades in
      t2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      t2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      // t1 fades out
      const f1 = 1 - fraction;
      t1.style.filter = `blur(${Math.min(8 / f1 - 8, 100)}px)`;
      t1.style.opacity = `${Math.pow(f1, 0.4) * 100}%`;

      t1.textContent = texts[textIndexRef.current % texts.length];
      t2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    }
  }, [texts]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const t1 = text1Ref.current;
    const t2 = text2Ref.current;
    if (t1 && t2) {
      t1.style.filter = "";
      t1.style.opacity = "100%";
      t2.style.filter = "";
      t2.style.opacity = "0%";
      
      t1.textContent = texts[textIndexRef.current % texts.length];
      t2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    }
  }, [texts]);

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = fraction - 1;
      fraction = 1;
    }

    setMorph(fraction);
  }, [setMorph]);

  useEffect(() => {
    timeRef.current = Date.now();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = Date.now();
      const dt = (newTime - timeRef.current) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) {
        doMorph();
        
        // When morph finished, increment and prepare for cooldown
        if (morphRef.current >= morphTime) {
            textIndexRef.current++;
            morphRef.current = 0;
            // cooldownRef.current will be processed in next frame or here
        }
      } else {
        doCooldown();
      }
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

export function MorphingText({ texts, className }: MorphingTextProps) {
  const { text1Ref, text2Ref } = useMorphingText(texts);

  return (
    <div
      className={cn(
        "relative mx-auto h-16 w-full max-w-screen-md text-center tracking-[-0.02em]",
        className,
      )}
    >
      <div style={{ filter: "url(#threshold) blur(0.6px)" }}>
        <span
          ref={text1Ref}
          className="absolute left-0 top-0 inline-block w-full"
        />
        <span
          ref={text2Ref}
          className="absolute left-0 top-0 inline-block w-full"
        />
      </div>

      <svg className="hidden">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
