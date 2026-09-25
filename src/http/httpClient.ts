import { URL_BASE, URI_BASE } from "../constant";
import axios, { AxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEYS } from "../constant";

const URL_DEFAULT = `${URL_BASE}${URI_BASE}`;

interface GetParams {
  url: string;
  options?: AxiosRequestConfig;
}

interface PostParams {
  url: string;
  body?: object;
  headers?: object;
  options?: AxiosRequestConfig;
}

interface PutParams {
  url: string;
  body?: object;
  headers?: object;
  options?: AxiosRequestConfig;
}

interface DeleteParams {
  url: string;
  headers?: object;
  options?: AxiosRequestConfig;
}

const readUrl = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `${URL_DEFAULT}${url}`;
};

const getToken = () => {
  return {
    token: localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
  };
};

const HEADERS_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const get = ({ url = "", options = {} }: GetParams) => {
  const { token } = getToken();

  return axios.get(readUrl(url), {
    headers: {
      ...HEADERS_DEFAULT,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });
};

const patch = ({
  url = "",
  body = {},
  headers = {},
  options = {},
}: PutParams) => {
  const { token } = getToken();

  return axios.patch(readUrl(url), body, {
    headers: {
      ...HEADERS_DEFAULT,
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });
};

const post = ({
  url = "",
  body = {},
  headers = {},
  options = {},
}: PostParams) => {
  const { token } = getToken();

  return axios.post(readUrl(url), body, {
    headers: {
      ...HEADERS_DEFAULT,
      ...headers,

      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });
};

const put = ({
  url = "",
  body = {},
  headers = {},
  options = {},
}: PutParams) => {
  const { token } = getToken();
  const { headers: headers_, ...restOptions } = options;

  return axios.put(readUrl(url), body, {
    headers: {
      ...HEADERS_DEFAULT,
      ...headers,
      ...headers_,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...restOptions,
  });
};

const _delete = ({ url = "", headers = {}, options = {} }: DeleteParams) => {
  const { token } = getToken();

  return axios.delete(readUrl(url), {
    headers: {
      ...HEADERS_DEFAULT,
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });
};

const httpClient = {
  get,
  post,
  patch,
  put,
  delete: _delete,
};

export default httpClient;
