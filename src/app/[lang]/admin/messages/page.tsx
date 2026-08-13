import AdminCrud from '@/components/AdminCrud';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AdminMessagesPage({ params }: PageProps) {
  const { lang } = await params;
  const isFa = lang === 'fa';

  const fields: any[] = [
    { name: 'name', label: 'Sender Name', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'text' },
    { name: 'phone', label: 'Phone Number', type: 'text' },
    { name: 'projectType', label: 'Project Type', type: 'text' },
    { name: 'budget', label: 'Budget Range', type: 'text' },
    { name: 'description', label: 'Project Description', type: 'textarea', showInTable: false },
    { name: 'read', label: 'Read Status', type: 'boolean' },
  ];

  return (
    <AdminCrud
      resource="messages"
      title={isFa ? 'پیام‌های دریافتی' : 'Customer Messages'}
      description={isFa ? 'مشاهده و مدیریت پیام‌ها و مشاوره‌های ارسالی مشتریان.' : 'Read and manage project requests and feedback inquiries sent by clients.'}
      fields={fields}
      lang={lang}
    />
  );
}
