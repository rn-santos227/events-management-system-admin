import axios, { type AxiosInstance, type AxiosRequestConfig, isAxiosError } from 'axios'

import { API, type ApiGroup } from '../config/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/'

export type ApiEndpointGroup = keyof ApiGroup;
export type ApiEndpointKey<G extends ApiEndpointGroup> = keyof ApiGroup[G];

export type RequestOptions<D = unknown> = Omit<
  AxiosRequestConfig<D>,
  'url' | 'method'
> & {
  pathParams?: Record<string, string | number>;
};

export interface ApiErrorPayload {
  status?: number;
  message: string;
  details?: unknown;
}

