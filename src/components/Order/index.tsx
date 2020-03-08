import React, { ComponentProps } from 'react';
import { Card, Button, Modal, message } from 'antd';
import Table, { TableListType } from 'components/common/Table';
import BaseForm, { FormType } from 'components/common/BaseForm';
import { orderList } from 'src/api';

type StateType = {
  selectedItem: any;
  selectedRowKeys: any;
};

class order extends React.Component<ComponentProps<any>, StateType> {
  state = {
    selectedItem: {},
    selectedRowKeys: ''
  };

  formList: FormType[] = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city_id',
      initialValue: '0',
      placeholder: '',
      style: { width: 150 },
      list: [
        { id: '0', name: '全部' },
        { id: '1', name: '北京市' },
        { id: '2', name: '上海市' },
        { id: '3', name: '广州市' }
      ]
    },
    {
      type: 'RANGEDATE',
      label: '',
      field: ''
    },
    {
      type: 'SELECT',
      label: '状态',
      field: 'state',
      initialValue: '0',
      placeholder: '',
      style: { width: 150 },
      list: [
        { id: '0', name: '全部' },
        { id: '1', name: '进行中' },
        { id: '2', name: '进行中（临时锁车）' },
        { id: '3', name: '行程结束' }
      ]
    }
  ];

  child: any = {};

  onRowClick = (record: any) => {
    this.setState({
      selectedRowKeys: [record.id],
      selectedItem: record
    });
  };

  openDetail = () => {
    const item = this.state.selectedItem || null;
    if (!item) {
      return Modal.info({
        title: '提示',
        content: '请先选择一条数据'
      });
    }
    // @ts-ignore
    window.open(`/common/order/detail/${item.id}`, '_blank');
  };

  onTableRef = (ref: any) => {
    this.child = ref;
  };

  getList = (fliterValue: any) => {
    this.child && this.child.getList(fliterValue);
  };

  closeOrder = () => {
    Modal.confirm({
      title: '友情提示',
      content: '确认关闭此订单吗？',
      onOk: () => {
        message.success('此订单关闭成功');
      }
    });
  };

  render() {
    const columns: TableListType[] = [
      {
        title: '订单编号',
        dataIndex: 'order_sn',
        key: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn',
        key: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name',
        key: 'user_name'
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance',
        key: 'distance',
        render(distance: number) {
          return distance / 1000 + 'Km';
        }
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time',
        key: 'total_time'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render(text: number) {
          let status = null;
          switch (text) {
            case 1:
              status = '进行中';
              break;
            case 2:
              status = '进行中（临时锁车）';
              break;
            case 3:
              status = '行程结束';
              break;
            default:
              break;
          }
          return status;
        }
      },
      {
        title: '开始时间',
        dataIndex: 'start_time',
        key: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
        key: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee',
        key: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay',
        key: 'user_pay'
      }
    ];
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    };
    return (
      <div>
        <Card>
          <BaseForm
            formList={this.formList}
            handleFilterSubmit={filterVals => {
              this.getList(filterVals);
            }}
          />
        </Card>
        <Card>
          <Button
            type="primary"
            style={{ marginBottom: 10 }}
            onClick={this.openDetail}
            disabled={selectedRowKeys.length === 0}>
            订单详情
          </Button>
          <Button
            type="primary"
            style={{ marginBottom: 10 }}
            onClick={this.closeOrder}
            disabled={selectedRowKeys.length === 0}>
            结束订单
          </Button>
          <Table
            onRef={this.onTableRef}
            apiGetList={orderList}
            columns={columns}
            rowKey="id"
            rowSelection={rowSelection}
            onRow={(record: any) => {
              return {
                onClick: (e: any) => {
                  this.onRowClick(record);
                }
              };
            }}
          />
        </Card>
      </div>
    );
  }
}

export default order;
