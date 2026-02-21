"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhoneMockup from "@/components/PhoneMockup";
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function MobileApp() {
  const t = useTranslations('MobileApp');
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(".bg-blob", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        rotate: 45,
      });

      // Text reveal
      const textElements = textRef.current ? Array.from((textRef.current as HTMLElement).children) : [];
      gsap.from(textElements, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Phone animation
      gsap.from(phoneRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-white"
    >
      {/* Decorative elements */}
      <div className="bg-blob absolute top-1/4 -right-20 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="bg-blob absolute bottom-1/4 -left-20 w-64 h-64 bg-secondary-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div ref={textRef} className="max-w-xl">
            <h2 className="text-base font-semibold uppercase tracking-wider text-primary-500">
              {t('badge')}
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              {t('title')}
            </p>
            <p className="mt-6 text-lg text-zinc-600">
              {t('description')}
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  id: 1,
                  title: t('feature1'),
                  icon: <div className="h-2 w-2 rounded-full bg-primary-500" />
                },
                {
                  id: 2,
                  title: t('feature2'),
                  icon: <div className="h-2 w-2 rounded-full bg-primary-500" />
                },
                {
                  id: 3,
                  title: t('feature3'),
                  icon: <div className="h-2 w-2 rounded-full bg-primary-500" />
                },
              ].map((feature) => (
                <div key={feature.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 flex items-center justify-center p-1 border border-primary-500/20 rounded-full">
                    {feature.icon}
                  </div>
                  <span className="text-base font-medium text-zinc-700">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              {/* Apple App Store Button */}
              <a
                href="https://apps.apple.com/kz/app/nsm-hr/id6757325691"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-black text-white px-4 py-2 rounded-xl transition-all hover:bg-primary-500 shadow-lg shadow-primary-600/20 group w-[180px] h-[58px]"
              >
                <div className="mr-3 transform  group-hover:scale-110 transition-transform flex-shrink-0">
                  <img 
                    src="/appstoreIcon.png" 
                    alt="App Store" 
                    className="w-7 h-7 object-contain brightness-0 invert" 
                  />
                </div>
                <div className="flex flex-col  text-left">
                  <span className="text-[10px]  font-semibold tracking-wide uppercase leading-tight opacity-90">Download on the</span>
                  <span className="text-lg font-bold leading-tight tracking-tight">App Store</span>
                </div>
              </a>

              {/* Google Play Button */}
              <a
                href="#"
                className="inline-flex items-center bg-black text-white px-4 py-2 rounded-xl transition-all hover:bg-primary-500 shadow-lg shadow-primary-600/20 group w-[180px] h-[58px]"
              >
                <div className="mr-3 transform group-hover:scale-110 transition-transform flex-shrink-0">
                  <img 
                    src="/playstoreIcon.png" 
                    alt="Google Play" 
                    className="w-7 h-7 object-contain" 
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-semibold tracking-wide uppercase leading-tight opacity-90">GET IT ON</span>
                  <span className="text-lg font-bold leading-tight tracking-tight">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div ref={phoneRef} className="relative w-full max-w-sm">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
