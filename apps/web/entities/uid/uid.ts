import { v4 as uuidv4, validate } from "uuid";

export class UID {
  private readonly _value: string;

  constructor(uid?: string) {
    this._value = uid ? this.validateAndUse(uid) : this.generateNew();
  }

  get value(): string {
    return this._value;
  }

  public equals(other: UID): boolean {
    return this._value === other.value;
  }

  public static generate(): UID {
    return new UID();
  }

  public static isValid(value: string): boolean {
    return validate(value);
  }

  private validateAndUse(uid: string): string {
    if (!UID.isValid(uid)) {
      throw new Error(
        `Invalid UID: ${uid}. A valid UID must be a valid UUID v4 string.`
      );
    }

    return uid;
  }

  private generateNew(): string {
    return uuidv4();
  }
}
