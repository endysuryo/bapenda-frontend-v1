export interface IAppState {
  loadingProcess: boolean;
}

export interface IParams {
  filters?: any[];
  joins?: any[];
  sorts?: any[];

  page?: number;
  per_page?: number;
}

export interface IResult {
  count: number;
  data: any;
  page: number;
  total: number;
}

export interface IErrorState {
  statusCode: number;
  statusText: string;
  message: string;
}
export interface ISuccessState {
  statusCode: number;
  statusText: string;
  message: string;
}
