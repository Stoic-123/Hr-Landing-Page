"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  className?: string;
  children?: React.ReactNode;
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0, scale: 0.8 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: "100%", opacity: 0, scale: 0.8 },
  },
  "from-center": {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0, scale: 0.8 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: "-100%", opacity: 0, scale: 0.8 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0, scale: 0.8 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: "-100%", opacity: 0, scale: 0.8 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0, scale: 0.8 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: "100%", opacity: 0, scale: 0.8 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
  children,
}: HeroVideoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const selectedVariant = animationVariants[animationStyle];

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            {...selectedVariant}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-6xl aspect-video mx-auto z-[10000]"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-14 right-0 md:-right-15 cursor-pointer md:top-0 p-3 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
              aria-label="Close video"
            >
              <X className="size-6 md:size-8" />
            </button>
            <div className="size-full border border-white/20 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 bg-black">
              <iframe
                src={videoSrc}
                className="size-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className="relative cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        {children ? (
          children
        ) : (
          thumbnailSrc && (
            <>
              <Image
                src={thumbnailSrc}
                alt={thumbnailAlt}
                width={1920}
                height={1080}
                className="w-full transition-all duration-300 rounded-2xl border shadow-lg group-hover:brightness-[0.8] ease-out min-w-[150px] md:min-w-[200px]"
              />
              <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ease-out">
                <div className="bg-primary-500/10 backdrop-blur-md uppercase text-primary-500 font-bold tracking-widest px-4 py-2 rounded-full border border-primary-500/20 flex items-center gap-2">
                  <div className="size-10 bg-primary-600 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <Play className="size-5 fill-white text-white ml-0.5" />
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
      {mounted && typeof document !== "undefined" && createPortal(modalContent, document.body)}
    </div>
  );
}
