/*
 * @Description: 接口管理
 * @Author: Harry.Hao
 * @Date: 2020-01-18 15:23:39
 * @Last Modified
 * time: 2020-01-18 15:23:39
 */
import axios, { get, post } from './config';

export const getTableBasic = () => get('/table/basictable.json');
