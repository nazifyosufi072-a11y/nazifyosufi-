import AdminCrud from '@/components/AdminCrud';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AdminServicesPage({ params }: PageProps) {
  const { lang } = await params;
  const isFa = lang === 'fa';

  const fields: any[] = [
    { name: 'titleFa', label: 'Title (Dari/Persian)', type: 'text' },
    { name: 'titleEn', label: 'Title (English)', type: 'text' },
    { name: 'descriptionFa', label: 'Description (Dari/Persian)', type: 'textarea' },
    { name: 'descriptionEn', label: 'Description (English)', type: 'textarea' },
    {
      name: 'icon',
      label: 'Service Icon',
      type: 'select',
      options: [
        { value: 'Layout', label: 'Layout / Interface' },
        { value: 'Server', label: 'Server / Backend' },
        { value: 'Database', label: 'Database / Storage' },
        { value: 'Settings', label: 'Settings / Panel' },
        { value: 'Cpu', label: 'CPU / Processing' },
        { value: 'Code', label: 'Code / Custom development' },
      ],
    },
    { name: 'order', label: 'Sorting Order', type: 'number' },
  ];

  return (
    <AdminCrud
      resource="services"
      title={isFa ? 'مدیریت خدمات' : 'Services Management'}
      description={isFa ? 'افزودن، ویرایش و حذف خدمات ارائه شده توسط آرتین تیم.' : 'Add, edit, or delete Artin Team service cards.'}
      fields={fields}
      lang={lang}
    />
  );
}
