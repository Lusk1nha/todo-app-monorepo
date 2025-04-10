import { Prisma } from '@prisma/client';

export type RestrictProperties<T, U> = {
  [K in keyof T]: K extends keyof U ? T[K] : never;
} & Required<U>;

export class DateTimeFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
}

export class StringFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: string;

  mode?: 'default' | 'insensitive';
}

export class StringListFilter {
  equals?: string[];
  has?: string;
  hasEvery?: string[];
  hasSome?: string[];
  isEmpty?: boolean;
}

export class BoolFilter {
  equals?: boolean;
  not?: boolean;
}

export class IntFilter {
  equals?: number;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
}

export class FloatFilter {
  equals?: number;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: number;
}

export class AggregateCountOutput {
  count: number;
}

export class LocationFilterInput {
  ne_lat: number;

  ne_lng: number;

  sw_lat: number;

  sw_lng: number;
}

export class PaginationInput {
  take?: number;
  skip?: number;
}
