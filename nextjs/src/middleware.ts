import { DirectusHelper } from '@directus/directus.helpers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {

  // no infinite redirecting
  if (request.nextUrl.pathname === '/') {
    const response = NextResponse.next();
    response.cookies.delete('mix');
    return response;
    }
  
  const mix = await DirectusHelper.instance().getCurrentMix(request.nextUrl.pathname);
  const response = NextResponse.redirect(new URL(mix ? `/#${mix.key}` : '/', request.url));
  response.cookies.set('mix', mix ? mix.key : '');
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}