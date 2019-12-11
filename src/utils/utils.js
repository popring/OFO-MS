import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;
export default {
  pagination(data, callback = () => { }) {
    return {
      onChange: (current, pageSize) => {
        callback(current, pageSize);
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      showTotal: () => {
        return `共 ${data.result.total_count} 条数据`
      }
    }
  },
  getOptionList(data) {
    if (!data) {
      return [];
    }
    // let options = [] //[<Option value="0" key="all_key">全部</Option>];
    let options = data.map((item) => {
      return (<Option value={item.id} key={item.id}>{item.name}</Option>);
    })
    return options;
  },
}