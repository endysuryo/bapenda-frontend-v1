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
  createOneBillboard,
  deleteOneBillboard,
  fetchBillboard,
  updateOneBillboard,
} from '../../common/api/billboard';
import {
  IBillboardData,
  IBillboardStore,
} from '../../common/interface/billboard.interface';
import {
  initErrorState,
  initParams,
  initResult,
  initSuccessState,
} from '../../common/utils/initialValue';

@Module({ dynamic: true, store, name: 'BillboardModule' })
class Billboard extends VuexModule implements IBillboardStore {
  isLoadingFetchBillboard = false;
  isLoadingCreateBillboard = false;
  isLoadingUpdateBillboard = false;
  isLoadingDeleteBillboard = false;
  billboards = initResult;
  paramsBillboard = { ...initParams };
  isBillboardError = false;
  billboardErrorState = initErrorState;
  isBillboardSuccess = false;
  billboardSuccessState = initSuccessState;

  @Action
  async fetchBillboard(params: IParams) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_FETCH_BILLBOARD(true);
      const queryString = await generateQueryString(params);
      const res: any = await fetchBillboard(queryString);

      if (res && res.data) {
        this.SET_LOADING_FETCH_BILLBOARD(false);
        console.info('billboard res.data', res.data);

        this.SET_BILLBOARDS(res.data);
      } else {
        this.SET_LOADING_FETCH_BILLBOARD(false);
        this.SET_BILLBOARDS(initResult);
      }
    } catch (error) {
      this.SET_LOADING_FETCH_BILLBOARD(false);
      this.SET_BILLBOARDS(initResult);
      this.SET_INDICATOR_ERROR_BILLBOARD(true);
      this.SET_ERROR_BILLBOARD(formatErrorMessage(error));
    }
  }

  @Action
  async createOneBillboard(data: IBillboardData) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_CREATE_BILLBOARD(true);
      const res: any = await createOneBillboard(data);
      if (res && res.data) {
        this.SET_LOADING_CREATE_BILLBOARD(false);
        this.fetchBillboard(initParams);
      } else {
        this.SET_LOADING_CREATE_BILLBOARD(false);
      }
    } catch (error) {
      this.SET_LOADING_CREATE_BILLBOARD(false);
      this.SET_INDICATOR_ERROR_BILLBOARD(true);
      this.SET_ERROR_BILLBOARD(formatErrorMessage(error));
    }
  }

  @Action
  async updateOneBillboard(data: IBillboardData) {
    try {
      console.info('action data', data);
      this.CLEAN_ACTION();
      this.SET_LOADING_UPDATE_BILLBOARD(true);
      const res: any = await updateOneBillboard((data as any).id, data);
      if (res) {
        this.SET_LOADING_UPDATE_BILLBOARD(false);
        this.fetchBillboard(initParams);
      } else {
        this.SET_LOADING_UPDATE_BILLBOARD(false);
      }
    } catch (error) {
      this.SET_LOADING_UPDATE_BILLBOARD(false);
      this.SET_INDICATOR_ERROR_BILLBOARD(true);
      this.SET_ERROR_BILLBOARD(formatErrorMessage(error));
    }
  }

  @Action
  async deleteOneBillboard(id: string) {
    try {
      this.CLEAN_ACTION();
      this.SET_LOADING_DELETE_BILLBOARD(true);
      const res: any = await deleteOneBillboard(id);
      if (res) {
        this.SET_LOADING_DELETE_BILLBOARD(false);
        this.fetchBillboard(initParams);
      } else {
        this.SET_LOADING_DELETE_BILLBOARD(false);
      }
    } catch (error) {
      this.SET_LOADING_DELETE_BILLBOARD(false);
      this.SET_INDICATOR_ERROR_BILLBOARD(true);
      this.SET_ERROR_BILLBOARD(formatErrorMessage(error));
    }
  }

  @Mutation
  SET_BILLBOARDS(payload: IResult) {
    this.billboards = payload;
  }

  @Mutation
  CLEAN_ACTION() {
    this.isBillboardError = false;
    this.isBillboardSuccess = false;
    this.billboardSuccessState = initSuccessState;
    this.billboardErrorState = initErrorState;
  }

  @Mutation
  SET_LOADING_FETCH_BILLBOARD(payload: boolean) {
    this.isLoadingFetchBillboard = payload;
  }

  @Mutation
  SET_LOADING_CREATE_BILLBOARD(payload: boolean) {
    this.isLoadingCreateBillboard = payload;
  }

  @Mutation
  SET_LOADING_UPDATE_BILLBOARD(payload: boolean) {
    this.isLoadingUpdateBillboard = payload;
  }

  @Mutation
  SET_LOADING_DELETE_BILLBOARD(payload: boolean) {
    this.isLoadingDeleteBillboard = payload;
  }

  @Mutation
  SET_INDICATOR_ERROR_BILLBOARD(payload: boolean) {
    this.isBillboardError = payload;
  }

  @Mutation
  SET_ERROR_BILLBOARD(payload: IErrorState) {
    this.billboardErrorState = payload;
  }

  @Mutation
  SET_INDICATOR_SUCCESS_BILLBOARD(payload: boolean) {
    this.isBillboardSuccess = payload;
  }

  @Mutation
  SET_SUCCESS_BILLBOARD(payload: ISuccessState) {
    this.billboardSuccessState = payload;
  }
}

export const BillboardModule = getModule(Billboard);
