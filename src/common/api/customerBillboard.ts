import {
  ICustomerBillboardData,
  IParamCustomerBillboard,
} from '../interface/customerBillboard.interface';
import { requestCustomerBillboard } from '../utils/request';

export const generateKmeans = (data: any) =>
  requestCustomerBillboard({
    url: `/customerBillboards/kmeans/generate`,
    method: 'post',
    data,
  });

export const fetchCustomerBillboard = (queryString: string) =>
  requestCustomerBillboard({
    url: `/customerBillboards${queryString ? '?' + queryString : ''}`,
    method: 'get',
  });

export const fetchCustomerBillboardByDate = (data: IParamCustomerBillboard) =>
  requestCustomerBillboard({
    url:
      '/customerBillboards/start/' + data.start_date + '/end/' + data.end_date,
    method: 'get',
  });

export const createOneCustomerBillboard = (data: ICustomerBillboardData) =>
  requestCustomerBillboard({
    url: '/customerBillboards',
    method: 'post',
    data,
  });

export const updateOneCustomerBillboard = (
  id: string,
  data: Partial<ICustomerBillboardData>,
) => {
  return requestCustomerBillboard({
    url: '/customerBillboards/' + id,
    method: 'patch',
    data,
  });
};

export const deleteOneCustomerBillboard = (id: string) =>
  requestCustomerBillboard({
    url: '/customerBillboards/' + id,
    method: 'delete',
  });
