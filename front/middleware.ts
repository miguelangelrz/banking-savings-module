import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const NO_AUTH_PAGES = ['/login', '/register'];
const PROTECTED_BASE_ROUTE = '/dashboard';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode('your_jwt_secret'));
      isAuthenticated = true;
    } catch (err: any) {
      console.error('Invalid token:', err.message);
    }
  }

  if (NO_AUTH_PAGES.includes(req.nextUrl.pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL(PROTECTED_BASE_ROUTE, req.url));
  }

  if (req.nextUrl.pathname.startsWith(PROTECTED_BASE_ROUTE) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
