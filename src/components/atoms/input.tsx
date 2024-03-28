import React, { ReactNode, HTMLAttributes } from 'react';
import {
  LdInput,
  LdInputMessage,
  LdLabel,
} from '@emdgroup-liquid/liquid/dist/react';
import { FieldValues, PathValue, UseFormReturn, Path } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

type InputType<T extends FieldValues, P extends Path<T>> = {
  form: UseFormReturn<T, unknown>;
  registered: P;
  label: ReactNode;
} & HTMLAttributes<HTMLLdInputElement>;

export const Input = <T extends FieldValues, P extends Path<T>>({
  form,
  registered,
  label,
  ...props
}: InputType<T, P>) => {
  const { formState, register, setValue } = form;

  const { errors, dirtyFields } = formState;

  const isFormDirty = formState.submitCount > 0;

  const error = errors[registered];

  return (
    <LdLabel>
      <span className="flex justify-between">{label}</span>
      <LdInput
        tone="dark"
        {...register(registered)}
        onInput={(ev: React.FormEvent<HTMLLdInputElement>) => {
          setValue(
            registered,
            ((ev.target as HTMLLdInputElement).value || '') as PathValue<T, P>,
            {
              shouldValidate: isFormDirty || dirtyFields[registered],
            },
          );
        }}
        onBlur={(ev: React.FormEvent<HTMLLdInputElement>) => {
          setValue(
            registered,
            ((ev.target as HTMLLdInputElement).value || '') as PathValue<T, P>,
            {
              shouldValidate: isFormDirty || dirtyFields[registered],
            },
          );
        }}
        invalid={!!error}
        {...props}
      />
      <LdInputMessage className={error ? 'visible' : 'invisible'} mode="error">
        {error && (
          <FormattedMessage id={errors[registered]?.message?.toString()} />
        )}
      </LdInputMessage>
    </LdLabel>
  );
};
