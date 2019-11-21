import React from 'react';
import { Form, Button, Select, Input, DatePicker } from 'antd';
import moment from "moment";
import Utils from '../../utils/utils';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
class FilterForm extends React.Component {

  handleFilterSubmit = (e) => {
    e.preventDefault();
    const filterValues = this.props.form.getFieldsValue();
    this.props.handleFilterSubmit(filterValues);
  }

  handleClearFilter = () => {
    this.props.form.resetFields();
  }

  initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    const formListItem = [];
    if (!formList || formList.length <= 0) {
      return formListItem;
    }
    formList.forEach((item, i) => {
      // 必填
      let label = item.label;
      let field = item.field;
      let type = String(item.type).toUpperCase();
      // 选填
      let initialValue = item.initialValue || '';
      let placeholder = item.placeholder || '';
      let style = item.style || {};

      if (type === 'SELECT') {
        const SELECT = (
          <FormItem label={label} key={field} >
            {
              getFieldDecorator(field, {
                initialValue: initialValue
              })(
                <Select placeholder={placeholder} style={style}>
                  {Utils.getOptionList(item.list)}
                </Select>
              )
            }
          </FormItem>);
        formListItem.push(SELECT);
      } else if (type === 'INPUT') {
        const INPUT = (
          <FormItem label={label} key={field} style={style}>
            {
              getFieldDecorator(field, {
                initialValue: initialValue
              })(
                <Input placeholder={placeholder} />
              )
            }
          </FormItem>);
        formListItem.push(INPUT);
      } else if (type === 'RANGEDATE') {
        const RANGEDATE = (
          <FormItem label="查询时间区间" key={field || 'rangedate'}>
            {
              getFieldDecorator('rangeDate', {
                initialValue: [moment().subtract(1, 'M'), moment()]
              })(
                <RangePicker
                  placeholder={['开始时间', '结束时间']}
                />
              )
            }
          </FormItem>
        );
        formListItem.push(RANGEDATE);
      }
    })
    return formListItem;
  }

  render() {
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleFilterSubmit}>
          {this.initFormList()}
          <FormItem key='control'>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button onClick={this.handleClearFilter}>重置</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(FilterForm);