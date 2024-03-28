import { atom } from 'recoil';

import { UserType } from '../types/user';

const USER = import.meta.env?.VITE_USER;
export const UserState = atom<null | UserType>({
  key: 'UserState',
  default: USER ? JSON.parse(USER) : null,
});
