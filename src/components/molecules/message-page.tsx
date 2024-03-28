import React, { FC, ReactNode } from 'react';
import { LdCard } from '@emdgroup-liquid/liquid/dist/react';

interface MessagePageProps {
  title: ReactNode;
  children?: ReactNode;
}

export const MessagePage: FC<MessagePageProps> = ({ title, children }) => {
  return (
    <LdCard className="m-auto text-center w-1/3">
      <div className="w-full mb-2">{title}</div>
      <div className="w-full">{children}</div>
    </LdCard>
  );
};
