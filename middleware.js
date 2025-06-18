
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

async function getSessionPayload(token) {
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.IRON_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request) {
  const sessionToken = request.cookies.get('admin_session')?.value;
  const sessionPayload = await getSessionPayload(sessionToken);

  const pathname = request.nextUrl.pathname;
  
  // Lista de todas las rutas que ahora son de administración
  const adminRoutes = ['/dashboard', '/customers', '/products', '/services', '/vehicles', '/maintenance', '/edit'];

  // Verifica si la ruta actual es una ruta de admin
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  const isLoginRoute = pathname.startsWith('/login');

  if (isAdminRoute && !sessionPayload?.isLoggedIn) {
    // Si intenta ir a una ruta de admin sin sesión, lo mandamos a /login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoginRoute && sessionPayload?.isLoggedIn) {
    // Si ya tiene sesión e intenta ir a /login, lo mandamos al dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Actualizamos el matcher para que proteja las nuevas rutas
export const config = {
  matcher: [
    '/login',
    '/dashboard/:path*',
    '/customers/:path*',
    '/products/:path*',
    '/services/:path*',
    '/vehicles/:path*',
    '/maintenance/:path*',
    '/edit/:path*'
  ],
};