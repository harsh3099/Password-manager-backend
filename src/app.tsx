import React, { FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IntlProvider } from 'react-intl';
import { LdNotification, LdTypo } from '@emdgroup-liquid/liquid/dist/react';

import { Locale } from './types/locale';
import { LocaleState } from './state/locale';
import { MessagePage } from './components/molecules/message-page';
import { AppRoute } from './route';
// import Helper from './context/Helper';

export const App: FC = () => {
  const locale = useRecoilValue(LocaleState);

  const [messages, setMessages] = useState<null | Record<string, string>>(null);

  useEffect(() => {
    const main = async () => {
      const response = await fetch(`/lang/${locale}.json`);
      setMessages(await response.json());
    };
    main();
  }, [locale]);

  return (
    
    <div className="ld-theme-bubblegum h-screen">
      <LdNotification placement="bottom" />
      {messages ? (
        <IntlProvider
          defaultLocale={Locale.English}
          locale={locale}
          messages={messages}
        >
          <AppRoute />
        </IntlProvider>
      ) : (
        <div className="mt-4">
          <MessagePage title={<LdTypo variant="b5">Relax!</LdTypo>}>
            <LdTypo>We are getting things ready for you.</LdTypo>
          </MessagePage>
        </div>
      )}
    </div>
    
  );
};
