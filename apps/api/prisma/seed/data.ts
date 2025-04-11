import { Prisma } from '@prisma/client';

import { v4 as uuid } from 'uuid';

function randomAdminEmail() {
  const randomEmail = Math.random().toString(36).substring(2, 15) + '@admin.com';
  return randomEmail;
}

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
