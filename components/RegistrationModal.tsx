"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { cn } from "@/lib/utils";

export default function RegistrationModal() {
  const { isOpen, closeModal } = useModal();
  const t = useTranslations("RegistrationModal");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", phone: "", company: "" };

    if (!formData.name.trim()) {
      newErrors.name = t("validation.nameRequired");
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = t("validation.emailRequired");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("validation.emailInvalid");
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("validation.phoneRequired");
      isValid = false;
    }

    if (!formData.company.trim()) {
      newErrors.company = t("validation.companyRequired");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleClose = () => {
    closeModal();
    // Reset state after modal is closed
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", company: "" });
      setErrors({ name: "", email: "", phone: "", company: "" });
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.6
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 40,
              transition: {
                duration: 0.2,
                ease: "easeIn"
              }
            }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]"
          >
            {/* Inner Glow / Lighting Effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute cursor-pointer right-6 top-6 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-zinc-900/5 hover:bg-zinc-900/10 text-zinc-600 transition-all active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3 bg-gradient-to-br from-zinc-900 to-zinc-600 bg-clip-text">
                        {t("title")}
                      </h2>
                      <p className="text-zinc-600 leading-relaxed font-medium">
                        {t("subtitle")}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      <div className="group">
                        <label className="block text-sm font-semibold text-zinc-700 mb-1 ml-1">
                          {t("name")}
                        </label>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          type="text"
                          className={cn(
                            "w-full rounded-2xl border bg-white/40 px-5 py-4 outline-none focus:bg-white/80 focus:ring-4 transition-all duration-300 placeholder:text-zinc-400",
                            errors.name ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10" : "border-white/50 focus:border-primary-500 focus:ring-primary-500/10"
                          )}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="mt-1 ml-1 text-xs font-medium text-red-500">{errors.name}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="group">
                          <label className="block text-sm font-semibold text-zinc-700 mb-1 ml-1">
                            {t("email")}
                          </label>
                          <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            className={cn(
                              "w-full rounded-2xl border bg-white/40 px-5 py-4 outline-none focus:bg-white/80 focus:ring-4 transition-all duration-300 placeholder:text-zinc-400",
                              errors.email ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10" : "border-white/50 focus:border-primary-500 focus:ring-primary-500/10"
                            )}
                            placeholder="work@company.com"
                          />
                          {errors.email && (
                            <p className="mt-1 ml-1 text-xs font-medium text-red-500">{errors.email}</p>
                          )}
                        </div>
                        <div className="group">
                          <label className="block text-sm font-semibold text-zinc-700 mb-1 ml-1">
                            {t("phone")}
                          </label>
                          <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel"
                            className={cn(
                              "w-full rounded-2xl border bg-white/40 px-5 py-4 outline-none focus:bg-white/80 focus:ring-4 transition-all duration-300 placeholder:text-zinc-400",
                              errors.phone ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10" : "border-white/50 focus:border-primary-500 focus:ring-primary-500/10"
                            )}
                            placeholder="+000 000 000"
                          />
                          {errors.phone && (
                            <p className="mt-1 ml-1 text-xs font-medium text-red-500">{errors.phone}</p>
                          )}
                        </div>
                      </div>
                      <div className="group">
                        <label className="block text-sm font-semibold text-zinc-700 mb-1 ml-1">
                          {t("company")}
                        </label>
                        <input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          type="text"
                          className={cn(
                            "w-full rounded-2xl border bg-white/40 px-5 py-4 outline-none focus:bg-white/80 focus:ring-4 transition-all duration-300 placeholder:text-zinc-400",
                            errors.company ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10" : "border-white/50 focus:border-primary-500 focus:ring-primary-500/10"
                          )}
                          placeholder="Company name"
                        />
                        {errors.company && (
                          <p className="mt-1 ml-1 text-xs font-medium text-red-500">{errors.company}</p>
                        )}
                      </div>

                      <button
                        disabled={isLoading}
                        type="submit"
                        className={cn(
                          "w-full rounded-2xl cursor-pointer bg-primary-600 py-5 text-sm font-bold text-white transition-all hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-600/25 active:scale-[0.98] flex items-center justify-center space-x-2 relative overflow-hidden group/btn",
                          isLoading && "opacity-70 cursor-not-allowed"
                        )}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                        <span className="relative z-10">{isLoading ? t("submitting") : t("submit")}</span>
                        {!isLoading && <ArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="flex justify-center mb-8">
                      <div className="w-24 h-24 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                        <CheckCircle2 className="h-12 w-12 text-primary-600" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4 bg-gradient-to-br from-zinc-900 to-zinc-600 bg-clip-text">
                      {t("successTitle")}
                    </h2>
                    <p className="text-zinc-600 mb-10 max-w-sm mx-auto font-medium">
                      {t("successMessage")}
                    </p>
                    <button
                      onClick={handleClose}
                      className="w-full rounded-2xl bg-zinc-900 py-5 text-sm font-bold text-white hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-xl shadow-zinc-900/10"
                    >
                      {t("close")}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
