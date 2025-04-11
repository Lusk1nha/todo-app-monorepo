import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { extractTokenFromHeader } from './auth.utils';
import { Request } from 'express';
import { JWT_SECRET } from '../constants/secrets';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles/roles.utils';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export type RequestWithUser = Request & { user: User & { roles: Role[] } };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & {
      user: User & { roles: Role[] };
    } = context.switchToHttp().getRequest();

    try {
      await this._authenticateUser(request);
      return this._authorizeUser(request, context);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private async _authenticateUser(request: Request): Promise<void> {
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        "No token provided. Please include a 'Bearer' token in the Authorization header.",
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException("Invalid token. Please provide a valid 'Bearer' token.");
    }
  }

  private async _authorizeUser(
    request: RequestWithUser,
    context: ExecutionContext,
  ): Promise<boolean> {
    const requiredRoles = this._getMetadata<Role[]>('roles', context);
    const userRoles = await this._getUserRoles(request.user.uid);

    request.user.roles = userRoles;

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    return requiredRoles.some((role) => userRoles.includes(role));
  }

  private _getMetadata<T>(key: string, context: ExecutionContext): T {
    return this.reflector.getAllAndOverride<T>(key, [context.getHandler(), context.getClass()]);
  }

  private async _getUserRoles(uid: string): Promise<Role[]> {
    const roles: Role[] = [];

    const [admin, user] = await Promise.all([
      this.prisma.admin.findUnique({ where: { uid } }),
      this.prisma.user.findUnique({ where: { uid } }),
    ]);

    admin && roles.push(Role.Admin);
    user && roles.push(Role.User);

    return roles;
  }
}
