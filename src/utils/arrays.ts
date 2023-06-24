export function deltas(numbers: readonly number[]): number[] {
  const result: number[] = [];
  let previous = numbers[0];
  if (typeof previous !== 'number') {return result;}

  numbers.slice(1).forEach((element) => {
    result.push(element - previous);
    previous = element;
  });

  return result;
}
