import AdminCrud from '@/components/AdminCrud';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AdminCertificatesPage({ params }: PageProps) {
  const { lang } = await params;
  const isFa = lang === 'fa';

  const fields: any[] = [
    { name: 'nameFa', label: 'Certificate Name (Dari/Persian)', type: 'text' },
    { name: 'nameEn', label: 'Certificate Name (English)', type: 'text' },
    { name: 'issuerFa', label: 'Issuer (Dari/Persian)', type: 'text' },
    { name: 'issuerEn', label: 'Issuer (English)', type: 'text' },
    { name: 'date', label: 'Issue Date', type: 'text' },
    { name: 'imageUrl', label: 'Certificate Image / PDF Link', type: 'image' },
    { name: 'descriptionFa', label: 'Description (Dari/Persian)', type: 'textarea', showInTable: false },
    { name: 'descriptionEn', label: 'Description (English)', type: 'textarea', showInTable: false },
    { name: 'verificationUrl', label: 'Verification URL', type: 'text', showInTable: false },
    { name: 'order', label: 'Sorting Order', type: 'number' },
  ];

  return (
    <AdminCrud
      resource="certificates"
      title={isFa ? 'مدیریت گواهی‌نامه‌ها' : 'Certificates Management'}
      description={isFa ? 'مدیریت مدارک تخصص و اعتبارنامه‌های آرتین تیم.' : 'Manage team certifications, verified course credentials, and credentials images.'}
      fields={fields}
      lang={lang}
    />
  );
}
