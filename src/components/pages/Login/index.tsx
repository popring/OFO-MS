import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import './index.less';
// import { connect } from 'react-redux';
// import { userLogin } from '@/redux/action';

class Login extends React.Component<FormComponentProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields(err => {
      if (err) return;
      window.alert('登陆成功');
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="bg-con">
        <div className="login">
          <Form className="login-form" onSubmit={this.handleSubmit}>
            <Form.Item>
              <h2>登陆</h2>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名' }]
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名(管理员 admin, 用户 user)" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }]
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密    码(管理员 admin, 用户 user)" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <a className="login-form-forgot" href="/login">
                忘记密码
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
