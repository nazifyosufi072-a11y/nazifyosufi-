'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  lang: string;
  dict: any;
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const switchLanguage = (newLang: string) => {
    const segments = pathname.split('/');
    segments[1] = newLang; // Replace current locale (segments[0] is empty because path starts with /)
    const newPath = segments.join('/');
    router.push(newPath);
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { label: dict.nav.home, href: `/${lang}#home` },
    { label: dict.nav.services, href: `/${lang}#services` },
    { label: dict.nav.projects, href: `/${lang}#projects` },
    { label: dict.nav.experience, href: `/${lang}#experience` },
    { label: dict.nav.about, href: `/${lang}#about` },
    { label: dict.nav.certificates, href: `/${lang}#certificates` },
    { label: dict.nav.contact, href: `/${lang}#contact` },
  ];

  const isAdminRoute = pathname.includes('/admin');

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#101010]/90 backdrop-blur-xl shadow-2xl border-b border-[#303030]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Name Logo (Text Only) */}
          <Link href={`/${lang}`} className="flex items-center group">
            <span className="text-xl sm:text-2xl font-black tracking-widest text-white font-normal-brand hover:text-[#06B6D4] transition-colors duration-300 uppercase">
              ARTIN
            </span>
          </Link>

          {/* Desktop Navigation (Floating Capsule) */}
          {!isAdminRoute && (
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-3 py-1 rounded-full border border-[#303030] bg-[#181818]/95 backdrop-blur-2xl shadow-xl shadow-black/40">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-2.5 xl:px-3 py-1 rounded-full text-xs xl:text-sm font-bold text-[#c0c0c0] hover:text-white hover:bg-[#282828] transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Language Switcher Pill */}
            <button
              onClick={() => switchLanguage(lang === 'fa' ? 'en' : 'fa')}
              className="flex items-center justify-center gap-1.5 h-9 px-4 rounded-full border border-[#303030] bg-[#181818]/90 text-xs font-bold text-[#e0e0e0] hover:bg-[#282828] hover:text-white cursor-pointer transition-all duration-200 shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>{lang === 'fa' ? 'English' : 'دری / فارسی'}</span>
            </button>

            {/* CTA Button Pill */}
            {!isAdminRoute && (
              <Link
                href={`/${lang}#contact`}
                className="flex items-center justify-center h-9 px-5 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#6D28D9] hover:to-[#0891B2] border border-[#06B6D4]/40 shadow-lg shadow-[#7C3AED]/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                {dict.nav.cta}
              </Link>
            )}

            {isAdminRoute && (
              <Link
                href={`/${lang}/admin/dashboard`}
                className="flex items-center justify-center h-9 px-5 rounded-full text-xs font-bold text-white bg-[#303030] hover:bg-[#404040] border border-[#404040]"
              >
                {dict.nav.admin}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-900 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-b border-[#303030] bg-[#101010]/95 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {!isAdminRoute &&
                menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-bold text-[#c0c0c0] hover:text-white hover:bg-[#202020] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}

              <div className="pt-4 border-t border-[#202020] flex flex-col space-y-3 px-2">
                {/* Mobile Language switch */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    switchLanguage(lang === 'fa' ? 'en' : 'fa');
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#303030] bg-[#181818] text-sm font-bold text-[#e0e0e0] hover:bg-[#252525] cursor-pointer transition-colors shadow-sm"
                >
                  <Globe className="w-4 h-4 text-[#06B6D4]" />
                  <span>{lang === 'fa' ? 'English' : 'دری / فارسی'}</span>
                </button>

                {!isAdminRoute && (
                  <Link
                    href={`/${lang}#contact`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-3 rounded-xl text-center text-sm font-extrabold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] border border-[#06B6D4]/40 shadow-lg shadow-[#7C3AED]/25 transition-all"
                  >
                    {dict.nav.cta}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
