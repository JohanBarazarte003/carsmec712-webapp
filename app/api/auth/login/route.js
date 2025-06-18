// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

export async function POST(request) {
  const { password } = await request.json();

  if (password === process.env.ADMIN_PASSWORD) {
    // El "payload" es la información que queremos guardar en el token
    const payload = { isLoggedIn: true, sub: 'admin' };

    // Creamos el token
    const secret = new TextEncoder().encode(process.env.IRON_SECRET); // Reutilizamos la misma clave secreta
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h') // El token expira en 24 horas
      .sign(secret);

    // Guardamos el token en la cookie
    (await cookies()).set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, message: 'Contraseña incorrecta' },
    { status: 401 }
  );
}