import AdminCrud from '@/components/AdminCrud';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AdminExperiencesPage({ params }: PageProps) {
  const { lang } = await params;
  const isFa = lang === 'fa';

  const fields: any[] = [
    { name: 'organizationFa', label: 'Organization (Dari/Persian)', type: 'text' },
    { name: 'organizationEn', label: 'Organization (English)', type: 'text' },
    { name: 'positionFa', label: 'Position (Dari/Persian)', type: 'text' },
    { name: 'positionEn', label: 'Position (English)', type: 'text' },
    { name: 'startDate', label: 'Start Date (e.g. 1399 / 2020)', type: 'text' },
    { name: 'endDate', label: 'End Date (e.g. Present / اکنون)', type: 'text' },
    { name: 'descriptionFa', label: 'Short Description (Dari/Persian)', type: 'textarea' },
    { name: 'descriptionEn', label: 'Short Description (English)', type: 'textarea' },
    { name: 'achievementsFa', label: 'Achievements (Dari/Persian, Newline Separated)', type: 'textarea', showInTable: false },
    { name: 'achievementsEn', label: 'Achievements (English, Newline Separated)', type: 'textarea', showInTable: false },
    { name: 'order', label: 'Sorting Order', type: 'number' },
  ];

  return (
    <AdminCrud
      resource="experiences"
      title={isFa ? 'مدیریت تجربیات' : 'Experiences Management'}
      description={isFa ? 'مدیریت خط زمانی سابقه‌کار و پروژه‌های بزرگ آرتین تیم.' : 'Manage professional timeline, organizations, and milestones.'}
      fields={fields}
      lang={lang}
    />
  );
}
