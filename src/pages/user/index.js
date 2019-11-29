import React, { Component } from 'react';
import { Card, Button, Tooltip } from 'antd';
import Table from '@/components/Table';
import BaseForm from '@/components/BaseForm';

export class User extends Component {

  state = {
    btnTips: '请选中一行数据进行操作',
    rowSelect: {
      key: null,
      row: null
    }
  }
  formList = [
    {
      type: 'INPUT',
      field: 'username',
      label: '用户名',
      placeholder: '请输入用户名称'
    },
    {
      type: 'INPUT',
      field: 'mobile',
      label: '手机',
      placeholder: '请输入手机号码'
    },
    {
      type: 'RANGEDATE'
    }
  ]

  rowSelect = {
    key: null,
    row: null
  }

  handleSubmit = (vals) => {
    this.child.getList(vals);
    console.log(vals);
  }

  staffCreate = () => {
    console.log('create');
  }

  staffEdit = () => {
    console.log('edit');
    const { row } = this.state;
    console.log(row);
  }

  staffInfo = () => {
    console.log('staffInfo');
  }

  staffDelete = () => {
    console.log('staffDelete');
  }

  render() {
    const columns = [
      { title: 'id', dataIndex: 'id' },
      { title: '姓名', dataIndex: 'userName' },
      { title: '年龄', dataIndex: 'age' },
      { title: '性别', dataIndex: 'gender', render(gender) { return gender === 1 ? '男' : '女'; } },
      { title: '生日', dataIndex: 'birthday' },
      { title: '地址', dataIndex: 'address' },
      { title: '打卡时间', dataIndex: 'time' }
    ];
    const { key } = this.state;
    let btnTips = this.state.btnTips;
    if (key) {
      btnTips = '';
    }
    console.log('父组件  render');
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} handleFilterSubmit={(filterVals) => this.handleSubmit(filterVals)} />
        </Card>
        <Card>
          <Button type="primary" icon="plus" onClick={this.staffCreate}>创建员工</Button>
          <Tooltip placement="top" title={btnTips}>
            <Button type="primary" icon="edit" onClick={this.staffEdit} disabled={!key}>编辑员工</Button>
          </Tooltip>
          <Tooltip placement="top" title={btnTips}>
            <Button type="warning" icon="info-circle" onClick={this.staffInfo} disabled={!key}>查看详情</Button>
          </Tooltip>
          <Tooltip placement="top" title={btnTips}>
            <Button type="danger" icon="delete" onClick={this.staffDelete} disabled={!key}>删除员工</Button>
          </Tooltip>

          <Table
            onRef={ref => this.child = ref}
            apiGetList={this.$api.tableBasic2}
            columns={columns}
            rowKey="id"
            style={{ marginTop: 20 }}
            openRowSelection={(key, row) => {
              const { key: oldKey, row: oldRow } = this.state;
              if (oldKey !== key && oldRow !== row) {
                this.setState({
                  key,
                  row
                })
              }
            }}
          />
        </Card>
      </div>
    );
  }
}

export default User;
