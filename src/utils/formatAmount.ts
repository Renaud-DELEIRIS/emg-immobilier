const formatAmount = (amount: number) => {
  return amount.toLocaleString("de-CH", {
    style: "currency",
    currency: "CHF",
  });
};
export default formatAmount;
