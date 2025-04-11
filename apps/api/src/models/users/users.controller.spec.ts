import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UsersMockup } from './mocks/users.mock';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UpdateUserDto } from './dto/update.dto';
import { UID } from 'src/common/entities/uid/uid';
import { GetUserType } from 'src/common/types';
import { Role } from 'src/common/roles/roles.utils';

const fakeUsers: User[] = new UsersMockup().generateMany(10);

const serviceMock = {
  getAllUsers: jest.fn().mockResolvedValue(fakeUsers),
  getUserById: jest.fn().mockResolvedValue(fakeUsers[0]),
  updateById: jest.fn().mockResolvedValue(fakeUsers[2]),
  removeById: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: serviceMock }],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const response = await controller.findAll();

      expect(service.getAllUsers).toHaveBeenCalledTimes(1);
      expect(response).toEqual(fakeUsers);
    });
  });

  describe('getUserById', () => {
    it('should return a single user', async () => {
      const uid = new UID(fakeUsers[0].uid);
      const response = await controller.findOne(uid);

      expect(service.getUserById).toHaveBeenCalledWith(uid);
      expect(response).toEqual(fakeUsers[0]);
    });
  });

  describe('updateById', () => {
    it('should update a user', async () => {
      const currentUser = fakeUsers[2];

      const uid = new UID(currentUser.uid);
      const payload = { name: 'Updated Name' } as UpdateUserDto;

      const getUser: GetUserType = {
        uid: currentUser.uid,
        sub: currentUser.uid,
        roles: [Role.User],
      };

      const response = await controller.update(uid, payload, getUser);

      expect(service.updateById).toHaveBeenCalledWith(uid, payload);
      expect(response).toEqual(fakeUsers[2]);
    });
  });

  describe('removeById', () => {
    it('should remove a user', async () => {
      const currentUser = fakeUsers[2];

      const getUser: GetUserType = {
        uid: currentUser.uid,
        sub: currentUser.uid,
        roles: [Role.User],
      };

      const uid = new UID(currentUser.uid);
      const response = await controller.remove(uid, getUser);

      expect(service.removeById).toHaveBeenCalledWith(uid);
      expect(response).toBeUndefined();
    });
  });
});
