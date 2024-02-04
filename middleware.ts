import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  const email = request.cookies.get('email');
  const token = request.cookies.get('tokenSession');

  if (request.nextUrl.pathname === '/register') {
    if (token !== undefined) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (request.nextUrl.pathname.includes('/code-verification')) {
    if (token !== undefined || email === undefined) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (request.nextUrl.pathname.includes('/bookings')) {
    if (token === undefined) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/register', '/bookings', '/code-verification']
};
