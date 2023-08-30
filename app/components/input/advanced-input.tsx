'use client';
import { useState } from 'react';
import { Input, InputProps } from '../common/input';

type Props = {
  charLimit?: number;
} & InputProps;

export default function AdvancedInput({ charLimit, ...inputProps }: Props) {
  const [value, setValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (charLimit) {
      if (event.target.value.length <= charLimit) {
        setValue(event.target.value);
      }
    }
  };
  return (
    <div>
      <Input {...inputProps} onChange={handleChange} value={value} />
      {charLimit && charLimit > 0 ? (
        <div className="flex justify-end">
          <span>{`${value.length}/${charLimit}`}</span>
        </div>
      ) : null}
    </div>
  );
}
