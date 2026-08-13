import { prisma } from '@/lib/db';
import { getDictionary } from '@/lib/dictionary';
import { FolderCode, Sliders, Award, Star, MessageSquare, MailWarning, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AdminDashboardPage({ params }: PageProps) {
  const { lang } = await params;
  const isFa = lang === 'fa';
  const dict = await getDictionary(lang);

  // 1. Fetch counts
  const totalProjects = await prisma.project.count();
  const totalServices = await prisma.service.count();
  const totalCertificates = await prisma.certificate.count();
  const totalExperiences = await prisma.experience.count();
  const totalMessages = await prisma.message.count();
  const unreadMessagesCount = await prisma.message.count({ where: { read: false } });

  // 2. Fetch recent messages
  const recentMessages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const stats = [
    { label: isFa ? 'کل پروژه‌ها' : 'Total Projects', value: totalProjects, icon: FolderCode, color: 'text-blue-500 bg-blue-500/10', href: `/${lang}/admin/projects` },
    { label: isFa ? 'کل خدمات' : 'Total Services', value: totalServices, icon: Sliders, color: 'text-emerald-500 bg-emerald-500/10', href: `/${lang}/admin/services` },
    { label: isFa ? 'کل گواهینامه‌ها' : 'Total Certificates', value: totalCertificates, icon: Award, color: 'text-amber-500 bg-amber-500/10', href: `/${lang}/admin/certificates` },
    { label: isFa ? 'کل تجربیات' : 'Experiences', value: totalExperiences, icon: Award, color: 'text-purple-500 bg-purple-500/10', href: `/${lang}/admin/experiences` },
    { label: isFa ? 'کل پیام‌ها' : 'Total Messages', value: totalMessages, icon: MessageSquare, color: 'text-indigo-500 bg-indigo-500/10', href: `/${lang}/admin/messages` },
  ];

  return (
    <div className="space-y-8 text-start">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {isFa ? 'داشبورد مدیریت' : 'Dashboard Overview'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isFa ? 'خلاصه آمارها و عملیات مدیریت سایت Artin Team' : 'System status, metrics, and communications summary'}
        </p>
      </div>

      {/* Unread Alert */}
      {unreadMessagesCount > 0 && (
        <div className="flex items-center justify-between p-4 rounded-2xl border border-indigo-500/20 bg-indigo-600/5 text-indigo-700 dark:text-indigo-400 text-sm">
          <div className="flex items-center gap-2">
            <MailWarning className="w-5 h-5 flex-shrink-0 animate-bounce" />
            <span>
              {isFa
                ? `شما تعداد ${unreadMessagesCount} پیام خوانده‌نشده جدید از طرف مشتریان دارید.`
                : `You have ${unreadMessagesCount} new unread project messages waiting.`}
            </span>
          </div>
          <Link href={`/${lang}/admin/messages`} className="text-xs font-bold underline hover:text-indigo-800">
            {isFa ? 'مشاهده پیام‌ها' : 'View Messages'}
          </Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-800 transition-all flex items-center justify-between group"
            >
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-550 dark:text-slate-450 block">
                  {stat.label}
                </span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white block">
                  {stat.value}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Messages Card */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {isFa ? 'آخرین پیام‌های دریافتی' : 'Recent Inquiries'}
          </h3>
          <Link
            href={`/${lang}/admin/messages`}
            className="text-xs font-bold text-indigo-650 dark:text-indigo-405 hover:underline"
          >
            {isFa ? 'مشاهده همه پیام‌ها' : 'View All Messages'}
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
            {isFa ? 'هیچ پیام جدیدی وجود ندارد.' : 'No customer requests received yet.'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-650 dark:text-slate-400">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-300 font-semibold">
                  <th className="py-3 px-4 text-start">{isFa ? 'فرستنده' : 'Sender'}</th>
                  <th className="py-3 px-4 text-start">{isFa ? 'نوع پروژه' : 'Type'}</th>
                  <th className="py-3 px-4 text-start">{isFa ? 'محدوده بودجه' : 'Budget'}</th>
                  <th className="py-3 px-4 text-start">{isFa ? 'وضعیت' : 'Status'}</th>
                  <th className="py-3 px-4 text-start">{isFa ? 'تاریخ' : 'Date'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                {recentMessages.map((msg) => {
                  const date = new Date(msg.createdAt).toLocaleDateString(isFa ? 'fa-IR' : 'en-US');
                  return (
                    <tr key={msg.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-200">
                        {msg.name}
                      </td>
                      <td className="py-3 px-4 capitalize">
                        {isFa ? ((dict.contact.types as Record<string, string>)[msg.projectType] || msg.projectType) : msg.projectType}
                      </td>
                      <td className="py-3 px-4">
                        {isFa ? ((dict.contact.budgets as Record<string, string>)[msg.budget] || msg.budget) : msg.budget}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          msg.read 
                            ? 'text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-850'
                            : 'text-indigo-650 bg-indigo-500/10'
                        }`}>
                          {msg.read ? (isFa ? 'خوانده‌شده' : 'Read') : (isFa ? 'جدید' : 'Unread')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400">
                        {date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
