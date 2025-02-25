import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FieldError } from 'react-hook-form';

type CustomSelectProps = {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  error?: string | FieldError;
};

export default function CustomFormSelect({ name, label, options, error }: CustomSelectProps) {
  const { control } = useFormContext();

  return (
    <div className='w-full'>
      {!!label && (
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor={name}>
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={String(field.value)}>
            <SelectTrigger className='!text-[#878787]'>
              <SelectValue className='!text-[#878787]' placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {!!error && (
        <p className="mt-1 text-sm text-red-500">
          {typeof error === 'string' ? error : error.message}
        </p>
      )}
    </div>
  );
}
