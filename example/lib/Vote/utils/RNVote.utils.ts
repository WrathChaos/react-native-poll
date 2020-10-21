export const countPercentage = (value: number, sum: number) => {
  if (!sum || !value) {
    return 0;
  }
  return (value / sum) * 100;
};

export const convertPercentageString = (percentage: number) =>
  " " + Math.round(percentage) + "%";
