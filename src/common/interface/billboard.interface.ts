import { IErrorState, IParams, IResult, ISuccessState } from './app.interface';

export interface IBillboardStore {
  isLoadingFetchBillboard: boolean;
  isLoadingCreateBillboard: boolean;
  isLoadingUpdateBillboard: boolean;
  isLoadingDeleteBillboard: boolean;
  billboards: IResult;
  paramsBillboard: IParams;
  isBillboardError: boolean;
  billboardErrorState: IErrorState;
  isBillboardSuccess: boolean;
  billboardSuccessState: ISuccessState;
}

export interface IBillboardData {
  name: string;
  weight: number;
  price: number;
}
