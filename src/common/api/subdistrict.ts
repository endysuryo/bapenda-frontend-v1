import { ISubdistrictData } from '../interface/subdistrict.interface';
import { requestSubdistrict } from '../utils/request';

export const fetchSubdistrict = (queryString: string) =>
  requestSubdistrict({
    url: `/subdistricts${queryString ? '?' + queryString : ''}`,
    method: 'get',
  });

export const createOneSubdistrict = (data: ISubdistrictData) =>
  requestSubdistrict({
    url: '/subdistricts',
    method: 'post',
    data,
  });

export const updateOneSubdistrict = (
  id: string,
  data: Partial<ISubdistrictData>,
) => {
  return requestSubdistrict({
    url: '/subdistricts/' + id,
    method: 'patch',
    data,
  });
};

export const deleteOneSubdistrict = (id: string) =>
  requestSubdistrict({
    url: '/subdistricts/' + id,
    method: 'delete',
  });
