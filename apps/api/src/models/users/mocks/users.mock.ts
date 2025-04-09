import { User } from '@prisma/client';

import { faker } from '@faker-js/faker';
import { BaseMockup } from '@todo-app/mockup/src/mockup';
import { UID } from 'src/entities/uid';

export class UsersMockup extends BaseMockup<User> {
  protected generateOne(): User {
    let uid = UID.create().value;
    let name = faker.person.firstName();
    let image = faker.image.avatar();

    let createdAt = this.randomDateWithinDays();
    let updatedAt = this.randomDateWithinDays({
      refDate: createdAt,
    });

    return {
      uid,
      name,
      image,
      createdAt,
      updatedAt,
    };
  }
}
