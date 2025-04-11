import { Role } from '../roles/roles.utils';

export type GetUserType = {
  uid: string;
  sub: string;
  roles: Role[];
};
