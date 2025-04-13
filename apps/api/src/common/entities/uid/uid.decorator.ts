import { Request } from 'express';
import { UID } from './uid';
import { createParamDecorator, BadRequestException } from '@nestjs/common';

export const UIDParam = createParamDecorator((data: string, req) => {
  try {
    let request: Request = req.switchToHttp().getRequest();
    let param = request.params[data];

    if (!param) {
      throw new BadRequestException(`Missing parameter: ${data}`);
    }

    let uid = new UID(param);

    return uid;
  } catch (e) {
    throw new BadRequestException(e.message);
  }
});
