import React from 'react';
import { Card, Form, Input, Button, Icon, Checkbox, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const FormItem = Form.Item;

class FormLogin extends React.Component<FormComponentProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(err);
      if (!err) {
        console.log(123);
        message.success(`${values.userName} 。。。 ${values.userPwd}`);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="登陆行内表单">
          <Form layout="inline">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名' }]
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                登陆
              </Button>
            </FormItem>
          </Form>
        </Card>

        <Card title="登陆垂直表单">
          <Form layout="horizontal" style={{ width: 300 }} onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [
                  { required: true, message: '请输入用户名' },
                  { min: 5, message: '最少为5个字符' },
                  { pattern: new RegExp('^\\w+$', 'g'), message: '用户名只能为字母或数字' }
                ]
              })(<Input prefix={<Icon type="user" />} placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('userPwd', {
                rules: [
                  { required: true, message: '请输入密码' },
                  { min: 5, message: '面最少为5个字符' }
                ]
              })(<Input prefix={<Icon type="lock" />} placeholder="请输入密码" type="password" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('stickPwd', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <a href="#/admin/form/login" style={{ float: 'right' }}>
                Forget Password
              </a>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                登陆
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormLogin);
