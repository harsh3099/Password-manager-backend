import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { LdTypo } from '@emdgroup-liquid/liquid/dist/react';

import { version } from '../../../package.json';
import { MessagePage } from '../molecules/message-page';

export const Version: FC = () => {
  return (
    <MessagePage
      title={
        <LdTypo variant="b5">
          <FormattedMessage id="VERSION-TITLE" />
        </LdTypo>
      }
    >
      <LdTypo>
        <FormattedMessage
          id="VERSION-DESCRIPTION"
          values={{
            version: (
              <code className="bg-thm-primary-alpha-low px-2 py-1">
                {version}
              </code>
            ),
          }}
        />
      </LdTypo>
    </MessagePage>
  );
};
