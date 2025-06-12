// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const sessionToken = request.cookies.get('admin_session')?.value;
  const sessionPayload = await getSessionPayload(sessionToken);

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname.startsWith('/login');

  if (isAdminRoute && !sessionPayload?.isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoginRoute && sessionPayload?.isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// Función para verificar y decodificar el JWT
async function getSessionPayload(token) {
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.IRON_SECRET);
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    // El token es inválido o ha expirado
    return null;
  }
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};