"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "@/components/FeatureCard";
import { Users, BarChart3, ShieldCheck, Zap, Globe, Smile } from "lucide-react";
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const t = useTranslations('Features');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const localizedFeatures = [
    {
      title: t('smartRecruitment'),
      description: t('smartRecruitmentDesc'),
      icon: Users,
    },
    {
      title: t('realTimeAnalytics'),
      description: t('realTimeAnalyticsDesc'),
      icon: BarChart3,
    },
    {
      title: t('securePayroll'),
      description: t('securePayrollDesc'),
      icon: ShieldCheck,
    },
    {
      title: t('instantOnboarding'),
      description: t('instantOnboardingDesc'),
      icon: Zap,
    },
    {
      title: t('remoteFirst'),
      description: t('remoteFirstDesc'),
      icon: Globe,
    },
    {
      title: t('employeeWellbeing'),
      description: t('employeeWellbeingDesc'),
      icon: Smile,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation (Zoom/Scale In)
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Cards Animation (Staggered)
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(".feature-card", { clearProps: "transform" });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-16 relative z-10 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headerRef} className="mb-16 text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-primary-500">
            {t('badge')}
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {t('title')}
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-600">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {localizedFeatures.map((feature, index) => (
            <div key={feature.title} className="feature-card">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
