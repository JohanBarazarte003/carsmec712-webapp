// Archivo: app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Usamos GET porque un logout puede ser simplemente un enlace de navegación
export async function GET(request) {
  // Obtenemos la cookie de la sesión
  const sessionCookie = cookies().get('admin_session');

  // Si la cookie existe, le decimos al navegador que la borre
  if (sessionCookie) {
    cookies().set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // ¡Clave! Una edad máxima negativa le dice al navegador que la borre inmediatamente.
      path: '/',
    });
  }

  // Redirigimos al usuario a la página de login después de borrar la cookie
  return NextResponse.redirect(new URL('/login', request.url));
}