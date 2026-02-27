"use client";

import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";


const companies = [
  { name: "NSM Solutions Ltd", icon: "/LOGO/NSM-LOGO.png" },
  { name: "BS Printing", icon: "/LOGO/BS-LOGO.png" },
  { name: "NSM ISP", icon: "/LOGO/ISP-LOGO.png" },
  { name: "NSM Media", icon: "/LOGO/NSM-MEDIA-LOGO.png" },
  { name: "NSM Tech", icon: "/LOGO/NSM-TECH-LOGO.png" },
];


export default function TrustedBy() {
  const t = useTranslations('TrustedBy');

  return (
    <section className="width-full py-12 md:py-16 overflow-hidden bg-background">
      <div className="container px-4 md:px-6 mx-auto mb-8 text-center">
        <p className="text-l font-semibold tracking-wider text-muted-foreground uppercase">
          {t('title')}
        </p>
      </div>
      
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        {/* Gradient Masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-background to-transparent md:w-48"></div>
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-background to-transparent md:w-48"></div>

        <div className="flex w-full">
          <motion.div
            className="flex min-w-full shrink-0 gap-12 px-6 md:gap-24 md:px-12"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...companies, ...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="group flex items-center justify-center gap-3 text-2xl font-bold text-primary-500 transition-all duration-300 hover:text-primary-500 hover:grayscale-0"
              >
                <img src={company.icon} alt={company.name} className="h-20 object-contain w-20 md:h-25 md:w-25" />
                <span className="hidden md:inline">{company.name}</span>
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex min-w-full shrink-0 gap-12 px-6 md:gap-24 md:px-12"
             aria-hidden="true"
             initial={{ x: "0%" }}
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...companies, ...companies, ...companies].map((company, index) => (
              <div
                key={index}
               className="group flex items-center justify-center gap-3 text-2xl font-bold text-primary-500 transition-all duration-300 hover:text-primary-500 hover:grayscale-0"
              >
                <img src={company.icon} alt={company.name} className="h-20 object-contain w-20 md:h-25 md:w-25" />
                <span className="hidden md:inline">{company.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
