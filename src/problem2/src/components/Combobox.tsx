import {
  Combobox as BaseCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
  Transition,
} from '@headlessui/react';
import { ChangeEvent } from 'react';
import { cn } from '../utils/cn';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

interface ComboboxProps<T> {
  options: T[];
  selectedOption: T;
  onSelectionChange: (option: T) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  renderInputDisplayValue: (data: T) => string;
  renderOptionDisplayValue: (data: T) => string | JSX.Element;
  onClose?: () => void;
  idKey?: keyof T;
  label?: string;

  className?: string;
  inputClassName?: string;
  disabled?: boolean;
}

export function Combobox<T>({
  selectedOption,
  options,
  onInputChange,
  onSelectionChange,
  renderInputDisplayValue,
  renderOptionDisplayValue,
  onClose,
  idKey,
  label,
  className,
  inputClassName,
  disabled,
}: ComboboxProps<T>) {
  return (
    <Field className={className}>
      <Label className='font-medium text-white'>{label}</Label>
      <BaseCombobox
        disabled={disabled}
        value={selectedOption}
        by={idKey as any}
        onChange={onSelectionChange}
        onClose={onClose}
      >
        <div className='relative'>
          <ComboboxButton className='w-full'>
            <ComboboxInput
              displayValue={renderInputDisplayValue}
              onChange={onInputChange}
              className={cn(
                'mt-3 w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-white',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'hover:bg-white/10 focus:bg-white/10 hover:cursor-pointer focus:cursor-pointer',
                inputClassName
              )}
            />
            <div className='group absolute inset-y-0 top-5 right-0 px-2'>
              <ChevronDownIcon className='size-12 fill-white/60 group-data-[hover]:fill-white' />
            </div>
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor='bottom'
          className='w-[var(--input-width)] rounded-xl border border-white/5 bg-gray-800 p-1 [--anchor-gap:var(--spacing-1)] !max-h-[14rem] overflow-y-auto'
        >
          {options.map((option) => (
            <ComboboxOption
              key={(option as any)[idKey as string] as string}
              value={option}
              className='group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10'
            >
              <CheckIcon className='invisible size-4 fill-white group-data-[selected]:visible' />
              <div className='text-white'>{renderOptionDisplayValue(option)}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </BaseCombobox>
    </Field>
  );
}
