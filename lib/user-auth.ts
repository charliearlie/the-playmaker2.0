import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import type { User, Prisma } from '@prisma/client';

import { prisma } from '../prisma';

export const register = async (user: Prisma.UserCreateInput) => {
  const exists = await prisma.user.count({ where: { email: user.email } });
  if (exists) {
    return null;
  }

  const newUser = await createUser(user);

  // todo: handle these errors elegantly
  if (!newUser) return null;

  return createSession(newUser);
};

export const login = async (usernameOrEmail: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: usernameOrEmail },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        user,
        success: false,
        message: 'Invalid email/username and password combo',
      };
    }

    const session = await createSession(user);
    return {
      user,
      success: session.success,
      message: null,
      token: session.token,
    };
  } catch (error: unknown) {
    return {
      user: null,
      success: false,
      message: error as string,
    };
  }
};

export const createUser = async (user: Prisma.UserCreateInput) => {
  const passwordHash = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      username: user.username,
    },
  });
  return newUser;
};

const createSession = async (user: User) => {
  const secret = new TextEncoder().encode(process.env.COOKIE_PASSWORD);
  const alg = 'HS256';
  const jwt = await new jose.SignJWT({
    email: user.email,
    id: user.id,
    username: user.username,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('7d')
    .sign(secret);

  if (!jwt) {
    return { success: false, token: null };
  }

  return { success: true, token: jwt };
};

export type UserResponse = {
  avatarUrl?: string;
  email?: string;
  username?: string;
  isLoggedIn: boolean;
  id?: string;
};

export const getSession = async (request?: NextRequest) => {
  let cookie;
  if (request) {
    cookie = request.cookies.get('user_session');
  } else {
    cookie = cookies().get('user_session');
  }
  const secret = new TextEncoder().encode(process.env.COOKIE_PASSWORD);

  if (cookie?.value) {
    try {
      const { payload, protectedHeader } = await jose.jwtVerify(
        cookie.value,
        secret,
        {
          issuer: 'urn:example:issuer',
          audience: 'urn:example:audience',
        },
      );

      const userResponse = { ...payload, isLoggedIn: true } as UserResponse;
      const detailedUserData = await prisma.user.findUnique({
        where: { id: userResponse.id },
      });
      return { ...userResponse, avatarUrl: detailedUserData?.avatarUrl || '' };
    } catch (error) {
      cookies().delete('user_session');
      return null;
    }
  }
  return null;
};

export async function useServerUser() {
  const data = await getSession();
  if (data) {
    return data as UserResponse;
  }

  return { isLoggedIn: false };
}
