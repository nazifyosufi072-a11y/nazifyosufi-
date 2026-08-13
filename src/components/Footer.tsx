import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageCircle, Send } from 'lucide-react';

interface FooterProps {
  lang: string;
  dict: any;
  settings: Record<string, string>;
}

export default function Footer({ lang, dict, settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  const email = settings.contact_email || 'nazifyosufi072@gmail.com';
  const phone = settings.contact_phone || '+49 162 4212685';
  const address = '';

  const github = settings.social_github || '#';
  const linkedin = settings.social_linkedin || '#';
  const twitter = settings.social_twitter || '#';

  return (
    <footer className="bg-[#101010] border-t border-[#202020] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Link href={`/${lang}`} className="flex items-center group mb-4">
              <span className="text-xl sm:text-2xl font-black tracking-widest text-white font-normal-brand hover:text-[#06B6D4] transition-colors duration-300 uppercase">
                {lang === 'fa' ? 'آرتین' : 'ARTIN'}
              </span>
            </Link>
            <p className="text-sm text-[#c0c0c0] leading-relaxed mb-6 text-start">
              {dict.footer.desc}
            </p>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 text-start">
              {dict.footer.links}
            </h4>
            <ul className="space-y-2.5 text-start">
              <li>
                <Link href={`/${lang}#home`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#services`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#projects`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  {dict.nav.projects}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#about`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/privacy-policy`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  {lang === 'fa' ? 'سیاست حریم خصوصی' : 'Privacy Policy'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 text-start">
              {dict.footer.services}
            </h4>
            <ul className="space-y-2.5 text-start text-sm text-slate-500 dark:text-slate-400">
              <li>{lang === 'fa' ? 'طراحی و توسعه فرانت‌اند' : 'Frontend Development'}</li>
              <li>{lang === 'fa' ? 'طراحی سرور و بک‌اند' : 'Backend Engineering'}</li>
              <li>{lang === 'fa' ? 'توسعه پایگاه داده و ذخیره‌سازی' : 'Database Optimization'}</li>
              <li>{lang === 'fa' ? 'طراحی سیستم مدیریت و ادمین' : 'Custom Admin Panels'}</li>
              <li>{lang === 'fa' ? 'راه‌حل‌های فول‌استک سفارشی' : 'Full-Stack Solutions'}</li>
            </ul>
          </div>

          {/* Contact (3 cols: WhatsApp, Email, Telegram) */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 text-start">
              {dict.nav.contact}
            </h4>
            <ul className="space-y-3.5 text-start">
              {/* WhatsApp */}
              <li className="flex items-center gap-2.5">
                <a
                  href="https://wa.me/491624212685"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-[#c0c0c0] hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">WhatsApp: +49 162 4212685</span>
                </a>
              </li>
              {/* Email */}
              <li className="flex items-center gap-2.5">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 text-[#c0c0c0] hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-[#7C3AED] group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">{email}</span>
                </a>
              </li>
              {/* Telegram */}
              <li className="flex items-center gap-2.5">
                <a
                  href="https://t.me/B_lack090"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-[#c0c0c0] hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0088cc]/20 border border-[#0088cc]/40 flex items-center justify-center text-[#0088cc] group-hover:scale-110 transition-transform">
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">Telegram: @B_lack090</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>
            © {currentYear} {dict.footer.copyright}
          </span>
          <div className="flex items-center gap-4">
            <Link href={`/${lang}/privacy-policy`} className="hover:text-indigo-600">
              {lang === 'fa' ? 'سیاست حریم خصوصی' : 'Privacy Policy'}
            </Link>
            <Link href={`/${lang}/terms-of-service`} className="hover:text-indigo-600">
              {lang === 'fa' ? 'شرایط استفاده' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
