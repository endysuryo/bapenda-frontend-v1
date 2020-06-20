import axios from 'axios';

export const requestCustomer = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL_BAPENDA_SERVICE,
  timeout: 10000,
});

requestCustomer.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export const requestBillboard = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL_BAPENDA_SERVICE,
  timeout: 10000,
});

requestBillboard.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export const requestSubdistrict = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL_BAPENDA_SERVICE,
  timeout: 10000,
});

requestSubdistrict.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
