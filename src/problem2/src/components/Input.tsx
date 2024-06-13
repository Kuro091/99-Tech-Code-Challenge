import { Description, Field, Input as BaseInput, Label } from '@headlessui/react';
import { cn } from '../utils/cn';
import { PropsWithChildren } from 'react';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  description?: string;
  inputClassName?: string;
  animated?: boolean;
}

export default function Input({
  label,
  description,
  required,
  type,
  name,
  className,
  inputClassName,
  children,
  animated,
  ...rest
}: InputProps) {
  return (
    <Field className={className}>
      {label && <Label className='font-medium text-white'>{label}</Label>}
      {description && <Description className=' text-white/50'>{description}</Description>}
      <BaseInput
        className={cn(
          'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3  text-white',
          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
          'hover:bg-white/10  hover:cursor-pointer focus:cursor-pointer',
          inputClassName
        )}
        type={type}
        {...rest}
      />
    </Field>
  );
}
