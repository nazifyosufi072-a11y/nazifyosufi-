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

    const items = await model.findMany({
      orderBy,
    });

    return NextResponse.json(items);
  } catch (err: any) {
    console.error(`GET Resource [${err.message}] error:`, err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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

    // Basic sanitize for order field if it exists
    if ('order' in body && typeof body.order === 'string') {
      body.order = parseInt(body.order, 10) || 0;
    }
    if ('rating' in body && typeof body.rating === 'string') {
      body.rating = parseInt(body.rating, 10) || 5;
    }
    if ('featured' in body && typeof body.featured === 'string') {
      body.featured = body.featured === 'true';
    }
    if ('published' in body && typeof body.published === 'string') {
      body.published = body.published === 'true';
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
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}
