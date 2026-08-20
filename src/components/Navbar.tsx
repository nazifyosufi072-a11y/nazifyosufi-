'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
    segments[1] = newLang;
    const newPath = segments.join('/');
    router.push(newPath);
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { label: dict.nav.home, href: `/${lang}#home` },
    { label: dict.nav.services, href: `/${lang}#services` },
    { label: dict.nav.technologies || (lang === 'fa' ? 'تکنالوژی‌ها' : 'Technologies'), href: `/${lang}#technologies` },
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
          ? 'py-3 bg-[#F7F4EE]/90 backdrop-blur-xl shadow-lg shadow-stone-900/5 border-b border-[#E5DDD0]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Name Logo (Text Only) */}
          <Link href={`/${lang}`} className="flex items-center group">
            <span className="text-xl sm:text-2xl font-black tracking-widest text-[#1C1917] font-normal-brand hover:text-[#B86B45] transition-colors duration-300 uppercase">
              ARTIN
            </span>
          </Link>

          {/* Desktop Navigation (Warm Floating Capsule) */}
          {!isAdminRoute && (
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-3.5 py-1.5 rounded-full border border-[#D8CBB8]/80 bg-[#EFE9DF]/80 backdrop-blur-2xl shadow-sm">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 xl:px-3.5 py-1 rounded-full text-xs xl:text-sm font-semibold text-[#57534E] hover:text-[#1C1917] hover:bg-[#FFFFFF]/90 transition-all duration-200 cursor-pointer whitespace-nowrap"
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
              className="flex items-center justify-center gap-1.5 h-9 px-4 rounded-full border border-[#D8CBB8] bg-[#FFFFFF]/90 text-xs font-semibold text-[#1C1917] hover:bg-[#FAF7F2] hover:border-[#B86B45]/40 cursor-pointer transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-[#B86B45]/40"
            >
              <Globe className="w-3.5 h-3.5 text-[#B86B45]" />
              <span>{lang === 'fa' ? 'English' : 'دری / فارسی'}</span>
            </button>

            {/* CTA Button Pill */}
            {!isAdminRoute && (
              <Link
                href={`/${lang}#contact`}
                className="flex items-center justify-center h-9 px-5 rounded-full text-xs font-bold text-[#FAF7F2] bg-[#1C1917] hover:bg-[#B86B45] shadow-md shadow-[#1C1917]/10 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                {dict.nav.cta}
              </Link>
            )}

            {isAdminRoute && (
              <Link
                href={`/${lang}/admin/dashboard`}
                className="flex items-center justify-center h-9 px-5 rounded-full text-xs font-bold text-[#1C1917] bg-[#EFE9DF] hover:bg-[#E5DDD0] border border-[#D8CBB8]"
              >
                {dict.nav.admin}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1C1917] hover:bg-[#EFE9DF] border border-[#D8CBB8] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B86B45]/40"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#1C1917]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-b border-[#D8CBB8] bg-[#F7F4EE]/98 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {!isAdminRoute &&
                menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-[#57534E] hover:text-[#1C1917] hover:bg-[#EFE9DF] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}

              <div className="pt-3 border-t border-[#D8CBB8]/60 flex flex-col space-y-2.5 px-1">
                {/* Mobile Language switch */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    switchLanguage(lang === 'fa' ? 'en' : 'fa');
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#D8CBB8] bg-[#FFFFFF] text-sm font-semibold text-[#1C1917] hover:bg-[#FAF7F2] cursor-pointer transition-colors shadow-sm"
                >
                  <Globe className="w-4 h-4 text-[#B86B45]" />
                  <span>{lang === 'fa' ? 'English' : 'دری / فارسی'}</span>
                </button>

                {!isAdminRoute && (
                  <Link
                    href={`/${lang}#contact`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-2.5 rounded-xl text-center text-sm font-bold text-[#FAF7F2] bg-[#1C1917] hover:bg-[#B86B45] shadow-md transition-all"
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
