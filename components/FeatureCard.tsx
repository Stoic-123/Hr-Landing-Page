"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/50 p-8 backdrop-blur-sm transition-colors hover:border-primary-500/50 hover:bg-white/80"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100/50 text-primary-600 transition-colors group-hover:bg-primary-500 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
      <p className="text-zinc-600">{description}</p>
      
      {/* Decorative gradient blob */}
      <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 blur-2xl transition-all group-hover:scale-150" />
    </motion.div>
  );
}
