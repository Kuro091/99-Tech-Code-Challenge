interface WalletBalance {
  currency: string;
  amount: number;
  blockchain?: string;
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends React.PropsWithChildren<BoxProps> {}

const prioritiesMap = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string = ''): number => {
  return prioritiesMap[blockchain] || -99;
};

const WalletPage = ({ children, ...rest }: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const priorityBalances = useMemo(
    () =>
      balances.map((balance) => ({
        ...balance,
        priority: getPriority(balance.blockchain),
      })),
    [balances]
  );

  // no need to call getPriority again
  const sortedBalances = useMemo(
    () =>
      priorityBalances
        .filter((balance) => balance.priority > -99 && balance.amount > 0)
        .sort((a, b) => b.priority - a.priority),
    [priorityBalances]
  );

  const formattedRows = useMemo(
    () =>
      sortedBalances.map((balance, idx) => {
        const usdValue = prices[balance.currency] * balance.amount;
        const formattedAmount = balance.amount.toFixed(2);
        return (
          <WalletRow
            className={classes.row}
            key={`${balance.currency}-${idx}`}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={formattedAmount}
          />
        );
      }),
    [sortedBalances, prices]
  );

  return <div {...rest}>{formattedRows}</div>;
};
