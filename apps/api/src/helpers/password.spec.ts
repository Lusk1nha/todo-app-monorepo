import { comparePassword, hashPassword } from './password';

describe('Password Helper', () => {
  it('should hash a password', () => {
    const password = 'password123';
    const hashedPassword = hashPassword(password);
    expect(hashedPassword).not.toEqual(password);
  });

  it('should compare a password with a hash', () => {
    const password = 'password123';
    const hashedPassword = hashPassword(password);

    const isMatch = comparePassword(password, hashedPassword);

    expect(isMatch).toBe(true);
  });

  it('should not match a wrong password', () => {
    const password = 'password123';
    const hashedPassword = hashPassword(password);

    const isMatch = comparePassword('wrongpassword', hashedPassword);

    expect(isMatch).toBe(false);
  });
});
