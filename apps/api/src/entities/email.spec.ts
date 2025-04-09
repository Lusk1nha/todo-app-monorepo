import { Email } from './email';

describe('Email', () => {
  it('should create an instance of Email', () => {
    const validEmail = 'teste@gmail.com';
    const email = new Email(validEmail);
    expect(email).toBeInstanceOf(Email);
    expect(email.raw).toBe(validEmail);
  });

  it('should throw an error for invalid email format', () => {
    const invalidEmail = 'invalid-email';
    expect(() => new Email(invalidEmail)).toThrow('Invalid email format');
  });
});
