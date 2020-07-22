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
  createOneCustomerBillboard,
  deleteOneCustomerBillboard,
  fetchCustomerBillboard,
  fetchCustomerBillboardByDate,
  generateKmeans,
  updateOneCustomerBillboard,
} from '../../common/api/customerBillboard';
import {
  ICustomerBillboardData,
  ICustomerBillboardStore,
  IParamCustomerBillboard,
} from '../../common/interface/customerBillboard.interface';
import {
  initErrorState,
  initParams,
  initResult,
  initSuccessState,
} from '../../common/utils/initialValue';

@Module({ dynamic: true, store, name: 'CustomerBillboardModule' })
class CustomerBillboard extends VuexModule implements ICustomerBillboardStore {
  isLoadingFetchCustomerBillboard = false;
  isLoadingCreateCustomerBillboard = false;
  isLoadingUpdateCustomerBillboard = false;
  isLoadingDeleteCustomerBillboard = false;
  customerBillboards = initResult;
  customerBillboardByDates = [];
  kmeans = [];
  paramsCustomerBillboard = { ...initParams };
  isCustomerBillboardError = false;
  customerBillboardErrorState = initErrorState;
  isCustomerBillboardSuccess = false;
  customerBillboardSuccessState = initSuccessState;
  isSnackBarSaveCustomerBillboard = false;

  @Action
  async generateKmeans(data: any) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_FETCH_CUSTOMER_BILLBOARD(true);
      const res: any = await generateKmeans(data);

      if (res && res.data) {
        this.SET_LOADING_FETCH_CUSTOMER_BILLBOARD(false);
        this.SET_KMEANS(res.data);
      } else {
        this.SET_LOADING_FETCH_CUSTOMER_BILLBOARD(false);
        this.SET_CUSTOMER_BILLBOARDS(initResult);
      }
    } catch (error) {
      this.SET_LOADING_FETCH_CUSTOMER_BILLBOARD(false);
      this.SET_CUSTOMER_BILLBOARDS(initResult);
      this.SET_INDICATOR_ERROR_CUSTOMER_BILLBOARD(true);
      this.SET_ERROR_CUSTOMER_BILLBOARD(formatErrorMessage(error));
    }
  }

  @Action
  async fetchCustomerBillboard(params: IParams) {
    try {
      this.CLEAN_ACTION();
      this.SET_SNACKBAR_SAVE_CUSTOMER_BILLBOARD(false);
      this.SET_LOADING_FETCH_CUSTOMER_BILLBOARD(true);
      const queryString = await generateQueryString(params);
      const res: any = await fetchCustomerBillboard(queryString);

      if (res && res.data) {
        this.SET_LOADING_FETCH_CUSTOMER_BILLBOARD(false);
        this.SET_CUSTOMER_BILLBOARDS(res.data);
      } else {
        this.SET_LOADING_FETCH_CUSTOMER_BILLBOARD(false);
        this.SET_CUSTOMER_BILLBOARDS(initResult);
      }
    } catch (error) {
      this.SET_LOADING_FETCH_CUSTOMER_BILLBOARD(false);
      this.SET_CUSTOMER_BILLBOARDS(initResult);
      this.SET_INDICATOR_ERROR_CUSTOMER_BILLBOARD(true);
      this.SET_ERROR_CUSTOMER_BILLBOARD(formatErrorMessage(error));
    }
  }

  @Action
  async fetchCustomerBillboardByDate(params: IParamCustomerBillboard) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_FETCH_CUSTOMER_BILLBOARD(true);
      const res: any = await fetchCustomerBillboardByDate(params);

      if (res && res.data) {
        this.SET_LOADING_FETCH_CUSTOMER_BILLBOARD(false);
        this.SET_CUSTOMER_BILLBOARD_BY_DATES(res.data);
      } else {
        this.SET_LOADING_FETCH_CUSTOMER_BILLBOARD(false);
        this.SET_CUSTOMER_BILLBOARDS(initResult);
      }
    } catch (error) {
      this.SET_LOADING_FETCH_CUSTOMER_BILLBOARD(false);
      this.SET_CUSTOMER_BILLBOARDS(initResult);
      this.SET_INDICATOR_ERROR_CUSTOMER_BILLBOARD(true);
      this.SET_ERROR_CUSTOMER_BILLBOARD(formatErrorMessage(error));
    }
  }

  @Action
  async createOneCustomerBillboard(data: ICustomerBillboardData) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_CREATE_CUSTOMER_BILLBOARD(true);
      this.SET_SNACKBAR_SAVE_CUSTOMER_BILLBOARD(false);
      const res: any = await createOneCustomerBillboard(data);
      if (res && res.data) {
        this.SET_LOADING_CREATE_CUSTOMER_BILLBOARD(false);
        this.fetchCustomerBillboard(initParams);
        this.SET_SNACKBAR_SAVE_CUSTOMER_BILLBOARD(true);
      } else {
        this.SET_LOADING_CREATE_CUSTOMER_BILLBOARD(false);
      }
    } catch (error) {
      this.SET_LOADING_CREATE_CUSTOMER_BILLBOARD(false);
      this.SET_INDICATOR_ERROR_CUSTOMER_BILLBOARD(true);
      this.SET_ERROR_CUSTOMER_BILLBOARD(formatErrorMessage(error));
    }
  }

  @Action
  async updateOneCustomerBillboard(data: ICustomerBillboardData) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_UPDATE_CUSTOMER_BILLBOARD(true);
      const res: any = await updateOneCustomerBillboard((data as any).id, data);
      if (res) {
        this.SET_LOADING_UPDATE_CUSTOMER_BILLBOARD(false);
        this.fetchCustomerBillboard(initParams);
      } else {
        this.SET_LOADING_UPDATE_CUSTOMER_BILLBOARD(false);
      }
    } catch (error) {
      this.SET_LOADING_UPDATE_CUSTOMER_BILLBOARD(false);
      this.SET_INDICATOR_ERROR_CUSTOMER_BILLBOARD(true);
      this.SET_ERROR_CUSTOMER_BILLBOARD(formatErrorMessage(error));
    }
  }

  @Action
  async deleteOneCustomerBillboard(id: string) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_DELETE_CUSTOMER_BILLBOARD(true);
      const res: any = await deleteOneCustomerBillboard(id);
      if (res) {
        this.SET_LOADING_DELETE_CUSTOMER_BILLBOARD(false);
        this.fetchCustomerBillboard(initParams);
      } else {
        this.SET_LOADING_DELETE_CUSTOMER_BILLBOARD(false);
      }
    } catch (error) {
      this.SET_LOADING_DELETE_CUSTOMER_BILLBOARD(false);
      this.SET_INDICATOR_ERROR_CUSTOMER_BILLBOARD(true);
      this.SET_ERROR_CUSTOMER_BILLBOARD(formatErrorMessage(error));
    }
  }

  @Action
  async cleanCustomerBillboard() {
    try {
      this.CLEAN_ACTION();
    } catch (error) {
      this.SET_LOADING_DELETE_CUSTOMER_BILLBOARD(false);
      this.SET_INDICATOR_ERROR_CUSTOMER_BILLBOARD(true);
      this.SET_ERROR_CUSTOMER_BILLBOARD(formatErrorMessage(error));
    }
  }

  @Mutation
  SET_CUSTOMER_BILLBOARDS(payload: IResult) {
    this.customerBillboards = payload;
  }

  @Mutation
  SET_CUSTOMER_BILLBOARD_BY_DATES(payload: any) {
    this.customerBillboardByDates = payload;
  }

  @Mutation
  SET_KMEANS(payload: any) {
    this.kmeans = payload;
  }

  @Mutation
  CLEAN_ACTION() {
    this.isCustomerBillboardError = false;
    this.isCustomerBillboardSuccess = false;
    this.customerBillboardSuccessState = initSuccessState;
    this.customerBillboardErrorState = initErrorState;
    this.customerBillboardByDates = [];
    this.kmeans = [];
  }

  @Mutation
  SET_LOADING_FETCH_CUSTOMER_BILLBOARD(payload: boolean) {
    this.isLoadingFetchCustomerBillboard = payload;
  }

  @Mutation
  SET_LOADING_CREATE_CUSTOMER_BILLBOARD(payload: boolean) {
    this.isLoadingCreateCustomerBillboard = payload;
  }

  @Mutation
  SET_LOADING_UPDATE_CUSTOMER_BILLBOARD(payload: boolean) {
    this.isLoadingUpdateCustomerBillboard = payload;
  }

  @Mutation
  SET_LOADING_DELETE_CUSTOMER_BILLBOARD(payload: boolean) {
    this.isLoadingDeleteCustomerBillboard = payload;
  }

  @Mutation
  SET_SNACKBAR_SAVE_CUSTOMER_BILLBOARD(payload: boolean) {
    this.isSnackBarSaveCustomerBillboard = payload;
  }

  @Mutation
  SET_INDICATOR_ERROR_CUSTOMER_BILLBOARD(payload: boolean) {
    this.isCustomerBillboardError = payload;
  }

  @Mutation
  SET_ERROR_CUSTOMER_BILLBOARD(payload: IErrorState) {
    this.customerBillboardErrorState = payload;
  }

  @Mutation
  SET_INDICATOR_SUCCESS_CUSTOMER_BILLBOARD(payload: boolean) {
    this.isCustomerBillboardSuccess = payload;
  }

  @Mutation
  SET_SUCCESS_CUSTOMER_BILLBOARD(payload: ISuccessState) {
    this.customerBillboardSuccessState = payload;
  }
}

export const CustomerBillboardModule = getModule(CustomerBillboard);
