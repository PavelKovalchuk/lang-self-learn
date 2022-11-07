export function shuffleArray(arr: any[]): any[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function sortArrayById(array: any[], key: string): any[] {
  return array.sort(function (a, b) {
    const x = parseInt(a[key]);
    const y = parseInt(b[key]);
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
