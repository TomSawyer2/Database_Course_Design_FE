import { message } from 'antd';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const HTTP_STATUS_SUCCESS_CODE: Array<number> = [200];

const defaultConfig: AxiosRequestConfig = {
  timeout: 100 * 1000,
  headers: {
    'Content-type': 'application/json',
  },
  baseURL: 'https://bf.tomsawyer2.xyz',
};

interface responseData {
  data: Record<string, unknown>;
  code: number;
  msg?: string;
}

const responseInterceptor = (response: AxiosResponse): responseData => {
  const { status, data } = response;
  if (!HTTP_STATUS_SUCCESS_CODE.includes(status) || data.code !== 200) {
    message.error(data?.msg || '请求失败');
    throw data?.msg || '请求失败';
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

instance.interceptors.response.use(responseInterceptor, commonErrorHander);

export default instance;
