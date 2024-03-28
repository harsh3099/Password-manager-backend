import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LdButton, LdCard } from '@emdgroup-liquid/liquid/dist/react';

import { addNotification } from '../../utility/notification';
import { Input } from '../atoms/input';

const schema = z.object({
  name: z.string().min(2, { message: 'REQUIRED' }),
  email: z.string().min(1, { message: 'REQUIRED' }).email({ message: 'EMAIL' }),
});

type SchemaType = z.infer<typeof schema>;

export const Index: FC = () => {
  const form = useForm<SchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const { handleSubmit } = form;

  const onSuccess = useCallback((data: SchemaType) => {
    addNotification({
      content: `Thanks ${data.name} for your submission!`,
    });
  }, []);

  const onError = useCallback(() => {
    addNotification({
      type: 'warn',
      content: 'Please check your input.',
    });
  }, []);

  return (
    <LdCard className="mx-auto">
      <form autoComplete="off" onSubmit={handleSubmit(onSuccess, onError)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-ld-24 mb-3">
          <Input
            form={form}
            registered="name"
            label="Name"
            placeholder="Your name"
          />

          <Input
            form={form}
            registered="email"
            label="Email"
            placeholder="Email address"
          />
        </div>
        <LdButton>Submit</LdButton>
      </form>
    </LdCard>
  );
};
