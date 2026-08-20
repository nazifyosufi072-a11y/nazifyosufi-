import AnimatedSection from '@/components/AnimatedSection';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { lang } = await params;
  const isFa = lang === 'fa';

  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-start bg-[#F7F4EE]">
      <AnimatedSection y={20}>
        <h1 className="text-3xl font-extrabold text-[#1C1917] mb-8 border-b border-[#D8CBB8] pb-4">
          {isFa ? 'سیاست حریم خصوصی آرتین تیم' : 'Artin Team Privacy Policy'}
        </h1>
        
        <div className="space-y-6 text-sm text-[#57534E] leading-relaxed">
          {isFa ? (
            <>
              <p>
                در آرتین تیم، حریم خصوصی بازدیدکنندگان و مشتریان ما از اهمیت بسیار بالایی برخوردار است. این سند حریم خصوصی توضیح می‌دهد که چه نوع اطلاعات شخصی توسط آرتین تیم دریافت و ثبت می‌شود و چگونه از آن استفاده می‌گردد.
              </p>
              <h2 className="text-lg font-bold text-[#1C1917] mt-8">۱. اطلاعاتی که جمع‌آوری می‌کنیم</h2>
              <p>
                ما اطلاعات ارائه شده توسط شما را هنگام ارسال فرم‌های تماس یا ثبت سفارش جمع‌آوری می‌کنیم. این اطلاعات شامل نام، آدرس ایمیل، شماره تلفن و جزئیات مربوط به پروژه پیشنهادی شما است.
              </p>
              <h2 className="text-lg font-bold text-[#1C1917] mt-8">۲. استفاده از اطلاعات</h2>
              <p>
                هر یک از اطلاعاتی که ما از شما جمع‌آوری می‌کنیم ممکن است برای اهداف زیر استفاده شود:
              </p>
              <ul className="list-disc ps-6 space-y-1.5 mt-2">
                <li>پاسخ به سوالات یا پیشنهادهای مربوط به پروژه شما.</li>
                <li>بهبود مستمر وب‌سایت و خدمات ما بر اساس بازخوردهای دریافتی.</li>
                <li>برقراری ارتباط با شما از طریق ایمیل یا تلفن جهت پیگیری سفارش‌ها.</li>
              </ul>
              <h2 className="text-lg font-bold text-[#1C1917] mt-8">۳. حفاظت از اطلاعات</h2>
              <p>
                ما اقدامات امنیتی مختلفی را برای حفظ ایمنی اطلاعات شخصی شما هنگام ارسال درخواست پیاده‌سازی می‌کنیم. ما اطلاعات شناسایی شخصی شما را به طرف‌های خارجی نمی‌فروشیم، داد و ستد نمی‌کنیم یا به هر شکل دیگری انتقال نمی‌دهیم.
              </p>
            </>
          ) : (
            <>
              <p>
                At Artin Team, the privacy of our visitors and clients is of extreme importance to us. This privacy policy document outlines the types of personal information received and collected by Artin Team and how it is used.
              </p>
              <h2 className="text-lg font-bold text-[#1C1917] mt-8">1. Information We Collect</h2>
              <p>
                We collect information from you when you submit a project inquiry or contact form on our website. This includes your name, email address, phone number, and any details you provide regarding your project.
              </p>
              <h2 className="text-lg font-bold text-[#1C1917] mt-8">2. Use of Information</h2>
              <p>
                Any of the information we collect from you may be used in one of the following ways:
              </p>
              <ul className="list-disc ps-6 space-y-1.5 mt-2">
                <li>To respond to your project queries and provide consults.</li>
                <li>To improve our website services based on your information and feedback.</li>
                <li>To establish communication via email or telephone to follow up on inquiries.</li>
              </ul>
              <h2 className="text-lg font-bold text-[#1C1917] mt-8">3. Information Protection</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.
              </p>
            </>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
