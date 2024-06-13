import { useQuery } from "react-query";
import { Currency } from "../types";
import pricesData from "../data/prices.json";

const currencyMap: Map<string, number> = new Map();

export const useCurrency = () => {
  // Mimics an API call with a slight delay
  const getCurrencyData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return new Promise<{ data: Currency[]; errors: string[] }>((resolve) => {
      resolve({
        data: pricesData,
        errors: [],
      });
    });
  };

  const { data, error, isLoading, isFetching, status, dataUpdatedAt, refetch } =
    useQuery(
      "currencyData",
      async () => {
        const { data } = await getCurrencyData();
        return data;
      },
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        select: (data) => {
          const uniqueCurrency = new Set<string>();
          return data.filter((d) => {
            if (uniqueCurrency.has(d.currency)) {
              return false;
            }
            uniqueCurrency.add(d.currency);
            return true;
          });
        },
        initialData: [],
        onSuccess(data) {
          data.forEach((d) => {
            if (!d.price) return;
            currencyMap.set(d.currency, d.price);
          });
        },
      },
    );

  const convertCurrency = (
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): number => {
    const fromPrice = currencyMap.get(fromCurrency);
    const toPrice = currencyMap.get(toCurrency);

    if (!fromPrice || !toPrice) {
      throw new Error("Currency data not available for conversion");
    }

    const baseAmount = amount / fromPrice; // Convert amount to a "base" currency equivalent
    return baseAmount * toPrice; // Convert the "base" currency amount to the target currency
  };

  return {
    data: data as Currency[],
    error,
    isLoading,
    isFetching,
    dataUpdatedAt,
    status,
    refetch,
    currencyMap,
    convertCurrency,
  };
};
