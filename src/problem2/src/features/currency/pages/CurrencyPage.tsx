import { LoadingSpinner } from '@/src/components/LoadingSpinner';
import { CurrencyForm, FormValues } from '../components/CurrencyForm';
import { useCurrency } from '../hooks/useCurrency';
import { ResultBox } from '../components/ResultBox';
import { useState } from 'react';
import { Currency } from '../types';
import Input from '@/src/components/Input';
import { AnimatedButton } from '@/src/components/Button';

export const CurrencyPage = () => {
  const {
    data: currencyData,
    isLoading,
    isFetching,
    dataUpdatedAt,
    convertCurrency,
    refetch,
  } = useCurrency();

  // These are needed for displaying purpose only
  // if we don't need to display the selected currency, we can remove these
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  const [result, setResult] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  const handleFormSubmit = (values: FormValues) => {
    const { amount, fromCurrency, toCurrency } = values;
    setFromCurrency(fromCurrency);
    setToCurrency(toCurrency);
    const result = convertCurrency(amount, fromCurrency.currency, toCurrency.currency);
    setResult(result);
    setAmount(amount);
  };

  const handleRefetch = async () => {
    const { data: newData, error } = await refetch();
    if (!newData || error) {
      return;
    }

    if (!fromCurrency || !toCurrency) {
      setFromCurrency(newData[0]);
      setToCurrency(newData[1]);
      return;
    }

    setFromCurrency(newData.find((d) => d.currency === fromCurrency.currency) || newData[0]);
    setToCurrency(newData.find((d) => d.currency === toCurrency.currency) || newData[1]);

    const result = convertCurrency(amount, fromCurrency.currency, toCurrency.currency);
    setResult(result);
  };

  return (
    <div className='flex flex-col  justify-center items-center min-h-screen'>
      <h1 className='text-3xl font-bold'>Currency Converter</h1>

      <div className='flex flex-col gap-y-2 self-end pr-10 py-2'>
        <AnimatedButton
          onClick={async () => {
            handleRefetch();
          }}
          type='submit'
          className='w-full font-bold text-white text-2xl h-[3rem] bg-purple-800 hover:bg-purple-900 focus:bg-purple-900'
        >
          Refetch
        </AnimatedButton>
        Data updated At: {new Date(dataUpdatedAt).toLocaleString()}
      </div>
      <CurrencyForm currencyData={currencyData} onSubmit={handleFormSubmit}></CurrencyForm>

      <div className='absolute bottom-0 right-0 p-2'>
        {isLoading && <span>Loading...</span>}
        {isFetching && (
          <div className='flex flex-col items-center'>
            <LoadingSpinner />
            <span>Fetching...</span>
            (This is artifically slowed down to show the loading spinner)
          </div>
        )}
      </div>

      <ResultBox fromCurrency={fromCurrency} toCurrency={toCurrency} result={result} />
    </div>
  );
};
