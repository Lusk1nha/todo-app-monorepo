import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { extractTokenFromHeader } from './auth.utils';
import { Request } from 'express';
import { JWT_SECRET } from '../constants/secrets';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
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

    return true;
  }
}
