import React from 'react';
import { Card, Form, Select, DatePicker, Button, Table } from 'antd';
import moment from 'moment';
import Utils from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
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

  componentDidMount() {
    this.requestData(this.params);
  }

  requestData = (params = {}) => {
    const filterVals = this.props.form.getFieldsValue();
    // console.log(filterVals);
    this.params = { ...this.params, ...filterVals };
    console.log(this.params)
    this.axios.get('/order/list', {
      params: {...this.params}
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

  render() {
    const { getFieldDecorator } = this.props.form;
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
          <Form layout='inline'>
            <FormItem label="城市">
              {
                getFieldDecorator('city_id', {
                  initialValue: '0'
                })(
                  <Select style={{ width: 150 }}>
                    <Option value="0">全部</Option>
                    <Option value="1">北京市</Option>
                    <Option value="2">上海市</Option>
                    <Option value="3">广州市</Option>
                    <Option value="4">深圳市</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="查询时间区间">
              {
                getFieldDecorator('rangeDate', {
                  initialValue: [moment().subtract(1, 'M'), moment()]
                })(
                  <RangePicker
                    placeholder={['开始时间', '结束时间']}
                  />
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('state', {
                  initialValue: '0'
                })(
                  <Select style={{ width: 150 }}>
                    <Option value="0">全部</Option>
                    <Option value="1">进行中</Option>
                    <Option value="2">进行中（临时锁车）</Option>
                    <Option value="3">行程结束</Option>
                  </Select>
                )
              }
            </FormItem>
          </Form>
        </Card>
        <Card>
          <Button type="primary" style={{ marginBottom: 10 }}>订单详情</Button>
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
      </div>
    );
  }
}

export default Form.create()(order);