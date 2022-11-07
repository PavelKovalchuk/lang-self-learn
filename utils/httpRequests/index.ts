import { IBaseApiResponse } from 'types';

export const postRequest = async (
  url: string,
  body: { [key: string]: any }
): Promise<IBaseApiResponse> => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return data;
};
