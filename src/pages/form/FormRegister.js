import React from 'react'
import { Card, Form, Input, Radio, InputNumber, Select, Switch, DatePicker, Upload, message, Icon } from 'antd';
import RadioGroup from 'antd/lib/radio/group';
import moment from 'moment';


const FormItem = Form.Item;
const InputPassword = Input.Password;
const Option = Select.Option;
const { TextArea } = Input;
class FormRegister extends React.Component {

  state = {
    imageUrl: ''
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = (info) => {
    console.log(info)
    if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            userImg:imageUrl,
            loading: false,
        }));
    }
}

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        md: { span: 16 },
      },
    };

    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0,
    //     },
    //     sm: {
    //       span: 16,
    //       offset: 8,
    //     },
    //   },
    // };
    const { imageUrl } = this.state;
    return (
      <div>
        <Card title="注册表单">
          <Form>
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  rules: [
                    { required: true, message: '用户名别忘了写哦' }
                  ]
                })(
                  <Input />
                )
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('userPwd', {
                  rules: [
                    { required: true, message: '密码别忘了写哦' }
                  ]
                })(
                  <InputPassword />
                )
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('gender', {
                  initialValue: '2'
                })(
                  <RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  rules: [
                    { pattern: new RegExp(/^[1-9]\d*$/, 'g') }
                  ],
                  initialValue: 18
                })(
                  <InputNumber />
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '4'
                })(
                  <Select>
                    <Option value="1">咸鱼一条</Option>
                    <Option value="2">清华才子</Option>
                    <Option value="3">风华浪子</Option>
                    <Option value="4">产品经理</Option>
                    <Option value="5">FE</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {
                getFieldDecorator('hobby', {
                  initialValue: ['1', '3']
                })(
                  <Select mode="multiple">
                    <Option value="1">唱</Option>
                    <Option value="2">跳</Option>
                    <Option value="3">Rap</Option>
                    <Option value="4">Free Style</Option>
                    <Option value="5">打篮球</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Switch />
                )
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: new moment('1998-11-02')
                })(
                  <DatePicker
                    disabledDate={(currentDate) => {
                      return currentDate > moment();
                    }}
                  />
                )
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '北京市海淀区颐和园路5号北京大学'
                })(
                  <TextArea
                    autosize={{ minRows: 2, maxRows: 6 }}
                    placeholder="请输入地址"
                  />
                )
              }
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('userImg')(
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={this.handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="" /> : <Icon type="plus" />}
                  </Upload>
                )
              }
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormRegister)