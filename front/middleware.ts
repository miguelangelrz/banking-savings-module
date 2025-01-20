import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const NO_AUTH_PAGES = ['/login', '/register']
const PROTECTED_BASE_ROUTE = '/dashboard'

export function middleware(req: NextRequest) {
    const token = null;

    if (NO_AUTH_PAGES.includes(req.nextUrl.pathname)) {
        if (token) {
            return NextResponse.redirect(new URL(PROTECTED_BASE_ROUTE, req.url));
        }
    }

    if (req.nextUrl.pathname.startsWith(PROTECTED_BASE_ROUTE)) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}