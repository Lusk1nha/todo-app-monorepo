import { User } from '@prisma/client';
import { UsersMockup } from './mocks/users.mock';
import { UsersService } from './users.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UID } from 'src/common/entities/uid/uid';

const fakeUsers: User[] = new UsersMockup().generateMany(10);

const prismaMock = {
  user: {
    findMany: jest.fn().mockResolvedValue(fakeUsers),
    findUnique: jest.fn().mockResolvedValue(fakeUsers[1]),
    update: jest.fn().mockResolvedValue(fakeUsers[2]),
    delete: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: prismaMock }],
      imports: [PrismaModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`should return an array of users`, async () => {
      const response = await service.getAllUsers();
      expect(response).toEqual(fakeUsers);
    });
  });

  describe('findOne', () => {
    it(`should return a single user`, async () => {
      const uid = new UID(fakeUsers[1].uid);
      const response = await service.getUserById(uid);
      expect(response).toEqual(fakeUsers[1]);
    });
  });

  describe('update', () => {
    it(`should update a user`, async () => {
      const uid = new UID(fakeUsers[2].uid);

      const payload = { name: 'Updated Name' };
      const response = await service.updateById(uid, payload);
      expect(response).toEqual(fakeUsers[2]);
    });
  });

  describe('remove', () => {
    it(`should remove a user`, async () => {
      const uid = new UID(fakeUsers[3].uid);

      await service.removeById(uid);
      expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: { uid: uid.value },
      });
    });
  });
});
