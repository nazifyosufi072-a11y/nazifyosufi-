'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, type Variants } from 'framer-motion';
import * as Icons from 'lucide-react';

// Dynamic Icon loader helper with architectural styling
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  // @ts-ignore
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};

interface Service {
  id: string;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  descriptionEn: string;
  icon: string;
  order: number;
}

interface ServicesSectionProps {
  services: Service[];
  isFa: boolean;
  dict: any;
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
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
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
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

function ServiceCard({
  service,
  isFa,
}: {
  service: Service;
  isFa: boolean;
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
      className="group relative w-full flex flex-col p-8 rounded-3xl border border-[#D8CBB8]/80 bg-[#FFFFFF] backdrop-blur-md hover:border-[#B86B45]/45 hover:shadow-2xl hover:shadow-stone-900/8 shadow-md shadow-stone-900/3 transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#B86B45]/40"
    >
      {/* Subtle Warm Inner Cursor Spotlight Highlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${mouseX}px ${mouseY}px,
              rgba(184, 107, 69, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Top subtle highlight border line */}
      <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#D8CBB8] group-hover:via-[#B86B45]/50 to-transparent transition-all duration-300 z-20" />

      {/* Architectural Icon Container with Micro-interaction */}
      <div className="relative z-20 w-13 h-13 rounded-2xl bg-[#EFE9DF] border border-[#D8CBB8] text-[#1C1917] flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-[#FAF7F2] group-hover:border-[#B86B45]/50 group-hover:text-[#B86B45] transition-all duration-300 shadow-sm">
        <DynamicIcon name={service.icon} className="w-6 h-6 stroke-[1.75]" />
      </div>

      {/* Title */}
      <h3 className="relative z-20 text-lg sm:text-xl font-bold text-[#1C1917] mb-2.5 group-hover:text-[#B86B45] transition-colors duration-200 text-start">
        {isFa ? service.titleFa : service.titleEn}
      </h3>

      {/* Description */}
      <p className="relative z-20 text-sm leading-relaxed font-normal text-[#57534E] text-start flex-grow">
        {isFa ? service.descriptionFa : service.descriptionEn}
      </p>
    </motion.div>
  );
}

export default function ServicesSection({ services, isFa, dict }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 relative border-t border-[#E5DDD0] overflow-hidden bg-[#F7F4EE]">
      {/* Subtle Ambient Background Lighting Layer */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-[#B86B45]/4 blur-[140px] pointer-events-none -z-10" />

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
            {dict.services.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg font-normal text-[#57534E]">
            {dict.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isFa={isFa}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
