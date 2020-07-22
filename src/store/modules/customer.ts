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
import store from '../';
import {
  createOneCustomer,
  deleteOneCustomer,
  fetchCustomer,
  updateOneCustomer,
} from '../../common/api/customer';
import {
  ICustomerData,
  ICustomerStore,
} from '../../common/interface/customer.interface';
import {
  initErrorState,
  initParams,
  initResult,
  initSuccessState,
} from '../../common/utils/initialValue';

@Module({ dynamic: true, store, name: 'CustomerModule' })
class Customer extends VuexModule implements ICustomerStore {
  isLoadingFetchCustomer = false;
  isLoadingCreateCustomer = false;
  isLoadingUpdateCustomer = false;
  isLoadingDeleteCustomer = false;
  customers = initResult;
  paramsCustomer = { ...initParams };
  isCustomerError = false;
  customerErrorState = initErrorState;
  isCustomerSuccess = false;
  customerSuccessState = initSuccessState;

  @Action
  async fetchCustomer(params: IParams) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_FETCH_CUSTOMER(true);
      const queryString = await generateQueryString(params);
      const res: any = await fetchCustomer(queryString);

      if (res && res.data) {
        this.SET_LOADING_FETCH_CUSTOMER(false);
        this.SET_CUSTOMERS(res.data);
      } else {
        this.SET_LOADING_FETCH_CUSTOMER(false);
        this.SET_CUSTOMERS(initResult);
      }
    } catch (error) {
      this.SET_LOADING_FETCH_CUSTOMER(false);
      this.SET_CUSTOMERS(initResult);
      this.SET_INDICATOR_ERROR_CUSTOMER(true);
      this.SET_ERROR_CUSTOMER(formatErrorMessage(error));
    }
  }

  @Action
  async createOneCustomer(data: ICustomerData) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_CREATE_CUSTOMER(true);
      const res: any = await createOneCustomer(data);
      if (res && res.data) {
        this.SET_LOADING_CREATE_CUSTOMER(false);
        this.fetchCustomer(initParams);
      } else {
        this.SET_LOADING_CREATE_CUSTOMER(false);
      }
    } catch (error) {
      this.SET_LOADING_CREATE_CUSTOMER(false);
      this.SET_INDICATOR_ERROR_CUSTOMER(true);
      this.SET_ERROR_CUSTOMER(formatErrorMessage(error));
    }
  }

  @Action
  async updateOneCustomer(data: ICustomerData) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_UPDATE_CUSTOMER(true);
      const res: any = await updateOneCustomer((data as any).id, data);
      if (res) {
        this.SET_LOADING_UPDATE_CUSTOMER(false);
        this.fetchCustomer(initParams);
      } else {
        this.SET_LOADING_UPDATE_CUSTOMER(false);
      }
    } catch (error) {
      this.SET_LOADING_UPDATE_CUSTOMER(false);
      this.SET_INDICATOR_ERROR_CUSTOMER(true);
      this.SET_ERROR_CUSTOMER(formatErrorMessage(error));
    }
  }

  @Action
  async deleteOneCustomer(id: string) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_DELETE_CUSTOMER(true);
      const res: any = await deleteOneCustomer(id);
      if (res) {
        this.SET_LOADING_DELETE_CUSTOMER(false);
        this.fetchCustomer(initParams);
      } else {
        this.SET_LOADING_DELETE_CUSTOMER(false);
      }
    } catch (error) {
      this.SET_LOADING_DELETE_CUSTOMER(false);
      this.SET_INDICATOR_ERROR_CUSTOMER(true);
      this.SET_ERROR_CUSTOMER(formatErrorMessage(error));
    }
  }

  @Mutation
  SET_CUSTOMERS(payload: IResult) {
    this.customers = payload;
  }

  @Mutation
  CLEAN_ACTION() {
    this.isCustomerError = false;
    this.isCustomerSuccess = false;
    this.customerSuccessState = initSuccessState;
    this.customerErrorState = initErrorState;
  }

  @Mutation
  SET_LOADING_FETCH_CUSTOMER(payload: boolean) {
    this.isLoadingFetchCustomer = payload;
  }

  @Mutation
  SET_LOADING_CREATE_CUSTOMER(payload: boolean) {
    this.isLoadingCreateCustomer = payload;
  }

  @Mutation
  SET_LOADING_UPDATE_CUSTOMER(payload: boolean) {
    this.isLoadingUpdateCustomer = payload;
  }

  @Mutation
  SET_LOADING_DELETE_CUSTOMER(payload: boolean) {
    this.isLoadingDeleteCustomer = payload;
  }

  @Mutation
  SET_INDICATOR_ERROR_CUSTOMER(payload: boolean) {
    this.isCustomerError = payload;
  }

  @Mutation
  SET_ERROR_CUSTOMER(payload: IErrorState) {
    this.customerErrorState = payload;
  }

  @Mutation
  SET_INDICATOR_SUCCESS_CUSTOMER(payload: boolean) {
    this.isCustomerSuccess = payload;
  }

  @Mutation
  SET_SUCCESS_CUSTOMER(payload: ISuccessState) {
    this.customerSuccessState = payload;
  }
}

export const CustomerModule = getModule(Customer);
