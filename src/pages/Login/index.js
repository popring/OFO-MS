import React from 'react';
import './index.less';
import { connect } from 'react-redux';
import { userLogin } from '@/redux/action'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (err) return
      this.logIn();
    })
  };

  logIn = () => {
    const { getFieldValue } = this.props.form;
    // 用户信息
    const userInfo = {
      userName: getFieldValue('userName'),
      token: getFieldValue('password')
    };
    window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    const { dispatch } = this.props;
    dispatch(userLogin(userInfo));
    this.props.history.push('/admin');
  }

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
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="/#/login">
                Forgot password
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
              Or <a href="/#/login">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user
  }
}

export default connect(mapStateToProps)(Form.create()(Login))