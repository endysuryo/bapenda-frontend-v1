import { ICustomerBillboardData } from '../interface/customerBillboard.interface';
import { requestCustomerBillboard } from '../utils/request';

export const fetchCustomerBillboard = (queryString: string) =>
  requestCustomerBillboard({
    url: `/customerBillboards${queryString ? '?' + queryString : ''}`,
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
