import { Table } from 'antd';
import { TableComponents } from 'antd/lib/table';
import React from 'react';
import { Pagination } from '../../utils/utils';

/**
 * 本组件封装了 antd Table 组件，自带loading
 * @param {Function(): Promise} apiGetList 必填项，传入 api 接口的调用函数
 * @param {Function(ref): void} onRef 获取本组件的对象
 * @param {string|Function(record):string} rowKey 同官网
 * @param {Function(key, row):void} openRowSelection 开启单选模式
 * @param {...} otherAttribute 其他antd Table组件的方法
 *
 *
 * Example
 * <Table
 *   apiGetList={this.$api.tableBasic2}
 *   onRef={ref => this.child = ref}
 *   columns={columns}
 *   rowKey="id"
 *   style={{ marginTop: 20 }}
 *   openRowSelection={(key, row) => {
 *     const { key: oldKey, row: oldRow } = this.state;
 *     if (oldKey !== key && oldRow !== row) {
 *       this.setState({
 *         key,
 *         row
 *       })
 *     }
 *   }}
 * />
 */

type TableList = {
  title: string;
  dataIndex: string;
  key: string;
  render?: Function;
};

interface ITableComponents extends TableComponents {
  rowKey: string | ((record: unknown, index: number) => string);
  apiGetList: Function;
  onRef?: Function;
  openRowSelection?: Function;
  columns: TableList[];
  onTest?: string;
  [index: string]: any;
}

export default class ComponentTable extends React.Component<ITableComponents> {
  state = {
    // 表格数据源
    dataSource: undefined,
    // 分页
    pagination: {},
    // 加载中
    isLoading: false,
    // 单选数据
    selectedRows: null,
    selectedRowKeys: null
  };

  // 请求参数
  params = {
    page: 1
  };

  /**
   * 请求接口
   * @param {Object} fliterValue 筛选条件参数
   */
  getList = async (fliterValue = {}) => {
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
      pagination: Pagination(res, (current: number) => {
        this.params.page = current;
        this.getList(this.params);
      }),
      selectedRows: null,
      selectedRowKeys: null,
      isLoading: false
    });
  };

  componentDidMount() {
    this.props.onRef?.(this);
    this.getList();
  }

  componentDidUpdate() {
    // 组件内 选中的值 发生改变，则传递到父组件
    if (typeof this.props.openRowSelection === 'function') {
      const { selectedRowKeys, selectedRows } = this.state;
      this.props.openRowSelection(selectedRowKeys, selectedRows);
    }
  }

  filterProps = () => {
    // 自定义属性
    const tableAttr = ['rowKey', 'onRef', 'apiGetList', 'openRowSelection'];
    const props: any = {
      rowKey: this.props.rowKey
    };

    // 过滤从父级获取的属性，过滤掉自己覆盖写的方法，剩下的属性直接赋值给原生antd的Table
    Object.keys(this.props)
      .filter(key => !tableAttr.includes(key))
      .forEach((key: any) => {
        props[key] = this.props[key];
      });

    // 单选
    if (this.props.openRowSelection) {
      const { selectedRowKeys } = this.state;
      const rowSelection = {
        type: 'radio',
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys: string, selectedRows: Array<any>) => {
          this.setState({
            selectedRows: selectedRows,
            selectedRowKeys: selectedRowKeys
          });
        }
      };

      const onRow = (record: any) => {
        return {
          onClick: () => {
            this.setState({
              selectedRows: record,
              selectedRowKeys: [record[props.rowKey]]
            });
          }
        };
      };

      props.rowSelection = rowSelection;
      props.onRow = onRow;
    }

    return props;
  };

  render() {
    const props = this.filterProps();
    return (
      <Table
        rowKey={props.rowKey}
        bordered
        dataSource={this.state.dataSource}
        pagination={this.state.pagination}
        loading={this.state.isLoading}
        {...props}
      />
    );
  }
}
