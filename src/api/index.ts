/*
 * @Description: 接口管理
 * @Author: Harry.Hao
 * @Date: 2020-01-18 15:23:39
 * @Last Modified
 * time: 2020-01-22 14:51:24
 */
import { get, post, put, deletee } from './config';

export const tableBasic = () => get('/table/basictable.json');

export const tableBasic2 = () => get('/table/basictable2.json');

export const openCities = (params: any) => get('/open_city.json', { params });

export const orderList = (params: any) => get('/order/list.json', { params });

export const userStaffCreate = (params: any) => put('/user/add.json', { ...params });

export const userStaffEdit = (params: any) => post('/user/edit.json', params);

export const userStaffDelete = (params: any) => deletee('/user/delete.json', params);
