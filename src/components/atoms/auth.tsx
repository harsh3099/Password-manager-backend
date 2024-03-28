import React, { FC, ReactNode } from 'react';

import { Role } from '../../types/user';
import { useUser } from '../../hooks/user';

interface AuthProps {
  roles?: Array<Role>;
  children: ReactNode;
}

export const Auth: FC<AuthProps> = ({ roles, children }) => {
  const { isAuth } = useUser();
  return isAuth(roles) ? <>{children}</> : null;
};
