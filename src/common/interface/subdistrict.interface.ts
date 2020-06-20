import { IErrorState, IParams, IResult, ISuccessState } from './app.interface';

export interface ISubdistrictStore {
  isLoadingFetchSubdistrict: boolean;
  isLoadingCreateSubdistrict: boolean;
  isLoadingUpdateSubdistrict: boolean;
  isLoadingDeleteSubdistrict: boolean;
  subdistricts: IResult;
  paramsSubdistrict: IParams;
  isSubdistrictError: boolean;
  subdistrictErrorState: IErrorState;
  isSubdistrictSuccess: boolean;
  subdistrictSuccessState: ISuccessState;
}

export interface ISubdistrictData {
  name: string;
  weight: number;
}
