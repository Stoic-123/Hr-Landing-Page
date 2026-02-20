"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const t = useTranslations("Contact");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-info-item", {
        scrollTrigger: {
          trigger: ".contact-info-item",
          start: "top 85%",
        },
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 85%",
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full border border-primary-500/20 bg-primary-500/5 px-4 py-1.5 text-sm font-medium text-primary-600 mb-4"
          >
            {t("badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-600 text-lg max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="contact-info-item flex items-start space-x-4 p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{t("info.email")}</h3>
                <p className="text-zinc-600">contact@nsm-smart-hr.com</p>
                <p className="text-zinc-600">support@nsm-smart-hr.com</p>
              </div>
            </div>

            <div className="contact-info-item flex items-start space-x-4 p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-secondary-50 flex items-center justify-center text-secondary-600 flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{t("info.phone")}</h3>
                <p className="text-zinc-600">+855 12 345 678</p>
                <p className="text-zinc-600">+855 96 789 012</p>
              </div>
            </div>

            <div className="contact-info-item flex items-start space-x-4 p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{t("info.address")}</h3>
                <p className="text-zinc-600">Phnom Penh, Cambodia</p>
                <p className="text-zinc-600">123 Business Avenue, Suite 456</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form bg-white p-8 rounded-3xl border border-zinc-100 shadow-xl shadow-zinc-200/50">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 ml-1">{t("form.name")}</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-zinc-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 ml-1">{t("form.email")}</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-zinc-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 ml-1">{t("form.message")}</label>
                <textarea
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-zinc-400 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <span>{t("form.send")}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
