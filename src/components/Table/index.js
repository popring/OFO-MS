import React from 'react';
import { Table } from 'antd';
import Utils from '../../utils/utils';

/**
 * 本组件封装了 antd Table 组件，自带loading
 * @param {Function} apiGetList 必填项，传入 api 接口的调用函数，例如：this.$api.orderList
 * @param {} onRef 获取本组件的对象
 * @param {...} otherAttribute 其他antd Table组件的方法
 */
export default class ComponentTable extends React.Component {
  state = {
    // 表格数据源
    dataSource: null,
    // 分页
    pagination: {},
    // 加载中
    isLoading: false,
    // 单选数据
    selectedRows: null,
    selectedRowKeys: null,
  }

  // 请求参数
  params = {
    page: 1
  }

  /**
   * 请求接口
   * @param {Object} fliterValue 筛选条件参数
   */
  getList = async (fliterValue = {}) => {
    if (!this.props.hasOwnProperty('apiGetList')) {
      return;
    }
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
    if (this.props.hasOwnProperty('onRef')) {
      this.props.onRef(this)
    }
    this.getList();
  }

  render() {
    const rowKey = this.props.rowKey || 'id';
    // 自定义属性
    const tableAttr = ['rowKey', 'onRef', 'apiGetList', 'openRowSelection', 'getRowKeys'];
    const props = {};

    // 过滤从父级获取的属性，过滤掉自己覆盖写的方法，剩下的属性直接赋值给原生antd的Table
    Object.keys(this.props).filter(
      (key) => !tableAttr.includes(key)
    ).forEach((key) => {
      props[key] = this.props[key]
    });

    // 单选
    if (this.props.openRowSelection) {
      const { selectedRowKeys, selectedRows } = this.state;
      const rowSelection = {
        type: 'radio',
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({
            selectedRows: selectedRows,
            selectedRowKeys: selectedRowKeys
          })
        }
      };

      const onRow = record => {
        return {
          onClick: e => {
            this.setState({
              selectedRows: record,
              selectedRowKeys: [record[rowKey]]
            })
          },
        }
      }

      props.rowSelection = rowSelection;
      props.onRow = onRow;
    }


    return (
      <Table
        rowKey={rowKey}
        bordered
        dataSource={this.state.dataSource}
        pagination={this.state.pagination}
        loading={this.state.isLoading}
        {...props}
      />
    );
  }
}