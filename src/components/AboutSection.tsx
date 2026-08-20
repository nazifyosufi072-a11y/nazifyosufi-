'use client';

import { motion, type Variants } from 'framer-motion';
import { ShieldCheck, Sparkles, Zap, Headphones } from 'lucide-react';

interface AboutSectionProps {
  isFa: boolean;
  dict: any;
  aboutStory: string;
  aboutMission: string;
  aboutVision: string;
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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export default function AboutSection({
  isFa,
  dict,
  aboutStory,
  aboutMission,
  aboutVision,
}: AboutSectionProps) {
  return (
    <section id="about" className="py-24 relative border-t border-[#E5DDD0] text-start overflow-hidden bg-[#F7F4EE]">
      {/* Subtle Ambient Background Lighting Layer */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] rounded-full bg-[#B86B45]/4 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Column 1: Story & Mission/Vision (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={headerVariants}
            >
              <span className="text-xs font-mono font-bold text-[#B86B45] uppercase tracking-wider mb-2 block">
                {isFa ? 'داستان ما' : 'Our Story'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1C1917] mb-6">
                {dict.about.title}
              </h2>
              <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-8 font-normal">
                {aboutStory}
              </p>
            </motion.div>

            {/* Mission & Vision Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <motion.div
                variants={cardVariants}
                className="p-6 rounded-3xl border border-[#D8CBB8]/80 bg-[#FFFFFF] backdrop-blur-md hover:border-[#B86B45]/45 hover:shadow-xl transition-all duration-300 group shadow-sm"
              >
                <span className="text-xs font-mono font-bold text-[#B86B45] uppercase tracking-wider block mb-2 group-hover:translate-x-0.5 transition-transform">
                  {dict.about.mission}
                </span>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-normal">
                  {aboutMission}
                </p>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="p-6 rounded-3xl border border-[#D8CBB8]/80 bg-[#FFFFFF] backdrop-blur-md hover:border-[#B99A62]/45 hover:shadow-xl transition-all duration-300 group shadow-sm"
              >
                <span className="text-xs font-mono font-bold text-[#B99A62] uppercase tracking-wider block mb-2 group-hover:translate-x-0.5 transition-transform">
                  {dict.about.vision}
                </span>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-normal">
                  {aboutVision}
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Column 2: Why Choose Us (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={headerVariants}
              className="text-start"
            >
              <span className="text-xs font-mono font-bold text-[#B86B45] uppercase tracking-wider mb-2 block">
                {isFa ? 'چرا ما؟' : 'Why Choose Us'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1C1917]">
                {dict.whyUs.title}
              </h3>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Card 1 - Quality */}
              <motion.div
                variants={cardVariants}
                className="p-6 rounded-3xl border border-[#D8CBB8]/80 bg-[#FFFFFF] backdrop-blur-md hover:border-[#B86B45]/45 hover:shadow-xl hover:shadow-stone-900/5 transition-all duration-300 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EFE9DF] border border-[#D8CBB8] text-[#B86B45] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h4 className="text-base font-bold text-[#1C1917] group-hover:text-[#B86B45] transition-colors">
                  {dict.whyUs.quality}
                </h4>
                <p className="text-xs sm:text-sm text-[#57534E] mt-2 leading-relaxed">
                  {dict.whyUs.qualityDesc}
                </p>
              </motion.div>

              {/* Card 2 - Custom */}
              <motion.div
                variants={cardVariants}
                className="p-6 rounded-3xl border border-[#D8CBB8]/80 bg-[#FFFFFF] backdrop-blur-md hover:border-[#B99A62]/45 hover:shadow-xl hover:shadow-stone-900/5 transition-all duration-300 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EFE9DF] border border-[#D8CBB8] text-[#B99A62] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h4 className="text-base font-bold text-[#1C1917] group-hover:text-[#B99A62] transition-colors">
                  {dict.whyUs.custom}
                </h4>
                <p className="text-xs sm:text-sm text-[#57534E] mt-2 leading-relaxed">
                  {dict.whyUs.customDesc}
                </p>
              </motion.div>

              {/* Card 3 - Modern */}
              <motion.div
                variants={cardVariants}
                className="p-6 rounded-3xl border border-[#D8CBB8]/80 bg-[#FFFFFF] backdrop-blur-md hover:border-[#69705A]/45 hover:shadow-xl hover:shadow-stone-900/5 transition-all duration-300 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EFE9DF] border border-[#D8CBB8] text-[#69705A] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h4 className="text-base font-bold text-[#1C1917] group-hover:text-[#69705A] transition-colors">
                  {dict.whyUs.modern}
                </h4>
                <p className="text-xs sm:text-sm text-[#57534E] mt-2 leading-relaxed">
                  {dict.whyUs.modernDesc}
                </p>
              </motion.div>

              {/* Card 4 - Support */}
              <motion.div
                variants={cardVariants}
                className="p-6 rounded-3xl border border-[#D8CBB8]/80 bg-[#FFFFFF] backdrop-blur-md hover:border-[#C56F52]/45 hover:shadow-xl hover:shadow-stone-900/5 transition-all duration-300 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EFE9DF] border border-[#D8CBB8] text-[#C56F52] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Headphones className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h4 className="text-base font-bold text-[#1C1917] group-hover:text-[#C56F52] transition-colors">
                  {dict.whyUs.support}
                </h4>
                <p className="text-xs sm:text-sm text-[#57534E] mt-2 leading-relaxed">
                  {dict.whyUs.supportDesc}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
