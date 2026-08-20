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
    <div className="w-full p-8 sm:p-10 rounded-3xl border border-[#D8CBB8] bg-[#FFFFFF] backdrop-blur-xl shadow-xl shadow-stone-900/4">
      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center py-10"
          >
            <CheckCircle2 className="w-16 h-16 text-[#B86B45] mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-[#1C1917] mb-2">
              {lang === 'fa' ? 'سپاسگزاریم!' : 'Thank you!'}
            </h3>
            <p className="text-[#57534E] max-w-sm mb-6 text-sm">
              {dict.contact.success}
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="px-6 py-2.5 rounded-xl border border-[#D8CBB8] bg-[#EFE9DF] text-xs font-semibold hover:bg-[#E5DDD0] text-[#1C1917] cursor-pointer transition-colors"
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
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#57534E] mb-2 text-start">
                  {dict.contact.name} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full min-h-[44px] px-4 py-3 rounded-xl border bg-[#FAF7F2] text-[#1C1917] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B86B45]/20 transition-all ${
                    errors.name
                      ? 'border-red-500/80'
                      : 'border-[#D8CBB8] focus:border-[#B86B45]'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1.5 text-start">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#57534E] mb-2 text-start">
                  {dict.contact.email} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full min-h-[44px] px-4 py-3 rounded-xl border bg-[#FAF7F2] text-[#1C1917] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B86B45]/20 transition-all ${
                    errors.email
                      ? 'border-red-500/80'
                      : 'border-[#D8CBB8] focus:border-[#B86B45]'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1.5 text-start">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#57534E] mb-2 text-start">
                  {dict.contact.phone}
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={lang === 'fa' ? 'اختیاری' : 'Optional'}
                  className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-[#D8CBB8] bg-[#FAF7F2] text-[#1C1917] placeholder-[#8C827A] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B86B45]/20 focus:border-[#B86B45] transition-all"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#57534E] mb-2 text-start">
                  {dict.contact.projectType} <span className="text-red-500">*</span>
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full min-h-[44px] px-4 py-3 rounded-xl border bg-[#FAF7F2] text-[#1C1917] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B86B45]/20 transition-all cursor-pointer ${
                    errors.projectType
                      ? 'border-red-500/80'
                      : 'border-[#D8CBB8] focus:border-[#B86B45]'
                  }`}
                >
                  <option value="" className="bg-[#FAF7F2] text-[#57534E]">{dict.contact.types.select}</option>
                  <option value="website" className="bg-[#FAF7F2] text-[#1C1917]">{dict.contact.types.website}</option>
                  <option value="webapp" className="bg-[#FAF7F2] text-[#1C1917]">{dict.contact.types.webapp}</option>
                  <option value="mobile" className="bg-[#FAF7F2] text-[#1C1917]">{dict.contact.types.mobile}</option>
                  <option value="software" className="bg-[#FAF7F2] text-[#1C1917]">{dict.contact.types.software}</option>
                  <option value="admin" className="bg-[#FAF7F2] text-[#1C1917]">{dict.contact.types.admin}</option>
                  <option value="api" className="bg-[#FAF7F2] text-[#1C1917]">{dict.contact.types.api}</option>
                  <option value="other" className="bg-[#FAF7F2] text-[#1C1917]">{dict.contact.types.other}</option>
                </select>
                {errors.projectType && <p className="text-xs text-red-500 mt-1.5 text-start">{errors.projectType}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#57534E] mb-2 text-start">
                {dict.contact.description} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border bg-[#FAF7F2] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B86B45]/20 transition-all ${
                  errors.description
                    ? 'border-red-500/80'
                    : 'border-[#D8CBB8] focus:border-[#B86B45]'
                }`}
              />
              {errors.description && <p className="text-xs text-red-500 mt-1.5 text-start">{errors.description}</p>}
            </div>

            {/* Submission Status Message */}
            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-600 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{dict.contact.error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm text-[#FAF7F2] bg-[#1C1917] hover:bg-[#B86B45] disabled:opacity-50 shadow-xl shadow-[#1C1917]/10 active:scale-[0.99] transition-all duration-300 cursor-pointer"
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
