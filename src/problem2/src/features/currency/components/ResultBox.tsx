import { getFlagSrcForCurrency } from '@/src/utils/getFlagSrcForCurrency';
import { Currency } from '../types';
import { formatCurrency } from '@/src/utils/formatter';

interface ResultBoxProps {
  result: number;
  fromCurrency: Currency | null;
  toCurrency: Currency | null;
}

const renderWithFlag = (data: Currency) => {
  if (!data?.currency) return null;
  const fileSrc = getFlagSrcForCurrency(data.currency);

  return (
    <div className='flex items-center gap-2'>
      <img className='w-6 h-6' src={fileSrc} />
      <span>{data.currency}</span>
    </div>
  );
};

export const ResultBox = ({ fromCurrency, toCurrency, result }: ResultBoxProps) => {
  if (!fromCurrency || !toCurrency) return null;

  return (
    <div className='w-full bg-orange-900 p-10'>
      <div className='flex md:flex-row flex-col'>
        <div className='flex-1'>
          <span className='font-extrabold'>{renderWithFlag(fromCurrency)}</span>From{' '}
          {fromCurrency.currency} with its price of{' '}
          <span className='font-extrabold'>
            {formatCurrency(fromCurrency.price || 0, fromCurrency.currency)}
          </span>
          <span className='font-extrabold'>{renderWithFlag(toCurrency)}</span>From{' '}
          {toCurrency.currency} with its price of{' '}
          <span className='font-extrabold'>
            {formatCurrency(toCurrency.price || 0, toCurrency.currency)}
          </span>
        </div>

        <div className='flex-1 flex items-center text-4xl p-3 mt-5 border-4 border-white'>
          Converted result: <span className='font-extrabold ml-2'>{result}</span>
        </div>
      </div>
    </div>
  );
};
