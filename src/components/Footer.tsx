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

  return (
    <footer className="bg-[#1C1917] text-[#FAF7F2] border-t border-[#2D2825] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Link href={`/${lang}`} className="flex items-center group mb-4">
              <span className="text-xl sm:text-2xl font-black tracking-widest text-[#FAF7F2] font-normal-brand hover:text-[#B86B45] transition-colors duration-300 uppercase">
                ARTIN
              </span>
            </Link>
            <p className="text-sm text-[#A8A29E] leading-relaxed mb-6 text-start">
              {dict.footer.desc}
            </p>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FAF7F2] mb-4 text-start">
              {dict.footer.links}
            </h4>
            <ul className="space-y-2.5 text-start">
              <li>
                <Link href={`/${lang}#home`} className="text-sm text-[#A8A29E] hover:text-[#FAF7F2] transition-colors">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#services`} className="text-sm text-[#A8A29E] hover:text-[#FAF7F2] transition-colors">
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#projects`} className="text-sm text-[#A8A29E] hover:text-[#FAF7F2] transition-colors">
                  {dict.nav.projects}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#about`} className="text-sm text-[#A8A29E] hover:text-[#FAF7F2] transition-colors">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/privacy-policy`} className="text-sm text-[#A8A29E] hover:text-[#FAF7F2] transition-colors">
                  {lang === 'fa' ? 'سیاست حریم خصوصی' : 'Privacy Policy'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FAF7F2] mb-4 text-start">
              {dict.footer.services}
            </h4>
            <ul className="space-y-2.5 text-start text-sm text-[#A8A29E]">
              <li>{lang === 'fa' ? 'طراحی و توسعه فرانت‌اند' : 'Frontend Development'}</li>
              <li>{lang === 'fa' ? 'طراحی سرور و بک‌اند' : 'Backend Engineering'}</li>
              <li>{lang === 'fa' ? 'توسعه پایگاه داده و ذخیره‌سازی' : 'Database Optimization'}</li>
              <li>{lang === 'fa' ? 'طراحی سیستم مدیریت و ادمین' : 'Custom Admin Panels'}</li>
              <li>{lang === 'fa' ? 'راه‌حل‌های فول‌استک سفارشی' : 'Full-Stack Solutions'}</li>
            </ul>
          </div>

          {/* Contact (3 cols: WhatsApp, Email, Telegram) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FAF7F2] mb-4 text-start">
              {dict.nav.contact}
            </h4>
            <ul className="space-y-3 text-start">
              {/* WhatsApp */}
              <li>
                <a
                  href="https://wa.me/491624212685"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-[#A8A29E] hover:text-[#FAF7F2] transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold">WhatsApp: +49 162 4212685</span>
                </a>
              </li>
              {/* Email */}
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 text-[#A8A29E] hover:text-[#FAF7F2] transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#B86B45]/20 border border-[#B86B45]/40 flex items-center justify-center text-[#B86B45] group-hover:scale-105 transition-transform">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold">{email}</span>
                </a>
              </li>
              {/* Telegram */}
              <li>
                <a
                  href="https://t.me/B_lack090"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-[#A8A29E] hover:text-[#FAF7F2] transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#0088cc]/15 border border-[#0088cc]/30 flex items-center justify-center text-[#0088cc] group-hover:scale-105 transition-transform">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold">Telegram: @B_lack090</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-[#2D2825] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <span>
            © {currentYear} {dict.footer.copyright}
          </span>
          <div className="flex items-center gap-4">
            <Link href={`/${lang}/privacy-policy`} className="hover:text-[#FAF7F2] transition-colors">
              {lang === 'fa' ? 'سیاست حریم خصوصی' : 'Privacy Policy'}
            </Link>
            <Link href={`/${lang}/terms-of-service`} className="hover:text-[#FAF7F2] transition-colors">
              {lang === 'fa' ? 'شرایط استفاده' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
