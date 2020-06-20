import {
  IErrorState,
  IParams,
  IResult,
  ISuccessState,
} from '../interface/app.interface';
import { IBillboardData } from '../interface/billboard.interface';
import { ICustomerData } from '../interface/customer.interface';
import { ISubdistrictData } from '../interface/subdistrict.interface';

export const initParams: IParams = {
  filters: [],
  joins: [],
  sorts: [],
  // page: 1,
  // per_page: 10,
};

export const initResult: IResult = {
  count: 0,
  data: [],
  page: 1,
  total: 0,
};

export const initErrorState: IErrorState = {
  statusCode: 0,
  statusText: '',
  message: '',
};

export const initSuccessState: ISuccessState = {
  statusCode: 0,
  statusText: '',
  message: '',
};

export const initCustomerData: ICustomerData = {
  name: '',
  address: '',
  npwp: '',
  phone: '',
};

export const initBillboardData: IBillboardData = {
  name: '',
  weight: 0,
  price: 0,
};

export const initSubdistrictData: ISubdistrictData = {
  name: '',
  weight: 0,
};
