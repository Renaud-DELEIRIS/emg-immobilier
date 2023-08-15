const formatAmount = (amount: number, decimal = 2) => {
  return amount.toLocaleString("de-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: decimal,
    minimumFractionDigits: decimal,
  });
};
export default formatAmount;
