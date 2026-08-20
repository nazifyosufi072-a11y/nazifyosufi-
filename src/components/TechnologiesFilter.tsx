'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Wrench } from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: string;
}

interface TechnologiesFilterProps {
  technologies: TechItem[];
  dict: any;
}

export default function TechnologiesFilter({ technologies, dict }: TechnologiesFilterProps) {
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
    : technologies.filter(tech => tech.category.toLowerCase() === activeCategory.toLowerCase());

  // Helper to assign a dynamic tech badge color
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return 'text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20';
      case 'backend':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'database':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'tools':
        return 'text-[#6366F1] bg-[#6366F1]/10 border-[#6366F1]/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#121A25] border-[#06B6D4]/40 text-[#F4F7FA] shadow-md shadow-[#06B6D4]/10'
                  : 'bg-[#0E141D]/80 border-slate-800/60 text-[#A8B1BE] hover:border-slate-700/80 hover:text-[#F4F7FA] hover:bg-[#121A25]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredTechs.map((tech) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={tech.id}
              className="group flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-800/60 bg-[#0E141D]/75 backdrop-blur-md hover:bg-[#121A25] hover:border-[#06B6D4]/30 hover:shadow-lg hover:shadow-black/40 transition-all duration-300 text-center"
            >
              <div className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border mb-3 ${getCategoryColor(tech.category)}`}>
                {tech.category}
              </div>
              <span className="text-sm font-bold text-[#F4F7FA] group-hover:text-[#06B6D4] transition-colors duration-200">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
