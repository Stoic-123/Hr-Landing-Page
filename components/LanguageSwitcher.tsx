"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", label: "English", localName: "English", icon: "/LOGO/English.png" },
  { code: "km", label: "Khmer", localName: "ខ្មែរ", icon: "/LOGO/Khmer.png" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Get current locale from pathname
  const currentLocale = pathname.split("/")[1] || "en";

  const handleLanguageChange = (locale: string) => {
    if (locale === currentLocale) {
      setIsOpen(false);
      return;
    }
    
    // Construct new path
    const segments = pathname.split("/");
    segments[1] = locale; // Replace locale segment
    const newPath = segments.join("/");
    
    router.push(newPath);
    setIsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === currentLocale) || languages[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center space-x-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200
          ${isOpen 
            ? "border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-100" 
            : "border-zinc-200 bg-white text-zinc-700 hover:border-primary-300 hover:bg-zinc-50"
          }
        `}
        aria-label="Select Language"
      >
        <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full object-cover">
           <img 
             src={currentLang.icon} 
             alt={currentLang.label} 
             className="h-full w-full object-cover"
           />
        </span>
        <span>{currentLang.localName}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-black/5 z-50 focus:outline-none"
          >
            <div className="flex flex-col space-y-0.5">
              {languages.map((lang) => {
                const isActive = currentLocale === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`nav-lang-item group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all
                      ${isActive 
                        ? "bg-primary-50 text-primary-700" 
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                       <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full shadow-sm ring-1 ring-black/5">
                        <img 
                          src={lang.icon} 
                          alt={lang.label} 
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span>{lang.label}</span>
                    </div>
                    {isActive && (
                      <motion.div 
                        layoutId="activeLang"
                        className="h-2 w-2 rounded-full bg-primary-500" 
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
