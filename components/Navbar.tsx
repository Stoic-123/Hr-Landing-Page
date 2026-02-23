"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useModal } from "@/context/ModalContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations('Navbar');
  const { openModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const currentLocale = pathname.split('/')[1] || 'en';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t('features'), id: 'features' },
    { name: t('howItWorks'), id: 'how-it-works' },
    { name: t('pricing'), id: 'pricing' },
    { name: t('testimonials'), id: 'testimonials' },
    { name: t('contact'), id: 'contact' },
    { name: t('faq'), id: 'faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`fixed z-50 transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2 ${
        isOpen
          ? "top-0 w-full max-w-full rounded-none bg-white border-b border-zinc-200"
          : scrolled
          ? "top-0 w-full max-w-full rounded-none border-b border-white/20 bg-white/10 backdrop-blur-xl shadow-sm"
          : "top-6 w-[95%] max-w-7xl rounded-full border border-white/20 bg-white/5 backdrop-blur-xl shadow-lg"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href={`/${currentLocale}`} className="text-2xl font-bold tracking-tighter text-foreground">
          <img src="/LOGO/NSM-TECH-LOGO.png" alt="NSM Tech Logo" className="h-9 w-auto object-contain" style={{ mixBlendMode: 'multiply' }}/>
        </Link>

        {/* Desktop Links */}
        <div className="hidden space-x-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary-500"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <button
            onClick={openModal}
            className="rounded-full cursor-pointer bg-primary-600 px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/20"
          >
            {t('getStarted')}
          </button>
        </div>

        {/* Mobile Menu Button & Language Switcher */}
        <div className="flex  items-center space-x-4 md:hidden">
         <LanguageSwitcher />
          <button
            className="text-foreground cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-white/10 py-4 px-6 md:hidden">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className="text-base font-medium text-foreground/80 hover:text-primary-500"
                onClick={(e) => { handleNavClick(e, item.id); setIsOpen(false); }}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                openModal();
              }}
              className="block w-full rounded-full bg-primary-600 py-3 text-center text-sm font-semibold text-white"
            >
              {t('getStarted')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
