import { User } from '@prisma/client';
import { JWT_EXPIRATION } from 'src/common/constants/secrets';
import { CreateUserAuthType } from 'src/common/types';

export function createJWTPayload(user: User): CreateUserAuthType {
  const payload: CreateUserAuthType = {
    iss: 'api',
    aud: 'web',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + Number(JWT_EXPIRATION),
    sub: user.uid,
    name: user.name,
  };

  return payload;
}
