import React from 'react';
import { Form, Button, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class filterModule extends React.Component {

  state = {
    filter: {
      cityID: 0
    }
  }

  // 筛选查询
  handleSubmit = e => {
    e.preventDefault();
    const filterParams = this.props.form.getFieldsValue();
    this.props.getData(filterParams);
  }

  // 重置表单
  handleClearFilter = (e) => {
    this.props.form.resetFields();
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ marginBottom: 20 }}>
        <div>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem label="城市">
              {
                getFieldDecorator('city_id', {
                  initialValue: '0'
                })(
                  <Select style={{ width: 120 }} onChange={(value) => { this.setState({ cityID: value }) }}>
                    <Option value="0">全部</Option>
                    <Option value="1">北京市</Option>
                    <Option value="2">天津市</Option>
                    <Option value="3">深圳市</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="用车模式">
              {
                getFieldDecorator('mode', {
                  initialValue: '0'
                })(
                  <Select style={{ width: 120 }}>
                    <Option value="0">全部</Option>
                    <Option value="1">指定停车点模式</Option>
                    <Option value="2">禁停区模式</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="营运模式">
              {
                getFieldDecorator('op_mode', {
                  initialValue: '0'
                })(
                  <Select style={{ width: 120 }}>
                    <Option value="0">全部</Option>
                    <Option value="1">自营</Option>
                    <Option value="2">加盟</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="加盟商授权状态">
              {
                getFieldDecorator('franchisee_name', {
                  initialValue: '0'
                })(
                  <Select style={{ width: 120 }}>
                    <Option value="0">全部</Option>
                    <Option value="1">已授权</Option>
                    <Option value="2">未授权</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button onClick={this.handleClearFilter}>重置</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(filterModule);