import { getDictionary } from '@/lib/dictionary';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TechnologiesSection from '@/components/TechnologiesSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import AboutSection from '@/components/AboutSection';
import CertificatesSection from '@/components/CertificatesSection';
import ContactSection from '@/components/ContactSection';
import CallToActionSection from '@/components/CallToActionSection';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isFa = lang === 'fa';

  let isDbConnected = false;
  let services: any[] = [];
  let technologies: any[] = [];
  let projects: any[] = [];
  let experiences: any[] = [];
  let certificates: any[] = [];
  let settings: Record<string, string> = {};

  try {
    const [srvData, techData, projData, expData, certData, setData] = await Promise.all([
      prisma.service.findMany({ orderBy: { order: 'asc' } }),
      prisma.technology.findMany({ orderBy: { order: 'asc' } }),
      prisma.project.findMany({ orderBy: { order: 'asc' } }),
      prisma.experience.findMany({ orderBy: { order: 'asc' } }),
      prisma.certificate.findMany({ orderBy: { order: 'asc' } }),
      prisma.siteSetting.findMany(),
    ]);

    services = srvData;
    technologies = techData;
    projects = projData;
    experiences = expData;
    certificates = certData;
    settings = setData.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    isDbConnected = true;
  } catch (e) {
    console.error('Database connection notice (using baseline structure):', e);
  }

  // Fallback defaults ONLY if DB server was completely uncontactable
  if (!isDbConnected) {
    services = [
      { id: '1', titleFa: 'توسعه فرانت‌اند (Frontend)', titleEn: 'Frontend Development', descriptionFa: 'طراحی و توسعه رابط‌های کاربری مدرن، واکنش‌گرا و سریع با استفاده از React و Next.js.', descriptionEn: 'Design and development of modern, responsive, and fast user interfaces using React and Next.js.', icon: 'Layout', order: 1 },
      { id: '2', titleFa: 'توسعه بک‌اند (Backend)', titleEn: 'Backend Development', descriptionFa: 'ساخت سرورهای مقیاس‌پذیر، سیستم‌های احراز هویت امن و معماری پایگاه داده پیشرفته.', descriptionEn: 'Building scalable servers, secure authentication systems, and advanced database architectures.', icon: 'Server', order: 2 },
      { id: '3', titleFa: 'توسعه پایگاه داده', titleEn: 'Database Engineering', descriptionFa: 'طراحی، بهینه‌سازی و مدیریت پایگاه‌های داده رابطه‌ای و غیررابطه‌ای مانند PostgreSQL و MongoDB.', descriptionEn: 'Designing, optimizing, and managing relational and non-relational databases like PostgreSQL and MongoDB.', icon: 'Database', order: 3 },
      { id: '4', titleFa: 'طراحی پنل مدیریت اختصاصی', titleEn: 'Custom Admin Panels', descriptionFa: 'توسعه پنل‌های مدیریتی قدرتمند برای کنترل کامل روی محتوا، کاربران و آمارهای سیستم.', descriptionEn: 'Development of powerful admin dashboards for full control over content, users, and system analytics.', icon: 'Settings', order: 4 },
      { id: '5', titleFa: 'توسعه فول‌استک (Full-Stack)', titleEn: 'Full-Stack Development', descriptionFa: 'ارائه راه‌حل‌های سرتاسری و یکپارچه از ایده اولیه و رابط کاربری تا پایگاه داده و استقرار.', descriptionEn: 'Providing end-to-end integrated solutions from initial concept and UI to database and deployment.', icon: 'Cpu', order: 5 },
      { id: '6', titleFa: 'تولید نرم‌افزار سفارشی', titleEn: 'Custom Software Development', descriptionFa: 'توسعه سیستم‌های نرم‌افزاری اختصاصی و منطبق با نیازهای منحصربه‌فرد کسب‌وکار شما.', descriptionEn: 'Development of dedicated software systems aligned with the unique needs of your business.', icon: 'Code', order: 6 },
    ];
    technologies = [
      { id: '1', name: 'HTML', category: 'frontend' },
      { id: '2', name: 'CSS', category: 'frontend' },
      { id: '3', name: 'JavaScript', category: 'frontend' },
      { id: '4', name: 'TypeScript', category: 'frontend' },
      { id: '5', name: 'React', category: 'frontend' },
      { id: '6', name: 'Next.js', category: 'frontend' },
      { id: '7', name: 'Tailwind CSS', category: 'frontend' },
      { id: '8', name: 'Framer Motion', category: 'frontend' },
      { id: '9', name: 'Node.js', category: 'backend' },
      { id: '10', name: 'Express', category: 'backend' },
      { id: '11', name: 'NestJS', category: 'backend' },
      { id: '12', name: 'Python', category: 'backend' },
      { id: '13', name: 'PHP', category: 'backend' },
      { id: '14', name: 'PostgreSQL', category: 'database' },
      { id: '15', name: 'MongoDB', category: 'database' },
      { id: '16', name: 'Prisma ORM', category: 'database' },
      { id: '17', name: 'Git', category: 'tools' },
      { id: '18', name: 'Docker', category: 'tools' },
    ];
  }

  // Hero custom parameters
  const heroTitle = isFa ? (settings.hero_title_fa || dict.hero.title) : (settings.hero_title_en || dict.hero.title);
  const heroDescription = isFa ? (settings.hero_description_fa || dict.hero.description) : (settings.hero_description_en || dict.hero.description);
  
  // About custom parameters
  const aboutStory = isFa ? (settings.about_story_fa || dict.about.story) : (settings.about_story_en || dict.about.story);
  const aboutMission = isFa ? (settings.about_mission_fa || dict.about.mission) : (settings.about_mission_en || dict.about.mission);
  const aboutVision = isFa ? (settings.about_vision_fa || dict.about.vision) : (settings.about_vision_en || dict.about.vision);

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <HeroSection
        lang={lang}
        isFa={isFa}
        dict={dict}
        heroTitle={heroTitle}
        heroDescription={heroDescription}
      />

      {/* 2. SERVICES SECTION */}
      <ServicesSection
        services={services}
        isFa={isFa}
        dict={dict}
      />

      {/* 3. TECHNOLOGIES SECTION */}
      <TechnologiesSection
        technologies={technologies}
        dict={dict}
      />

      {/* 4. PROJECTS / PORTFOLIO */}
      <ProjectsSection
        projects={projects}
        lang={lang}
        isFa={isFa}
        dict={dict}
      />

      {/* 5. EXPERIENCE TIMELINE */}
      <ExperienceSection
        experiences={experiences}
        isFa={isFa}
        dict={dict}
      />

      {/* 6. ABOUT SECTION */}
      <AboutSection
        isFa={isFa}
        dict={dict}
        aboutStory={aboutStory}
        aboutMission={aboutMission}
        aboutVision={aboutVision}
      />

      {/* 7. CERTIFICATES GRID & LIGHTBOX */}
      {certificates.length > 0 && (
        <CertificatesSection
          certificates={certificates}
          lang={lang}
          isFa={isFa}
          dict={dict}
        />
      )}

      {/* 8. CONTACT & COLLABORATION SECTION */}
      <ContactSection
        lang={lang}
        isFa={isFa}
        dict={dict}
      />

      {/* 9. CALL TO ACTION PRE-FOOTER BANNER */}
      <CallToActionSection
        lang={lang}
        isFa={isFa}
      />
    </div>
  );
}
