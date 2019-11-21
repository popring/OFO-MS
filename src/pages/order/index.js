import React from 'react';
import { Card, Form, Button, Table, Modal } from 'antd';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';

class order extends React.Component {

  state = {
    data: null,
    pagination: {},
    selectedRowKeys: null,
    selectedItem: null
  }

  params = {
    page: 1
  }

  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city_id',
      initialValue: '0',
      placeholder: '',
      style: { width: 150 },
      list: [{ id: '0', name: '全部' }, { id: '1', name: '北京市' }, { id: '2', name: '上海市' }, { id: '3', name: '广州市' }]
    },
    {
      type: 'RANGEDATE'
    },
    {
      type: 'SELECT',
      label: '状态',
      field: 'state',
      initialValue: '0',
      placeholder: '',
      style: { width: 150 },
      list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '进行中（临时锁车）' }, { id: '3', name: '行程结束' }]
    }
  ]
  componentDidMount() {
    this.requestData(this.params);
  }

  requestData = (params = {}) => {
    this.params = { ...this.params, ...params };
    this.axios.get('/order/list', {
      params: this.params
    })
      .then(res => {
        this.setState({
          data: res.result.item_list,
          pagination: Utils.pagination(res, current => {
            this.params.page = current;
            this.requestData(this.params);
          })
        })
      })
  }

  onRowClick = (record) => {
    this.setState({
      selectedRowKeys: [record.id],
      selectedItem: record
    })
  }

  openDetail = () => {
    const item = this.state.selectedItem
    // console.log(item)
    if (!item) {
      return Modal.info({
        title: '提示',
        content: '请先选择一条数据'
      });
    }
    window.open(`/#/common/order/detail/${item.id}`, '_blank');
  }

  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render(distance) {
          return distance / 1000 + 'Km';
        }
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time'
      },
      {
        title: '状态',
        dataIndex: 'status'
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ];
    const data = this.state.data;
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} handleFilterSubmit={(filterVals) => { this.requestData(filterVals) }} />
        </Card>
        <Card>
          <Button type="primary" style={{ marginBottom: 10 }} onClick={this.openDetail}>订单详情</Button>
          <Button type="primary" style={{ marginBottom: 10 }}>结束订单</Button>
          <Table
            dataSource={data}
            columns={columns}
            bordered
            rowKey="id"
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: e => {
                  this.onRowClick(record, index);
                }
              }
            }}
          />
        </Card>
      </div >
    );
  }
}

export default Form.create()(order);