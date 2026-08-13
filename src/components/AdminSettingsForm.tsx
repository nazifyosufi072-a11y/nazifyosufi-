'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, Save, Info, Sliders, Globe, Heart } from 'lucide-react';

interface SettingItem {
  key: string;
  value: string;
}

interface AdminSettingsFormProps {
  initialSettings: SettingItem[];
  lang: string;
}

export default function AdminSettingsForm({ initialSettings, lang }: AdminSettingsFormProps) {
  const isFa = lang === 'fa';
  
  // Format initial list into a key-value state map
  const getInitialState = () => {
    const state: Record<string, string> = {};
    initialSettings.forEach((item) => {
      state[item.key] = item.value;
    });
    return state;
  };

  const [formData, setFormData] = useState<Record<string, string>>(getInitialState());
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'about' | 'seo'>('general');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        setError('Failed to update settings.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during save.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: isFa ? 'اطلاعات عمومی' : 'General Info', icon: Info },
    { id: 'hero', label: isFa ? 'بخش هیرو' : 'Hero Section', icon: Sliders },
    { id: 'about', label: isFa ? 'درباره ما' : 'About Section', icon: Heart },
    { id: 'seo', label: isFa ? 'سئو و متادیتا' : 'SEO & Metadata', icon: Globe },
  ];

  return (
    <div className="space-y-6 text-start">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {isFa ? 'تنظیمات سایت' : 'Site Settings'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isFa ? 'مدیریت و پیکربندی اطلاعات پایه، متون صفحه اصلی و سئو سایت.' : 'Configure global site metadata, hero descriptions, social profiles, and contact details.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-indigo-650 text-indigo-650 dark:text-indigo-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-sm">
        
        {/* Statuses */}
        {success && (
          <div className="flex items-center gap-2 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 text-sm">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{isFa ? 'تنظیمات با موفقیت ذخیره شدند.' : 'Settings updated successfully.'}</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Tab 1: General Info */}
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">Site Name</label>
              <input
                type="text"
                value={formData.site_name || ''}
                onChange={(e) => handleInputChange('site_name', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">Contact Email</label>
              <input
                type="email"
                value={formData.contact_email || ''}
                onChange={(e) => handleInputChange('contact_email', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">Contact Phone</label>
              <input
                type="text"
                value={formData.contact_phone || ''}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">Address (Dari/Persian)</label>
              <input
                type="text"
                value={formData.contact_address_fa || ''}
                onChange={(e) => handleInputChange('contact_address_fa', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">Address (English)</label>
              <input
                type="text"
                value={formData.contact_address_en || ''}
                onChange={(e) => handleInputChange('contact_address_en', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div className="sm:col-span-2 border-t border-slate-100 dark:border-slate-850 pt-6">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Social Media URLs</h4>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">GitHub Organisation</label>
              <input
                type="text"
                value={formData.social_github || ''}
                onChange={(e) => handleInputChange('social_github', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">LinkedIn Company Page</label>
              <input
                type="text"
                value={formData.social_linkedin || ''}
                onChange={(e) => handleInputChange('social_linkedin', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">Twitter Profile</label>
              <input
                type="text"
                value={formData.social_twitter || ''}
                onChange={(e) => handleInputChange('social_twitter', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Hero Section */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Hero Headline (Dari/Persian)</label>
              <input
                type="text"
                value={formData.hero_title_fa || ''}
                onChange={(e) => handleInputChange('hero_title_fa', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Hero Headline (English)</label>
              <input
                type="text"
                value={formData.hero_title_en || ''}
                onChange={(e) => handleInputChange('hero_title_en', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Hero Description (Dari/Persian)</label>
              <textarea
                value={formData.hero_description_fa || ''}
                rows={4}
                onChange={(e) => handleInputChange('hero_description_fa', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Hero Description (English)</label>
              <textarea
                value={formData.hero_description_en || ''}
                rows={4}
                onChange={(e) => handleInputChange('hero_description_en', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
          </div>
        )}

        {/* Tab 3: About Section */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">About Story (Dari/Persian)</label>
              <textarea
                value={formData.about_story_fa || ''}
                rows={4}
                onChange={(e) => handleInputChange('about_story_fa', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">About Story (English)</label>
              <textarea
                value={formData.about_story_en || ''}
                rows={4}
                onChange={(e) => handleInputChange('about_story_en', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">Mission (Dari/Persian)</label>
                <textarea
                  value={formData.about_mission_fa || ''}
                  rows={3}
                  onChange={(e) => handleInputChange('about_mission_fa', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">Mission (English)</label>
                <textarea
                  value={formData.about_mission_en || ''}
                  rows={3}
                  onChange={(e) => handleInputChange('about_mission_en', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">Vision (Dari/Persian)</label>
                <textarea
                  value={formData.about_vision_fa || ''}
                  rows={3}
                  onChange={(e) => handleInputChange('about_vision_fa', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-355 mb-2">Vision (English)</label>
                <textarea
                  value={formData.about_vision_en || ''}
                  rows={3}
                  onChange={(e) => handleInputChange('about_vision_en', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: SEO Metadata */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">SEO Meta Title (Dari/Persian)</label>
              <input
                type="text"
                value={formData.seo_title_fa || ''}
                onChange={(e) => handleInputChange('seo_title_fa', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-855 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">SEO Meta Title (English)</label>
              <input
                type="text"
                value={formData.seo_title_en || ''}
                onChange={(e) => handleInputChange('seo_title_en', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-855 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">SEO Meta Description (Dari/Persian)</label>
              <textarea
                value={formData.seo_description_fa || ''}
                rows={4}
                onChange={(e) => handleInputChange('seo_description_fa', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-855 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">SEO Meta Description (English)</label>
              <textarea
                value={formData.seo_description_en || ''}
                rows={4}
                onChange={(e) => handleInputChange('seo_description_en', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-855 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center justify-end border-t border-slate-100 dark:border-slate-850 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/55 text-sm cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isFa ? 'در حال ذخیره‌سازی...' : 'Saving...'}</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isFa ? 'ذخیره تغییرات' : 'Save Settings'}</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
