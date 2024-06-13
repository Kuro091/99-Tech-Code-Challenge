import { Currency } from '../types';
import { useForm } from 'react-hook-form';
import { CurrencyCombobox } from './CurrencyCombobox';
import { CurrencyInput } from './CurrencyInput';
import Input from '@/src/components/Input';
import { formatNumber } from '@/src/utils/formatter';
import { ArrowsRightLeftIcon } from '@heroicons/react/20/solid';
import { AnimatedButton } from '@/src/components/Button';

export interface FormValues {
  amount: number;
  fromCurrency: Currency | null;
  toCurrency: Currency | null;
}

interface CurrencyFormProps {
  currencyData: Currency[];
  onSubmit: (values: FormValues) => void;

  isCurrencyDataLoading?: boolean;
}

// The form's purpose should only be getting the amount, fromCurrency, and toCurrency
export const CurrencyForm = ({
  currencyData,
  onSubmit,
  isCurrencyDataLoading,
}: CurrencyFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm<FormValues>({
    values: {
      amount: 0,
      fromCurrency: null,
      toCurrency: null,
    },
  });

  const switchCurrencyPlaces = () => {
    const toCurrency = getValues('toCurrency');
    const fromCurrency = getValues('fromCurrency');
    setValue('toCurrency', fromCurrency);
    setValue('fromCurrency', toCurrency);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col w-full px-10 items-center bg-zinc-800 p-10 rounded-lg gap-y-6'
    >
      {errors.amount && <span className='text-red-500'>{errors.amount.message}</span>}
      <div className='flex flex-col md:flex-row items-center justify-center w-full gap-2'>
        <CurrencyInput<FormValues>
          name='amount'
          label='Amount'
          placeholder='Enter amount, which can only be a number'
          control={control}
          className='flex-1 w-full'
          beforeChange={(value) => {
            return formatNumber(value);
          }}
          disabled={isCurrencyDataLoading}
        />
        <CurrencyCombobox<FormValues>
          name='fromCurrency'
          label='From'
          currencyData={currencyData.filter(
            (data) => data.currency !== watch('toCurrency')?.currency
          )}
          control={control}
          className='mt-10 md:mt-0 flex-1 w-full'
          inputClassName='w-full'
          disabled={isCurrencyDataLoading}
        />

        <div className='mt-7'>
          <ArrowsRightLeftIcon
            className='h-10 w-10 hover:text-violet-500 hover:cursor-pointer'
            onClick={switchCurrencyPlaces}
          />
        </div>

        <CurrencyCombobox<FormValues>
          name='toCurrency'
          label='To'
          control={control}
          className='flex-1 w-full'
          inputClassName='w-full'
          currencyData={currencyData.filter(
            (data) => data.currency !== watch('fromCurrency')?.currency
          )}
          disabled={isCurrencyDataLoading}
        />
      </div>

      <AnimatedButton className='w-full h-[6rem] bg-slate-800 hover:bg-slate-700 font-bold text-white text-2xl'>
        Convert
      </AnimatedButton>
    </form>
  );
};
