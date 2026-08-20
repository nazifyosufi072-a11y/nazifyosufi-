import { prisma } from '@/lib/db';
import { getDictionary } from '@/lib/dictionary';

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

  // 1. Fetch data from DB
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  const technologies = await prisma.technology.findMany({ orderBy: { order: 'asc' } });
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });
  const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
  const certificates = await prisma.certificate.findMany({ orderBy: { order: 'asc' } });
  const settingsData = await prisma.siteSetting.findMany();
  const settings = settingsData.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

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

      {/* 8. CONTACT / COLLABORATE SECTION */}
      <ContactSection
        lang={lang}
        isFa={isFa}
        dict={dict}
      />

      {/* 9. CALL TO ACTION (PRE-FOOTER) */}
      <CallToActionSection
        lang={lang}
        isFa={isFa}
      />
    </div>
  );
}
