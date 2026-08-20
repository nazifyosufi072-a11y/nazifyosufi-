'use client';

import { motion, type Variants } from 'framer-motion';
import { Briefcase, CheckCircle2 } from 'lucide-react';

interface Experience {
  id: string;
  organizationFa: string;
  organizationEn: string;
  positionFa: string;
  positionEn: string;
  descriptionFa: string;
  descriptionEn: string;
  startDate: string;
  endDate: string;
  achievementsFa?: string | null;
  achievementsEn?: string | null;
  order: number;
}

interface ExperienceSectionProps {
  experiences: Experience[];
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
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

export default function ExperienceSection({
  experiences,
  isFa,
  dict,
}: ExperienceSectionProps) {
  const formatTimelineDate = (dateStr: string, isFaLang: boolean) => {
    if (!dateStr) return '';
    if (!isFaLang) {
      return dateStr
        .replace(/اکنون/g, 'Present')
        .replace(/حاضر/g, 'Present')
        .replace(/1397/g, '2018')
        .replace(/1398/g, '2019')
        .replace(/1399/g, '2020')
        .replace(/1400/g, '2021')
        .replace(/1401/g, '2022')
        .replace(/1402/g, '2023')
        .replace(/1403/g, '2024')
        .replace(/1404/g, '2025');
    }
    return dateStr;
  };

  return (
    <section id="experience" className="py-24 relative border-t border-[#E5DDD0] overflow-hidden bg-[#F7F4EE]">
      {/* Subtle Ambient Background Lighting Layer */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#B99A62]/4 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1C1917]">
            {dict.experience.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg font-normal text-[#57534E]">
            {dict.experience.subtitle}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="relative border-s-2 border-[#D8CBB8] max-w-3xl mx-auto ps-6 md:ps-10 py-4"
        >
          {experiences.map((exp) => {
            const org = isFa ? exp.organizationFa : exp.organizationEn;
            const pos = isFa ? exp.positionFa : exp.positionEn;
            const desc = isFa ? exp.descriptionFa : exp.descriptionEn;
            const achievements = isFa ? exp.achievementsFa : exp.achievementsEn;
            const achievementsList = achievements ? achievements.split('\n') : [];

            return (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative mb-12 last:mb-0 text-start group"
              >
                {/* Timeline Bullet Node with Hover Pulse */}
                <span className="absolute -start-[36px] md:-start-[52px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#FAF7F2] border-2 border-[#D8CBB8] group-hover:border-[#B86B45] ring-4 ring-[#F7F4EE] shadow-sm group-hover:shadow-[0_0_16px_rgba(184,107,69,0.25)] transition-all duration-300">
                  <Briefcase className="w-3.5 h-3.5 text-[#57534E] group-hover:text-[#B86B45] transition-colors stroke-[1.75]" />
                </span>

                {/* Date Badge */}
                <span className="inline-block text-xs font-semibold font-mono text-[#B86B45] px-3.5 py-1 rounded-full border border-[#D8CBB8] bg-[#EFE9DF] shadow-sm">
                  {formatTimelineDate(exp.startDate, isFa)} - {formatTimelineDate(exp.endDate, isFa)}
                </span>

                {/* Entry Content Card */}
                <div className="mt-4 p-6 sm:p-7 rounded-3xl border border-[#D8CBB8]/80 bg-[#FFFFFF] backdrop-blur-md group-hover:border-[#B86B45]/45 group-hover:shadow-2xl group-hover:shadow-stone-900/8 shadow-md shadow-stone-900/3 transition-all duration-300">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] group-hover:text-[#B86B45] transition-colors duration-200">
                    {pos}
                  </h3>
                  <span className="text-sm font-semibold text-[#57534E] block mt-1">
                    {org}
                  </span>

                  <p className="text-sm text-[#57534E] leading-relaxed mt-3">
                    {desc}
                  </p>

                  {achievementsList.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-[#57534E]">
                      {achievementsList.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#B86B45] mt-0.5 flex-shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
