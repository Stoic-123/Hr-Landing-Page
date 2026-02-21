"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useModal } from "@/context/ModalContext";
import { SpinningText } from "@/components/SpinningText";

gsap.registerPlugin(ScrollTrigger);
import { ArrowRight, ChevronDown, Play } from "lucide-react";

export default function Hero() {
  const t = useTranslations('Hero');
  const { openModal } = useModal();
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const macRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text Elements Animation (Individual Triggers)
      const textAnims = gsap.utils.toArray(".hero-text-anim");
      
      textAnims.forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      // Mac Mockup Animation (Scroll-linked)
      gsap.from(macRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        scale: 0.9,
        y: 50,
        opacity: 0.5,
        rotateX: -5,
        ease: "power1.inOut",
      });

      // Background Blobs Parallax
      gsap.to(".hero-blob", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: (i) => i === 0 ? -100 : 150,
        x: (i) => i === 0 ? 50 : -50,
        opacity: 0.1,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative z-30 flex min-h-screen flex-col items-center justify-center px-6 pt-36 md:pt-20 overflow-hidden"
    >
      <div className="mx-auto flex max-w-7xl w-full flex-col md:flex-row md:items-center md:justify-between">
        {/* Background/Ambient glow */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="hero-blob absolute -top-20 -left-20 h-96 w-96 rounded-full bg-primary-500/20 blur-[100px]" />
          <div className="hero-blob absolute top-40 right-0 h-96 w-96 rounded-full bg-secondary-600/20 blur-[100px]" />
        </div>

        {/* Text Content */}
        <div
          ref={textRef}
          className="z-10 flex max-w-2xl flex-col items-start space-y-6 text-left md:w-1/2"
        >
          <div className="hero-text-anim">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl leading-[1.2]">
              {t('titleStart')} <br />
              <span className="text-primary-500">{t('titleHighlight')}</span>
            </h1>
          </div>
          
          <div className="hero-text-anim">
            <p className="text-lg text-zinc-600 md:text-xl">
              {t('description')}
            </p>
          </div>

          <div className="hero-text-anim flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <button
              onClick={openModal}
              className="group flex cursor-pointer items-center justify-center space-x-2 rounded-full bg-primary-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/30"
            >
              <span>{t('startTrial')}</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={openModal}
              className="flex cursor-pointer items-center justify-center space-x-2 rounded-full border border-primary-600 bg-white px-8 py-4 text-base font-semibold text-primary-600 transition-colors hover:bg-primary-500/10"
            >
              <Play className="h-4 w-4 fill-current mr-2" />
              <span>{t('watchDemo')}</span>
            </button>
          </div>
        </div>

        {/* Visual / Mac Mockup */}
        <div className="relative mt-4 mb-20 h-[180px] w-full md:mt-0 md:mb-0 md:h-[500px] md:w-1/2 flex items-center justify-center perspective-1000" style={{ zIndex: 10 }}>
          <div ref={macRef} className="relative w-full h-full"> 
            <Image
              src="/SystemMac.png"
              alt="HR Dashboard on Mac"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center">
        <div className="relative cursor-pointer" onClick={() => {
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <SpinningText 
            className="text-secondary-500/50  "
            duration={15}
            radius={55}
          >
             • SCROLL DOWN • SCROLL DOWN • SCROLL DOWN
          </SpinningText>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-6 w-6 text-secondary-500" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
