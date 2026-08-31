import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

const getModel = (resource: string) => {
  const modelMap: Record<string, any> = {
    projects: prisma.project,
    services: prisma.service,
    technologies: prisma.technology,
    experiences: prisma.experience,
    certificates: prisma.certificate,
    testimonials: prisma.testimonial,
    messages: prisma.message,
    settings: prisma.siteSetting,
  };
  return modelMap[resource] || null;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resource: string }> }
) {
  try {
    const { resource } = await params;
    const model = getModel(resource);

    if (!model) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    // Determine default ordering
    let orderBy: any = { createdAt: 'desc' };
    if (['services', 'technologies', 'projects', 'experiences', 'certificates', 'testimonials'].includes(resource)) {
      orderBy = { order: 'asc' };
    }

    try {
      const items = await model.findMany({
        orderBy,
      });
      return NextResponse.json(items);
    } catch (dbErr: any) {
      console.warn(`Database query warning for [${resource}]:`, dbErr.message);
      // Return empty array instead of 500 so admin panel never crashes
      return NextResponse.json([]);
    }
  } catch (err: any) {
    console.error(`GET Resource [${err.message}] error:`, err);
    return NextResponse.json([]);
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ resource: string }> }
) {
  try {
    const { resource } = await params;
    const model = getModel(resource);

    if (!model) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    const body = await request.json();

    // Sanitize common fields
    if ('order' in body) {
      body.order = parseInt(String(body.order), 10) || 0;
    }
    if ('rating' in body) {
      body.rating = parseInt(String(body.rating), 10) || 5;
    }
    if ('featured' in body) {
      body.featured = body.featured === true || body.featured === 'true';
    }
    if ('published' in body) {
      body.published = body.published === true || body.published === 'true';
    }

    // Smart defaults for Certificates
    if (resource === 'certificates') {
      body.nameFa = body.nameFa || body.nameEn || 'گواهینامه';
      body.nameEn = body.nameEn || body.nameFa || 'Certificate';
      body.issuerFa = body.issuerFa || body.issuerEn || 'آکادمی';
      body.issuerEn = body.issuerEn || body.issuerFa || 'Academy';
      body.date = body.date || new Date().getFullYear().toString();
      body.imageUrl = body.imageUrl || '';
      body.descriptionFa = body.descriptionFa || '';
      body.descriptionEn = body.descriptionEn || '';
      body.verificationUrl = body.verificationUrl || '';
    }

    // Smart defaults for Projects
    if (resource === 'projects') {
      body.titleFa = body.titleFa || body.titleEn || 'پروژه';
      body.titleEn = body.titleEn || body.titleFa || 'Project';
      body.descriptionFa = body.descriptionFa || body.descriptionEn || '';
      body.descriptionEn = body.descriptionEn || body.descriptionFa || '';
      body.contentFa = body.contentFa || body.descriptionFa || '';
      body.contentEn = body.contentEn || body.descriptionEn || '';
      body.categoryFa = body.categoryFa || 'برنامه تحت وب';
      body.categoryEn = body.categoryEn || 'Web Application';
      body.image = body.image || '';
      body.technologies = body.technologies || 'Next.js';
    }

    // Smart defaults for Services
    if (resource === 'services') {
      body.titleFa = body.titleFa || body.titleEn || 'خدمت';
      body.titleEn = body.titleEn || body.titleFa || 'Service';
      body.descriptionFa = body.descriptionFa || body.descriptionEn || '';
      body.descriptionEn = body.descriptionEn || body.descriptionFa || '';
      body.icon = body.icon || 'Code';
    }

    // Smart defaults for Experiences
    if (resource === 'experiences') {
      body.organizationFa = body.organizationFa || body.organizationEn || 'سازمان';
      body.organizationEn = body.organizationEn || body.organizationFa || 'Organization';
      body.positionFa = body.positionFa || body.positionEn || 'موقعیت شغلی';
      body.positionEn = body.positionEn || body.positionFa || 'Position';
      body.startDate = body.startDate || '1400';
      body.endDate = body.endDate || 'اکنون';
      body.descriptionFa = body.descriptionFa || body.descriptionEn || '';
      body.descriptionEn = body.descriptionEn || body.descriptionFa || '';
    }

    // Smart defaults for Technologies
    if (resource === 'technologies') {
      body.name = body.name || 'Tech';
      body.category = body.category || 'frontend';
    }

    // Create the record
    const item = await model.create({
      data: body,
    });

    // Revalidate Next.js cache so changes immediately show on the live site
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/en');
      revalidatePath('/fa');
      revalidatePath(`/[lang]`, 'page');
    } catch (e) {
      console.warn('Revalidation notice:', e);
    }

    return NextResponse.json(item, { status: 201 });
  } catch (err: any) {
    console.error(`POST Resource [${err.message}] error:`, err);
    return NextResponse.json({ error: 'Failed to create record', details: err.message }, { status: 500 });
  }
}
