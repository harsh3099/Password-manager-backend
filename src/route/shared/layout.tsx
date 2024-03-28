import { Outlet } from 'react-router-dom';
import React from 'react';
import { LdHeader } from '@emdgroup-liquid/liquid/dist/react';
import { useIntl } from 'react-intl';

export const Layout = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <LdHeader siteName={formatMessage({ id: 'siteName' })} />
      <div className="w-full">
        <Outlet />
      </div>
    </>
  );
};
