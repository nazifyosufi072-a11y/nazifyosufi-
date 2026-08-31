import { getDictionary } from '@/lib/dictionary';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

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

  // 1. Fetch data safely from DB with fallback defaults
  let services: any[] = [];
  let technologies: any[] = [];
  let projects: any[] = [];
  let experiences: any[] = [];
  let certificates: any[] = [];
  let settings: Record<string, string> = {};

  try {
    const [srvData, techData, projData, expData, certData, setData] = await Promise.all([
      prisma.service.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
      prisma.technology.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
      prisma.project.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
      prisma.experience.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
      prisma.certificate.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
      prisma.siteSetting.findMany().catch(() => []),
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
  } catch (e) {
    console.error('Database fetch error (fallback active):', e);
  }

  // Fallback defaults if tables are empty or initializing
  if (services.length === 0) {
    services = [
      { id: '1', titleFa: 'توسعه فرانت‌اند (Frontend)', titleEn: 'Frontend Development', descriptionFa: 'طراحی و توسعه رابط‌های کاربری مدرن، واکنش‌گرا و سریع با استفاده از React و Next.js.', descriptionEn: 'Design and development of modern, responsive, and fast user interfaces using React and Next.js.', icon: 'Layout', order: 1 },
      { id: '2', titleFa: 'توسعه بک‌اند (Backend)', titleEn: 'Backend Development', descriptionFa: 'ساخت سرورهای مقیاس‌پذیر، سیستم‌های احراز هویت امن و معماری پایگاه داده پیشرفته.', descriptionEn: 'Building scalable servers, secure authentication systems, and advanced database architectures.', icon: 'Server', order: 2 },
      { id: '3', titleFa: 'توسعه پایگاه داده', titleEn: 'Database Engineering', descriptionFa: 'طراحی، بهینه‌سازی و مدیریت پایگاه‌های داده رابطه‌ای و غیررابطه‌ای مانند PostgreSQL و MongoDB.', descriptionEn: 'Designing, optimizing, and managing relational and non-relational databases like PostgreSQL and MongoDB.', icon: 'Database', order: 3 },
      { id: '4', titleFa: 'طراحی پنل مدیریت اختصاصی', titleEn: 'Custom Admin Panels', descriptionFa: 'توسعه پنل‌های مدیریتی قدرتمند برای کنترل کامل روی محتوا، کاربران و آمارهای سیستم.', descriptionEn: 'Development of powerful admin dashboards for full control over content, users, and system analytics.', icon: 'Settings', order: 4 },
      { id: '5', titleFa: 'توسعه فول‌استک (Full-Stack)', titleEn: 'Full-Stack Development', descriptionFa: 'ارائه راه‌حل‌های سرتاسری و یکپارچه از ایده اولیه و رابط کاربری تا پایگاه داده و استقرار.', descriptionEn: 'Providing end-to-end integrated solutions from initial concept and UI to database and deployment.', icon: 'Cpu', order: 5 },
      { id: '6', titleFa: 'تولید نرم‌افزار سفارشی', titleEn: 'Custom Software Development', descriptionFa: 'توسعه سیستم‌های نرم‌افزاری اختصاصی و منطبق با نیازهای منحصربه‌فرد کسب‌وکار شما.', descriptionEn: 'Development of dedicated software systems aligned with the unique needs of your business.', icon: 'Code', order: 6 },
    ];
  }

  if (technologies.length === 0) {
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

  if (projects.length === 0) {
    projects = [
      {
        id: 'proj-1',
        titleFa: 'سیستم جامع مدیریت منابع سازمانی (ERP) آرتین',
        titleEn: 'Artin Enterprise Resource Planning (ERP)',
        descriptionFa: 'یک سیستم یکپارچه برای مدیریت مالی، انبارداری، منابع انسانی و فروشگاه کسب‌وکارهای متوسط و بزرگ.',
        descriptionEn: 'An integrated system for financial management, inventory tracking, HR, and sales for medium to large enterprises.',
        categoryFa: 'برنامه تحت وب',
        categoryEn: 'Web Application',
        image: '/images/project-erp.jpg',
        demoUrl: 'https://erp.artin.team',
        githubUrl: 'https://github.com/artin-team/artin-erp',
        featured: true,
        technologies: 'Next.js, Node.js, PostgreSQL, Prisma ORM, Tailwind CSS',
        order: 1,
      },
      {
        id: 'proj-2',
        titleFa: 'پلتفرم تجارت الکترونیک آریا مارکت',
        titleEn: 'Aria Market E-Commerce Platform',
        descriptionFa: 'یک فروشگاه اینترنتی فوق‌العاده سریع، واکنش‌گرا و دو زبانه با درگاه‌های پرداخت بین‌المللی و محلی.',
        descriptionEn: 'An ultra-fast, responsive, and bilingual online store featuring international and local payment gateway integrations.',
        categoryFa: 'فروشگاه الکترونیکی',
        categoryEn: 'E-Commerce',
        image: '/images/project-ecommerce.jpg',
        demoUrl: 'https://market.artin.team',
        githubUrl: 'https://github.com/artin-team/aria-market',
        featured: true,
        technologies: 'Next.js, TypeScript, Express, MongoDB, Tailwind CSS, Framer Motion',
        order: 2,
      },
    ];
  }

  if (experiences.length === 0) {
    experiences = [
      {
        id: 'exp-1',
        organizationFa: 'تیم توسعه آرتین (Artin Team)',
        organizationEn: 'Artin Team',
        positionFa: 'تیم نرم‌افزاری و راه‌حل‌های دیجیتال',
        positionEn: 'Software & Digital Solutions Agency',
        startDate: '۱۳۹۹',
        endDate: 'اکنون',
        descriptionFa: 'ارائه راه‌حل‌های نرم‌افزاری باکیفیت و کلاس جهانی به مشتریان داخلی و بین‌المللی.',
        descriptionEn: 'Delivering high-quality, world-class software solutions to local and international clients.',
        achievementsFa: 'طراحی و پیاده‌سازی بیش از ۲۰ پروژه موفق کشوری و منطقه‌ای\nتوسعه سیستم‌های مقیاس‌پذیر با معماری مدرن و امنیت بالا\nکسب رضایتمندی ۹۸ درصدی از مشتریان',
        achievementsEn: 'Designed and deployed 20+ successful national and regional projects\nDeveloped highly scalable systems with modern architecture and top-tier security\nMaintained a 98% client satisfaction rate',
        order: 1,
      },
      {
        id: 'exp-2',
        organizationFa: 'شرکت فناوری ارتباطات افغان‌ وب',
        organizationEn: 'AfghanWeb Communications',
        positionFa: 'شریک تجاری و مشاور ارشد توسعه دهنده',
        positionEn: 'Technical Partner & Lead Consultant',
        startDate: '۱۳۹۷',
        endDate: '۱۳۹۹',
        descriptionFa: 'همکاری در زمینه طراحی زیرساخت پورتال‌های دولتی و سازمانی کشور.',
        descriptionEn: 'Partnered in designing the core infrastructure for national governmental and organizational portals.',
        achievementsFa: 'بازنویسی کدهای پورتال‌های قدیمی و افزایش ۳ برابری سرعت لود\nطراحی اولین دیتابیس توزیع‌شده برای ثبت احوال نفوس کشور',
        achievementsEn: 'Refactored legacy portal codebases resulting in a 3x speed increase\nDesigned the first distributed database structure for national population registers',
        order: 2,
      },
    ];
  }

  if (certificates.length === 0) {
    certificates = [
      {
        id: 'cert-1',
        nameFa: 'مبانی سخت‌افزار کامپیوتر',
        nameEn: 'Computer Hardware Basics',
        issuerFa: 'آکادمی شبکه سیسکو (Cisco)',
        issuerEn: 'Cisco Networking Academy',
        date: '2024',
        imageUrl: '/images/cert-hardware.png',
        descriptionFa: 'گواهینامه رسمی و بین‌المللی مبانی و معماری سخت‌افزار کامپیوتر از آکادمی سیسکو، شامل مهارت‌های شناخت و پیکربندی قطعات، عیب‌یابی و نگهداری سیستم‌های کامپیوتری.',
        descriptionEn: 'Official credential from Cisco Networking Academy validating comprehensive understanding of computer hardware architecture, component troubleshooting, and foundational system configuration.',
        verificationUrl: 'https://www.credly.com/users/nazif-yosufi.51d7d78c',
        order: 1,
      },
      {
        id: 'cert-2',
        nameFa: 'تخصص رسمی توسعه پیشرفته با Next.js',
        nameEn: 'Official Advanced Next.js Developer Certification',
        issuerFa: 'آکادمی وب ورسل',
        issuerEn: 'Vercel Web Academy',
        date: '۲۰۲۳',
        imageUrl: '/images/cert-nextjs.jpg',
        descriptionFa: 'مدرک تخصصی در زمینه بهینه‌سازی کارایی، رندرینگ سمت سرور و بهینه‌سازی موتورهای جستجو با فریمورک Next.js.',
        descriptionEn: 'Specialized credential focusing on performance optimization, server-side rendering, and SEO in the Next.js framework.',
        verificationUrl: 'https://verify.example.org/cert/67890',
        order: 2,
      },
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
      <CertificatesSection
        certificates={certificates}
        lang={lang}
        isFa={isFa}
        dict={dict}
      />

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
