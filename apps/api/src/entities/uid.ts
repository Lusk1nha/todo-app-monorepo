import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export class UID {
  private readonly _value: string;

  constructor(uid: string) {
    this._validate(uid);
    this._value = uid;
  }

  get value(): string {
    return this._value;
  }

  private _validate(value: string): void {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!regex.test(value)) {
      throw new BadRequestException('Invalid UID format');
    }
  }

  static create(): UID {
    let id = uuid();
    return new UID(id);
  }
}
