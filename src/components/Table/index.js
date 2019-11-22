import React from 'react';
import { Table } from 'antd';
import Utils from '../../utils/utils';

export default class ComponentTable extends React.Component {
  state = {
    // 表格数据源
    dataSource: null,
    // 分页
    pagination: {},
    // 加载中
    isLoading: false
  }

  // 请求参数
  params = {
    page: 1
  }

  /**
   * 请求接口
   * @param {Object} fliterValue 筛选条件参数
   */
  getList = async (fliterValue) => {
    // 获取父组件传进来的请求接口
    const apiGetList = this.props.apiGetList;
    this.setState({
      isLoading: true
    });
    const params = this.params;
    this.params = { ...params, ...fliterValue };
    const res = await apiGetList(this.params);
    this.setState({
      dataSource: res.result.item_list,
      pagination: Utils.pagination(res, (current) => {
        this.params.page = current;
        this.getList(this.params);
      }),
      isLoading: false
    });
  }

  componentDidMount() {
    this.props.onRef(this)
    this.getList();
  }

  render() {
    const columns = this.props.columns;
    const rowKey = this.props.rowKey;
    
    // 自定义属性
    const tableAttr = ['rowKey', 'columns', 'onRef', 'apiGetList'];
    const props = {};

    // 过滤从父级获取的属性
    Object.keys(this.props).filter(
      (key) => !tableAttr.includes(key)
    ).forEach((key) => {
      props[key] = this.props[key]
    })
    console.log(props);


    return (
      <Table
        rowKey={rowKey}
        columns={columns}
        bordered
        dataSource={this.state.dataSource}
        pagination={this.state.pagination}
        loading={this.state.isLoading}
        {...props}
      />
    );
  }
}