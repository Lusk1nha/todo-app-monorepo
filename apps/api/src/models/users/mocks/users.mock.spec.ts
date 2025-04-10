import { UsersMockup } from './users.mock';
import { UserEntity } from '../entity/users.entity';

describe('UsersMock', () => {
  const usersMockup = new UsersMockup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a valid user mock', () => {
    const generatedUser = usersMockup.generateMany(1);
    expect(generatedUser).toHaveLength(1);
    expect(generatedUser[0]).toBeInstanceOf(UserEntity);
  });

  it('should create multiple user mocks', () => {
    const generatedUsers = usersMockup.generateMany(5);
    expect(generatedUsers).toHaveLength(5);
    generatedUsers.forEach((user) => {
      expect(user).toBeInstanceOf(UserEntity);
    });
  });
});
