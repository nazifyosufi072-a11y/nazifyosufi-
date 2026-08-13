import AdminCrud from '@/components/AdminCrud';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AdminTechnologiesPage({ params }: PageProps) {
  const { lang } = await params;
  const isFa = lang === 'fa';

  const fields: any[] = [
    { name: 'name', label: 'Technology Name', type: 'text' },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'database', label: 'Database' },
        { value: 'tools', label: 'Tools / DevOps' },
      ],
    },
    { name: 'order', label: 'Sorting Order', type: 'number' },
  ];

  return (
    <AdminCrud
      resource="technologies"
      title={isFa ? 'مدیریت تکنولوژی‌ها' : 'Technologies Management'}
      description={isFa ? 'مدیریت زبان‌ها و ابزارهای مورد استفاده در پروژه‌ها.' : 'Manage languages, frameworks, and tools used by Artin Team.'}
      fields={fields}
      lang={lang}
    />
  );
}
