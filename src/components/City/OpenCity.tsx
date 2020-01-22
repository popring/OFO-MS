import React from 'react';
import { Modal, Form, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const Option = Select.Option;
const FormItem = Form.Item;

interface IFormComponentProps extends FormComponentProps {
  onRef?: Function;
}

class openCity extends React.Component<IFormComponentProps> {
  state = {
    isShowOpen: false
  };

  handleShowOpen = () => {
    this.setState({
      isShowOpen: true
    });
  };

  handleSubmit = () => {
    const vals = this.props.form.getFieldsValue();
    console.log(vals);
    this.setState({
      isShowOpen: false
    });
    Modal.success({
      title: '开通提示',
      content: '开通成功'
    });
  };

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    };
    return (
      <div>
        <Modal
          title="开通城市"
          visible={this.state.isShowOpen}
          okText="开通"
          cancelText="取消"
          onOk={() => {
            this.handleSubmit();
          }}
          onCancel={() => {
            this.setState({
              isShowOpen: false
            });
          }}>
          <Form layout="horizontal">
            <FormItem label="开通城市" {...formItemLayout}>
              {getFieldDecorator('city_id', {
                initialValue: '0'
              })(
                <Select
                  onChange={value => {
                    this.setState({ cityID: value });
                  }}>
                  <Option value="0">全部</Option>
                  <Option value="1">北京市</Option>
                  <Option value="2">天津市</Option>
                  <Option value="3">深圳市</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="营运模式" {...formItemLayout}>
              {getFieldDecorator('op_mode', {
                initialValue: '0'
              })(
                <Select>
                  <Option value="0">全部</Option>
                  <Option value="1">自营</Option>
                  <Option value="2">加盟</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="加盟商授权状态" {...formItemLayout}>
              {getFieldDecorator('franchisee_name', {
                initialValue: '0'
              })(
                <Select>
                  <Option value="0">全部</Option>
                  <Option value="1">已授权</Option>
                  <Option value="2">未授权</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create<IFormComponentProps>()(openCity);
