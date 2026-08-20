'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useMotionTemplate, type Variants } from 'framer-motion';
import { Sparkles, Terminal, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  descriptionEn: string;
  categoryFa: string;
  categoryEn: string;
  image: string;
  demoUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  technologies: string;
  order: number;
}

interface ProjectsSectionProps {
  projects: Project[];
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

function ProjectCard({
  project,
  lang,
  isFa,
  dict,
}: {
  project: Project;
  lang: string;
  isFa: boolean;
  dict: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const projectTitle = isFa ? project.titleFa : project.titleEn;
  const projectDesc = isFa ? project.descriptionFa : project.descriptionEn;
  const projectCat = isFa ? project.categoryFa : project.categoryEn;
  const techList = project.technologies.split(',').map((t) => t.trim());

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -5,
        scale: 1.01,
        transition: { type: 'spring', stiffness: 350, damping: 25 },
      }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative w-full flex flex-col rounded-3xl border border-[#D8CBB8]/80 bg-[#FFFFFF] backdrop-blur-md hover:border-[#B86B45]/45 hover:shadow-2xl hover:shadow-stone-900/8 shadow-md shadow-stone-900/3 overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#B86B45]/40"
    >
      {/* Subtle Warm Inner Cursor Spotlight Highlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              360px circle at ${mouseX}px ${mouseY}px,
              rgba(184, 107, 69, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Top subtle highlight border line */}
      <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#D8CBB8] group-hover:via-[#B86B45]/50 to-transparent transition-all duration-300 z-20" />

      {/* Visual Architectural Frame Container */}
      <div className="relative aspect-video w-full bg-[#EFE9DF] flex items-center justify-center p-8 border-b border-[#D8CBB8] overflow-hidden">
        {/* Ambient center subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#B86B45]/5 via-transparent to-transparent opacity-60 pointer-events-none" />

        {project.featured && (
          <div className="absolute top-4 start-4 px-3.5 py-1 rounded-full text-xs font-bold text-[#FAF7F2] bg-[#1C1917] border border-[#B86B45]/40 shadow-md flex items-center gap-1.5 backdrop-blur-md z-20">
            <Sparkles className="w-3.5 h-3.5 text-[#B99A62]" />
            <span>{isFa ? 'برگزیده' : 'Featured'}</span>
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center justify-center">
          <Terminal className="w-14 h-14 text-[#57534E] group-hover:text-[#B86B45] group-hover:scale-105 transition-all duration-300 stroke-[1.5]" />
        </div>
      </div>

      {/* Meta & Content Area */}
      <div className="p-8 flex flex-col flex-grow text-start relative z-20">
        <span className="text-xs font-mono font-bold text-[#B86B45] uppercase tracking-wider mb-2">
          {projectCat}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] group-hover:text-[#B86B45] transition-colors duration-200">
          {projectTitle}
        </h3>
        <p className="text-sm text-[#57534E] mt-3 leading-relaxed flex-grow line-clamp-2">
          {projectDesc}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {techList.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg border border-[#D8CBB8] text-xs font-mono font-medium text-[#57534E] bg-[#EFE9DF]/80"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="flex items-center justify-between border-t border-[#E5DDD0] mt-6 pt-5">
          <Link
            href={`/${lang}/projects/${project.id}`}
            className="group/link inline-flex items-center gap-2 text-sm font-bold text-[#1C1917] hover:text-[#B86B45] transition-colors focus-visible:outline-none focus-visible:underline"
          >
            <span>{dict.projects.viewDetails}</span>
            {isFa ? (
              <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            )}
          </Link>

          <div className="flex gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl border border-[#D8CBB8] bg-[#EFE9DF] hover:bg-[#1C1917] hover:border-[#1C1917] text-xs font-semibold text-[#1C1917] hover:text-[#FAF7F2] flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>{isFa ? 'دمو' : 'Demo'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B86B45] group-hover:text-[#FAF7F2]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({
  projects,
  lang,
  isFa,
  dict,
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-24 relative border-t border-[#E5DDD0] overflow-hidden bg-[#F7F4EE]">
      {/* Subtle Ambient Background Lighting Layer */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#B86B45]/4 blur-[140px] pointer-events-none -z-10" />

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
            {dict.projects.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg font-normal text-[#57534E]">
            {dict.projects.subtitle}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              isFa={isFa}
              dict={dict}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
