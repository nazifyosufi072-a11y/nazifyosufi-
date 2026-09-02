import AdminCrud from '@/components/AdminCrud';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AdminCertificatesPage({ params }: PageProps) {
  const { lang } = await params;
  const isFa = lang === 'fa';

  const fields: any[] = [
    { name: 'nameFa', label: isFa ? 'نام گواهینامه / مدرک (فارسی)' : 'Certificate Name (Dari/Persian)', type: 'text' },
    { name: 'nameEn', label: isFa ? 'نام گواهینامه / مدرک (انگلیسی)' : 'Certificate Name (English)', type: 'text' },
    { name: 'issuerFa', label: isFa ? 'صادرکننده / دانشگاه / شرکت (فارسی)' : 'Issuer (Dari/Persian)', type: 'text' },
    { name: 'issuerEn', label: isFa ? 'صادرکننده / شرکت (انگلیسی)' : 'Issuer (English)', type: 'text' },
    { name: 'date', label: isFa ? 'تاریخ اخذ (مثلاً 2024)' : 'Issue Date', type: 'text' },
    { name: 'imageUrl', label: isFa ? 'تصویر مدرک یا نشان دیجیتال (Upload Image)' : 'Certificate Image / Badge', type: 'image' },
    { name: 'descriptionFa', label: isFa ? 'توضیحات مدرک (فارسی)' : 'Description (Dari/Persian)', type: 'textarea', showInTable: false },
    { name: 'descriptionEn', label: isFa ? 'توضیحات مدرک (انگلیسی)' : 'Description (English)', type: 'textarea', showInTable: false },
    { name: 'verificationUrl', label: isFa ? 'لینک تأیید و اعتبارسنجی (Credly یا لینک سایت صادرکننده)' : 'Verification URL', type: 'text', showInTable: false },
    { name: 'order', label: isFa ? 'ترتیب اولویت نمایش (عدد)' : 'Sorting Order', type: 'number' },
  ];

  return (
    <AdminCrud
      resource="certificates"
      title={isFa ? 'مدیریت مدارک و گواهی‌نامه‌ها (Certificates)' : 'Certificates Management'}
      description={isFa ? 'افزودن، ویرایش و آپلود نشان‌ها و گواهینامه‌های رسمی تیم آرتین.' : 'Manage and upload verified credentials, certificates, and badges.'}
      fields={fields}
      lang={lang}
    />
  );
}
