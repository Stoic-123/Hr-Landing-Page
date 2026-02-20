"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useModal } from "@/context/ModalContext";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const t = useTranslations('Pricing');
  const { openModal } = useModal();
  const [isYearly, setIsYearly] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const pricingPlans = [
    {
      id: 'starter',
      name: t('starter'),
      price: { monthly: 29, yearly: 290 },
      description: t('starterDesc'),
      features: t.raw('features.starter'),
    },
    {
      id: 'professional',
      name: t('professional'),
      price: { monthly: 79, yearly: 790 },
      description: t('professionalDesc'),
      features: t.raw('features.professional'),
      highlight: true,
    },
    {
      id: 'enterprise',
      name: t('enterprise'),
      price: { monthly: 199, yearly: 1990 },
      description: t('enterpriseDesc'),
      features: t.raw('features.enterprise'),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Cards Animation
      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true, // Only play once
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        onComplete: () => {
          // Clear transform so CSS hover works smoothly
          gsap.set(".pricing-card", { clearProps: "transform" });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-16 relative overflow-hidden bg-white">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-primary-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wider text-primary-500">
            {t('badge')}
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {t('title')}
          </p>
          <div className="mt-8 flex justify-center items-center space-x-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-zinc-500'}`}>
              {t('monthly')}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                isYearly ? "bg-primary-600" : "bg-zinc-200"
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isYearly ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-zinc-500'}`}>
              {t('yearly')} <span className="text-primary-500 font-bold">({t('save20')})</span>
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card relative flex flex-col rounded-3xl p-8 transition-transform hover:-translate-y-2 ${
                plan.highlight
                  ? "border-2 border-primary-500 bg-white shadow-2xl shadow-primary-500/20"
                  : "border border-zinc-200 bg-white/50 backdrop-blur-sm"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 -mt-4 -mr-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg z-20">
                  {t('mostPopular')}
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mt-2 text-zinc-500 text-sm leading-relaxed">
                {plan.description}
              </p>
              <div className="my-8">
                <span className="text-4xl font-extrabold text-foreground">
                  ${isYearly ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className="text-base font-medium text-zinc-500">
                  /{isYearly ? t('year') : t('month')}
                </span>
              </div>
              <ul className="mb-8 space-y-4 flex-1">
                {plan.features.map((feature: string) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-primary-500 mt-0.5 shrink-0" />
                    <span className="text-zinc-600 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={openModal}
                className={`w-full rounded-full py-3 text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-primary-600/10 text-primary-600 hover:bg-primary-600/20"
                }`}
              >
                {t('choose')} {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
