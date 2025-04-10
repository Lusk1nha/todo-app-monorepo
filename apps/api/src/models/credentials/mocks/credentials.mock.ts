import { faker } from '@faker-js/faker';
import { Credentials } from '@prisma/client';
import { BaseMockup } from '@todo-app/mockup/src/mockup';
import { hashPassword } from 'src/helpers/password';
import { CredentialsEntity } from '../entity/credentials.entity';

export class CredentialsMockup extends BaseMockup<Credentials> {
  protected generateOne(): CredentialsEntity {
    const uid = faker.string.uuid();
    const email = faker.internet.email();
    const passwordHash = hashPassword(faker.internet.password());

    const createdAt = this.randomDateWithinDays();
    const updatedAt = this.randomDateWithinDays({
      refDate: createdAt,
    });

    const credentials: Credentials = {
      uid,
      email,
      passwordHash,
      createdAt,
      updatedAt,
    };

    return new CredentialsEntity(credentials);
  }
}
