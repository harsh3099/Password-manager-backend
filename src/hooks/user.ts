import React, { useCallback } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';

import { Role, UserType } from '../types/user';
import { UserState } from '../state/user';

interface useUserReturn {
  user: null | UserType;
  setUser: SetterOrUpdater<UserType | null>;
  isAuth: (roles?: Array<Role>) => boolean;
}

export const useUser = (): useUserReturn => {
  const [user, setUser] = useRecoilState(UserState);

  const isAuth = useCallback(
    (roles?: Array<Role>): boolean => {
      if (user && roles) {
        return !!user.roles.find((role) => roles.includes(role));
      }
      return !!user;
    },
    [user],
  );

  return {
    user,
    setUser,
    isAuth,
  };
};
