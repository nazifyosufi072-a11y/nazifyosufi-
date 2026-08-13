import { prisma } from '@/lib/db';
import { getDictionary } from '@/lib/dictionary';

export const dynamic = 'force-dynamic';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Terminal, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface ProjectDetailsPageProps {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateMetadata({ params }: ProjectDetailsPageProps) {
  const { lang, id } = await params;
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return { title: 'Project Not Found' };
    const title = lang === 'fa' ? project.titleFa : project.titleEn;
    const description = lang === 'fa' ? project.descriptionFa : project.descriptionEn;
    return { title: `${title} | Artin Team`, description };
  } catch {
    return { title: 'Project | Artin Team' };
  }
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);
  const isFa = lang === 'fa';

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  const title = isFa ? project.titleFa : project.titleEn;
  const description = isFa ? project.descriptionFa : project.descriptionEn;
  const category = isFa ? project.categoryFa : project.categoryEn;
  const content = isFa ? project.contentFa : project.contentEn;
  
  const challenge = isFa ? project.challengeFa : project.challengeEn;
  const solution = isFa ? project.solutionFa : project.solutionEn;
  const results = isFa ? project.resultsFa : project.resultsEn;
  
  const featuresRaw = isFa ? project.featuresFa : project.featuresEn;
  const featuresList = featuresRaw ? featuresRaw.split('\n').filter(Boolean) : [];
  const techList = project.technologies.split(',').map(t => t.trim());

  return (
    <div className="relative w-full py-16 grid-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-8 text-start">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 text-sm font-semibold text-slate-600 dark:text-slate-450 transition-colors"
          >
            {isFa ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isFa ? 'بازگشت به خانه' : 'Back to Home'}</span>
          </Link>
        </div>

        {/* Hero Meta Card */}
        <AnimatedSection delay={0.05} className="mb-12 text-start">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
            {category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.2]">
            {title}
          </h1>
          <p className="text-lg text-slate-300 mt-4 leading-relaxed max-w-2xl font-medium">
            {description}
          </p>

          {/* Project cover placeholder */}
          <div className="relative aspect-video w-full rounded-3xl border border-slate-800 bg-slate-950/80 flex items-center justify-center p-8 mt-10 overflow-hidden">
            <Terminal className="w-24 h-24 text-slate-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"></div>
          </div>
        </AnimatedSection>

        {/* Project detail grid layout */}
        <div className="grid grid-cols-1 gap-8 text-start">
          
          {/* Overview */}
          <AnimatedSection delay={0.1} className="p-8 sm:p-10 rounded-3xl border border-slate-800 bg-slate-900/40">
            <h3 className="text-xl font-bold text-white mb-4">
              {dict.projects.details.overview}
            </h3>
            <p className="text-base leading-relaxed text-slate-300">
              {content}
            </p>
          </AnimatedSection>

          {/* Split grid for challenge & solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenge && (
              <AnimatedSection delay={0.15} className="p-8 rounded-3xl border border-slate-800 bg-slate-900/40">
                <h4 className="text-base font-bold text-red-400 mb-3 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 flex-shrink-0" />
                  <span>{dict.projects.details.challenge}</span>
                </h4>
                <p className="text-sm leading-relaxed text-slate-300">
                  {challenge}
                </p>
              </AnimatedSection>
            )}

            {solution && (
              <AnimatedSection delay={0.2} className="p-8 rounded-3xl border border-slate-800 bg-slate-900/40">
                <h4 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{dict.projects.details.solution}</span>
                </h4>
                <p className="text-sm leading-relaxed text-slate-300">
                  {solution}
                </p>
              </AnimatedSection>
            )}
          </div>

          {/* Features */}
          {featuresList.length > 0 && (
            <AnimatedSection delay={0.25} className="p-8 sm:p-10 rounded-3xl border border-slate-800 bg-slate-900/40">
              <h3 className="text-xl font-bold text-white mb-6">
                {dict.projects.details.features}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuresList.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          )}

          {/* Results */}
          {results && (
            <AnimatedSection delay={0.3} className="p-8 sm:p-10 rounded-3xl border border-slate-800 bg-slate-900/50">
              <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-slate-300" />
                <span>{dict.projects.details.results}</span>
              </h3>
              <p className="text-base leading-relaxed text-slate-300">
                {results}
              </p>
            </AnimatedSection>
          )}

          {/* Sidebar Specs (Tech & Links) */}
          <AnimatedSection delay={0.35} className="p-8 sm:p-10 rounded-3xl border border-slate-800 bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-3">
                {dict.projects.details.techUsed}
              </span>
              <div className="flex flex-wrap gap-2">
                {techList.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-medium text-slate-300 bg-slate-950/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-extrabold text-slate-950 bg-slate-200 hover:bg-white transition-colors shadow-md shadow-slate-200/10"
                >
                  <span>{dict.projects.liveDemo}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                >
                  <span>{dict.projects.github}</span>
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}
