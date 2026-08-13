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
            className="group cursor-pointer flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl dark:hover:shadow-slate-950/50 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300"
          >
            {/* Cert Image Thumbnail */}
            <div className="relative w-28 h-20 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-200/50 dark:border-slate-800/50">
              <Award className="w-8 h-8 text-indigo-500 opacity-60 group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Info */}
            <div className="flex-grow text-center sm:text-start">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 block mb-1">
                {getLocalizedValue(cert, 'issuer')}
              </span>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {getLocalizedValue(cert, 'name')}
              </h4>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content layout */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Visual */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                  <div className="text-center flex flex-col items-center">
                    <Award className="w-20 h-20 text-indigo-500 animate-pulse mb-3" />
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {getLocalizedValue(selectedCert, 'issuer')}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 flex flex-col text-start justify-center">
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {getLocalizedValue(selectedCert, 'issuer')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                    {getLocalizedValue(selectedCert, 'name')}
                  </h3>

                  <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedCert.date}</span>
                  </div>

                  {getLocalizedValue(selectedCert, 'description') && (
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-6">
                      {getLocalizedValue(selectedCert, 'description')}
                    </p>
                  )}

                  {selectedCert.verificationUrl && (
                    <a
                      href={selectedCert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200 self-start"
                    >
                      <span>{dict.certificates.verify}</span>
                      <ExternalLink className="w-4 h-4" />
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
