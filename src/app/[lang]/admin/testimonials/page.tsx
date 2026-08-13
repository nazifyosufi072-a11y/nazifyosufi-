import AdminCrud from '@/components/AdminCrud';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AdminTestimonialsPage({ params }: PageProps) {
  const { lang } = await params;
  const isFa = lang === 'fa';

  const fields: any[] = [
    { name: 'nameFa', label: 'Client Name (Dari/Persian)', type: 'text' },
    { name: 'nameEn', label: 'Client Name (English)', type: 'text' },
    { name: 'clientImage', label: 'Client Image Link', type: 'image' },
    { name: 'companyFa', label: 'Company/Role (Dari/Persian)', type: 'text' },
    { name: 'companyEn', label: 'Company/Role (English)', type: 'text' },
    {
      name: 'rating',
      label: 'Rating (1-5)',
      type: 'select',
      options: [
        { value: '5', label: '5 Stars' },
        { value: '4', label: '4 Stars' },
        { value: '3', label: '3 Stars' },
        { value: '2', label: '2 Stars' },
        { value: '1', label: '1 Star' },
      ],
    },
    { name: 'testimonialFa', label: 'Comment (Dari/Persian)', type: 'textarea', showInTable: false },
    { name: 'testimonialEn', label: 'Comment (English)', type: 'textarea', showInTable: false },
    { name: 'published', label: 'Published / Visible', type: 'boolean' },
    { name: 'order', label: 'Sorting Order', type: 'number' },
  ];

  return (
    <AdminCrud
      resource="testimonials"
      title={isFa ? 'مدیریت رضایت‌نامه‌ها' : 'Testimonials Management'}
      description={isFa ? 'مدیریت نظرات و بازخوردهای مشتریان آرتین تیم.' : 'Manage client references, feedback comments, ratings, and publishing status.'}
      fields={fields}
      lang={lang}
    />
  );
}
