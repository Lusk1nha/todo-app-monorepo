describe('Secrets', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should have a valid secret key', () => {
    process.env.JWT_SECRET = 'mock-secret-key';

    const { JWT_SECRET } = require('./secrets');

    expect(JWT_SECRET).toBeDefined();
    expect(JWT_SECRET).not.toBe('');
    expect(JWT_SECRET).toBe('mock-secret-key');
  });

  it('should have a valid expiration time', () => {
    process.env.JWT_EXPIRATION = '3600s';

    const { JWT_EXPIRATION } = require('./secrets');

    expect(JWT_EXPIRATION).toBeDefined();
    expect(JWT_EXPIRATION).not.toBe('');
    expect(JWT_EXPIRATION).toBe('3600s');
  });

  it('should throw an error if JWT_SECRET is not set', () => {
    delete process.env.JWT_SECRET;

    const { JWT_SECRET } = require('./secrets');

    expect(JWT_SECRET).toBeUndefined();
  });
});
