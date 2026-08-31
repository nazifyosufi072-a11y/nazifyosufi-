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
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  try {
    const { resource, id } = await params;
    const model = getModel(resource);

    if (!model) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    const item = await model.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (err: any) {
    console.error(`GET Item [${err.message}] error:`, err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  try {
    const { resource, id } = await params;
    const model = getModel(resource);

    if (!model) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    const body = await request.json();

    // Remove immutable fields from payload if they exist
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;

    // Convert values
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
    if ('read' in body) {
      body.read = body.read === true || body.read === 'true';
    }

    // Default string values
    if (resource === 'certificates') {
      if ('nameFa' in body && !body.nameFa) body.nameFa = body.nameEn || 'گواهینامه';
      if ('nameEn' in body && !body.nameEn) body.nameEn = body.nameFa || 'Certificate';
      if ('issuerFa' in body && !body.issuerFa) body.issuerFa = body.issuerEn || 'آکادمی';
      if ('issuerEn' in body && !body.issuerEn) body.issuerEn = body.issuerFa || 'Academy';
    }

    const updatedItem = await model.update({
      where: { id },
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

    return NextResponse.json(updatedItem);
  } catch (err: any) {
    console.error(`PUT Item [${err.message}] error:`, err);
    return NextResponse.json({ error: 'Failed to update record', details: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  try {
    const { resource, id } = await params;
    const model = getModel(resource);

    if (!model) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    await model.delete({
      where: { id },
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

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(`DELETE Item [${err.message}] error:`, err);
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}
