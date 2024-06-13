import React, { useState } from 'react';
import { Currency } from '../types';
import { Combobox } from '@/src/components';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/src/utils/cn';
import { getFlagSrcForCurrency } from '@/src/utils/getFlagSrcForCurrency';

interface CurrencyComboboxProps<T extends FieldValues> {
  currencyData: Currency[];
  control: Control<T>;
  name: Path<T>;

  label?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
}

const renderWithFlag = (data: Currency) => {
  const fileSrc = getFlagSrcForCurrency(data.currency);

  return (
    <div className='flex items-center gap-2'>
      <img className='w-6 h-6' src={fileSrc} />
      <span>{data.currency}</span>
    </div>
  );
};

export function CurrencyCombobox<T extends FieldValues>({
  currencyData,

  control,
  name,
  label,
  className,
  inputClassName,
  disabled,
}: CurrencyComboboxProps<T>) {
  const [query, setQuery] = useState('');

  const filteredCurrencyData =
    query === ''
      ? currencyData
      : currencyData.filter((data) => {
          return data.currency.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { onChange, value } = field;

          return (
            <Combobox<Currency>
              idKey='currency'
              label={label}
              options={filteredCurrencyData}
              onClose={() => setQuery('')}
              onInputChange={(e) => setQuery(e.target.value)}
              selectedOption={value}
              onSelectionChange={onChange}
              renderInputDisplayValue={(data) => {
                if (data) {
                  return data.currency;
                }
                return '';
              }}
              renderOptionDisplayValue={(data) => renderWithFlag(data)}
              className={className}
              inputClassName={cn('h-[4rem]', inputClassName)}
            />
          );
        }}
      />
    </>
  );
}
