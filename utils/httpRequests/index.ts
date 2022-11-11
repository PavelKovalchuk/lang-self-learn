import { IBaseApiResponse } from 'types';

const convertObjToListParams = (params: { [key: string]: string }) => {
  return new URLSearchParams(params).toString();
};

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

export const putRequest = async (
  url: string,
  body: { [key: string]: any }
): Promise<IBaseApiResponse> => {
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return data;
};

export const getRequest = async (
  url: string,
  params: { [key: string]: any }
): Promise<IBaseApiResponse> => {
  const response = await fetch(`${process.env.domain}/${url}?${convertObjToListParams(params)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return data;
};
