import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

/**
 * 分页功能
 * @param data table数据
 * @param callback 当页数变化回调函数
 */
export function Pagination(data: any, callback?: Function) {
  return {
    onChange: (current: number, pageSize: number) => {
      callback && callback(current, pageSize);
    },
    current: data.result.page,
    pageSize: data.result.page_size,
    total: data.result.total_count,
    showTotal: () => {
      return `共 ${data.result.total_count} 条数据`;
    }
  };
}

/**
 * 渲染 Select 选择框
 * @param data Select组件选择框数据
 */
export function GetOptionList(data: Array<any> | undefined) {
  if (!data) {
    return [];
  }
  // let options = [] //[<Option value="0" key="all_key">全部</Option>];
  let options = data.map(item => {
    return (
      <Option value={item.id} key={item.id}>
        {item.name}
      </Option>
    );
  });
  return options;
}
