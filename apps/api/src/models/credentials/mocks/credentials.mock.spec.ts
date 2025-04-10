import { CredentialsEntity } from '../entity/credentials.entity';
import { CredentialsMockup } from './credentials.mock';

describe('CredentialsMock', () => {
  it('should create a valid credentials mock', () => {
    const credentialsMockup = new CredentialsMockup();
    const generatedCredentials = credentialsMockup.generateMany(1);
    expect(generatedCredentials).toHaveLength(1);
    expect(generatedCredentials[0]).toBeInstanceOf(CredentialsEntity);
  });

  it('should create multiple credentials mocks', () => {
    const credentialsMockup = new CredentialsMockup();
    const generatedCredentials = credentialsMockup.generateMany(5);
    expect(generatedCredentials).toHaveLength(5);
    generatedCredentials.forEach((credentials) => {
      expect(credentials).toBeInstanceOf(CredentialsEntity);
    });
  });

  it('should create a valid credentials mock with random dates', () => {
    const credentialsMockup = new CredentialsMockup();
    const generatedCredentials = credentialsMockup.generateMany(1);

    const createdAt = generatedCredentials[0].createdAt;
    const updatedAt = generatedCredentials[0].updatedAt;

    expect(createdAt).toBeInstanceOf(Date);
    expect(updatedAt).toBeInstanceOf(Date);
  });
});
