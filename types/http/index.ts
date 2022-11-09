export interface IBaseApiResponse {
  result: 'ok' | 'error';
  message: string;
  payload?: any;
}
