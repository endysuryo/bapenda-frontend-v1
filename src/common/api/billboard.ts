import { IBillboardData } from '../interface/billboard.interface';
import { requestBillboard } from '../utils/request';

export const fetchBillboard = (queryString: string) =>
  requestBillboard({
    url: `/billboards${queryString ? '?' + queryString : ''}`,
    method: 'get',
  });

export const createOneBillboard = (data: IBillboardData) =>
  requestBillboard({
    url: '/billboards',
    method: 'post',
    data,
  });

export const updateOneBillboard = (
  id: string,
  data: Partial<IBillboardData>,
) => {
  return requestBillboard({
    url: '/billboards/' + id,
    method: 'patch',
    data,
  });
};

export const deleteOneBillboard = (id: string) =>
  requestBillboard({
    url: '/billboards/' + id,
    method: 'delete',
  });
