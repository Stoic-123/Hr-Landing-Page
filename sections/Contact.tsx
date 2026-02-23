"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const t = useTranslations("Contact");
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          reply_to: formData.email,
          message: formData.message,
          title: "General Contact"
        },
        publicKey
      );

      // Send Telegram Notification
      const telegramMessage = `
📬 <b>NEW INQUIRY</b> 📬
────────────────────────
👤 <b>SENDER INFO</b>
• <b>Name:</b> <code>${formData.name}</code>
• <b>Email:</b> <code>${formData.email}</code>

📝 <b>MESSAGE CONTENT</b>
<i>"${formData.message}"</i>

────────────────────────
📩 <b>ACTION</b>
👉 <a href="mailto:${formData.email}"><b>Reply via Email</b></a>
────────────────────────`;

      try {
        await fetch("/api/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: telegramMessage }),
        });
      } catch (tgError) {
        console.error("Telegram Notification Error:", tgError);
        // We don't fail the submission if only Telegram fails
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Auto-reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setErrorMessage(t("form.error") || "Failed to send message. Please try again later.");
    }
  };

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
                <p className="text-zinc-600">
                  <a href="mailto:info@nsmtech.com.kh" className="hover:text-primary-600 transition-colors">info@nsmtech.com.kh</a>
                </p>
              </div>
            </div>

            <div className="contact-info-item flex items-start space-x-4 p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-secondary-50 flex items-center justify-center text-secondary-600 flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{t("info.phone")}</h3>
                <p className="text-zinc-600">
                  <a href="tel:+85595333133" className="hover:text-primary-600 transition-colors">+855 95 333 133</a>
                </p>
              </div>
            </div>

            <div className="contact-info-item flex items-start space-x-4 p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{t("info.address")}</h3>
                <p className="text-zinc-600">
                  <a href="https://maps.app.goo.gl/NhR5uc6RPu5UXTR86" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors">11 St 2, Phnom Penh, Cambodia</a>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form bg-white p-8 rounded-3xl border border-zinc-100 shadow-xl shadow-zinc-200/50">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2">{t("form.successTitle") || "Message Sent!"}</h3>
                  <p className="text-zinc-600">{t("form.successSubtitle") || "Thank you for reaching out. We'll get back to you shortly."}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-primary-600 font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 ml-1">{t("form.name")}</label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-zinc-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 ml-1">{t("form.email")}</label>
                    <input
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-zinc-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 ml-1">{t("form.message")}</label>
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-zinc-400 resize-none"
                    />
                  </div>
                  
                  {status === "error" && (
                    <div className="flex items-center space-x-2 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full cursor-pointer bg-primary-600 hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>{t("form.send")}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
