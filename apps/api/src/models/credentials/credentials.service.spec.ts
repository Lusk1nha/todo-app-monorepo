import { CredentialsMockup } from './mocks/credentials.mock';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { Test, TestingModule } from '@nestjs/testing';
import { CredentialsService } from './credentials.service';
import { Email } from 'src/entities/email';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { randomArrayElement } from '@todo-app/mockup/src/random';
import { CreateCredentialsDto } from './dto/create.dto';

const fakeCredentials = new CredentialsMockup().generateMany(10);
const randomCredential = randomArrayElement(fakeCredentials);

const prismaMock = {
  credentials: {
    findMany: jest.fn().mockResolvedValue(fakeCredentials),
    findUnique: jest.fn().mockResolvedValue(randomCredential),
    create: jest.fn().mockResolvedValue(fakeCredentials[2]),
    update: jest.fn().mockResolvedValue(fakeCredentials[2]),
    delete: jest.fn(),
  },
};

describe('CredentialsService', () => {
  let service: CredentialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CredentialsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
      imports: [PrismaModule],
    }).compile();

    service = module.get<CredentialsService>(CredentialsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getByEmail', async () => {
    let email = new Email(randomCredential.email);
    const response = await service.getByEmail(email);
    expect(response).toEqual(randomCredential);
  });

  it('create', async () => {
    let payload = {
      uid: randomCredential.uid,
      email: new Email(randomCredential.email),
      password: randomCredential.passwordHash,
    } as CreateCredentialsDto;

    const response = await service.create(payload);
    expect(response).toEqual(fakeCredentials[2]);
  });
});
