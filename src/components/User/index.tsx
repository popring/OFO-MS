import React, { useState, useImperativeHandle, useRef } from 'react';
import { Card, Button, Modal, Form, Radio, DatePicker, Input, message } from 'antd';
import Table, { TableListType } from 'components/common/Table';
import BaseForm, { FormType } from 'components/common/BaseForm';
import moment from 'moment';

import { userStaffCreate, userStaffEdit, userStaffDelete, tableBasic2 } from 'src/api';
import { FormComponentProps } from 'antd/lib/form';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const columns: TableListType[] = [
  { title: 'id', dataIndex: 'id', key: 'id' },
  { title: '姓名', dataIndex: 'userName', key: 'userName' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  {
    title: '性别',
    dataIndex: 'gender',
    render(gender: number) {
      return gender === 1 ? '男' : '女';
    },
    key: 'gender'
  },
  { title: '生日', dataIndex: 'birthday', key: 'birthday' },
  { title: '地址', dataIndex: 'address', key: 'address' },
  { title: '打卡时间', dataIndex: 'time', key: 'time' }
];
const formList: FormType[] = [
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
    type: 'RANGEDATE',
    field: '',
    label: ''
  }
];

function User() {
  const [key, setKey] = useState();
  const [row, setRow] = useState();
  const [type, setType] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const childModal: any = useRef(null);
  let child: any = undefined;

  const staffControl = (type: 'create' | 'edit' | 'info' | 'delete') => {
    setType(type);
    if (type === 'create') {
      setUserInfo(null);
      setModalShow(true);
    } else if (type === 'edit' || type === 'info') {
      setUserInfo(row);
      setModalShow(true);
    } else if (type === 'delete') {
      Modal.confirm({
        title: '删除提醒',
        content: '请确认是否删除',
        onOk: async () => {
          const res: any = await userStaffDelete({ id: row.id });
          if (res.result.code !== 1) {
            message.error('删除失败');
            return;
          }
          message.success('删除成功');
        }
      });
    }
  };

  const handleStaffSubmit = async () => {
    const values = childModal.current.getFieldsValue();
    if (type === 'create') {
      const res: any = await userStaffCreate(values);
      if (res.result.code !== 1) {
        return message.error('添加失败');
      }
      message.success('添加成功');
    } else if (type === 'edit') {
      const res: any = await userStaffEdit(values);
      if (res.result.code !== 1) {
        return message.error('操作失败');
      }
      message.success('操作成功');
    }
    setModalShow(false);
  };

  const handleSubmit = (vals: any) => {
    // 需将table组件重构为 hook 形式
    console.log(vals, child);
    // child.getList(vals);
    return;
  };

  const footer: { footer?: any } = {};
  if (type === 'info') {
    footer.footer = null;
  }
  return (
    <div>
      <Card>
        <BaseForm formList={formList} handleFilterSubmit={handleSubmit} />
      </Card>
      <Card>
        <Button
          type="primary"
          icon="plus"
          onClick={() => {
            staffControl('create');
          }}>
          创建员工
        </Button>
        <Button
          type="primary"
          icon="edit"
          onClick={() => {
            staffControl('edit');
          }}
          disabled={!key}>
          编辑员工
        </Button>
        <Button
          type="primary"
          icon="info-circle"
          onClick={() => {
            staffControl('info');
          }}
          disabled={!key}>
          查看详情
        </Button>
        <Button
          type="danger"
          icon="delete"
          onClick={() => {
            staffControl('delete');
          }}
          disabled={!key}>
          删除员工
        </Button>

        <Table
          onRef={(ref: any) => {
            child = ref;
            console.log(ref, child);
            return (child = ref);
          }}
          apiGetList={tableBasic2}
          columns={columns}
          rowKey="id"
          style={{ marginTop: 20 }}
          openRowSelection={(newKey: any, newRow: any) => {
            if (newKey !== key && newRow !== row) {
              setKey(newKey);
              setRow(newRow);
            }
          }}
        />
      </Card>

      <Modal
        title="操作"
        visible={modalShow}
        width={700}
        onCancel={() => {
          setModalShow(false);
        }}
        onOk={handleStaffSubmit}
        {...footer}>
        <UserModal userInfo={userInfo} onRef={childModal} type={type} />
      </Modal>
    </div>
  );
}
export default User;

interface IUserModal extends FormComponentProps {
  type: string;
  onRef: any;
  userInfo: {
    userName: string;
    age: string;
    gender: string;
    birthday: string;
    address: string;
  };
}

let UserModal: any = function(props: IUserModal) {
  const { getFieldDecorator } = props.form;
  const { onRef } = props;
  const userInfo = props.userInfo || {};
  const type = props.type;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 }
    }
  };

  useImperativeHandle(onRef, () => ({
    getFieldsValue: props.form.getFieldsValue
  }));
  return (
    <div>
      <Form layout="horizontal" {...formItemLayout}>
        <FormItem label="姓名">
          {userInfo && type === 'info'
            ? userInfo.userName
            : getFieldDecorator('user_name', {
                initialValue: userInfo.userName
              })(<Input type="text" placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem label="年龄">
          {userInfo && type === 'info'
            ? userInfo.age
            : getFieldDecorator('age', {
                initialValue: userInfo.age
              })(<Input type="Number" placeholder="请输入年轻" />)}
        </FormItem>
        <FormItem label="性别">
          {userInfo && type === 'info'
            ? userInfo.gender
            : getFieldDecorator('gender', {
                initialValue: String(userInfo.gender)
              })(
                <RadioGroup>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </RadioGroup>
              )}
        </FormItem>
        <FormItem label="生日">
          {userInfo && type === 'info'
            ? userInfo.birthday
            : getFieldDecorator('birthday', {
                initialValue: moment(userInfo.birthday)
              })(<DatePicker placeholder="请选择生日日期" />)}
        </FormItem>
        <FormItem label="地址">
          {userInfo && type === 'info'
            ? userInfo.address
            : getFieldDecorator('address', {
                initialValue: userInfo.address
              })(<Input type="text" placeholder="请输入通讯地址" />)}
        </FormItem>
      </Form>
    </div>
  );
};
UserModal = Form.create()(UserModal);
