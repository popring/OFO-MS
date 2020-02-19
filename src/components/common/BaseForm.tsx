import React from 'react';
import { Form, Button, Select, Input, DatePicker, Row } from 'antd';
import moment from 'moment';
import { GetOptionList } from '../../utils/utils';
import { FormComponentProps } from 'antd/lib/form';

/**
 * 本组件封装了 筛选查询表格的表单组件 hook 组件
 */
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

export type FromSelectType = {
  id: string;
  name: string;
};

export type FormType = {
  type: 'SELECT' | 'INPUT' | 'RANGEDATE';
  field: string;
  label: string;
  placeholder?: string;
  initialValue?: string;
  style?: {};
  list?: FromSelectType[];
};

export interface IFormComponentProps extends FormComponentProps {
  formList: FormType[];
  handleFilterSubmit: (val: { [field: string]: any }) => void;
}

// 提交表单
const handleFilterSubmit = (props: IFormComponentProps) => {
  return (e: any) => {
    e.preventDefault();
    const filterValues = props.form.getFieldsValue();
    props.handleFilterSubmit(filterValues);
  };
};

// 清空表单内容
const handleClearFilter = (form: any) => {
  return () => form.resetFields();
};

// 初始化表单DOM
const initFormList = (props: IFormComponentProps) => {
  const { getFieldDecorator } = props.form;
  const formList = props.formList;
  const formListItem: Array<any> = [];
  if (!formList || formList.length <= 0) {
    return formListItem;
  }
  formList.forEach((item: FormType, i: number) => {
    // 必填
    let { label, field, type } = item;
    // 选填
    let { initialValue = '', placeholder = '', style = {} } = item;

    if (type === 'SELECT' && field === 'city_id') {
      // 城市选择框模板
      const SELECT = (
        <FormItem label="城市" key={field}>
          {getFieldDecorator(field, {
            initialValue: '0'
          })(
            <Select style={{ width: 200 }}>
              <Option value="0">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">上海市</Option>
              <Option value="3">广州市</Option>
              <Option value="4">深圳市</Option>
            </Select>
          )}
        </FormItem>
      );
      formListItem.push(SELECT);
    } else if (type === 'SELECT') {
      const SELECT = (
        <FormItem label={label} key={field}>
          {getFieldDecorator(field, {
            initialValue: initialValue
          })(
            <Select placeholder={placeholder} style={{ width: 200, ...style }}>
              {GetOptionList(item.list)}
            </Select>
          )}
        </FormItem>
      );
      formListItem.push(SELECT);
    } else if (type === 'INPUT') {
      const INPUT = (
        <FormItem label={label} key={field} style={style}>
          {getFieldDecorator(field, {
            initialValue: initialValue
          })(<Input placeholder={placeholder} />)}
        </FormItem>
      );
      formListItem.push(INPUT);
    } else if (type === 'RANGEDATE') {
      const RANGEDATE = (
        <FormItem label="查询时间区间" key={field || 'rangedate'}>
          {getFieldDecorator('rangeDate', {
            initialValue: [moment().subtract(1, 'M'), moment()]
          })(<RangePicker placeholder={['开始时间', '结束时间']} />)}
        </FormItem>
      );
      formListItem.push(RANGEDATE);
    }
  });
  return formListItem;
};

const BaseForm = (props: IFormComponentProps) => (
  <Row>
    <Form layout="inline" onSubmit={handleFilterSubmit(props)}>
      {initFormList(props)}
      <FormItem key="control">
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button onClick={handleClearFilter(props.form)}>重置</Button>
      </FormItem>
    </Form>
  </Row>
);

export default Form.create<IFormComponentProps>()(BaseForm);
