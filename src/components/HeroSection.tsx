'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useMotionTemplate, type Variants } from 'framer-motion';
import { Crown } from 'lucide-react';

interface HeroSectionProps {
  lang: string;
  isFa: boolean;
  dict: any;
  heroTitle: string;
  heroDescription: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: 'easeOut',
    },
  },
};

export default function HeroSection({
  lang,
  isFa,
  dict,
  heroTitle,
  heroDescription,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // GPU-friendly mouse coordinates for the atmospheric spotlight (no React re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 220, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[88vh] flex items-center justify-center py-20 lg:py-28 overflow-hidden bg-[#F7F4EE]"
    >
      {/* 1. Dynamic Cursor-following Atmospheric Light Field (GPU-only rendering, 100% hydration stable) */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500 opacity-90"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${smoothMouseX}px ${smoothMouseY}px,
              rgba(184, 107, 69, 0.12),
              rgba(185, 154, 98, 0.06) 40%,
              transparent 75%
            )
          `,
        }}
      />

      {/* 2. Layered Ambient Background Color Meshes */}
      <div className="absolute top-1/4 start-1/4 w-[450px] h-[450px] rounded-full bg-[#B86B45]/6 blur-[140px] pointer-events-none -z-20" />
      <div className="absolute bottom-1/4 end-1/4 w-[450px] h-[450px] rounded-full bg-[#B99A62]/7 blur-[140px] pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* COLUMN 1: Site Headline & Intro (7 cols) */}
          <div className="lg:col-span-7 text-start flex flex-col items-start order-2 lg:order-1">
            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#1C1917] leading-[1.15] mb-6"
            >
              {heroTitle}
            </motion.h1>

            {/* Subtitle / Intro */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg font-normal text-[#57534E] leading-relaxed max-w-xl mb-8"
            >
              {heroDescription}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Link
                  href={`/${lang}#contact`}
                  className="inline-block px-8 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-[#FAF7F2] bg-[#1C1917] hover:bg-[#B86B45] shadow-xl shadow-[#1C1917]/10 hover:shadow-2xl hover:shadow-[#B86B45]/20 transition-all duration-300 text-center cursor-pointer"
                >
                  {dict.hero.ctaStart}
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Link
                  href={`/${lang}#projects`}
                  className="inline-block px-8 py-3.5 rounded-2xl text-sm sm:text-base font-semibold border border-[#D8CBB8] bg-[#FFFFFF] hover:bg-[#FAF7F2] hover:border-[#B86B45]/40 text-[#1C1917] shadow-sm hover:shadow-md transition-all duration-300 text-center cursor-pointer"
                >
                  {dict.hero.ctaProjects}
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* COLUMN 2: Nazif Yosufi Leader Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end order-1 lg:order-2">
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="w-full max-w-md"
            >
              <div className="p-7 sm:p-8 rounded-3xl border border-[#D8CBB8] bg-[#FFFFFF]/90 backdrop-blur-2xl shadow-xl shadow-stone-900/6 relative overflow-hidden flex flex-col items-center text-center hover:border-[#B86B45]/45 hover:shadow-2xl transition-all duration-300">
                
                {/* Circular Avatar with Warm Copper & Gold Breathing Glow */}
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 16px 0px rgba(184, 107, 69, 0.15)',
                      '0 0 28px 4px rgba(184, 107, 69, 0.28)',
                      '0 0 16px 0px rgba(184, 107, 69, 0.15)',
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 border border-[#B86B45]/40 bg-gradient-to-tr from-[#B86B45]/25 via-transparent to-[#B99A62]/30 mb-5"
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-[#D8CBB8]">
                    <Image
                      src="/images/leader-profile.jpg"
                      alt="Nazif Yosufi - Team Leader & Founder"
                      fill
                      sizes="200px"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Leader Badge with Name */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-[#1C1917] bg-[#EFE9DF] border border-[#D8CBB8] mb-2 shadow-sm">
                  <Crown className="w-4 h-4 text-[#B86B45]" />
                  <span>{isFa ? 'نظیف یوسفی' : 'Nazif Yosufi'}</span>
                </div>

                <p className="text-xs font-semibold text-[#B86B45] mb-4">
                  {isFa ? 'رهبر ارشد آرتین تیم' : 'Team Leader of Artin Team'}
                </p>

                {/* Leader Quote Box */}
                <div className="p-4 rounded-2xl border border-[#E5DDD0] bg-[#F7F4EE] relative w-full text-center mb-5">
                  <p className="text-xs sm:text-sm font-medium text-[#57534E] leading-relaxed text-center py-1">
                    {isFa 
                      ? 'در آرتین تیم نظریات شما را به نرم‌افزارهای هوشمند و مصئون تبدیل می‌کنیم'
                      : 'At Artin Team we turn your ideas into intelligent and secure software'
                    }
                  </p>
                </div>

                {/* Direct Contact Button */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-full"
                >
                  <Link
                    href={`/${lang}#contact`}
                    className="block w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-[#FAF7F2] bg-[#1C1917] hover:bg-[#B86B45] shadow-md transition-all duration-300 text-center"
                  >
                    {isFa ? 'ارتباط مستقیم با رهبر تیم' : 'Contact Team Leader'}
                  </Link>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
