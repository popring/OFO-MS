import React from 'react';
import { Table, Card, Button } from 'antd';
import OpenCity from './openCity';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';

export default class city extends React.Component {

  state = {
    dataSource: null,
    pagination: {}
  }

  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city_id',
      placeholder: '全部',
      initialValue: '0',
      style: { width: 120 },
      list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
    },
    {
      type: 'SELECT',
      label: '用车模式',
      field: 'mode',
      placeholder: '全部',
      initialValue: '1',
      style: { width: 150 },
      list: [{ id: '0', name: '全部' }, { id: '1', name: '指定停车点模式' }, { id: '2', name: '禁停区模式' }]
    },
    {
      type: 'SELECT',
      label: '营运模式',
      field: 'op_mode',
      placeholder: '全部',
      initialValue: '1',
      style: { width: 120 },
      list: [{ id: '0', name: '全部' }, { id: '1', name: '自营' }, { id: '2', name: '加盟' }]
    },
    {
      type: 'SELECT',
      label: '加盟商授权状态',
      field: 'franchisee_name',
      placeholder: '全部',
      initialValue: '0',
      style: { width: 120 },
      list: [{ id: '0', name: '全部' }, { id: '1', name: '已授权' }, { id: '2', name: '未授权' }]
    },
  ]

  params = {
    // 当前页数，默认为第一页
    page: 1
  }

  componentDidMount() {
    this.getData();
  }

  getData = (params = {}) => {
    if (!params.hasOwnProperty('page')) {
      params.page = 1;
    }
    Object.assign(this.params, params);
    this.setState({
      isLoading: true
    })
    this.axios.get('/open_city', {
      params: this.params
    })
      .then(res => {
        this.setState({
          dataSource: res.result.item_list,
          pagination: Utils.pagination(res, (current) => {
            this.params.page = current;
            this.getData(this.params);
          }),
          isLoading: false
        })
      })
  }

  handleShowOpen = () => {
    this.child.handleShowOpen();
  }

  onRef = (ref) => {
    this.child = ref;
  }

  render() {
    const dataSource = this.state.dataSource;
    const columns = [
      { title: '城市ID', dataIndex: 'id', key: 'id' },
      { title: '城市名称', dataIndex: 'name', key: 'name' },
      { title: '用车模式', dataIndex: 'mode', key: 'mode' },
      { title: '营运模式', dataIndex: 'op_mode', key: 'op_mode' },
      { title: '授权加盟商', dataIndex: 'franchisee_name', key: 'franchisee_name' },
      {
        title: '城市管理员', dataIndex: 'city_admins', key: 'city_admins', render: (text, row, index) => {
          return text.map(item => {
            return item.user_name;
          }).join(',');
        }
      },
      { title: '城市开通时间', dataIndex: 'open_time', key: 'open_time' },
      { title: '操作时间', dataIndex: 'update_time', key: 'update_time' },
      { title: '操作人', dataIndex: 'sys_user_name', key: 'sys_user_name' }
    ];
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} handleFilterSubmit={(fliterValue) => { this.getData(fliterValue) }} />
          <Button type="primary" onClick={this.handleShowOpen} style={{ marginBottom: 20 }}>开通城市</Button>
          <Table
            rowKey='id'
            columns={columns}
            bordered
            dataSource={dataSource}
            pagination={this.state.pagination}
            loading={this.state.isLoading}
          />
        </Card>
        <OpenCity onRef={this.onRef} />
      </div >
    )
  }
}
