'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ExternalLink, X, Award, Calendar } from 'lucide-react';
import Image from 'next/image';

interface Certificate {
  id: string;
  nameFa: string;
  nameEn: string;
  issuerFa: string;
  issuerEn: string;
  date: string;
  imageUrl: string;
  descriptionFa?: string | null;
  descriptionEn?: string | null;
  verificationUrl?: string | null;
}

interface CertificatesSectionProps {
  certificates: Certificate[];
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
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
};

export default function CertificatesSection({
  certificates,
  lang,
  isFa,
  dict,
}: CertificatesSectionProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const getLocalizedValue = (
    item: Certificate,
    key: 'name' | 'issuer' | 'description'
  ): string => {
    let val: string | null | undefined = '';
    if (key === 'name') val = isFa ? item.nameFa : item.nameEn;
    if (key === 'issuer') val = isFa ? item.issuerFa : item.issuerEn;
    if (key === 'description') val = isFa ? item.descriptionFa : item.descriptionEn;
    return val || '';
  };

  return (
    <section
      id="certificates"
      aria-label={dict.certificates.title}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Architectural Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden opacity-[0.025]">
        <span className="text-[16vw] font-black tracking-tighter text-[#1C1917]">
          VERIFIED
        </span>
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-[#B86B45] bg-[#EFE9DF] border border-[#D8CBB8] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#B86B45]" />
            <span>{dict.certificates.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1C1917]">
            {dict.certificates.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg font-normal text-[#57534E]">
            {dict.certificates.subtitle}
          </p>
        </motion.div>

        {/* Certificate Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              whileHover={{
                y: -4,
                scale: 1.01,
                transition: { type: 'spring', stiffness: 350, damping: 25 },
              }}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer flex flex-col sm:flex-row items-center gap-5 p-6 rounded-3xl border border-[#D8CBB8]/80 bg-[#FFFFFF] backdrop-blur-md hover:border-[#B86B45]/45 hover:shadow-2xl hover:shadow-stone-900/8 shadow-md shadow-stone-900/3 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#B86B45]/40"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedCert(cert);
                }
              }}
            >
              {/* Cert Image Thumbnail */}
              <div className="relative w-24 h-24 bg-[#EFE9DF] rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-[#D8CBB8] group-hover:border-[#B86B45]/40 transition-colors p-2">
                {cert.imageUrl ? (
                  <img
                    src={cert.imageUrl || ''}
                    alt={getLocalizedValue(cert, 'name')}
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <Award className="w-8 h-8 text-[#B86B45] group-hover:scale-110 transition-transform duration-300 stroke-[1.75]" />
                )}
              </div>

              {/* Info */}
              <div className="flex-grow text-center sm:text-start">
                <span className="text-xs font-mono font-bold text-[#B86B45] block mb-1">
                  {getLocalizedValue(cert, 'issuer')}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#1C1917] group-hover:text-[#B86B45] transition-colors duration-200">
                  {getLocalizedValue(cert, 'name')}
                </h4>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#57534E] mt-2">
                  <Calendar className="w-3.5 h-3.5 text-[#8C827A]" />
                  <span>{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/70 backdrop-blur-xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#F7F4EE] border border-[#D8CBB8] p-6 sm:p-8 shadow-2xl shadow-stone-900/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 rounded-xl hover:bg-[#EFE9DF] text-[#57534E] hover:text-[#1C1917] border border-[#D8CBB8] cursor-pointer transition-colors z-20"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content layout */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Visual Image / Badge */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-[#EFE9DF] rounded-2xl border border-[#D8CBB8] min-h-[220px]">
                  {selectedCert.imageUrl ? (
                    <img
                      src={selectedCert.imageUrl || ''}
                      alt={getLocalizedValue(selectedCert, 'name')}
                      className="max-h-72 w-auto object-contain rounded-xl shadow-md"
                    />
                  ) : (
                    <div className="text-center flex flex-col items-center">
                      <Award className="w-16 h-16 text-[#B86B45] mb-3 stroke-[1.5]" />
                      <span className="text-xs font-semibold text-[#57534E]">
                        {getLocalizedValue(selectedCert, 'issuer')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 flex flex-col text-start justify-center">
                  <span className="text-xs font-mono font-bold text-[#B86B45]">
                    {getLocalizedValue(selectedCert, 'issuer')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] mt-1 mb-3">
                    {getLocalizedValue(selectedCert, 'name')}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#57534E] mb-4">
                    <Calendar className="w-3.5 h-3.5 text-[#8C827A]" />
                    <span>{selectedCert.date}</span>
                  </div>

                  {getLocalizedValue(selectedCert, 'description') && (
                    <p className="text-xs sm:text-sm leading-relaxed text-[#57534E] mb-6 whitespace-pre-line">
                      {getLocalizedValue(selectedCert, 'description')}
                    </p>
                  )}

                  {selectedCert.verificationUrl && (
                    <a
                      href={selectedCert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-[#FAF7F2] bg-[#1C1917] hover:bg-[#B86B45] shadow-md transition-all duration-200 self-start"
                    >
                      <span>{dict.certificates.verify}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
