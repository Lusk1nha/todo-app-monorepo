import { UID } from './uid';

describe('UID entity', () => {
  it('should create an instance of UID', () => {
    const validUid = '123e4567-e89b-12d3-a456-426614174000';
    const uid = new UID(validUid);
    expect(uid).toBeInstanceOf(UID);
    expect(uid.value).toBe(validUid);
  });

  it('should throw an error for invalid UID format', () => {
    const invalidUid = 'invalid-uid';
    expect(() => new UID(invalidUid)).toThrow('Invalid UID format');
  });
});
