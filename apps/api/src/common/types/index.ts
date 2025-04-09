export type Role = 'admin' | 'user';

export type GetUserType = {
  uid: string;
  roles: Role[];
};
