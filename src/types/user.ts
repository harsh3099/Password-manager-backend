export enum Role {
  'administrator',
  'regular',
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  token: string;
  roles: Array<Role>;
}
