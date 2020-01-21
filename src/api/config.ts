/*
 * @Author: Harry.Hao 
 * @Date: 2020-01-18 15:23:39 
 * @Last Modified by:   Harry.Hao 
 * @Last Modified time: 2020-01-20 23:06:34 
 */

import axios from 'axios';
import { Modal } from 'antd';

let URL = {
  koa: 'http://localhost:5000/v1/api',
  static: '/api'
};
axios.defaults.baseURL = URL.static;

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  async function(response) {
    // 对响应数据做点什么
    if (response.data.code !== 200) {
      Modal.error({
        title: '请求错误',
        content: `错误${response.data.code}, ${response.data.msg}`
      });
    }
    response = response.data;
    await delay(500);
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    Modal.destroyAll();
    Modal.error({
      title: '请求错误',
      content: `当前网络似乎有点问题，请检查后重试一下吧！`
    });
    return Promise.reject(error);
  }
);

export const get = axios.get;

export const post = axios.post;

export function delay(time: number = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      // xxx
      resolve();
    }, time);
  });
}

export default axios;
