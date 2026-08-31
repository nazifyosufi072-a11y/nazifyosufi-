-- ====================================================================
-- ARTIN TEAM — SUPABASE POSTGRESQL INITIALIZATION & SEED SCRIPT
-- Run this entire script in your Supabase Project -> SQL Editor
-- ====================================================================

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "username" TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Service" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "titleFa" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionFa" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Technology" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "category" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Project" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "titleFa" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionFa" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "contentFa" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,
    "categoryFa" TEXT NOT NULL,
    "categoryEn" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "demoUrl" TEXT,
    "githubUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "challengeFa" TEXT,
    "challengeEn" TEXT,
    "solutionFa" TEXT,
    "solutionEn" TEXT,
    "featuresFa" TEXT,
    "featuresEn" TEXT,
    "resultsFa" TEXT,
    "resultsEn" TEXT,
    "technologies" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Experience" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "organizationFa" TEXT NOT NULL,
    "organizationEn" TEXT NOT NULL,
    "positionFa" TEXT NOT NULL,
    "positionEn" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "descriptionFa" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "achievementsFa" TEXT,
    "achievementsEn" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Certificate" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "nameFa" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "issuerFa" TEXT NOT NULL,
    "issuerEn" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "descriptionFa" TEXT,
    "descriptionEn" TEXT,
    "verificationUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Testimonial" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "nameFa" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "clientImage" TEXT,
    "companyFa" TEXT,
    "companyEn" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "testimonialFa" TEXT NOT NULL,
    "testimonialEn" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Message" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "projectType" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "SiteSetting" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "key" TEXT NOT NULL UNIQUE,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Seed Default Admin User (Password: 2010)
INSERT INTO "User" ("username", "passwordHash")
VALUES ('admin', '$2b$10$Q7wE630Hn1oXgC/2ZtP6ueXjXm6LgR4R8nO0iN5Hwz1nE9J8N1fE2')
ON CONFLICT ("username") DO UPDATE SET "passwordHash" = EXCLUDED."passwordHash";

-- 3. Seed Default Services
INSERT INTO "Service" ("id", "titleFa", "titleEn", "descriptionFa", "descriptionEn", "icon", "order")
VALUES 
('srv-1', 'توسعه فرانت‌اند (Frontend)', 'Frontend Development', 'طراحی و توسعه رابط‌های کاربری مدرن، واکنش‌گرا و سریع با استفاده از React و Next.js.', 'Design and development of modern, responsive, and fast user interfaces using React and Next.js.', 'Layout', 1),
('srv-2', 'توسعه بک‌اند (Backend)', 'Backend Development', 'ساخت سرورهای مقیاس‌پذیر، سیستم‌های احراز هویت امن و معماری پایگاه داده پیشرفته.', 'Building scalable servers, secure authentication systems, and advanced database architectures.', 'Server', 2),
('srv-3', 'توسعه پایگاه داده', 'Database Engineering', 'طراحی، بهینه‌سازی و مدیریت پایگاه‌های داده رابطه‌ای و غیررابطه‌ای مانند PostgreSQL و MongoDB.', 'Designing, optimizing, and managing relational and non-relational databases like PostgreSQL and MongoDB.', 'Database', 3),
('srv-4', 'طراحی پنل مدیریت اختصاصی', 'Custom Admin Panels', 'توسعه پنل‌های مدیریتی قدرتمند برای کنترل کامل روی محتوا، کاربران و آمارهای سیستم.', 'Development of powerful admin dashboards for full control over content, users, and system analytics.', 'Settings', 4),
('srv-5', 'توسعه فول‌استک (Full-Stack)', 'Full-Stack Development', 'ارائه راه‌حل‌های سرتاسری و یکپارچه از ایده اولیه و رابط کاربری تا پایگاه داده و استقرار.', 'Providing end-to-end integrated solutions from initial concept and UI to database and deployment.', 'Cpu', 5),
('srv-6', 'تولید نرم‌افزار سفارشی', 'Custom Software Development', 'توسعه سیستم‌های نرم‌افزاری اختصاصی و منطبق با نیازهای منحصربه‌فرد کسب‌وکار شما.', 'Development of dedicated software systems aligned with the unique needs of your business.', 'Code', 6)
ON CONFLICT ("id") DO NOTHING;

-- 4. Seed Default Technologies
INSERT INTO "Technology" ("id", "name", "category", "order")
VALUES
('tech-1', 'HTML', 'frontend', 1),
('tech-2', 'CSS', 'frontend', 2),
('tech-3', 'JavaScript', 'frontend', 3),
('tech-4', 'TypeScript', 'frontend', 4),
('tech-5', 'React', 'frontend', 5),
('tech-6', 'Next.js', 'frontend', 6),
('tech-7', 'Tailwind CSS', 'frontend', 7),
('tech-8', 'Framer Motion', 'frontend', 8),
('tech-9', 'Node.js', 'backend', 9),
('tech-10', 'Express', 'backend', 10),
('tech-11', 'NestJS', 'backend', 11),
('tech-12', 'Python', 'backend', 12),
('tech-13', 'PHP', 'backend', 13),
('tech-14', 'PostgreSQL', 'database', 14),
('tech-15', 'MongoDB', 'database', 15),
('tech-16', 'Prisma ORM', 'database', 16),
('tech-17', 'Git', 'tools', 17),
('tech-18', 'Docker', 'tools', 18)
ON CONFLICT ("id") DO NOTHING;

-- 5. Seed Default Projects
INSERT INTO "Project" ("id", "titleFa", "titleEn", "descriptionFa", "descriptionEn", "contentFa", "contentEn", "categoryFa", "categoryEn", "image", "demoUrl", "githubUrl", "featured", "order", "challengeFa", "challengeEn", "solutionFa", "solutionEn", "featuresFa", "featuresEn", "resultsFa", "resultsEn", "technologies")
VALUES
('proj-1', 'سیستم جامع مدیریت منابع سازمانی (ERP) آرتین', 'Artin Enterprise Resource Planning (ERP)', 'یک سیستم یکپارچه برای مدیریت مالی، انبارداری، منابع انسانی و فروشگاه کسب‌وکارهای متوسط و بزرگ.', 'An integrated system for financial management, inventory tracking, HR, and sales for medium to large enterprises.', 'این پروژه یک سیستم ERP جامع و بومی‌سازی شده است که تمام فرآیندهای تجاری یک سازمان را در یک بستر متمرکز مدیریت می‌کند.', 'This project is a comprehensive and localized ERP system that manages all business processes of an organization within a centralized platform.', 'برنامه تحت وب', 'Web Application', '/images/project-erp.jpg', 'https://erp.artin.team', 'https://github.com/artin-team/artin-erp', true, 1, 'مدیریت دقیق تراکنش‌های همزمان مالی بالا و همگام‌سازی لحظه‌ای موجودی انبار بدون بروز مغایرت در شرایط اینترنت ضعیف.', 'Managing highly concurrent financial transactions and real-time inventory synchronization without discrepancies under poor network conditions.', 'استفاده از سیستم صف‌بندی کارها با Redis، بهینه‌سازی کوئری‌های پایگاه داده PostgreSQL، و طراحی سیستم کشینگ هوشمند چندلایه.', 'Utilizing Redis job queuing, optimizing PostgreSQL database queries, and designing a multi-layer smart caching system.', E'حسابداری پیشرفته و چندارزی\nسیستم خودکار مدیریت انبار\nگزارش‌دهی هوشمند و نموداری\nپنل اختصاصی مدیریت پرسنل', E'Advanced multi-currency accounting\nAutomated inventory management system\nSmart visual reporting and charts\nDedicated personnel management panel', 'کاهش ۴۰ درصدی زمان فرآیندهای مالی و انبارداری و افزایش ۳۰ درصدی بهره‌وری کارکنان در نخستین ماه بهره‌برداری.', '40% reduction in financial and inventory process times and 30% increase in employee productivity in the first month of operation.', 'Next.js, Node.js, PostgreSQL, Prisma ORM, Tailwind CSS'),
('proj-2', 'پلتفرم تجارت الکترونیک آریا مارکت', 'Aria Market E-Commerce Platform', 'یک فروشگاه اینترنتی فوق‌العاده سریع، واکنش‌گرا و دو زبانه با درگاه‌های پرداخت بین‌المللی و محلی.', 'An ultra-fast, responsive, and bilingual online store featuring international and local payment gateway integrations.', 'پلتفرم تجارت الکترونیک آریا مارکت با تمرکز بر عملکرد عالی و تجربه کاربری (UX) مدرن طراحی شده است.', 'Aria Market e-commerce platform is designed with a focus on high performance and modern user experience (UX).', 'فروشگاه الکترونیکی', 'E-Commerce', '/images/project-ecommerce.jpg', 'https://market.artin.team', 'https://github.com/artin-team/aria-market', true, 2, 'نیاز به سرعت بالا در بارگذاری اولیه صفحات محصولات و سئوی عالی برای رقابت در نتایج موتورهای جستجو.', 'The requirement for high speed during initial product page loads and stellar SEO to rank on search engine result pages.', 'پیاده‌سازی تولید صفحات به صورت ایستا (SSR / ISR) در Next.js، بهینه‌سازی خودکار تصاویر و ساختار معنایی HTML.', 'Implementing Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) in Next.js, combined with image optimization and semantic HTML structure.', E'فیلتر هوشمند محصولات بر اساس ویژگی‌ها\nدرگاه‌های پرداخت بومی و بین‌المللی\nسیستم کیف پول مشتریان\nپنل مدیریت پیشرفته فروشندگان', E'Smart attribute-based product filtering\nLocal and international payment gateways\nCustomer digital wallet system\nAdvanced vendor management portal', 'ثبت لود اولیه زیر ۱.۵ ثانیه و کسب رتبه ۹۵+ در ابزار Lighthouse گوگل.', 'Achieving sub-1.5 second initial load times and a 95+ score on Google Lighthouse.', 'Next.js, TypeScript, Express, MongoDB, Tailwind CSS, Framer Motion')
ON CONFLICT ("id") DO NOTHING;

-- 6. Seed Default Experiences
INSERT INTO "Experience" ("id", "organizationFa", "organizationEn", "positionFa", "positionEn", "startDate", "endDate", "descriptionFa", "descriptionEn", "achievementsFa", "achievementsEn", "order")
VALUES
('exp-1', 'تیم توسعه آرتین (Artin Team)', 'Artin Team', 'تیم نرم‌افزاری و راه‌حل‌های دیجیتال', 'Software & Digital Solutions Agency', '۱۳۹۹', 'اکنون', 'ارائه راه‌حل‌های نرم‌افزاری باکیفیت و کلاس جهانی به مشتریان داخلی و بین‌المللی.', 'Delivering high-quality, world-class software solutions to local and international clients.', E'طراحی و پیاده‌سازی بیش از ۲۰ پروژه موفق کشوری و منطقه‌ای\nتوسعه سیستم‌های مقیاس‌پذیر با معماری مدرن و امنیت بالا\nکسب رضایتمندی ۹۸ درصدی از مشتریان', E'Designed and deployed 20+ successful national and regional projects\nDeveloped highly scalable systems with modern architecture and top-tier security\nMaintained a 98% client satisfaction rate', 1),
('exp-2', 'شرکت فناوری ارتباطات افغان‌ وب', 'AfghanWeb Communications', 'شریک تجاری و مشاور ارشد توسعه دهنده', 'Technical Partner & Lead Consultant', '۱۳۹۷', '۱۳۹۹', 'همکاری در زمینه طراحی زیرساخت پورتال‌های دولتی و سازمانی کشور.', 'Partnered in designing the core infrastructure for national governmental and organizational portals.', E'بازنویسی کدهای پورتال‌های قدیمی و افزایش ۳ برابری سرعت لود\nطراحی اولین دیتابیس توزیع‌شده برای ثبت احوال نفوس کشور', E'Refactored legacy portal codebases resulting in a 3x speed increase\nDesigned the first distributed database structure for national population registers', 2)
ON CONFLICT ("id") DO NOTHING;

-- 7. Seed Default Certificates
INSERT INTO "Certificate" ("id", "nameFa", "nameEn", "issuerFa", "issuerEn", "date", "imageUrl", "descriptionFa", "descriptionEn", "verificationUrl", "order")
VALUES
('cert-1', 'مبانی سخت‌افزار کامپیوتر', 'Computer Hardware Basics', 'آکادمی شبکه سیسکو (Cisco)', 'Cisco Networking Academy', '2024', '/images/cert-hardware.png', 'گواهینامه رسمی و بین‌المللی مبانی و معماری سخت‌افزار کامپیوتر از آکادمی سیسکو، شامل مهارت‌های شناخت و پیکربندی قطعات، عیب‌یابی و نگهداری سیستم‌های کامپیوتری.', 'Official credential from Cisco Networking Academy validating comprehensive understanding of computer hardware architecture, component troubleshooting, and foundational system configuration.', 'https://www.credly.com/users/nazif-yosufi.51d7d78c', 1),
('cert-2', 'تخصص رسمی توسعه پیشرفته با Next.js', 'Official Advanced Next.js Developer Certification', 'آکادمی وب ورسل', 'Vercel Web Academy', '۲۰۲۳', '/images/cert-nextjs.jpg', 'مدرک تخصصی در زمینه بهینه‌سازی کارایی، رندرینگ سمت سرور و بهینه‌سازی موتورهای جستجو با فریمورک Next.js.', 'Specialized credential focusing on performance optimization, server-side rendering, and SEO in the Next.js framework.', 'https://verify.example.org/cert/67890', 2)
ON CONFLICT ("id") DO NOTHING;

-- 8. Seed Default Site Settings
INSERT INTO "SiteSetting" ("key", "value")
VALUES
('site_name', 'Artin Team | آرتین تیم'),
('contact_email', 'nazifyosufi072@gmail.com'),
('contact_phone', '+49 162 4212685'),
('contact_address_fa', 'هرات، افغانستان'),
('contact_address_en', 'Herat, Afghanistan'),
('social_github', 'https://github.com/nazifyosufi072-a11y'),
('social_telegram', 'https://t.me/B_lack090'),
('social_whatsapp', 'https://wa.me/491624212685'),
('hero_title_fa', 'ایده‌های شما. تخصص ما. توسعه نرم‌افزارهای مقیاس‌پذیر.'),
('hero_title_en', 'Your Ideas. Our Expertise. Scalable Software Solutions.'),
('hero_description_fa', 'تیم آرتین با بکارگیری به‌روزترین فناوری‌های وب، نرم‌افزارهای سفارشی، پنل‌های مدیریتی قدرتمند و پلتفرم‌های دیجیتال بی‌نقص و امن را برای کسب‌وکار شما توسعه می‌دهد.'),
('hero_description_en', 'Artin Team utilizes the latest web technologies to design and develop custom software, robust administration dashboards, and secure digital platforms tailor-made for your enterprise.'),
('about_story_fa', 'تیم آرتین کار خود را با گروهی از مهندسان باانگیزه آغاز کرد. هدف ما پر کردن خلاء موجود در زمینه تولید نرم‌افزارهای اختصاصی با استانداردهای جهانی بوده است. ما بر این باوریم که هر کسب‌وکاری شایسته داشتن ابزارهای نرم‌افزاری دقیق، باکیفیت و سریع است.'),
('about_story_en', 'Artin Team was founded by a group of passionate engineers. Our goal has always been to bridge the gap in custom software development with global standards. We believe every business deserves precise, high-quality, and fast software tools.'),
('about_mission_fa', 'ماموریت ما توانمندسازی کسب‌وکارها از طریق طراحی و ساخت راه‌حل‌های دیجیتالی پایدار، ایمن و مقیاس‌پذیر است.'),
('about_mission_en', 'Our mission is to empower businesses through the design and construction of sustainable, secure, and scalable digital solutions.'),
('about_vision_fa', 'تبدیل شدن به برترین آژانس توسعه نرم‌افزار در منطقه و تسهیل ورود کسب‌وکارهای سنتی به دنیای مدرن فناوری اطلاعات.'),
('about_vision_en', 'To become the premier software development agency in the region, facilitating the digital transformation of traditional enterprises.'),
('seo_title_fa', 'تیم توسعه نرم‌افزار آرتین | طراحی سایت و نرم‌افزار سفارشی'),
('seo_title_en', 'Artin Team | Software Engineering & Web Development Agency'),
('seo_description_fa', 'آرتین تیم متخصص در ساخت برنامه‌های تحت وب، فرانت‌اند و بک‌اند، سیستم‌های مدیریت محتوا، پنل‌های مدیریت و نرم‌افزارهای اختصاصی دو زبانه.'),
('seo_description_en', 'Artin Team specializes in custom web applications, backend engineering, CMS, admin portals, and multi-language enterprise digital products.')
ON CONFLICT ("key") DO UPDATE SET "value" = EXCLUDED."value";
