import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const locales = ['en', 'fa'];
const defaultLocale = 'en';

// Paths that should not be localized or redirected
const publicFileRegex = /\.(.*)$/;
const excludedPaths = ['/api/auth/login', '/api/contact', '/uploads', '/images'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets, favicon, and uploads
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/favicon.ico') ||
    publicFileRegex.test(pathname) ||
    pathname.startsWith('/uploads/') ||
    pathname.startsWith('/images/')
  ) {
    return NextResponse.next();
  }

  // 2. Extract locale prefix if present
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Determine current locale and subpath
  let currentLocale = defaultLocale;
  let subPath = pathname;

  if (pathnameHasLocale) {
    currentLocale = pathname.split('/')[1];
    subPath = pathname.replace(`/${currentLocale}`, '');
    if (subPath === '') subPath = '/';
  } else {
    // Check if the path is in the excluded paths
    const isExcluded = excludedPaths.some((p) => pathname.startsWith(p));
    
    // Check if it is a general API route (excluding admin APIs)
    const isPublicApi = pathname.startsWith('/api/') && !pathname.startsWith('/api/admin');

    if (!isExcluded && !isPublicApi && !pathname.startsWith('/api/admin')) {
      // Redirect to prefix route
      request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
      return NextResponse.redirect(request.nextUrl);
    }
  }

  // 3. Admin Authentication & Route Protection
  const isAdminPath = pathname.startsWith(`/${currentLocale}/admin`) || pathname === `/${currentLocale}/admin`;
  const isAdminLogin = pathname === `/${currentLocale}/admin/login`;
  const isAdminApi = pathname.startsWith('/api/admin');

  if (isAdminPath || isAdminApi) {
    const token = request.cookies.get('artin_admin_session')?.value;
    let isAuthenticated = false;

    if (token) {
      try {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET || 'super-secret-random-key-artin-team-agency-2026'
        );
        await jwtVerify(token, secret);
        isAuthenticated = true;
      } catch (err) {
        // Invalid token
        isAuthenticated = false;
      }
    }

    // Protect Admin APIs
    if (isAdminApi) {
      if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.next();
    }

    // Protect Admin Web Pages
    if (isAdminPath) {
      if (isAdminLogin) {
        // If already logged in, redirect from login to dashboard
        if (isAuthenticated) {
          request.nextUrl.pathname = `/${currentLocale}/admin/dashboard`;
          return NextResponse.redirect(request.nextUrl);
        }
      } else {
        // If not logged in, redirect from dashboard/CRUD to login
        if (!isAuthenticated) {
          request.nextUrl.pathname = `/${currentLocale}/admin/login`;
          return NextResponse.redirect(request.nextUrl);
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except API, static files, favicon
    '/((?!_next/static|_next/image|favicon.ico|uploads/|images/).*)',
  ],
};
