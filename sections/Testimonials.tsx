"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const sectionRef = useRef(null);

  const localizedReviews = t.raw('reviews');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [localizedReviews]);

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-foreground md:text-5xl mb-16">
          {t('title')}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {localizedReviews.map((testimonial: any, index: number) => (
            <div
              key={index}
              className="testimonial-card flex flex-col rounded-2xl border border-zinc-200 bg-white p-8"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 5 // Using 5 as default if rating is not in translation or hardcoded
                        ? "fill-primary-500 text-primary-500"
                        : "fill-zinc-200 text-zinc-200"
                    }`}
                  />
                ))}
              </div>
              <p className="flex-1 text-lg text-zinc-600 italic mb-6">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-zinc-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
