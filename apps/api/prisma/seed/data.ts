import { Prisma } from '@prisma/client';

import { v4 as uuid } from 'uuid';
import { randomAdminEmail } from './utils';

export const users: Prisma.UserCreateInput[] = [
  {
    uid: uuid(),
    name: 'admin',
    Credentials: {
      create: {
        email: randomAdminEmail(),
        passwordHash: '$2b$10$n3a.h5Vs7thK9RoihWXH5.pFpmZm5vbqm3YGPqetNA9Ry6Sc/UAo6',
      },
    },
    AuthProvider: {
      create: {
        type: 'CREDENTIALS',
      },
    },
    Admin: {
      create: {},
    },
  },
];
