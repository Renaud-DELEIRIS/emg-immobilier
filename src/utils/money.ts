export const parseMoney = (value: string) => {
  const parsed = parseInt(value.replace(/[^0-9]/g, ""));
  if (isNaN(parsed)) {
    return undefined;
  }
  return parsed;
};

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("CHF ", "");
};
