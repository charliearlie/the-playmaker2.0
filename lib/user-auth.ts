import bcrypt from "bcrypt";
import * as jose from "jose";
import { prisma } from "../prisma";
import type { User, Prisma } from "@prisma/client";
import { cookies } from "next/headers";

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
  const user = await prisma.user.findUnique({
    where: { username: usernameOrEmail },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  return createSession(user);
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
  const alg = "HS256";
  const jwt = await new jose.SignJWT({
    email: user.email,
    id: user.id,
    username: user.username,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("7d")
    .sign(secret);

  if (!jwt) {
    return { success: false, token: null };
  }

  return { success: true, token: jwt };
};

export const getSession = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.COOKIE_PASSWORD);

  const { payload, protectedHeader } = await jose.jwtVerify(token, secret, {
    issuer: "urn:example:issuer",
    audience: "urn:example:audience",
  });

  return payload;
};
