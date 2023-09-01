'use client';
import type { FocusEvent, ReactElement } from 'react';
import { forwardRef, useState } from 'react';

export type FormFieldErrorProps = {};

export type FormFieldProps = {
  errorMessage?: string | React.ReactElement;
  label: string;
  labelLeft?: boolean;
  validateFunc?: (str: string) => boolean;
};

type Props = FormFieldProps & React.HTMLProps<HTMLInputElement>;

const FormField = forwardRef<HTMLInputElement, Props>(
  (
    { errorMessage, label, labelLeft, name, validateFunc, ...props },
    ref,
  ): ReactElement => {
    const [isValidField, setIsValidField] = useState<boolean>(true);

    const validateInput = (e: FocusEvent<HTMLInputElement>) => {
      if (!validateFunc) return;

      setIsValidField(validateFunc(e.currentTarget.value));
    };

    const ErrorMessage = (): ReactElement | null => {
      if (errorMessage) {
        if (typeof errorMessage === 'string') {
          return <p className="text-sm text-red-600">{errorMessage}</p>;
        }

        return errorMessage;
      }

      return null;
    };
    return (
      <div
        className={`mb-4 flex ${
          labelLeft ? 'flex-row items-center justify-between' : 'flex-col'
        }`}
      >
        <label className="block font-bold" htmlFor={name}>
          {label}
          <div className="flex flex-col">
            <input
              className="rounded bg-slate-200 bg-clip-padding px-3 py-2
            text-lg autofill:first-line:text-lg focus:outline-none focus:outline-2 focus:outline-violet-400"
              name={name}
              {...props}
              ref={ref}
              onBlur={validateInput}
            />
            {errorMessage && <ErrorMessage />}
          </div>
        </label>
      </div>
    );
  },
);

FormField.displayName = 'FormField';

export default FormField;
