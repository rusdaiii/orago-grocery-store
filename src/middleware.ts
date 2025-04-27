import { NextRequest, NextResponse } from 'next/server';

import { ACCESS_TOKEN_KEY } from './lib/constants/storageKey';

const middleware = async (request: NextRequest) => {
  const loginPath = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ];

  const privatePath = ['/account', '/checkout', '/wishlist', '/shopping-cart'];

  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY);

  const nextAuthToken = request.cookies.get('next-auth.session-token');

  if (request.nextUrl.pathname === '/account') {
    return NextResponse.redirect(
      new URL('/account/dashboard', request.nextUrl)
    );
  }

  if (loginPath.some((path) => path === request.nextUrl.pathname)) {
    if (accessToken && nextAuthToken) {
      return NextResponse.redirect(
        new URL('/account/dashboard', request.nextUrl)
      );
    }

    return NextResponse.next();
  }

  if (privatePath.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!accessToken && !nextAuthToken) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

export default middleware;
