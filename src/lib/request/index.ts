import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import { TokenStorage } from "./TokenStorage";
import { BASE_URI } from "../constants";

export type AxiosRequestPayload = any;
export type AxiosRequestParams = any;
type AxiosResponseWithRetry = AxiosResponse & {
  _retry: boolean;
};

type AxiosPath = string;

type CustomResponse<R, E> = {
  data: R;
  error: ServerError<E>;
};

export type ServerError<E> = {
  items: { E: string };
  empty: boolean;
};

export type AxiosResponsePayload = CustomResponse<any, any>;

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token?: string) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

interface HttpClientInterface {
  service: AxiosInstance;

  handleResponseSuccess(
    response: AxiosResponse<AxiosResponsePayload>,
  ): AxiosResponse<AxiosResponsePayload>;

  handleResponseError(error: AxiosError): Promise<unknown>;

  get(
    path: AxiosPath,
    params?: AxiosRequestParams,
    configs?: AxiosRequestConfig,
  ): Promise<AxiosResponsePayload>;
  patch(
    path: AxiosPath,
    payload?: AxiosRequestPayload,
    configs?: AxiosRequestConfig,
  ): Promise<AxiosResponsePayload>;
  post(
    path: AxiosPath,
    payload?: AxiosRequestPayload,
    configs?: AxiosRequestConfig,
  ): Promise<AxiosResponsePayload>;
  put(
    path: AxiosPath,
    payload?: AxiosRequestPayload,
    configs?: AxiosRequestConfig,
  ): Promise<AxiosResponsePayload>;
  delete(
    path: AxiosPath,
    configs?: AxiosRequestConfig,
  ): Promise<AxiosResponsePayload>;
  request(
    method: Method,
    path: AxiosPath,
    configs?: AxiosRequestConfig,
  ): Promise<AxiosResponse>;
}

export class HttpClientService implements HttpClientInterface {
  public service: AxiosInstance;

  constructor() {
    const service = axios.create();
    service.defaults.baseURL = BASE_URI;

    service.interceptors.request.use(this.handleRequest);
    service.interceptors.response.use(
      this.handleResponseSuccess,
      this.handleResponseError,
    );

    this.service = service;
  }

  responseConfig = (config: any) =>
    new Promise((resolve, reject) => {
      return axios
        .request(config)
        .then((response: any) => {
          resolve(response);
          // tslint:disable-next-line:no-shadowed-variable
        })
        .catch((error: any) => {
          reject(error);
        });
    });

  public handleRequest = (request: AxiosRequestConfig) => {
    if (TokenStorage.getToken()) {
      request.headers.common.authorization = TokenStorage.getBarear();
    }
    return request;
  };

  public handleResponseSuccess = (
    response: AxiosResponse<AxiosResponsePayload>,
  ): AxiosResponse<AxiosResponsePayload> => {
    return response;
  };

  public handleResponseError = (
    error: AxiosError & { config: AxiosResponseWithRetry },
  ): Promise<unknown> => {
    // Return any error which is not due to authentication back to the calling service
    if (
      (error.response && error.response.status !== 401) ||
      error.config._retry
    ) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (isRefreshing) {
      // If I'm refreshing the token I send request to a queue
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          error.config.headers.authorization = TokenStorage.getBarear();
          return this.responseConfig(error.config);
        })
        .catch((err) => err);
    }
    // If header of the request has changed, it means I've refreshed the token
    if (error.config.headers.authorization !== TokenStorage.getBarear()) {
      error.config.headers.authorization = TokenStorage.getBarear();
      return this.responseConfig(error.config);
    }

    error.config._retry = true; // mark request a retry
    isRefreshing = true; // set the refreshing var to true
    // Try request again with new token
    return TokenStorage.getNewToken()
      .then((token) => {
        // New request with new token
        const config = error.config;
        processQueue(null, token); // Resolve queued
        /* tslint:disable:no-string-literal */
        config.headers["authorization"] = `Bearer ${token}`;

        return this.responseConfig(config);
      })
      .catch((e) => {
        processQueue(e); // Resolve queued
        TokenStorage.clear();
        const currentPath = `${window.location.pathname}${window.location.search}`;
        window.location.replace(`${currentPath}`);
      })
      .finally(() => {
        isRefreshing = false;
      });
  };

  public get(
    url: string,
    params?: AxiosRequestParams,
    configs?: AxiosRequestConfig,
  ) {
    return this.service
      .request({
        url,
        params,
        method: "GET",
        responseType: "json",
        ...configs,
      })
      .then(this.processResponse);
  }

  public patch(
    url: AxiosPath,
    data?: AxiosRequestPayload,
    configs?: AxiosRequestConfig,
  ) {
    return this.service
      .request({
        url,
        data,
        method: "PATCH",
        responseType: "json",
        ...configs,
      })
      .then(this.processResponse);
  }

  public post(
    url: AxiosPath,
    data?: AxiosRequestPayload,
    configs?: AxiosRequestConfig,
  ) {
    return this.service
      .request({
        url,
        data,
        method: "POST",
        responseType: "json",
        ...configs,
      })
      .then(this.processResponse);
  }

  public put(
    url: AxiosPath,
    data?: AxiosRequestPayload,
    configs?: AxiosRequestConfig,
  ) {
    return this.service
      .request({
        url,
        data,
        method: "PUT",
        responseType: "json",
        ...configs,
      })
      .then(this.processResponse);
  }

  public delete(url: AxiosPath, configs?: AxiosRequestConfig) {
    return this.service
      .request({
        url,
        method: "DELETE",
        responseType: "json",
        ...configs,
      })
      .then(this.processResponse);
  }

  public request(method: Method, url: AxiosPath, configs?: AxiosRequestConfig) {
    return this.service.request({
      url,
      method,
      ...configs,
    });
  }

  private processResponse = (response: AxiosResponse<AxiosResponsePayload>) => {
    const { data, error } = response.data;
    if (response && !error) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(error);
    }
  };
}

export const httpClient = new HttpClientService();
