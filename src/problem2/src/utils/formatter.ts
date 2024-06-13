export const formatNumber = (value: string) => {
  const formmatted = value
    .replace(/[^0-9.]/g, "")
    .replace(/^\./, "")
    .replace(/\.+/g, ".")
    .replace(/(\d+)\.(\d+)\..*/, "$1.$2")
    .replace(/^0+(?=\d)/, "");

  return formmatted.slice(0, 20);
};

export const formatCurrency = (value: number) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    maximumFractionDigits: 5,
  });

  const formatted = currencyFormatter.format(value);
  if (formatted === "NaN") {
    return "0";
  }
  return formatted;
};
