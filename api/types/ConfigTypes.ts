import type { AxiosRequestConfig } from 'axios';

export type APIError = {
  status: number;
  message: string;
};

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
