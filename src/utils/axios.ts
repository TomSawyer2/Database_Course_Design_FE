import { message } from 'antd';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const HTTP_STATUS_SUCCESS_CODE: Array<number> = [200];

const getToken = () => {
  if (!localStorage) {
    return '';
  }
  const token = localStorage.getItem('token') || '';
  return token;
};

const defaultConfig: AxiosRequestConfig = {
  timeout: 100 * 1000,
  headers: {
    'Content-type': 'application/json',
  },
  baseURL: 'https://bf.tomsawyer2.xyz',
};

// 请求拦截
const requestInterceptor = (config: AxiosRequestConfig) => {
  // @ts-ignore
  config.headers.Authorization = getToken();
  return config;
};

interface responseData {
  data: Record<string, unknown>;
  status: number;
  msg: string;
}

const responseInterceptor = (response: AxiosResponse): responseData => {
  const { status, data } = response;
  if (!HTTP_STATUS_SUCCESS_CODE.includes(status) || data.status !== 0) {
    message.error(data.msg);
    throw data.msg;
  }

  return data;
};

const commonErrorHander = (error: AxiosError) => {
  // @ts-ignore
  const response: AxiosResponse = error.response;
  if (response?.data?.msg) {
    message.error(response?.data?.msg);
    throw response.data.msg;
  } else {
    throw error;
  }
};

const instance: AxiosInstance = axios.create(defaultConfig);

instance.interceptors.request.use(requestInterceptor);
instance.interceptors.response.use(responseInterceptor, commonErrorHander);

export default instance;
