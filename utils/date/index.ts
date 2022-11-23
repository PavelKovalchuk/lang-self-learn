export function getBackendFormatDate(): string {
  return new Date().toISOString();
}

export function getFrontendFormatDate(date: string | Date): string {
  return isDateType(date)
    ? ''
    : new Date(date).toLocaleDateString('en-us', {
        day: '2-digit',
        weekday: 'short',
        month: 'short',
      });
}

export function isDateType(date: string | Date): boolean {
  return date instanceof Date;
}
