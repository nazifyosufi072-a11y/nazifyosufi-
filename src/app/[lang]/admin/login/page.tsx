'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, KeyRound, AlertCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function AdminLoginPage({ params }: PageProps) {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getLang = async () => {
    const { lang } = await params;
    return lang;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const lang = await getLang();
        router.push(`/${lang}/admin/dashboard`);
        router.refresh();
      } else {
        setError(data.error || 'پین ورود اشتباه است.');
      }
    } catch (err) {
      console.error(err);
      setError('خطایی در احراز هویت رخ داد.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 grid-bg relative">
      {/* Background glow blobs */}
      <div className="blob blob-primary top-1/3 start-1/3 opacity-15"></div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/35 mb-6">
            <Terminal className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            پنل مدیریت آرتین تیم
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            برای ورود، پین اختصاصی مدیریت را وارد کنید
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-sm text-start">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* PIN Input */}
            <div className="text-start">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-350 mb-2">
                پین ورود مدیریت (PIN)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-450 dark:text-slate-550">
                  <KeyRound className="h-5 w-5 text-indigo-500" />
                </div>
                <input
                  type="password"
                  required
                  maxLength={10}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full ps-11 pe-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-center tracking-[0.3em] font-mono text-lg font-bold"
                  placeholder="••••"
                  autoFocus
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/55 transition-all shadow-md shadow-indigo-600/10 cursor-pointer text-base"
            >
              {loading ? 'در حال بررسی...' : 'ورود به پنل'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
