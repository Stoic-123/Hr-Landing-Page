"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { UserPlus, Settings, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    {
      title: t("step1"),
      description: t("step1Desc"),
      icon: <UserPlus className="h-8 w-8 text-primary-500" />,
    },
    {
      title: t("step2"),
      description: t("step2Desc"),
      icon: <Settings className="h-8 w-8 text-primary-500" />,
    },
    {
      title: t("step3"),
      description: t("step3Desc"),
      icon: <TrendingUp className="h-8 w-8 text-primary-500" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-600 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 -translate-y-1/2 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-zinc-100 relative z-10">
                {step.icon}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
