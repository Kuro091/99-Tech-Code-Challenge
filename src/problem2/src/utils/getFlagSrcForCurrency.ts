export const getFlagSrcForCurrency = (currency: string): string => {
  const fileSrc = `tokens/${currency}.svg`;

  return fileSrc;
};
