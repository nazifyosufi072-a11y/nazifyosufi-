'use client';

import { motion, type Variants } from 'framer-motion';
import { MessageCircle, Send, Mail } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

interface ContactSectionProps {
  lang: string;
  isFa: boolean;
  dict: any;
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function ContactSection({ lang, isFa, dict }: ContactSectionProps) {
  return (
    <section id="contact" className="py-24 relative border-t border-[#E5DDD0] overflow-hidden bg-[#F7F4EE]">
      {/* Subtle Ambient Background Lighting Layer */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#B86B45]/4 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Info & Quick Channels (5 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={headerVariants}
            className="lg:col-span-5 text-start"
          >
            <span className="text-xs font-mono font-bold text-[#B86B45] uppercase tracking-wider mb-2 block">
              {isFa ? 'با ما همکاری کنید' : 'Collaborate With Us'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1C1917] leading-tight">
              {dict.contact.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed font-normal">
              {dict.contact.subtitle}
            </p>

            {/* Response Time Indicator Box */}
            <div className="mt-8 p-6 rounded-3xl border border-[#D8CBB8] bg-[#EFE9DF]/80 max-w-md backdrop-blur-md shadow-sm">
              <span className="text-sm font-bold text-[#1C1917] block mb-2">
                {isFa ? 'زمان پاسخگویی تیم ما' : 'Our Response Time'}
              </span>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-normal">
                {isFa
                  ? 'ما درخواست‌های جدید پروژه را ظرف مدت کمتر از ۲۴ ساعت کاری بررسی کرده و برای قرار هماهنگی اولیه با شما تماس می‌گیریم.'
                  : 'We review project inquiries within 24 business hours to arrange our initial consulting session.'}
              </p>
            </div>

            {/* Direct Quick Contact Buttons */}
            <div className="mt-6 flex flex-col gap-3 max-w-md">
              <a
                href="https://wa.me/491624212685"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#25D366]/40 bg-[#FFFFFF] hover:bg-[#25D366]/10 text-[#1F9249] font-bold text-xs sm:text-sm transition-all shadow-sm group hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5 flex-shrink-0 group-hover:scale-105 transition-transform" />
                <span>WhatsApp: +49 162 4212685</span>
              </a>

              <a
                href="https://t.me/B_lack090"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#0088cc]/40 bg-[#FFFFFF] hover:bg-[#0088cc]/10 text-[#0088cc] font-bold text-xs sm:text-sm transition-all shadow-sm group hover:scale-[1.01]"
              >
                <Send className="w-5 h-5 flex-shrink-0 group-hover:scale-105 transition-transform" />
                <span>Telegram: @B_lack090</span>
              </a>

              <a
                href="mailto:nazifyosufi072@gmail.com"
                className="flex items-center gap-2.5 text-[#B86B45] hover:text-[#FAF7F2] p-3.5 rounded-2xl border border-[#B86B45]/40 bg-[#FFFFFF] hover:bg-[#B86B45]/10 font-bold text-xs sm:text-sm transition-all shadow-sm group hover:scale-[1.01]"
              >
                <Mail className="w-5 h-5 flex-shrink-0 group-hover:scale-105 transition-transform" />
                <span>Email: nazifyosufi072@gmail.com</span>
              </a>
            </div>
          </motion.div>

          {/* Column 2: Form (7 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={headerVariants}
            className="lg:col-span-7"
          >
            <ContactForm lang={lang} dict={dict} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
