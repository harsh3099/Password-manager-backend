import React, { FC, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { LdTypo } from '@emdgroup-liquid/liquid/dist/react';

import { Role } from '../../types/user';
import { useUser } from '../../hooks/user';
import { MessagePage } from '../molecules/message-page';

interface AuthPageProps {
  roles?: Array<Role>;
  element: ReactNode;
}

export const AuthPage: FC<AuthPageProps> = ({ roles, element }) => {
  const { isAuth } = useUser();

  return isAuth(roles) ? (
    <>{element}</>
  ) : (
    <MessagePage
      title={
        <LdTypo variant="b5">
          <FormattedMessage id="NOT-UTHORAIZED" />
        </LdTypo>
      }
    >
      <LdTypo>
        <FormattedMessage id="NOT-AUTHORIZED-MESSAGE" />
      </LdTypo>
    </MessagePage>
  );
};
