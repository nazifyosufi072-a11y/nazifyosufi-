import AdminCrud from '@/components/AdminCrud';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AdminProjectsPage({ params }: PageProps) {
  const { lang } = await params;
  const isFa = lang === 'fa';

  const fields: any[] = [
    { name: 'titleFa', label: 'Title (Dari/Persian)', type: 'text' },
    { name: 'titleEn', label: 'Title (English)', type: 'text' },
    { name: 'categoryFa', label: 'Category (Dari/Persian)', type: 'text' },
    { name: 'categoryEn', label: 'Category (English)', type: 'text' },
    { name: 'descriptionFa', label: 'Short Description (Dari/Persian)', type: 'textarea', showInTable: false },
    { name: 'descriptionEn', label: 'Short Description (English)', type: 'textarea', showInTable: false },
    { name: 'contentFa', label: 'Full Overview (Dari/Persian)', type: 'textarea', showInTable: false },
    { name: 'contentEn', label: 'Full Overview (English)', type: 'textarea', showInTable: false },
    { name: 'image', label: 'Project Image', type: 'image' },
    { name: 'demoUrl', label: 'Live Demo Link', type: 'text', showInTable: false },
    { name: 'githubUrl', label: 'GitHub Repository Link', type: 'text', showInTable: false },
    { name: 'technologies', label: 'Technologies (Comma Separated)', type: 'text' },
    { name: 'challengeFa', label: 'The Challenge (Dari/Persian)', type: 'textarea', showInTable: false },
    { name: 'challengeEn', label: 'The Challenge (English)', type: 'textarea', showInTable: false },
    { name: 'solutionFa', label: 'The Solution (Dari/Persian)', type: 'textarea', showInTable: false },
    { name: 'solutionEn', label: 'The Solution (English)', type: 'textarea', showInTable: false },
    { name: 'featuresFa', label: 'Features (Newline Separated)', type: 'textarea', showInTable: false },
    { name: 'featuresEn', label: 'Features (Newline Separated)', type: 'textarea', showInTable: false },
    { name: 'resultsFa', label: 'Results (Dari/Persian)', type: 'textarea', showInTable: false },
    { name: 'resultsEn', label: 'Results (English)', type: 'textarea', showInTable: false },
    { name: 'featured', label: 'Featured Status', type: 'boolean' },
    { name: 'order', label: 'Sorting Order', type: 'number' },
  ];

  return (
    <AdminCrud
      resource="projects"
      title={isFa ? 'مدیریت پروژه‌ها' : 'Projects Management'}
      description={isFa ? 'افزودن، ویرایش و حذف پروژه‌های نمونه کار آرتین تیم.' : 'Add, edit, or delete Artin Team showcase portfolio items.'}
      fields={fields}
      lang={lang}
    />
  );
}
