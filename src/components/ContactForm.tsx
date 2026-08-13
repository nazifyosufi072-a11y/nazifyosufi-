'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  lang: string;
  dict: any;
}

export default function ContactForm({ lang, dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = dict.contact.validation.name;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = dict.contact.validation.email;
    }
    if (!formData.projectType) {
      newErrors.projectType = dict.contact.validation.projectType;
    }
    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = dict.contact.validation.description;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          description: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl">
      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center py-10"
          >
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              {lang === 'fa' ? 'سپاسگزاریم!' : 'Thank you!'}
            </h3>
            <p className="text-slate-600 dark:text-slate-350 max-w-sm mb-6">
              {dict.contact.success}
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {lang === 'fa' ? 'ارسال پیام جدید' : 'Send another message'}
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#e0e0e0] mb-2">
                  {dict.contact.name} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full min-h-[44px] px-4 py-3 rounded-xl border bg-[#101010] text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#404040]/50 transition-all ${
                    errors.name
                      ? 'border-red-500'
                      : 'border-[#303030] focus:border-[#505050]'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#e0e0e0] mb-2">
                  {dict.contact.email} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full min-h-[44px] px-4 py-3 rounded-xl border bg-[#101010] text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#404040]/50 transition-all ${
                    errors.email
                      ? 'border-red-500'
                      : 'border-[#303030] focus:border-[#505050]'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#e0e0e0] mb-2">
                  {dict.contact.phone}
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={lang === 'fa' ? 'اختیاری' : 'Optional'}
                  className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-[#303030] bg-[#101010] text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#404040]/50 focus:border-[#505050] transition-all"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-semibold text-[#e0e0e0] mb-2">
                  {dict.contact.projectType} <span className="text-red-500">*</span>
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full min-h-[44px] px-4 py-3 rounded-xl border bg-[#101010] text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#404040]/50 transition-all ${
                    errors.projectType
                      ? 'border-red-500'
                      : 'border-[#303030] focus:border-[#505050]'
                  }`}
                >
                  <option value="">{dict.contact.types.select}</option>
                  <option value="website">{dict.contact.types.website}</option>
                  <option value="webapp">{dict.contact.types.webapp}</option>
                  <option value="mobile">{dict.contact.types.mobile}</option>
                  <option value="software">{dict.contact.types.software}</option>
                  <option value="admin">{dict.contact.types.admin}</option>
                  <option value="api">{dict.contact.types.api}</option>
                  <option value="other">{dict.contact.types.other}</option>
                </select>
                {errors.projectType && <p className="text-xs text-red-500 mt-1">{errors.projectType}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#e0e0e0] mb-2">
                {dict.contact.description} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border bg-[#101010] text-white focus:outline-none focus:ring-2 focus:ring-[#404040]/50 transition-all ${
                  errors.description
                    ? 'border-red-500'
                    : 'border-[#303030] focus:border-[#505050]'
                }`}
              />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            </div>

            {/* Submission Status Message */}
            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{dict.contact.error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-extrabold text-white bg-[#404040] hover:bg-[#505050] disabled:bg-[#303030] border border-[#505050] shadow-lg shadow-[#404040]/30 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{loading ? dict.contact.sending : dict.contact.submit}</span>
              {!loading && <Send className="w-4 h-4 rtl:-scale-x-100" />}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
