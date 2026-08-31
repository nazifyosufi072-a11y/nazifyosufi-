import { getDictionary } from '@/lib/dictionary';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/app/globals.css';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  // Default values
  let title = 'Artin Team | Premium Software Development Agency';
  let description = 'Custom software, backend systems, and modern web application development.';

  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = settings.reduce((acc: Record<string, string>, curr: { key: string; value: string }) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    if (lang === 'fa') {
      title = settingsMap.site_title_fa || 'تیم توسعه نرم‌افزار آرتین | طراحی سایت و نرم‌افزار سفارشی';
      description = settingsMap.site_description_fa || 'آرتین تیم متخصص در ساخت برنامه‌های تحت وب، فرانت‌اند و بک‌اند، سیستم‌های مدیریت محتوا، پنل‌های مدیریت و نرم‌افزارهای اختصاصی دو زبانه.';
    } else {
      title = settingsMap.site_title_en || 'Artin Team | Software Engineering & Web Development Agency';
      description = settingsMap.site_description_en || 'Artin Team specializes in custom web applications, backend engineering, CMS, admin portals, and multi-language enterprise digital products.';
    }
  } catch (e) {
    console.error('Metadata database query error:', e);
  }

  return {
    title,
    description,
    keywords: ['software development', 'web design', 'Next.js', 'React', 'Herat software team', 'آرتین تیم', 'طراحی سایت هرات', 'برنامه‌نویسی'],
    authors: [{ name: 'Artin Team' }],
    metadataBase: new URL('http://localhost:3000'),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'fa' ? 'fa_AF' : 'en_US',
      siteName: 'Artin Team',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  let settings: Record<string, string> = {};
  try {
    const settingsList = await prisma.siteSetting.findMany().catch(() => []);
    settings = settingsList.reduce((acc: Record<string, string>, curr: { key: string; value: string }) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (e) {
    console.error('Layout settings fetch database error:', e);
  }

  const isFa = lang === 'fa';
  const direction = isFa ? 'rtl' : 'ltr';
  const fontFamily = isFa ? "'IranNastaliq', 'Vazirmatn', sans-serif" : "'Outfit', sans-serif";

  return (
    <html lang={lang} dir={direction} data-scroll-behavior="smooth" className="scroll-smooth" style={{ fontFamily }}>
      <body className="antialiased bg-[#F7F4EE] text-[#1C1917] min-h-screen flex flex-col justify-between">
        <Navbar lang={lang} dict={dict} />
        
        <main className="flex-grow pt-16">
          {children}
        </main>

        <Footer lang={lang} dict={dict} settings={settings} />
      </body>
    </html>
  );
}
