import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import * as bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pin = body.pin || body.password;
    const username = body.username || process.env.ADMIN_USERNAME || 'admin';

    if (!pin) {
      return NextResponse.json({ error: 'PIN is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 });
    }

    const isMatch = bcrypt.compareSync(pin, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 });
    }

    // Generate short-lived high-security JWT token
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'super-secret-random-key-artin-team-agency-2026'
    );
    const token = await new SignJWT({ userId: user.id, username: user.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(secret);

    const response = NextResponse.json({ success: true, user: { username: user.username } });

    // Set Session-Only High-Security Cookie
    response.cookies.set('artin_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (err: any) {
    console.error('Login API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
