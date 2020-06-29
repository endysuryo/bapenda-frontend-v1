import { IUserData } from '../interface/user.interface';
import { requestUser } from '../utils/request';

export const fetchUser = (queryString: string) =>
  requestUser({
    url: `/users${queryString ? '?' + queryString : ''}`,
    method: 'get',
  });

export const createOneUser = (data: IUserData) =>
  requestUser({
    url: '/users',
    method: 'post',
    data,
  });

export const updateOneUser = (id: string, data: Partial<IUserData>) => {
  return requestUser({
    url: '/users/' + id,
    method: 'patch',
    data,
  });
};

export const deleteOneUser = (id: string) =>
  requestUser({
    url: '/users/' + id,
    method: 'delete',
  });

export const fetchOneUser = (id: string) =>
  requestUser({
    url: '/users/' + id,
    method: 'get',
  });
