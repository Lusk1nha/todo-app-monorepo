import { faker } from '@faker-js/faker';
import { BaseMockup } from '@todo-app/mockup/src/mockup';
import { UID } from 'src/common/entities/uid/uid';
import { UserEntity } from '../entity/users.entity';
import { User } from '@prisma/client';

export class UsersMockup extends BaseMockup<UserEntity> {
  protected generateOne(): UserEntity {
    let uid = new UID();
    let name = faker.person.firstName();
    let image = faker.image.avatar();

    let createdAt = this.randomDateWithinDays();
    let updatedAt = this.randomDateWithinDays({
      refDate: createdAt,
    });

    const user: User = {
      uid: uid.value,
      name,
      image,
      createdAt,
      updatedAt,
    };

    return new UserEntity(user);
  }
}
