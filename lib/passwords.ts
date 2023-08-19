import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => await bcrypt.compare(password, hashedPassword);
