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
  createOneUser,
  deleteOneUser,
  fetchOneUser,
  fetchUser,
  updateOneUser,
} from '../../common/api/user';
import { IUserData, IUserStore } from '../../common/interface/user.interface';
import {
  initErrorState,
  initParams,
  initResult,
  initSuccessState,
} from '../../common/utils/initialValue';

@Module({ dynamic: true, store, name: 'UserModule' })
class User extends VuexModule implements IUserStore {
  isLoadingFetchUser = false;
  isLoadingCreateUser = false;
  isLoadingUpdateUser = false;
  isLoadingDeleteUser = false;
  users = initResult;
  paramsUser = { ...initParams };
  isUserError = false;
  userErrorState = initErrorState;
  isUserSuccess = false;
  userSuccessState = initSuccessState;

  @Action
  async fetchUser(params: IParams) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_FETCH_USER(true);
      const queryString = await generateQueryString(params);
      const res: any = await fetchUser(queryString);

      if (res && res.data) {
        this.SET_LOADING_FETCH_USER(false);
        this.SET_USERS(res.data);
      } else {
        this.SET_LOADING_FETCH_USER(false);
        this.SET_USERS(initResult);
      }
    } catch (error) {
      this.SET_LOADING_FETCH_USER(false);
      this.SET_USERS(initResult);
      this.SET_INDICATOR_ERROR_USER(true);
      this.SET_ERROR_USER(formatErrorMessage(error));
    }
  }

  @Action
  async createOneUser(data: IUserData) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_CREATE_USER(true);
      const res: any = await createOneUser(data);
      if (res && res.data) {
        this.SET_LOADING_CREATE_USER(false);
        this.fetchUser(initParams);
      } else {
        this.SET_LOADING_CREATE_USER(false);
      }
    } catch (error) {
      this.SET_LOADING_CREATE_USER(false);
      this.SET_INDICATOR_ERROR_USER(true);
      this.SET_ERROR_USER(formatErrorMessage(error));
    }
  }

  @Action
  async updateOneUser(data: IUserData) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_UPDATE_USER(true);
      const res: any = await updateOneUser((data as any).id, data);
      if (res) {
        this.SET_LOADING_UPDATE_USER(false);
        this.fetchOneUser((data as any).id);
      } else {
        this.SET_LOADING_UPDATE_USER(false);
      }
    } catch (error) {
      this.SET_LOADING_UPDATE_USER(false);
      this.SET_INDICATOR_ERROR_USER(true);
      this.SET_ERROR_USER(formatErrorMessage(error));
    }
  }

  @Action
  async deleteOneUser(id: string) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_DELETE_USER(true);
      const res: any = await deleteOneUser(id);
      if (res) {
        this.SET_LOADING_DELETE_USER(false);
        this.fetchUser(initParams);
      } else {
        this.SET_LOADING_DELETE_USER(false);
      }
    } catch (error) {
      this.SET_LOADING_DELETE_USER(false);
      this.SET_INDICATOR_ERROR_USER(true);
      this.SET_ERROR_USER(formatErrorMessage(error));
    }
  }

  @Action
  async fetchOneUser(id: string) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_DELETE_USER(true);
      const res: any = await fetchOneUser(id);
      if (res && res.data) {
        this.SET_LOADING_FETCH_USER(false);
        this.SET_USERS(res.data);
      } else {
        this.SET_LOADING_FETCH_USER(false);
        this.SET_USERS(initResult);
      }
    } catch (error) {
      this.SET_LOADING_DELETE_USER(false);
      this.SET_INDICATOR_ERROR_USER(true);
      this.SET_ERROR_USER(formatErrorMessage(error));
    }
  }

  @Mutation
  SET_USERS(payload: IResult) {
    this.users = payload;
  }

  @Mutation
  CLEAN_ACTION() {
    this.isUserError = false;
    this.isUserSuccess = false;
    this.userSuccessState = initSuccessState;
    this.userErrorState = initErrorState;
  }

  @Mutation
  SET_LOADING_FETCH_USER(payload: boolean) {
    this.isLoadingFetchUser = payload;
  }

  @Mutation
  SET_LOADING_CREATE_USER(payload: boolean) {
    this.isLoadingCreateUser = payload;
  }

  @Mutation
  SET_LOADING_UPDATE_USER(payload: boolean) {
    this.isLoadingUpdateUser = payload;
  }

  @Mutation
  SET_LOADING_DELETE_USER(payload: boolean) {
    this.isLoadingDeleteUser = payload;
  }

  @Mutation
  SET_INDICATOR_ERROR_USER(payload: boolean) {
    this.isUserError = payload;
  }

  @Mutation
  SET_ERROR_USER(payload: IErrorState) {
    this.userErrorState = payload;
  }

  @Mutation
  SET_INDICATOR_SUCCESS_USER(payload: boolean) {
    this.isUserSuccess = payload;
  }

  @Mutation
  SET_SUCCESS_USER(payload: ISuccessState) {
    this.userSuccessState = payload;
  }
}

export const UserModule = getModule(User);
