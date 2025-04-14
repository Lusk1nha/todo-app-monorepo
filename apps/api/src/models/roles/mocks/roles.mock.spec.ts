import { RolesMockup } from './roles.mock';

describe('Roles Mock', () => {
  it('should create a valid role mock', () => {
    const rolesMockup = new RolesMockup();

    const generatedRoles = rolesMockup.generateMany(2);

    expect(generatedRoles).toHaveLength(2);
  });

  it('should create multiple role mocks', () => {
    const rolesMockup = new RolesMockup();
    const generatedRoles = rolesMockup.generateMany(5);

    expect(generatedRoles).toHaveLength(5);
  });
});
