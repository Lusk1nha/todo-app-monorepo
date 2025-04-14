import { Test, TestingModule } from '@nestjs/testing';

import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CredentialsMockup } from './mocks/credentials.mock';
import { UpdateCredentialsDto } from './dto/update.dto';

import { UserAuthType } from 'src/common/types';
import { Role } from 'src/common/roles/roles.utils';
import { JwtModule } from '@nestjs/jwt';

const fakeCredentials = new CredentialsMockup().generateMany(10);

const serviceMock = {
  update: jest.fn().mockResolvedValue({ ...fakeCredentials[0], email: 'email@teste.com' }),
};

describe('CredentialsController', () => {
  let controller: CredentialsController;
  let service: CredentialsService;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CredentialsController],
      providers: [
        {
          provide: CredentialsService,
          useValue: serviceMock,
        },
      ],
      imports: [PrismaModule, JwtModule],
    }).compile();

    controller = module.get<CredentialsController>(CredentialsController);
    service = module.get<CredentialsService>(CredentialsService);
  });

  describe('update', () => {
    it('should update user credentials', async () => {
      const currentCredentials = fakeCredentials[0];
      const email = 'email@teste.com';

      const getUser: UserAuthType = {
        sub: currentCredentials.uid,
        aud: 'web',
        iss: 'api',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        roles: [Role.User],
      };

      const payload: UpdateCredentialsDto = {
        email,
      };

      const response = await controller.update(payload, getUser);
      const expectResponse = {
        ...currentCredentials,
        email,
      };

      expect(response).toEqual(expectResponse);
    });
  });
});
