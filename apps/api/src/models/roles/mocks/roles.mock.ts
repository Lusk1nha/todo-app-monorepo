import { faker } from '@faker-js/faker/.';
import { BaseMockup } from '@todo-app/mockup/src/mockup';
import { Role } from 'src/common/roles/roles.utils';

export class RolesMockup extends BaseMockup<Role> {
  protected generateOne(): Role {
    const role = faker.helpers.arrayElement([Role.Admin, Role.User]);
    return role;
  }
}
