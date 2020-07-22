import {
  IErrorState,
  IParams,
  IResult,
  ISuccessState,
} from '@/common/interface/app.interface';
import { generateQueryString } from '@/common/utils/generateQuery';
import { formatErrorMessage } from '@/common/utils/helper';
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators';
import store from '..';
import {
  createOneSubdistrict,
  deleteOneSubdistrict,
  fetchSubdistrict,
  updateOneSubdistrict,
} from '../../common/api/subdistrict';
import {
  ISubdistrictData,
  ISubdistrictStore,
} from '../../common/interface/subdistrict.interface';
import {
  initErrorState,
  initParams,
  initResult,
  initSuccessState,
} from '../../common/utils/initialValue';

@Module({ dynamic: true, store, name: 'SubdistrictModule' })
class Subdistrict extends VuexModule implements ISubdistrictStore {
  isLoadingFetchSubdistrict = false;
  isLoadingCreateSubdistrict = false;
  isLoadingUpdateSubdistrict = false;
  isLoadingDeleteSubdistrict = false;
  subdistricts = initResult;
  paramsSubdistrict = { ...initParams };
  isSubdistrictError = false;
  subdistrictErrorState = initErrorState;
  isSubdistrictSuccess = false;
  subdistrictSuccessState = initSuccessState;

  @Action
  async fetchSubdistrict(params: IParams) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_FETCH_SUBDISTRICT(true);
      const queryString = await generateQueryString(params);
      const res: any = await fetchSubdistrict(queryString);

      if (res && res.data) {
        this.SET_LOADING_FETCH_SUBDISTRICT(false);
        this.SET_SUBDISTRICTS(res.data);
      } else {
        this.SET_LOADING_FETCH_SUBDISTRICT(false);
        this.SET_SUBDISTRICTS(initResult);
      }
    } catch (error) {
      this.SET_LOADING_FETCH_SUBDISTRICT(false);
      this.SET_SUBDISTRICTS(initResult);
      this.SET_INDICATOR_ERROR_SUBDISTRICT(true);
      this.SET_ERROR_SUBDISTRICT(formatErrorMessage(error));
    }
  }

  @Action
  async createOneSubdistrict(data: ISubdistrictData) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_CREATE_SUBDISTRICT(true);
      const res: any = await createOneSubdistrict(data);
      if (res && res.data) {
        this.SET_LOADING_CREATE_SUBDISTRICT(false);
        this.fetchSubdistrict(initParams);
      } else {
        this.SET_LOADING_CREATE_SUBDISTRICT(false);
      }
    } catch (error) {
      this.SET_LOADING_CREATE_SUBDISTRICT(false);
      this.SET_INDICATOR_ERROR_SUBDISTRICT(true);
      this.SET_ERROR_SUBDISTRICT(formatErrorMessage(error));
    }
  }

  @Action
  async updateOneSubdistrict(data: ISubdistrictData) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_UPDATE_SUBDISTRICT(true);
      const res: any = await updateOneSubdistrict((data as any).id, data);
      if (res) {
        this.SET_LOADING_UPDATE_SUBDISTRICT(false);
        this.fetchSubdistrict(initParams);
      } else {
        this.SET_LOADING_UPDATE_SUBDISTRICT(false);
      }
    } catch (error) {
      this.SET_LOADING_UPDATE_SUBDISTRICT(false);
      this.SET_INDICATOR_ERROR_SUBDISTRICT(true);
      this.SET_ERROR_SUBDISTRICT(formatErrorMessage(error));
    }
  }

  @Action
  async deleteOneSubdistrict(id: string) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_DELETE_SUBDISTRICT(true);
      const res: any = await deleteOneSubdistrict(id);
      if (res) {
        this.SET_LOADING_DELETE_SUBDISTRICT(false);
        this.fetchSubdistrict(initParams);
      } else {
        this.SET_LOADING_DELETE_SUBDISTRICT(false);
      }
    } catch (error) {
      this.SET_LOADING_DELETE_SUBDISTRICT(false);
      this.SET_INDICATOR_ERROR_SUBDISTRICT(true);
      this.SET_ERROR_SUBDISTRICT(formatErrorMessage(error));
    }
  }

  @Mutation
  SET_SUBDISTRICTS(payload: IResult) {
    this.subdistricts = payload;
  }

  @Mutation
  CLEAN_ACTION() {
    this.isSubdistrictError = false;
    this.isSubdistrictSuccess = false;
    this.subdistrictSuccessState = initSuccessState;
    this.subdistrictErrorState = initErrorState;
  }

  @Mutation
  SET_LOADING_FETCH_SUBDISTRICT(payload: boolean) {
    this.isLoadingFetchSubdistrict = payload;
  }

  @Mutation
  SET_LOADING_CREATE_SUBDISTRICT(payload: boolean) {
    this.isLoadingCreateSubdistrict = payload;
  }

  @Mutation
  SET_LOADING_UPDATE_SUBDISTRICT(payload: boolean) {
    this.isLoadingUpdateSubdistrict = payload;
  }

  @Mutation
  SET_LOADING_DELETE_SUBDISTRICT(payload: boolean) {
    this.isLoadingDeleteSubdistrict = payload;
  }

  @Mutation
  SET_INDICATOR_ERROR_SUBDISTRICT(payload: boolean) {
    this.isSubdistrictError = payload;
  }

  @Mutation
  SET_ERROR_SUBDISTRICT(payload: IErrorState) {
    this.subdistrictErrorState = payload;
  }

  @Mutation
  SET_INDICATOR_SUCCESS_SUBDISTRICT(payload: boolean) {
    this.isSubdistrictSuccess = payload;
  }

  @Mutation
  SET_SUCCESS_SUBDISTRICT(payload: ISuccessState) {
    this.subdistrictSuccessState = payload;
  }
}

export const SubdistrictModule = getModule(Subdistrict);
