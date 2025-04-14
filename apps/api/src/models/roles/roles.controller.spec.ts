import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';

import { RolesService } from './roles.service';
import { UsersModule } from '../users/users.module';
import { Role } from 'src/common/roles/roles.utils';

const serviceMock = {
  getUserRoles: jest.fn().mockResolvedValue([Role.User, Role.Admin]),
};

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: serviceMock,
        },
      ],
      imports: [PrismaModule, UsersModule],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
