import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Artin Team Database...');

  // 1. Admin User
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || '2010';
  const hashedPassword = bcrypt.hashSync(adminPassword, 10);

  await prisma.user.upsert({
    where: { username: adminUsername },
    update: { passwordHash: hashedPassword },
    create: {
      username: adminUsername,
      passwordHash: hashedPassword,
    },
  });
  console.log('Admin user seeded.');

  // 2. Services
  const services = [
    {
      titleFa: 'توسعه فرانت‌اند (Frontend)',
      titleEn: 'Frontend Development',
      descriptionFa: 'طراحی و توسعه رابط‌های کاربری مدرن، واکنش‌گرا و سریع با استفاده از React و Next.js.',
      descriptionEn: 'Design and development of modern, responsive, and fast user interfaces using React and Next.js.',
      icon: 'Layout',
      order: 1,
    },
    {
      titleFa: 'توسعه بک‌اند (Backend)',
      titleEn: 'Backend Development',
      descriptionFa: 'ساخت سرورهای مقیاس‌پذیر، سیستم‌های احراز هویت امن و معماری پایگاه داده پیشرفته.',
      descriptionEn: 'Building scalable servers, secure authentication systems, and advanced database architectures.',
      icon: 'Server',
      order: 2,
    },
    {
      titleFa: 'توسعه پایگاه داده',
      titleEn: 'Database Engineering',
      descriptionFa: 'طراحی، بهینه‌سازی و مدیریت پایگاه‌های داده رابطه‌ای و غیررابطه‌ای مانند PostgreSQL و MongoDB.',
      descriptionEn: 'Designing, optimizing, and managing relational and non-relational databases like PostgreSQL and MongoDB.',
      icon: 'Database',
      order: 3,
    },
    {
      titleFa: 'طراحی پنل مدیریت اختصاصی',
      titleEn: 'Custom Admin Panels',
      descriptionFa: 'توسعه پنل‌های مدیریتی قدرتمند برای کنترل کامل روی محتوا، کاربران و آمارهای سیستم.',
      descriptionEn: 'Development of powerful admin dashboards for full control over content, users, and system analytics.',
      icon: 'Settings',
      order: 4,
    },
    {
      titleFa: 'توسعه فول‌استک (Full-Stack)',
      titleEn: 'Full-Stack Development',
      descriptionFa: 'ارائه راه‌حل‌های سرتاسری و یکپارچه از ایده اولیه و رابط کاربری تا پایگاه داده و استقرار.',
      descriptionEn: 'Providing end-to-end integrated solutions from initial concept and UI to database and deployment.',
      icon: 'Cpu',
      order: 5,
    },
    {
      titleFa: 'تولید نرم‌افزار سفارشی',
      titleEn: 'Custom Software Development',
      descriptionFa: 'توسعه سیستم‌های نرم‌افزاری اختصاصی و منطبق با نیازهای منحصربه‌فرد کسب‌وکار شما.',
      descriptionEn: 'Development of dedicated software systems aligned with the unique needs of your business.',
      icon: 'Code',
      order: 6,
    },
  ];

  await prisma.service.deleteMany();
  for (const service of services) {
    await prisma.service.create({ data: service });
  }
  console.log('Services seeded.');

  // 3. Technologies
  const technologies = [
    { name: 'HTML', category: 'frontend', order: 1 },
    { name: 'CSS', category: 'frontend', order: 2 },
    { name: 'JavaScript', category: 'frontend', order: 3 },
    { name: 'TypeScript', category: 'frontend', order: 4 },
    { name: 'React', category: 'frontend', order: 5 },
    { name: 'Next.js', category: 'frontend', order: 6 },
    { name: 'Tailwind CSS', category: 'frontend', order: 7 },
    { name: 'Framer Motion', category: 'frontend', order: 8 },
    { name: 'Node.js', category: 'backend', order: 9 },
    { name: 'Express', category: 'backend', order: 10 },
    { name: 'NestJS', category: 'backend', order: 11 },
    { name: 'Python', category: 'backend', order: 12 },
    { name: 'PHP', category: 'backend', order: 13 },
    { name: 'PostgreSQL', category: 'database', order: 14 },
    { name: 'MongoDB', category: 'database', order: 15 },
    { name: 'Prisma ORM', category: 'database', order: 16 },
    { name: 'Git', category: 'tools', order: 17 },
    { name: 'Docker', category: 'tools', order: 18 },
  ];

  await prisma.technology.deleteMany();
  for (const tech of technologies) {
    await prisma.technology.create({ data: tech });
  }
  console.log('Technologies seeded.');

  // 4. Projects
  const projects = [
    {
      titleFa: 'سیستم جامع مدیریت منابع سازمانی (ERP) آرتین',
      titleEn: 'Artin Enterprise Resource Planning (ERP)',
      descriptionFa: 'یک سیستم یکپارچه برای مدیریت مالی، انبارداری، منابع انسانی و فروشگاه کسب‌وکارهای متوسط و بزرگ.',
      descriptionEn: 'An integrated system for financial management, inventory tracking, HR, and sales for medium to large enterprises.',
      contentFa: 'این پروژه یک سیستم ERP جامع و بومی‌سازی شده است که تمام فرآیندهای تجاری یک سازمان را در یک بستر متمرکز مدیریت می‌کند. این سیستم شامل زیرسیستم‌های حسابداری چندارزی، مدیریت زنجیره تامین، پرونده پرسنلی الکترونیکی، و پنل تحلیل داده پیشرفته است.',
      contentEn: 'This project is a comprehensive and localized ERP system that manages all business processes of an organization within a centralized platform. It includes multi-currency accounting, supply chain management, electronic employee files, and an advanced analytics dashboard.',
      categoryFa: 'برنامه تحت وب',
      categoryEn: 'Web Application',
      image: '/images/project-erp.jpg',
      demoUrl: 'https://erp.artin.team',
      githubUrl: 'https://github.com/artin-team/artin-erp',
      featured: true,
      order: 1,
      challengeFa: 'مدیریت دقیق تراکنش‌های همزمان مالی بالا و همگام‌سازی لحظه‌ای موجودی انبار بدون بروز مغایرت در شرایط اینترنت ضعیف.',
      challengeEn: 'Managing highly concurrent financial transactions and real-time inventory synchronization without discrepancies under poor network conditions.',
      solutionFa: 'استفاده از سیستم صف‌بندی کارها با Redis، بهینه‌سازی کوئری‌های پایگاه داده PostgreSQL، و طراحی سیستم کشینگ هوشمند چندلایه.',
      solutionEn: 'Utilizing Redis job queuing, optimizing PostgreSQL database queries, and designing a multi-layer smart caching system.',
      featuresFa: 'حسابداری پیشرفته و چندارزی\nسیستم خودکار مدیریت انبار\nگزارش‌دهی هوشمند و نموداری\nپنل اختصاصی مدیریت پرسنل',
      featuresEn: 'Advanced multi-currency accounting\nAutomated inventory management system\nSmart visual reporting and charts\nDedicated personnel management panel',
      resultsFa: 'کاهش ۴۰ درصدی زمان فرآیندهای مالی و انبارداری و افزایش ۳۰ درصدی بهره‌وری کارکنان در نخستین ماه بهره‌برداری.',
      resultsEn: '40% reduction in financial and inventory process times and 30% increase in employee productivity in the first month of operation.',
      technologies: 'Next.js, Node.js, PostgreSQL, Prisma ORM, Tailwind CSS',
    },
    {
      titleFa: 'پلتفرم تجارت الکترونیک آریا مارکت',
      titleEn: 'Aria Market E-Commerce Platform',
      descriptionFa: 'یک فروشگاه اینترنتی فوق‌العاده سریع، واکنش‌گرا و دو زبانه با درگاه‌های پرداخت بین‌المللی و محلی.',
      descriptionEn: 'An ultra-fast, responsive, and bilingual online store featuring international and local payment gateway integrations.',
      contentFa: 'پلتفرم تجارت الکترونیک آریا مارکت با تمرکز بر عملکرد عالی و تجربه کاربری (UX) مدرن طراحی شده است. از ویژگی‌های آن می‌توان به جستجوی پیشرفته متنی با سرعت میلی‌ثانیه، سیستم پیشرفته سبد خرید آفلاین و پنل ادمین فوق حرفه‌ای اشاره کرد.',
      contentEn: 'Aria Market e-commerce platform is designed with a focus on high performance and modern user experience (UX). Key features include millisecond text-search, offline cart management, and a highly professional admin control center.',
      categoryFa: 'فروشگاه الکترونیکی',
      categoryEn: 'E-Commerce',
      image: '/images/project-ecommerce.jpg',
      demoUrl: 'https://market.artin.team',
      githubUrl: 'https://github.com/artin-team/aria-market',
      featured: true,
      order: 2,
      challengeFa: 'نیاز به سرعت بالا در بارگذاری اولیه صفحات محصولات و سئوی عالی برای رقابت در نتایج موتورهای جستجو.',
      challengeEn: 'The requirement for high speed during initial product page loads and stellar SEO to rank on search engine result pages.',
      solutionFa: 'پیاده‌سازی تولید صفحات به صورت ایستا (SSR / ISR) در Next.js، بهینه‌سازی خودکار تصاویر و ساختار معنایی HTML.',
      solutionEn: 'Implementing Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) in Next.js, combined with image optimization and semantic HTML structure.',
      featuresFa: 'فیلتر هوشمند محصولات بر اساس ویژگی‌ها\nدرگاه‌های پرداخت بومی و بین‌المللی\nسیستم کیف پول مشتریان\nپنل مدیریت پیشرفته فروشندگان',
      featuresEn: 'Smart attribute-based product filtering\nLocal and international payment gateways\nCustomer digital wallet system\nAdvanced vendor management portal',
      resultsFa: 'ثبت لود اولیه زیر ۱.۵ ثانیه و کسب رتبه ۹۵+ در ابزار Lighthouse گوگل.',
      resultsEn: 'Achieving sub-1.5 second initial load times and a 95+ score on Google Lighthouse.',
      technologies: 'Next.js, TypeScript, Express, MongoDB, Tailwind CSS, Framer Motion',
    },
  ];

  await prisma.project.deleteMany();
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log('Projects seeded.');

  // 5. Experience
  const experiences = [
    {
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

  await prisma.experience.deleteMany();
  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log('Experiences seeded.');

  // 6. Certificates
  const certificates = [
    {
      nameFa: 'مدرک بین‌المللی معماری سیستم‌های توزیع شده',
      nameEn: 'Certified Distributed Systems Architect',
      issuerFa: 'اتحادیه مهندسی نرم‌افزار آلمان',
      issuerEn: 'German Software Engineering Alliance',
      date: '۲۰۲۴',
      imageUrl: '/images/cert-architect.jpg',
      descriptionFa: 'تاییدیه صلاحیت در طراحی میکروسرویس‌ها، مقیاس‌پذیری پایگاه‌های داده و طراحی سیستم‌های توزیع‌شده.',
      descriptionEn: 'Certification of competency in microservices design, database scaling, and distributed system architectures.',
      verificationUrl: 'https://verify.example.org/cert/12345',
      order: 1,
    },
    {
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

  await prisma.certificate.deleteMany();
  for (const cert of certificates) {
    await prisma.certificate.create({ data: cert });
  }
  console.log('Certificates seeded.');

  // 7. Testimonials
  const testimonials = [
    {
      nameFa: 'مهندس احمد کریمی',
      nameEn: 'Ahmad Karimi, Eng.',
      companyFa: 'مدیرعامل شرکت صادراتی خراسان',
      companyEn: 'CEO of Khorasan Export Co.',
      clientImage: '/images/client-1.jpg',
      rating: 5,
      testimonialFa: 'تیم آرتین فراتر از انتظارات ما ظاهر شد. سیستم مدیریت انباری که برای ما ساختند، کارایی بخش تدارکات ما را دگرگون کرد. تعهد فنی و اخلاق حرفه‌ای این تیم کم‌نظیر است.',
      testimonialEn: 'Artin Team exceeded our expectations. The inventory management system they built transformed our logistics efficiency. The technical competence and professional ethics of this team are unmatched.',
      order: 1,
    },
    {
      nameFa: 'سارا رضایی',
      nameEn: 'Sara Rezaei',
      companyFa: 'مدیر محصول استارتاپ افغان‌تک',
      companyEn: 'Product Manager at AfghanTech Startup',
      clientImage: '/images/client-2.jpg',
      rating: 5,
      testimonialFa: 'پلتفرم فروشگاهی که تیم آرتین توسعه داد، به قدری سریع و روان است که بلافاصله بعد از راه‌اندازی با رشد چشمگیر نرخ تبدیل مشتری مواجه شدیم. پشتیبانی ۲۴ ساعته آن‌ها فوق‌العاده است.',
      testimonialEn: 'The e-commerce platform developed by Artin Team is so fast and smooth that we saw a significant boost in our conversion rates immediately after launch. Their round-the-clock support is outstanding.',
      order: 2,
    },
  ];

  await prisma.testimonial.deleteMany();
  for (const test of testimonials) {
    await prisma.testimonial.create({ data: test });
  }
  console.log('Testimonials seeded.');

  // 8. Site Settings
  const settings = [
    { key: 'site_name', value: 'Artin Team | آرتین تیم' },
    { key: 'contact_email', value: 'info@artin.team' },
    { key: 'contact_phone', value: '+93 799 123 456' },
    { key: 'contact_address_fa', value: 'هرات، جاده ولایت، برج صدف، طبقه ۴' },
    { key: 'contact_address_en', value: 'Floor 4, Sadaf Tower, Wilayat Road, Herat, Afghanistan' },
    { key: 'social_github', value: 'https://github.com/artin-team' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/artin-team' },
    { key: 'social_twitter', value: 'https://twitter.com/artin_team' },
    
    // Hero bilingual settings
    { key: 'hero_title_fa', value: 'ایده‌های شما. تخصص ما. توسعه نرم‌افزارهای مقیاس‌پذیر.' },
    { key: 'hero_title_en', value: 'Your Ideas. Our Expertise. Scalable Software Solutions.' },
    { key: 'hero_description_fa', value: 'تیم آرتین با بکارگیری به‌روزترین فناوری‌های وب، نرم‌افزارهای سفارشی، پنل‌های مدیریتی قدرتمند و پلتفرم‌های دیجیتال بی‌نقص و امن را برای کسب‌وکار شما توسعه می‌دهد.' },
    { key: 'hero_description_en', value: 'Artin Team utilizes the latest web technologies to design and develop custom software, robust administration dashboards, and secure digital platforms tailor-made for your enterprise.' },

    // About bilingual settings
    { key: 'about_story_fa', value: 'تیم آرتین کار خود را با گروهی از مهندسان باانگیزه آغاز کرد. هدف ما پر کردن خلاء موجود در زمینه تولید نرم‌افزارهای اختصاصی با استانداردهای جهانی بوده است. ما بر این باوریم که هر کسب‌وکاری شایسته داشتن ابزارهای نرم‌افزاری دقیق، باکیفیت و سریع است.' },
    { key: 'about_story_en', value: 'Artin Team was founded by a group of passionate engineers. Our goal has always been to bridge the gap in custom software development with global standards. We believe every business deserves precise, high-quality, and fast software tools.' },
    { key: 'about_mission_fa', value: 'ماموریت ما توانمندسازی کسب‌وکارها از طریق طراحی و ساخت راه‌حل‌های دیجیتالی پایدار، ایمن و مقیاس‌پذیر است.' },
    { key: 'about_mission_en', value: 'Our mission is to empower businesses through the design and construction of sustainable, secure, and scalable digital solutions.' },
    { key: 'about_vision_fa', value: 'تبدیل شدن به برترین آژانس توسعه نرم‌افزار در منطقه و تسهیل ورود کسب‌وکارهای سنتی به دنیای مدرن فناوری اطلاعات.' },
    { key: 'about_vision_en', value: 'To become the premier software development agency in the region, facilitating the digital transformation of traditional enterprises.' },

    // SEO settings
    { key: 'seo_title_fa', value: 'تیم توسعه نرم‌افزار آرتین | طراحی سایت و نرم‌افزار سفارشی' },
    { key: 'seo_title_en', value: 'Artin Team | Premium Software Development & Digital Agency' },
    { key: 'seo_description_fa', value: 'آرتین تیم متخصص در ساخت برنامه‌های تحت وب، فرانت‌اند و بک‌اند، سیستم‌های مدیریت محتوا، پنل‌های مدیریت و نرم‌افزارهای اختصاصی دو زبانه.' },
    { key: 'seo_description_en', value: 'Artin Team specializes in building custom web applications, frontend & backend architecture, content management systems, admin portals, and bilingual business systems.' },
  ];

  await prisma.siteSetting.deleteMany();
  for (const setting of settings) {
    await prisma.siteSetting.create({ data: setting });
  }
  console.log('Site Settings seeded.');

  console.log('Artin Team Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
