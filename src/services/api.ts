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


export class ApiService {
  private readonly axiosInstance: AxiosInstance;
  private authToken?: string | null;

  constructor(private readonly group: ApiGroup, instance?: AxiosInstance) {
    this.axiosInstance = instance ??
      axios.create({
        baseURL: API_BASE_URL,
        timeout: 15_000,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  }

  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  private interpolatePath(
    path: string,
    params?: Record<string, string | number>
  ): string {
    if (!params) return path;

    return Object.entries(params).reduce((acc, [key, value]) => {
      const matcher = new RegExp(`:${key}(?=/|$)`, 'g');
      return acc.replace(matcher, encodeURIComponent(String(value)));
    }, path);
  }

  private normalizeError(error: unknown): ApiErrorPayload {
    if (isAxiosError(error)) {
      return {
        status: error.response?.status,
        message:
          (error.response?.data as { message?: string } | undefined)?.message ??
          error.message ??
          'Request failed',
        details: error.response?.data,
      };
    }

    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: 'Unexpected error occurred' };
  }
}

export const apiClient = new ApiService(API);
export type { AxiosRequestConfig };
