export const getAverageMark = (marks: number[]): number => {
  let total = 0;
  let count = 0;

  marks.forEach((item) => {
    total += item;
    count += 1;
  });

  return Math.round(total / count);
};
