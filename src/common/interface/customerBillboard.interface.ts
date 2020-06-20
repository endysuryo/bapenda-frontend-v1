import { IErrorState, IParams, IResult, ISuccessState } from './app.interface';

export interface ICustomerBillboardStore {
  isLoadingFetchCustomerBillboard: boolean;
  isLoadingCreateCustomerBillboard: boolean;
  isLoadingUpdateCustomerBillboard: boolean;
  isLoadingDeleteCustomerBillboard: boolean;
  customerBillboards: IResult;
  paramsCustomerBillboard: IParams;
  isCustomerBillboardError: boolean;
  customerBillboardErrorState: IErrorState;
  isCustomerBillboardSuccess: boolean;
  customerBillboardSuccessState: ISuccessState;
}

export interface ICustomerBillboardData {
  customer_id: string;
  billing_id: string;
  skpd_number: string;
  billboard_id: string;
  subdistrict_id: string;
  billboard_weight: number;
  billboard_total: number;
  subdistrict_weight: number;
  user_id: string;
}
