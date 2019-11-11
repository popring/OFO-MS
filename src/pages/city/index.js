import React from 'react';
import { Table, Card } from 'antd';
import FilterModule from './filterModule'
import Utils from '../../utils/utils';


export default class city extends React.Component {

  state = {
    dataSource: null,
    pagination: {}
  }

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
    this.axios.get('/open_city', {
      params: this.params
    })
      .then(res => {
        this.setState({
          dataSource: res.result.item_list,
          pagination: Utils.pagination(res, (current) => {
            this.params.page = current;
            this.getData(this.params);
          })
        })
      })
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
          <FilterModule getData={(fliterValue) => { this.getData(fliterValue) }} />
          <Table
            rowKey='id'
            columns={columns}
            bordered
            dataSource={dataSource}
            pagination={this.state.pagination}
          />
        </Card>
      </div >
    )
  }
}
