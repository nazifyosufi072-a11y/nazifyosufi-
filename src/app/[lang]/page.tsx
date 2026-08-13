import { prisma } from '@/lib/db';
import { getDictionary } from '@/lib/dictionary';

export const dynamic = 'force-dynamic';
import AnimatedSection from '@/components/AnimatedSection';
import TechnologiesFilter from '@/components/TechnologiesFilter';
import CertificatesLightbox from '@/components/CertificatesLightbox';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Terminal, Award, Briefcase, Sparkles, Code2, ShieldAlert, Crown, Quote, MessageCircle, Send, Mail } from 'lucide-react';
import * as Icons from 'lucide-react';

// Dynamic Icon loader helper
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  // @ts-ignore
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};

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
  const testimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
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
  const formatTimelineDate = (dateStr: string, isFa: boolean) => {
    if (!dateStr) return '';
    if (!isFa) {
      return dateStr
        .replace(/اکنون/g, 'Present')
        .replace(/حاضر/g, 'Present')
        .replace(/1397/g, '2018')
        .replace(/1398/g, '2019')
        .replace(/1399/g, '2020')
        .replace(/1400/g, '2021')
        .replace(/1401/g, '2022')
        .replace(/1402/g, '2023')
        .replace(/1403/g, '2024')
        .replace(/1404/g, '2025');
    }
    return dateStr;
  };

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION (DYNAMIC #7C3AED & #06B6D4 ANIMATED BACKGROUND) */}
      <section id="home" className="relative min-h-[92vh] flex items-center justify-center py-20 lg:py-28 overflow-hidden grid-bg hero-aurora-bg">
        {/* Animated Glow Blobs (#7C3AED Violet & #06B6D4 Cyan) */}
        <div className="blob blob-violet -top-20 -start-20 animate-glow"></div>
        <div className="blob blob-cyan -bottom-20 -end-20 animate-glow" style={{ animationDelay: '4s' }}></div>
        <div className="blob blob-violet top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 animate-glow" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* COLUMN 1: Site Headline & Intro (7 cols) */}
            <div className="lg:col-span-7 text-start flex flex-col items-start order-2 lg:order-1">
              <AnimatedSection delay={0.1} y={30}>
                {/* Main Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] drop-shadow-md mb-6">
                  {heroTitle}
                </h1>

                {/* Subtitle / Intro */}
                <p className="text-base sm:text-lg font-medium text-[#c0c0c0] leading-relaxed max-w-xl mb-8">
                  {heroDescription}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  <Link
                    href={`/${lang}#contact`}
                    className="px-7 py-3.5 rounded-2xl text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#6D28D9] hover:to-[#0891B2] border border-[#06B6D4]/50 shadow-xl shadow-[#7C3AED]/30 transition-all duration-300 active:scale-95 text-center cursor-pointer"
                  >
                    {dict.hero.ctaStart}
                  </Link>
                  <Link
                    href={`/${lang}#projects`}
                    className="px-7 py-3.5 rounded-2xl text-sm sm:text-base font-bold border border-[#303030] bg-[#202020]/80 hover:bg-[#303030] hover:border-[#06B6D4]/40 text-[#e0e0e0] transition-all duration-300 active:scale-95 text-center cursor-pointer backdrop-blur-md"
                  >
                    {dict.hero.ctaProjects}
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* COLUMN 2: Nazif Yosufi Leader Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end order-1 lg:order-2">
              <AnimatedSection delay={0.2} y={30} className="w-full max-w-md">
                <div className="p-6 sm:p-8 rounded-3xl border border-[#7C3AED]/30 bg-[#101010]/90 backdrop-blur-2xl shadow-2xl shadow-[#7C3AED]/15 relative overflow-hidden flex flex-col items-center text-center hover:border-[#06B6D4]/50 transition-colors duration-500">
                  
                  {/* Circular Animated Avatar with Glowing #06B6D4 & #7C3AED Ring */}
                  <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full p-1.5 border-2 border-[#06B6D4] bg-gradient-to-tr from-[#7C3AED] via-[#202020] to-[#06B6D4] shadow-2xl shadow-[#06B6D4]/30 animate-float transition-all duration-500 mb-5">
                    <div className="relative w-full h-full rounded-full overflow-hidden border border-[#303030]">
                      <Image
                        src="/images/leader-profile.jpg"
                        alt="Nazif Yosufi - Team Leader & Founder"
                        fill
                        sizes="200px"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    </div>
                  </div>

                  {/* Leader Badge with Name */}
                  <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm sm:text-base font-black text-white bg-gradient-to-r from-[#7C3AED]/40 to-[#06B6D4]/40 border border-[#06B6D4]/60 mb-3 shadow-lg shadow-[#06B6D4]/20 backdrop-blur-md">
                    <Crown className="w-4 h-4 text-[#06B6D4]" />
                    <span>{isFa ? 'نظیف یوسفی' : 'Nazif Yosufi'}</span>
                  </div>

                  <p className="text-xs font-bold text-cyan-300/80 mt-1 mb-4">
                    {isFa ? 'رهبر ارشد آرتین تیم' : 'Team Leader of Artin Team'}
                  </p>

                  {/* Leader Quote Box */}
                  <div className="p-4 rounded-2xl border border-[#7C3AED]/30 bg-[#181818]/90 relative w-full text-center mb-5 backdrop-blur-md">
                    <p className="text-xs sm:text-sm font-extrabold text-[#f0f0f0] leading-relaxed text-center py-1">
                      {isFa 
                        ? 'در آرتین تیم نظریات شما را به نرم‌افزارهای هوشمند و مصئون تبدیل می‌کنیم'
                        : 'At Artin Team we turn your ideas into intelligent and secure software'
                      }
                    </p>
                  </div>

                  {/* Direct Contact Button */}
                  <Link
                    href={`/${lang}#contact`}
                    className="w-full py-3 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#6D28D9] hover:to-[#0891B2] border border-[#06B6D4]/40 shadow-lg shadow-[#7C3AED]/25 transition-all duration-200"
                  >
                    {isFa ? 'ارتباط مستقیم با رهبر تیم' : 'Contact Team Leader'}
                  </Link>

                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="services" className="py-24 border-t border-[#202020] bg-[#101010] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {dict.services.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg font-medium text-[#c0c0c0]">
              {dict.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <AnimatedSection key={service.id} delay={idx * 0.05} className="flex">
                <div className="group w-full flex flex-col p-8 rounded-3xl border border-[#303030] bg-[#202020] hover:bg-[#282828] hover:border-[#404040] shadow-xl transition-all duration-300 border-t-4 border-t-transparent hover:border-t-[#404040]">
                  <div className="w-12 h-12 rounded-2xl bg-[#303030] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-[#404040]">
                    <DynamicIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {isFa ? service.titleFa : service.titleEn}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-[#c0c0c0] text-start flex-grow">
                    {isFa ? service.descriptionFa : service.descriptionEn}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TECHNOLOGIES SECTION */}
      <section id="technologies" className="py-24 border-t border-[#202020] bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {dict.technologies.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg font-medium text-[#c0c0c0]">
              {dict.technologies.subtitle}
            </p>
          </div>

          <TechnologiesFilter technologies={technologies} dict={dict} />
        </div>
      </section>

      {/* 4. PROJECTS / PORTFOLIO */}
      <section id="projects" className="py-24 border-t border-[#202020] bg-[#101010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {dict.projects.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg font-medium text-[#c0c0c0]">
              {dict.projects.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => {
              const projectTitle = isFa ? project.titleFa : project.titleEn;
              const projectDesc = isFa ? project.descriptionFa : project.descriptionEn;
              const projectCat = isFa ? project.categoryFa : project.categoryEn;
              const techList = project.technologies.split(',').map((t) => t.trim());

              return (
                <AnimatedSection key={project.id} delay={idx * 0.1} className="flex">
                  <div className="group w-full flex flex-col rounded-3xl border border-[#303030] bg-[#202020] hover:bg-[#282828] hover:border-[#404040] overflow-hidden shadow-xl transition-all duration-300">
                    
                    {/* Visual Container */}
                    <div className="relative aspect-video w-full bg-[#181818] flex items-center justify-center p-8 border-b border-[#303030]">
                      {project.featured && (
                        <div className="absolute top-4 start-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#303030] border border-[#404040] shadow-md flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#a0a0a0]" />
                          <span>{isFa ? 'برگزیده' : 'Featured'}</span>
                        </div>
                      )}
                      <Terminal className="w-16 h-16 text-[#404040] group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Meta */}
                    <div className="p-8 flex flex-col flex-grow text-start">
                      <span className="text-xs font-bold text-[#a0a0a0] uppercase tracking-wider mb-2">
                        {projectCat}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#e0e0e0] transition-colors duration-300">
                        {projectTitle}
                      </h3>
                      <p className="text-sm text-[#c0c0c0] mt-3 flex-grow line-clamp-2 leading-relaxed">
                        {projectDesc}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {techList.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg border border-[#303030] text-xs font-semibold text-[#c0c0c0] bg-[#101010]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between border-t border-[#303030] mt-6 pt-5">
                        <Link
                          href={`/${lang}/projects/${project.id}`}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e0e0e0] hover:text-white transition-colors"
                        >
                          <span>{dict.projects.viewDetails}</span>
                          {isFa ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </Link>

                        <div className="flex gap-3">
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-semibold text-[#a0a0a0] hover:text-white flex items-center gap-1"
                            >
                              <span>{isFa ? 'دمو' : 'Demo'}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCE TIMELINE */}
      <section id="experience" className="py-24 border-t border-[#202020] bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {dict.experience.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg font-medium text-[#c0c0c0]">
              {dict.experience.subtitle}
            </p>
          </div>

          <div className="relative border-s border-[#202020] max-w-3xl mx-auto ps-6 md:ps-10 py-4">
            {experiences.map((exp, idx) => {
              const org = isFa ? exp.organizationFa : exp.organizationEn;
              const pos = isFa ? exp.positionFa : exp.positionEn;
              const desc = isFa ? exp.descriptionFa : exp.descriptionEn;
              const achievements = isFa ? exp.achievementsFa : exp.achievementsEn;
              const achievementsList = achievements ? achievements.split('\n') : [];

              return (
                <AnimatedSection key={exp.id} delay={idx * 0.1} className="relative mb-12 last:mb-0 text-start">
                  {/* Bullet */}
                  <span className="absolute -start-[35px] md:-start-[51px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#202020] border-2 border-[#404040] ring-8 ring-[#000000]">
                    <Briefcase className="w-3 h-3 text-[#e0e0e0]" />
                  </span>

                  <span className="text-xs font-bold text-[#e0e0e0] px-3 py-1 rounded-full border border-[#303030] bg-[#101010]">
                    {formatTimelineDate(exp.startDate, isFa)} - {formatTimelineDate(exp.endDate, isFa)}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white mt-4">
                    {pos}
                  </h3>
                  <span className="text-sm font-semibold text-[#a0a0a0] block mt-1">
                    {org}
                  </span>
                  
                  <p className="text-sm text-[#c0c0c0] leading-relaxed mt-3">
                    {desc}
                  </p>

                  {achievementsList.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-[#c0c0c0]">
                      {achievementsList.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#a0a0a0] mt-0.5 flex-shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ABOUT SECTION */}
      <section id="about" className="py-24 border-t border-[#202020] bg-[#101010] text-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Details */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs font-bold text-[#a0a0a0] uppercase tracking-wider mb-2">
                {isFa ? 'داستان ما' : 'Our Story'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                {dict.about.title}
              </h2>
              <p className="text-base sm:text-lg text-[#c0c0c0] leading-relaxed mb-8">
                {aboutStory}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl border border-[#303030] bg-[#202020]">
                  <span className="text-xs font-bold text-[#e0e0e0] block mb-2">{dict.about.mission}</span>
                  <p className="text-xs text-[#c0c0c0] leading-relaxed font-medium">
                    {aboutMission}
                  </p>
                </div>
                <div className="p-5 rounded-2xl border border-[#303030] bg-[#202020]">
                  <span className="text-xs font-bold text-[#e0e0e0] block mb-2">{dict.about.vision}</span>
                  <p className="text-xs text-[#c0c0c0] leading-relaxed font-medium">
                    {aboutVision}
                  </p>
                </div>
              </div>
            </div>

            {/* Why choose us grid (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-start mb-2">
                <span className="text-xs font-bold text-[#a0a0a0] uppercase tracking-wider mb-2 block">
                  {isFa ? 'چرا ما؟' : 'Why Choose Us'}
                </span>
                <h3 className="text-2xl font-black text-white">
                  {dict.whyUs.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl border border-[#303030] bg-[#202020] hover:bg-[#282828] transition-colors">
                  <h4 className="text-base font-bold text-[#e0e0e0]">{dict.whyUs.quality}</h4>
                  <p className="text-xs text-[#c0c0c0] mt-2 leading-relaxed">{dict.whyUs.qualityDesc}</p>
                </div>
                <div className="p-6 rounded-2xl border border-[#303030] bg-[#202020] hover:bg-[#282828] transition-colors">
                  <h4 className="text-base font-bold text-[#e0e0e0]">{dict.whyUs.custom}</h4>
                  <p className="text-xs text-[#c0c0c0] mt-2 leading-relaxed">{dict.whyUs.customDesc}</p>
                </div>
                <div className="p-6 rounded-2xl border border-[#303030] bg-[#202020] hover:bg-[#282828] transition-colors">
                  <h4 className="text-base font-bold text-[#e0e0e0]">{dict.whyUs.modern}</h4>
                  <p className="text-xs text-[#c0c0c0] mt-2 leading-relaxed">{dict.whyUs.modernDesc}</p>
                </div>
                <div className="p-6 rounded-2xl border border-[#303030] bg-[#202020] hover:bg-[#282828] transition-colors">
                  <h4 className="text-base font-bold text-[#e0e0e0]">{dict.whyUs.support}</h4>
                  <p className="text-xs text-[#c0c0c0] mt-2 leading-relaxed">{dict.whyUs.supportDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CERTIFICATES GRID */}
      {certificates.length > 0 && (
        <section id="certificates" className="py-24 border-t border-[#202020] bg-[#000000]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                {dict.certificates.title}
              </h2>
              <p className="mt-4 text-base sm:text-lg font-medium text-[#c0c0c0]">
                {dict.certificates.subtitle}
              </p>
            </div>

            <CertificatesLightbox certificates={certificates} lang={lang} dict={dict} />
          </div>
        </section>
      )}

      {/* 9. CONTACT / START PROJECT SECTION */}
      <section id="contact" className="py-24 border-t border-[#202020] bg-[#000000] relative">
        {/* Glow blob behind form */}
        <div className="blob blob-primary bottom-0 start-1/2 -translate-x-1/2 opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text description */}
            <div className="lg:col-span-5 text-start">
              <span className="text-xs font-bold text-[#a0a0a0] uppercase tracking-wider mb-2 block">
                {isFa ? 'با ما همکاری کنید' : 'Collaborate With Us'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {dict.contact.title}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#c0c0c0] leading-relaxed font-medium">
                {dict.contact.subtitle}
              </p>
              
              <div className="mt-8 p-6 rounded-2xl border border-[#303030] bg-[#101010] max-w-md">
                <span className="text-sm font-bold text-[#e0e0e0] block mb-2">
                  {isFa ? 'زمان پاسخگویی تیم ما' : 'Our Response Time'}
                </span>
                <p className="text-xs text-[#c0c0c0] leading-relaxed font-medium">
                  {isFa 
                    ? 'ما درخواست‌های جدید پروژه را ظرف مدت کمتر از ۲۴ ساعت کاری بررسی کرده و برای قرار هماهنگی اولیه با شما تماس می‌گیریم.' 
                    : 'We review project inquiries within 24 business hours to arrange our initial consulting session.'
                  }
                </p>
              </div>

              {/* Direct Quick Contact Buttons (WhatsApp, Email, Telegram) */}
              <div className="mt-6 flex flex-col gap-3 max-w-md">
                <a
                  href="https://wa.me/491624212685"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-bold text-xs sm:text-sm transition-all shadow-md group"
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp: +49 162 4212685</span>
                </a>

                <a
                  href="https://t.me/B_lack090"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#0088cc]/40 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 text-[#0088cc] font-bold text-xs sm:text-sm transition-all shadow-md group"
                >
                  <Send className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Telegram: @B_lack090</span>
                </a>

                <a
                  href="mailto:nazifyosufi072@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#7C3AED]/40 bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 text-cyan-200 font-bold text-xs sm:text-sm transition-all shadow-md group"
                >
                  <Mail className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform text-[#06B6D4]" />
                  <span>Email: nazifyosufi072@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Form component */}
            <div className="lg:col-span-7">
              <ContactForm lang={lang} dict={dict} />
            </div>

          </div>
        </div>
      </section>

      {/* 10. DYNAMIC CALL TO ACTION (BEFORE FOOTER) */}
      <section className="py-20 bg-[#101010] relative overflow-hidden border-t border-[#202020]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
          <AnimatedSection y={20} className="flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
              {isFa ? 'آماده‌اید ایده خود را به یک نرم‌افزار واقعی تبدیل کنید؟' : 'Ready to turn your idea into a real digital product?'}
            </h3>
            <p className="text-[#c0c0c0] mt-4 text-sm sm:text-base max-w-xl font-medium">
              {isFa 
                ? 'با متخصصین ما مشورت کنید و محصول نرم‌افزاری اختصاصی خود را بسازید.' 
                : 'Consult with our engineering team and build your custom digital solutions.'
              }
            </p>
            <Link
              href={`/${lang}#contact`}
              className="mt-8 px-8 py-4 rounded-2xl font-extrabold text-white bg-[#404040] hover:bg-[#505050] border border-[#505050] shadow-xl shadow-[#404040]/30 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              {isFa ? 'شروع مشاوره رایگان' : 'Start Free Consultation'}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
