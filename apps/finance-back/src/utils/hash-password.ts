import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const HASH_PASSWORD_SALTS = 10;
  const hashedPassword = await bcrypt.hash(password, HASH_PASSWORD_SALTS);

  return hashedPassword;
}
