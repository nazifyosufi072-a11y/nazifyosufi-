import AnimatedSection from '@/components/AnimatedSection';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function TermsOfServicePage({ params }: PageProps) {
  const { lang } = await params;
  const isFa = lang === 'fa';

  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-start bg-[#F7F4EE]">
      <AnimatedSection y={20}>
        <h1 className="text-3xl font-extrabold text-[#1C1917] mb-8 border-b border-[#D8CBB8] pb-4">
          {isFa ? 'شرایط استفاده از خدمات آرتین تیم' : 'Artin Team Terms of Service'}
        </h1>
        
        <div className="space-y-6 text-sm text-[#57534E] leading-relaxed">
          {isFa ? (
            <>
              <p>
                به وب‌سایت آرتین تیم خوش آمدید. با دسترسی به این وب‌سایت، شما موافقت خود را با شرایط و ضوابط زیر اعلام می‌دارید. لطفاً آن‌ها را به دقت مطالعه فرمایید.
              </p>
              <h2 className="text-lg font-bold text-[#1C1917] mt-8">۱. مالکیت معنوی</h2>
              <p>
                کلیه محتویات، طرح‌ها، کدهای منبع، تصاویر و لوگوهای موجود در این وب‌سایت متعلق به آرتین تیم بوده و تحت حمایت قوانین مالکیت معنوی قرار دارد. هرگونه کپی‌برداری یا استفاده تجاری بدون اجازه مکتوب ممنوع می‌باشد.
              </p>
              <h2 className="text-lg font-bold text-[#1C1917] mt-8">۲. توافق‌نامه توسعه نرم‌افزار</h2>
              <p>
                ارائه هرگونه خدمات توسعه نرم‌افزار یا راه‌حل‌های دیجیتال توسط آرتین تیم منوط به امضای قرارداد اختصاصی همکاری فیمابین و تعیین محدوده کاری، هزینه و تعهدات زمانی مشخص خواهد بود.
              </p>
              <h2 className="text-lg font-bold text-[#1C1917] mt-8">۳. تغییرات در شرایط</h2>
              <p>
                آرتین تیم حق اعمال تغییرات در این شرایط را در هر زمان بدون اطلاع قبلی برای خود محفوظ می‌دارد. استفاده مداوم شما از سایت به معنی پذیرش هرگونه تغییر در این سند است.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to the Artin Team website. By accessing or using this site, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
              </p>
              <h2 className="text-lg font-bold text-[#1C1917] mt-8">1. Intellectual Property</h2>
              <p>
                All contents, custom designs, source codes, images, and logos present on this website are the intellectual property of Artin Team and are protected by international copyright laws. Any duplication or unauthorized commercial use is strictly prohibited.
              </p>
              <h2 className="text-lg font-bold text-[#1C1917] mt-8">2. Development Agreements</h2>
              <p>
                All software engineering and digital services delivered by Artin Team require a separate, mutually signed contract specifying the scope of work, pricing, deliverables, and timelines.
              </p>
              <h2 className="text-lg font-bold text-[#1C1917] mt-8">3. Modifications</h2>
              <p>
                Artin Team reserves the right to amend these terms and conditions at any time without notice. Continued use of this website signifies your acceptance of any revisions made.
              </p>
            </>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
