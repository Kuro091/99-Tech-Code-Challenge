import Input from '@/src/components/Input';
import { cn } from '@/src/utils/cn';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface CurrencyInputProps<T extends FieldValues>
  extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  beforeChange?: (value: string) => string;
  name: Path<T>;
  control: Control<T>;
}

export function CurrencyInput<T extends FieldValues>({
  label,
  name,
  control,
  onChange,
  beforeChange,
  ...rest
}: CurrencyInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { ref, onChange: onChangeHookForm, ...fields } = field;
        return (
          <Input
            label={label}
            onChange={(e) => {
              const transformed = beforeChange?.(e.target.value) ?? e.target.value;
              onChangeHookForm(transformed);
            }}
            inputClassName={cn('h-[4rem]')}
            {...rest}
            {...fields}
          />
        );
      }}
    />
  );
}
