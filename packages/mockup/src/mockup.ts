import { faker } from "@faker-js/faker";

export abstract class BaseMockup<T> {
  protected abstract generateOne(): T;

  generateMany(length: number): T[] {
    return Array.from({ length }, () => this.generateOne());
  }

  protected randomDateWithinDays(options?: {
    days?: number;
    refDate?: string | Date | number;
  }): Date {
    const date = faker.date.recent(options);
    return new Date(date);
  }
}
