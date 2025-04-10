import { Email } from './email';

describe('Email', () => {
  it('should create an instance of Email', () => {
    const validEmail = 'teste@gmail.com';
    const email = new Email(validEmail);
    expect(email).toBeInstanceOf(Email);
    expect(Email.isValid(email.value)).toBe(true);
    expect(email.value).toBe(validEmail);
  });

  it('should throw an error for invalid email format', () => {
    const invalidEmail = 'invalid-email';
    expect(() => new Email(invalidEmail)).toThrow('Invalid email format');
  });

  it('should throw an error for empty email', () => {
    const emptyEmail = '';
    expect(() => new Email(emptyEmail)).toThrow('Email cannot be empty');
  });

  it('should throw an error for non-string email', () => {
    const nonStringEmail = 12345;
    expect(() => new Email(nonStringEmail as unknown as string)).toThrow('Email must be a string');
  });
});
