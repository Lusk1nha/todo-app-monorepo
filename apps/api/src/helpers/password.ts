import * as bcrypt from 'bcryptjs';

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(password, salt);

  return passwordHash;
}

export function comparePassword(password: string, passwordHash: string): boolean {
  const isMatch = bcrypt.compareSync(password, passwordHash);
  return isMatch;
}
