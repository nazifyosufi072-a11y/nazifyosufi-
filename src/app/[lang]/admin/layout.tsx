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
  Home,
  ExternalLink
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
    { label: isFa ? 'گواهینامه‌ها / سرتیفیکیت (Certificates)' : 'Certificates', href: `/${lang}/admin/certificates`, icon: Award },
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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F5F2EB] text-[#1C1917]">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 flex-shrink-0 bg-white border-b md:border-b-0 md:border-e border-[#D8CBB8] flex flex-col justify-between py-6 shadow-sm z-30">
        <div>
          {/* Logo */}
          <div className="px-6 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 rounded-2xl bg-[#1C1917] flex items-center justify-center text-[#F5F2EB] shadow-md shadow-stone-900/10">
                <Terminal className="w-5 h-5 text-[#B86B45]" />
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-[#1C1917] block leading-none">
                  ARTIN ADMIN
                </span>
                <span className="text-[11px] font-semibold text-[#8C827A] mt-0.5 block">
                  {isFa ? 'مدیریت وب‌سایت' : 'Control Panel'}
                </span>
              </div>
            </div>

            <Link
              href={`/${lang}`}
              target="_blank"
              className="p-2 rounded-xl border border-[#D8CBB8] hover:bg-[#F5F2EB] text-[#57534E] hover:text-[#B86B45] transition-colors md:hidden"
              title={isFa ? 'مشاهده سایت' : 'View Site'}
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Links list */}
          <nav className="space-y-1.5 px-4 text-start">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isCert = item.href.includes('certificates');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1C1917] text-[#FAF7F2] shadow-md shadow-stone-900/15'
                      : isCert
                      ? 'text-[#B86B45] bg-[#EFE9DF]/60 hover:bg-[#EFE9DF] hover:text-[#1C1917]'
                      : 'text-[#57534E] hover:bg-[#F5F2EB] hover:text-[#1C1917]'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#B86B45]' : isCert ? 'text-[#B86B45]' : ''}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="px-4 mt-6 pt-6 border-t border-[#D8CBB8] space-y-2 text-start">
          
          {/* Back to public site */}
          <Link
            href={`/${lang}`}
            target="_blank"
            className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-2.5 rounded-xl text-xs font-bold text-[#57534E] hover:bg-[#F5F2EB] hover:text-[#1C1917] transition-colors"
          >
            <Home className="w-4 h-4 flex-shrink-0 text-[#B86B45]" />
            <span>{isFa ? 'مشاهده وب‌سایت اصلی' : 'Public Website'}</span>
            <ExternalLink className="w-3.5 h-3.5 ms-auto opacity-60" />
          </Link>

          {/* Log out */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 rtl:space-x-reverse w-full px-4 py-2.5 rounded-xl text-xs font-bold text-red-650 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>{isFa ? 'خروج از حساب' : 'Log Out'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 sm:p-8 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>

    </div>
  );
}
