import { BadRequestException } from '@nestjs/common';

export class Email {
  private _email: string;

  constructor(email: string) {
    this._validateEmail(email);
    this._email = email;
  }

  get raw(): string {
    return this._email;
  }

  private _validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format');
    }
  }
}
