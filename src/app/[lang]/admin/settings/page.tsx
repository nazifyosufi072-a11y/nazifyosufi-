import { prisma } from '@/lib/db';
import AdminSettingsForm from '@/components/AdminSettingsForm';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AdminSettingsPage({ params }: PageProps) {
  const { lang } = await params;
  
  // Fetch settings directly from the DB on load
  const settings = await prisma.siteSetting.findMany();

  return (
    <AdminSettingsForm initialSettings={settings} lang={lang} />
  );
}
