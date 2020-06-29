import { IErrorState, IParams, IResult, ISuccessState } from './app.interface';

export interface IUserStore {
  isLoadingFetchUser: boolean;
  isLoadingCreateUser: boolean;
  isLoadingUpdateUser: boolean;
  isLoadingDeleteUser: boolean;
  users: IResult;
  paramsUser: IParams;
  isUserError: boolean;
  userErrorState: IErrorState;
  isUserSuccess: boolean;
  userSuccessState: ISuccessState;
}

export interface IUserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  token: string;
  token_expired: string;
}
