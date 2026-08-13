'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useParams } from 'next/navigation';
import {
  Terminal,
  LayoutDashboard,
  FolderCode,
  Sliders,
  Cpu,
  History,
  Award,
  MessageSquare,
  Settings,
  LogOut,
  Globe,
  Home,
  Star
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  
  const lang = (params?.lang as string) || 'fa';
  const isFa = lang === 'fa';

  const menuItems = [
    { label: isFa ? 'داشبورد' : 'Dashboard', href: `/${lang}/admin/dashboard`, icon: LayoutDashboard },
    { label: isFa ? 'پروژه‌ها' : 'Projects', href: `/${lang}/admin/projects`, icon: FolderCode },
    { label: isFa ? 'خدمات' : 'Services', href: `/${lang}/admin/services`, icon: Sliders },
    { label: isFa ? 'تکنولوژی‌ها' : 'Technologies', href: `/${lang}/admin/technologies`, icon: Cpu },
    { label: isFa ? 'تجربیات' : 'Experiences', href: `/${lang}/admin/experiences`, icon: History },
    { label: isFa ? 'گواهینامه‌ها' : 'Certificates', href: `/${lang}/admin/certificates`, icon: Award },
    { label: isFa ? 'پیام‌ها' : 'Messages', href: `/${lang}/admin/messages`, icon: MessageSquare },
    { label: isFa ? 'تنظیمات سایت' : 'Site Settings', href: `/${lang}/admin/settings`, icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        router.push(`/${lang}/admin/login`);
        router.refresh();
      }
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-e border-slate-200 dark:border-slate-850 flex flex-col justify-between py-6">
        <div>
          {/* Logo */}
          <div className="px-6 mb-8 flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-9 h-9 rounded-xl bg-indigo-650 flex items-center justify-center text-white shadow-lg shadow-indigo-600/25">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              {isFa ? 'پنل مدیریت' : 'Admin Area'}
            </span>
          </div>

          {/* Links list */}
          <nav className="space-y-1 px-4 text-start">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                      : 'text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="px-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-850 space-y-2 text-start">
          
          {/* Back to public site */}
          <Link
            href={`/${lang}`}
            className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-sm font-semibold text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850"
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            <span>{isFa ? 'بازگشت به سایت' : 'Public Website'}</span>
          </Link>

          {/* Log out */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 rtl:space-x-reverse w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-650 dark:text-red-400 hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>{isFa ? 'خروج از حساب' : 'Log Out'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 sm:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>

    </div>
  );
}
