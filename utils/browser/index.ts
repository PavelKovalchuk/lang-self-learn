export const isBrowser = () => typeof window !== 'undefined';

export const getLocationPath = () => (isBrowser() ? window.location.pathname : null);

export const getLocationQueryStringParam = (
  param: string,
  strategy: 'string' | 'array' = 'array'
) => {
  if (!isBrowser()) {
    return strategy === 'string' ? '' : [];
  }
  const qs = new URLSearchParams(window.location.search);

  const stringValue = decodeURIComponent(qs.get(param) || '');
  if (strategy === 'string') {
    return stringValue;
  }

  try {
    return JSON.parse(`[${stringValue}]`);
  } catch (e) {
    console.error(e);

    return [];
  }
};

export const generateLocationQueryString = (param: string, value: string, pathname?: string) => {
  if (!isBrowser()) {
    return '';
  }
  const qs = new URLSearchParams(window.location.search);
  qs.set(param, value);

  return `${pathname || getLocationPath()}?${qs.toString()}`;
};

export const setUrl = (url: string): void => {
  if (isBrowser()) {
    window.history.replaceState({}, '', url);
  }
};

export const getRemovedParamFromLocationQueryString = (param: string): string | null => {
  if (!isBrowser()) {
    return '';
  }
  const qs = new URLSearchParams(window.location.search);
  qs.delete(param);

  const result = qs.toString();
  if (!result) {
    return getLocationPath();
  }

  return `${getLocationPath()}?${qs.toString()}`;
};

export const generateUrlParamsArray = (arrData: string[]): string =>
  encodeURIComponent(JSON.stringify(arrData));

export const convertUrlArrayToArray = (str: string): string[] => {
  if (!str) {
    return [];
  }

  const arrBySplit = str.replace(/[\[\]']+/g, '').split(',');

  if (!arrBySplit.length) {
    return [];
  }

  return arrBySplit.map((item) => String(item).match(/\d+/)?.[0]).map((item) => String(item));
};
