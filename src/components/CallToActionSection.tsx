'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';

interface CallToActionSectionProps {
  lang: string;
  isFa: boolean;
}

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function CallToActionSection({ lang, isFa }: CallToActionSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden border-t border-[#E5DDD0] bg-gradient-to-b from-[#F7F4EE] to-[#EFE9DF]">
      {/* Radiant ambient glow */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[#B86B45]/6 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={contentVariants}
          className="flex flex-col items-center"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#1C1917] leading-tight">
            {isFa
              ? 'آماده‌اید ایده خود را به یک نرم‌افزار واقعی تبدیل کنید؟'
              : 'Ready to turn your idea into a real digital product?'}
          </h3>
          <p className="text-[#57534E] mt-4 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            {isFa
              ? 'با متخصصین ما مشورت کنید و محصول نرم‌افزاری اختصاصی خود را بسازید.'
              : 'Consult with our engineering team and build your custom digital solutions.'}
          </p>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="mt-8"
          >
            <Link
              href={`/${lang}#contact`}
              className="inline-block px-8 py-4 rounded-2xl font-bold text-sm sm:text-base text-[#FAF7F2] bg-[#1C1917] hover:bg-[#B86B45] shadow-xl shadow-[#1C1917]/10 hover:shadow-2xl hover:shadow-[#B86B45]/20 transition-all duration-300 cursor-pointer"
            >
              {isFa ? 'شروع مشاوره رایگان' : 'Start Free Consultation'}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
