import axios, {
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  isAxiosError,
} from 'axios'

import { API, type ApiGroup } from '../config/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/'

export type ApiEndpointGroup = keyof ApiGroup
export type ApiEndpointKey<G extends ApiEndpointGroup> = keyof ApiGroup[G]

export type RequestOptions<D = unknown> = Omit<
  AxiosRequestConfig<D>,
  'url' | 'method'
> & {
  pathParams?: Record<string, string | number>;
}

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

  async request<
    G extends ApiEndpointGroup,
    E extends ApiEndpointKey<G>,
    Response = unknown,
    Data = unknown
  >(
    group: G,
    endpoint: E,
    options?: RequestOptions<Data>
  ): Promise<Response> {
    const endpointDefinition = this.group?.[group]?.[endpoint] as
      | ({ method: AxiosRequestConfig<Data>['method']; path: string } & Record<string, unknown>)
      | undefined;

    if (!endpointDefinition) {
      throw new Error(`API endpoint ${String(group)}.${String(endpoint)} is not configured.`);
    }

    const { pathParams, ...axiosConfig } = options ?? {};
    const requestConfig: AxiosRequestConfig = {
      method: endpointDefinition.method,
      url: this.interpolatePath(endpointDefinition.path, pathParams),
      ...axiosConfig,
    };

    this.serializeJsonPayload(requestConfig);

    if (this.authToken) {
      requestConfig.headers = {
        ...requestConfig.headers,
        Authorization: `Bearer ${this.authToken}`,
      };
    }

    try {
      const response = await this.axiosInstance.request<Response>(requestConfig);
      return response.data;
    } catch (error) {
      throw this.normalizeError(error);
    }
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

  private serializeJsonPayload(config: AxiosRequestConfig) {
    const payload = config.data;
    if (!this.shouldSerializePayload(payload)) {
      return;
    }

    config.data = JSON.stringify(payload);
    const headers = this.normalizeHeaders(config.headers);
    if (!headers.hasContentType()) {
      headers.setContentType('application/json', false);
    }

    config.headers = headers;
  }

  private normalizeHeaders(
    headers: AxiosRequestConfig['headers']
  ): AxiosHeaders {
    if (!headers) {
      return new AxiosHeaders();
    }

    return AxiosHeaders.from(
      headers as Parameters<typeof AxiosHeaders.from>[0]
    );
  }

  private shouldSerializePayload(payload: unknown): payload is Record<string, unknown> | unknown[] {
    if (payload == null) return false;
    if (typeof payload !== 'object') return false;

    if (typeof FormData !== 'undefined' && payload instanceof FormData) return false;
    if (typeof Blob !== 'undefined' && payload instanceof Blob) return false;
    if (payload instanceof URLSearchParams) return false;
    if (payload instanceof ArrayBuffer) return false;
    if (ArrayBuffer.isView(payload)) return false;

    return true;
  }
}

export const apiClient = new ApiService(API)
export type { AxiosRequestConfig }
