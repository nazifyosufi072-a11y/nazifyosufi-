'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  nameFa: string;
  nameEn: string;
  clientImage?: string | null;
  companyFa?: string | null;
  companyEn?: string | null;
  rating: number;
  testimonialFa: string;
  testimonialEn: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  lang: string;
  dict: any;
}

export default function TestimonialsCarousel({ testimonials, lang, dict }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];
  const name = lang === 'fa' ? current.nameFa : current.nameEn;
  const company = lang === 'fa' ? current.companyFa : current.companyEn;
  const quote = lang === 'fa' ? current.testimonialFa : current.testimonialEn;

  // Icons based on layout direction
  const NextIcon = lang === 'fa' ? ChevronLeft : ChevronRight;
  const PrevIcon = lang === 'fa' ? ChevronRight : ChevronLeft;

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
      {/* Background visual quote */}
      <div className="absolute top-0 start-4 text-indigo-500/10 dark:text-indigo-500/5 -translate-y-8 select-none">
        <Quote className="w-32 h-32 transform rotate-180" />
      </div>

      <div className="relative z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < current.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300 dark:text-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-slate-700 dark:text-slate-200 mb-8 max-w-3xl">
              "{quote}"
            </p>

            {/* User Meta */}
            <div className="flex flex-col items-center">
              {/* Profile initial fallback */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-indigo-500/20 mb-3 border-2 border-white dark:border-slate-800">
                {name.charAt(0)}
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">{name}</h4>
              {company && (
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{company}</span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-850 hover:border-slate-350 dark:hover:border-slate-750 text-slate-700 dark:text-slate-300 transition-all duration-200 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <PrevIcon className="w-5 h-5" />
          </button>
          
          {/* Indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-350 dark:bg-slate-750'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-855 hover:border-slate-350 dark:hover:border-slate-750 text-slate-700 dark:text-slate-300 transition-all duration-200 cursor-pointer"
            aria-label="Next testimonial"
          >
            <NextIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
