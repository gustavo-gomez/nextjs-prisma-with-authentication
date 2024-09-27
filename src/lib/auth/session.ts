import 'server-only';
import { cache } from 'react';
import { SignJWT, jwtVerify } from 'jose';
import {SessionPayload} from "@/app/actions/auth/definitions";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from "@/lib/prisma";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);
export const cookieName = 'appointment_session';

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(key);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  cookies().set(cookieName, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  redirect('/dashboard');
}

export async function verifySession() {
  const cookie = cookies().get(cookieName)?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect('/login');
  }

  return { isAuth: true, userId: Number(session.userId) };
}

export function deleteSession() {
  cookies().delete(cookieName);
  redirect('/login');
}

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await prisma.user.findFirst({
      where: {
        id: Number(session.userId)
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});
