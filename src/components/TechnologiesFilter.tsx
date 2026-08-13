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
        return 'text-sky-500 bg-sky-500/10 border-sky-500/20';
      case 'backend':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'database':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'tools':
        return 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20';
      default:
        return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
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
              className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2.5 rounded-xl border text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-[#404040] border-[#505050] text-white shadow-lg shadow-[#404040]/30'
                  : 'bg-[#202020] border-[#303030] text-[#c0c0c0] hover:border-[#404040] hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={tech.id}
              className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 hover:shadow-lg dark:hover:shadow-slate-950/50 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300 text-center"
            >
              <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border mb-3 ${getCategoryColor(tech.category)}`}>
                {tech.category}
              </div>
              <span className="text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
