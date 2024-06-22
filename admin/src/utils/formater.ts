export const bigNumberFormater = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};
