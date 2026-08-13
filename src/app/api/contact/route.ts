import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const contactSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().optional().default('N/A'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate inputs
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation Error', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, projectType, budget, description } = result.data;

    // Create the message in database
    const message = await prisma.message.create({
      data: {
        name,
        email,
        phone: phone || null,
        projectType,
        budget: budget || 'N/A',
        description,
        read: false,
      },
    });

    return NextResponse.json({ success: true, messageId: message.id });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
