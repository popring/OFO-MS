import axios from '@/config/axiosConfig.js';

export default {
  /**
  * 订单列表
  * @param {Object} params 请求参数
  */
  orderList(params) {
    return axios.get('/order/list.json', { params });
  },
  /**
   * 订单详情
   * @param {Object} params 请求参数
   */
  orderDetail(params) {
    return axios.get('/order/detail.json', { params });
  },
  /**
   * 城市管理
   * @param {Object} params 请求参数
   */
  openCity(params) {
    return axios.get('/open_city.json', { params });
  },
  /**
   * 通用表格demo接口
   */
  tableBasic() {
    return axios.get('/table/basictable.json')
  },
  /**
   * 通用表格demo接口 升级接口
   */
  tableBasic2(params) {
    return axios.get('/table/basictable2.json', { params })
  },

  userStaffCreate(params) {
    return axios.post('/user/add.json', {...params})
  },
  userStaffEdit(params) {
    return axios.post('/user/edit.json', {...params})
  },
  userStaffDelete(params) {
    return axios.post('/user/delete.json', params)
  }
}