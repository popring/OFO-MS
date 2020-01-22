import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import OpenCity from './OpenCity';
import Table from 'src/components/common/Table';
import BaseForm, { FormType } from 'src/components/common/BaseForm';
import { openCities } from 'src/api/index';

const formList: FormType[] = [
  {
    type: 'SELECT',
    label: '城市',
    field: 'city_id',
    placeholder: '全部',
    initialValue: '0',
    style: { width: 120 },
    list: [
      { id: '0', name: '全部' },
      { id: '1', name: '北京' },
      { id: '2', name: '天津' },
      { id: '3', name: '上海' }
    ]
  },
  {
    type: 'SELECT',
    label: '用车模式',
    field: 'mode',
    placeholder: '全部',
    initialValue: '0',
    style: { width: 150 },
    list: [
      { id: '0', name: '全部' },
      { id: '1', name: '指定停车点模式' },
      { id: '2', name: '禁停区模式' }
    ]
  },
  {
    type: 'SELECT',
    label: '营运模式',
    field: 'op_mode',
    placeholder: '全部',
    initialValue: '0',
    style: { width: 120 },
    list: [
      { id: '0', name: '全部' },
      { id: '1', name: '自营' },
      { id: '2', name: '加盟' }
    ]
  },
  {
    type: 'SELECT',
    label: '加盟商授权状态',
    field: 'franchisee_name',
    placeholder: '全部',
    initialValue: '0',
    style: { width: 120 },
    list: [
      { id: '0', name: '全部' },
      { id: '1', name: '已授权' },
      { id: '2', name: '未授权' }
    ]
  }
];

type childType = {
  form: any;
  table: any;
};

export default class City extends React.Component {
  state = {};

  // 存放子组件ref
  child: childType = {
    form: {},
    table: {}
  };

  handleShowOpen = () => {
    this.child.form.handleShowOpen();
  };

  onFormRef = (ref: any) => {
    this.child.form = ref;
  };

  onTableRef = (ref: any) => {
    this.child.table = ref;
  };

  getList = (fliterValue: any) => {
    this.child.table.getList(fliterValue);
  };

  render() {
    const columns = [
      { title: '城市ID', dataIndex: 'id', key: 'id' },
      { title: '城市名称', dataIndex: 'name', key: 'name' },
      {
        title: '用车模式',
        dataIndex: 'mode',
        key: 'mode',
        render(mode: number) {
          switch (mode) {
            case 1:
              return '指定停车点模式';
            case 2:
              return '禁停区模式';
            default:
              break;
          }
        }
      },
      {
        title: '营运模式',
        dataIndex: 'op_mode',
        key: 'op_mode',
        render(op_mode: number) {
          switch (op_mode) {
            case 1:
              return '自营';
            case 2:
              return '加盟';
            default:
              break;
          }
        }
      },
      { title: '授权加盟商', dataIndex: 'franchisee_name', key: 'franchisee_name' },
      {
        title: '城市管理员',
        dataIndex: 'city_admins',
        key: 'city_admins',
        render: (text: Array<any>) => {
          return text
            .map(item => {
              return item.user_name;
            })
            .join(',');
        }
      },
      { title: '城市开通时间', dataIndex: 'open_time', key: 'open_time' },
      { title: '操作时间', dataIndex: 'update_time', key: 'update_time' },
      { title: '操作人', dataIndex: 'sys_user_name', key: 'sys_user_name' }
    ];
    return (
      <Row>
        <Card>
          <BaseForm
            formList={formList}
            handleFilterSubmit={(fliterValue: { [field: string]: any }) => {
              this.getList(fliterValue);
            }}
          />
        </Card>
        <Card>
          <Col xs={24}>
            <Button type="primary" onClick={this.handleShowOpen} style={{ marginBottom: 20 }}>
              开通城市
            </Button>
          </Col>
          <Table rowKey="id" columns={columns} apiGetList={openCities} onRef={this.onTableRef} />
        </Card>
        <OpenCity onRef={this.onFormRef} />
      </Row>
    );
  }
}
