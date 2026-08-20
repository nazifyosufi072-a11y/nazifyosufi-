'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface CertificatesLightboxProps {
  certificates: Certificate[];
  lang: string;
  dict: any;
}

export default function CertificatesLightbox({ certificates, lang, dict }: CertificatesLightboxProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const getLocalizedValue = (cert: Certificate, key: 'name' | 'issuer' | 'description') => {
    if (key === 'name') return lang === 'fa' ? cert.nameFa : cert.nameEn;
    if (key === 'issuer') return lang === 'fa' ? cert.issuerFa : cert.issuerEn;
    return lang === 'fa' ? cert.descriptionFa : cert.descriptionEn;
  };

  return (
    <div className="w-full">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="group cursor-pointer flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl border border-slate-800/60 bg-[#0E141D]/75 backdrop-blur-md hover:bg-[#121A25] hover:border-[#06B6D4]/30 hover:shadow-xl hover:shadow-black/50 transition-all duration-300"
          >
            {/* Cert Image Thumbnail */}
            <div className="relative w-24 h-20 bg-[#07090E] rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-800/60">
              <Award className="w-7 h-7 text-[#06B6D4] opacity-80 group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Info */}
            <div className="flex-grow text-center sm:text-start">
              <span className="text-xs font-semibold text-[#06B6D4] block mb-1">
                {getLocalizedValue(cert, 'issuer')}
              </span>
              <h4 className="text-base font-bold text-[#F4F7FA] group-hover:text-[#06B6D4] transition-colors duration-200">
                {getLocalizedValue(cert, 'name')}
              </h4>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#A8B1BE] mt-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{cert.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07090E]/90 backdrop-blur-xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#0E141D] border border-slate-800/80 p-6 sm:p-8 shadow-2xl shadow-black/80"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 rounded-xl hover:bg-[#121A25] text-[#A8B1BE] hover:text-[#F4F7FA] border border-slate-800/40 cursor-pointer transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content layout */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Visual */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-[#07090E] rounded-2xl border border-slate-800/60">
                  <div className="text-center flex flex-col items-center">
                    <Award className="w-16 h-16 text-[#06B6D4] mb-3" />
                    <span className="text-xs font-semibold text-[#A8B1BE]">
                      {getLocalizedValue(selectedCert, 'issuer')}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 flex flex-col text-start justify-center">
                  <span className="text-xs font-semibold text-[#06B6D4]">
                    {getLocalizedValue(selectedCert, 'issuer')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F4F7FA] mt-1 mb-3">
                    {getLocalizedValue(selectedCert, 'name')}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#A8B1BE] mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedCert.date}</span>
                  </div>

                  {getLocalizedValue(selectedCert, 'description') && (
                    <p className="text-xs sm:text-sm leading-relaxed text-[#A8B1BE] mb-6">
                      {getLocalizedValue(selectedCert, 'description')}
                    </p>
                  )}

                  {selectedCert.verificationUrl && (
                    <a
                      href={selectedCert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#F4F7FA] bg-gradient-to-r from-[#06B6D4] to-[#6366F1] hover:from-[#0891B2] hover:to-[#4F46E5] shadow-lg shadow-[#06B6D4]/15 transition-all duration-200 self-start"
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
    </div>
  );
}
