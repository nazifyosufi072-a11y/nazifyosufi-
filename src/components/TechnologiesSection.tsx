'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Code2, Server, Database, Wrench } from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: string;
}

interface TechnologiesSectionProps {
  technologies: TechItem[];
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

const filterContainerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.1,
      ease: 'easeOut',
    },
  },
};

export default function TechnologiesSection({ technologies, dict }: TechnologiesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: dict.technologies.all, icon: Code2 },
    { id: 'frontend', label: dict.technologies.frontend, icon: Code2 },
    { id: 'backend', label: dict.technologies.backend, icon: Server },
    { id: 'database', label: dict.technologies.database, icon: Database },
    { id: 'tools', label: dict.technologies.tools, icon: Wrench },
  ];

  const filteredTechs = activeCategory === 'all'
    ? technologies
    : technologies.filter((tech) => tech.category.toLowerCase() === activeCategory.toLowerCase());

  // Helper to assign a warm editorial category badge color
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return 'text-[#B86B45] bg-[#B86B45]/10 border-[#B86B45]/20';
      case 'backend':
        return 'text-[#69705A] bg-[#69705A]/10 border-[#69705A]/20';
      case 'database':
        return 'text-[#B99A62] bg-[#B99A62]/10 border-[#B99A62]/20';
      case 'tools':
        return 'text-[#57534E] bg-[#57534E]/10 border-[#57534E]/20';
      default:
        return 'text-[#57534E] bg-[#57534E]/10 border-[#57534E]/20';
    }
  };

  return (
    <section id="technologies" className="py-24 relative border-t border-[#E5DDD0] overflow-hidden bg-[#F7F4EE]">
      {/* Subtle Ambient Background Lighting Layer */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-[#B99A62]/4 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1C1917]">
            {dict.technologies.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg font-normal text-[#57534E]">
            {dict.technologies.subtitle}
          </p>
        </motion.div>

        {/* Filter Tabs with Sliding Active Charcoal Pill */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={filterContainerVariants}
          className="flex justify-center mb-12"
        >
          <div className="flex max-w-full overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-[#EFE9DF] border border-[#D8CBB8] shadow-sm gap-1 sm:gap-1.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#B86B45]/50 focus-visible:outline-none ${
                    isActive ? 'text-[#FAF7F2]' : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {/* Sliding Active Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTechCategory"
                      className="absolute inset-0 rounded-xl bg-[#1C1917] shadow-md z-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center space-x-2 rtl:space-x-reverse">
                    <Icon className="w-3.5 h-3.5 stroke-[2]" />
                    <span>{cat.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Technologies Grid with Smooth Layout Transitions */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTechs.map((tech) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                  transition: { type: 'spring', stiffness: 400, damping: 25 },
                }}
                key={tech.id}
                className="group relative flex flex-col items-center justify-center p-5 rounded-2xl border border-[#D8CBB8]/80 bg-[#FFFFFF] hover:border-[#B86B45]/45 hover:shadow-xl hover:shadow-stone-900/5 transition-all duration-300 text-center overflow-hidden"
              >
                {/* Subtle top edge highlight */}
                <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-[#D8CBB8] group-hover:via-[#B86B45]/40 to-transparent transition-all duration-300" />

                <div
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border mb-3 transition-colors ${getCategoryColor(
                    tech.category
                  )}`}
                >
                  {tech.category}
                </div>
                <span className="text-sm font-bold text-[#1C1917] group-hover:text-[#B86B45] transition-colors duration-200">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
