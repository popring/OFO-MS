import React, { Component } from 'react';
import { Card, Button, Tooltip, Modal, Form, Radio, DatePicker, Input, message } from 'antd';
import Table from '@/components/Table';
import BaseForm from '@/components/BaseForm';
import moment from 'moment';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
export class User extends Component {

  state = {
    btnTips: '请选中一行数据进行操作',
    modalShow: false,
    key: null,
    row: null,
    userInfo: null,
    type: null
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

  handleSubmit = (vals) => {
    this.child.getList(vals);
  }

  staffControl = (type) => {
    if (type === 'create') {
      this.setState({
        userInfo: null,
        modalShow: true,
        type
      })
    } else if (type === 'edit' || type === 'info') {
      this.setState({
        userInfo: this.state.row,
        modalShow: true,
        type
      })
    } else if (type === 'delete') {
      Modal.confirm({
        title: '删除提醒',
        content: '请确认是否删除',
        onOk: async () => {
          const res = await this.$api.userStaffDelete({ id: this.state.row.id });
          if(res.result.code !== 1) {
            message.error('删除失败');
            return;
          }
          message.success('删除成功')
        }
      })
    }
  }

  handleStaffSubmit = async () => {
    const { type } = this.state;
    const values = this.childModal.props.form.getFieldsValue();
    console.log(values);
    if (type === 'create') {
      const res = await this.$api.userStaffCreate(values);
      if (res.result.code !== 1) {
        return message.error('添加失败');
      }
      message.success('添加成功')
    } else if (type === 'edit') {
      const res = await this.$api.userStaffEdit(values);
      if (res.result.code !== 1) {
        return message.error('操作失败');
      }
      message.success('操作成功')
    }
    this.setState({
      modalShow: false
    })
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
    const { key, type } = this.state;
    let btnTips = this.state.btnTips;
    if (key) {
      btnTips = '';
    }
    const footer = {};
    if (type === 'info') {
      footer.footer = null;
    }
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} handleFilterSubmit={(filterVals) => this.handleSubmit(filterVals)} />
        </Card>
        <Card>
          <Button type="primary" icon="plus" onClick={() => { this.staffControl('create') }}>创建员工</Button>
          <Tooltip placement="top" title={btnTips}>
            <Button type="primary" icon="edit" onClick={() => { this.staffControl('edit') }} disabled={!key}>编辑员工</Button>
          </Tooltip>
          <Tooltip placement="top" title={btnTips}>
            <Button type="warning" icon="info-circle" onClick={() => { this.staffControl('info') }} disabled={!key}>查看详情</Button>
          </Tooltip>
          <Tooltip placement="top" title={btnTips}>
            <Button type="danger" icon="delete" onClick={() => { this.staffControl('delete') }} disabled={!key}>删除员工</Button>
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

        <Modal
          title="操作"
          visible={this.state.modalShow}
          width={700}
          onCancel={
            () => {
              this.setState({ modalShow: false });
            }}
          onOk={this.handleStaffSubmit}
          {...footer}
        >
          <UserModal
            userInfo={this.state.userInfo}
            onRef={ref => this.childModal = ref}
            type={this.state.type}
          />
        </Modal>
      </div>
    );
  }
}

export default User;


class UserModal extends Component {

  componentDidMount() {
    this.props.onRef(this);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const userInfo = this.props.userInfo || {};
    const type = this.props.type;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };
    return (
      <div>
        <Form layout='horizontal' {...formItemLayout}>
          <FormItem label="姓名">
            {
              userInfo && type === 'info' ? userInfo.userName :
                getFieldDecorator('user_name', {
                  initialValue: userInfo.userName,
                })(
                  <Input type="text" placeholder="请输入姓名" />
                )
            }
          </FormItem>
          <FormItem label="年龄">
            {
              userInfo && type === 'info' ? userInfo.age :
                getFieldDecorator('age', {
                  initialValue: userInfo.age
                })(
                  <Input type="Number" placeholder="请输入年轻" />
                )
            }
          </FormItem>
          <FormItem label="性别">
            {
              userInfo && type === 'info' ? userInfo.gender :
                getFieldDecorator('gender', {
                  initialValue: String(userInfo.gender)
                })(
                  <RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
            }
          </FormItem>
          <FormItem label="生日">
            {
              userInfo && type === 'info' ? userInfo.birthday :
                getFieldDecorator('birthday', {
                  initialValue: moment(userInfo.birthday)
                })(
                  <DatePicker placeholder="请选择生日日期" />
                )
            }
          </FormItem>
          <FormItem label="地址">
            {
              userInfo && type === 'info' ? userInfo.address :
                getFieldDecorator('address', {
                  initialValue: userInfo.address
                })(
                  <Input type="text" placeholder="请输入通讯地址" />
                )
            }
          </FormItem>
        </Form>
      </div>
    );
  }
}
UserModal = Form.create()(UserModal);