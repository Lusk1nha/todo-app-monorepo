import { GetUserType } from 'src/common/types';
import { ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { Role } from '../roles/roles.utils';

export const checkRowLevelPermission = (
  user: GetUserType,
  requestedUid?: string | string[],
  roles: Role[] = [Role.Admin],
) => {
  if (!requestedUid) return false;

  if (!user) {
    throw new ForbiddenException("You don't have permission to access this resource.");
  }

  if (user.roles?.some((role) => roles.includes(role))) {
    return true;
  }

  const uids = typeof requestedUid === 'string' ? [requestedUid] : requestedUid.filter(Boolean);

  if (!uids.includes(user.uid)) {
    throw new ForbiddenException("You don't have permission to access this resource.");
  }
};

export const extractTokenFromHeader = (request: Request): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};
