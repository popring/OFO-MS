import React from 'react';
import { Card, Table, Button } from 'antd';

export default class basicTable extends React.Component {

  state = {
    dataSource: null,
    isLoading: false
  }

  componentWillMount() {
    this.getDataSource();
  }

  getDataSource = () => {
    this.setState({
      isLoading: true
    })
    this.$api.tableBasic()
      .then((res) => {
        setTimeout(() => {
          this.setState({
            isLoading: false,
            dataSource: res.data
          })
        }, 500)
      });
  }

  orderChange = (pagination, filters, sorter) => {
    console.log(sorter);
    this.setState({
      sortOrder: sorter.sortOrder
    })
  }

  render() {

    const dataSource = this.state.dataSource;
    const columns = [
      { title: 'id', dataIndex: 'id', width: 50, fixed: 'left' },
      { title: '姓名', dataIndex: 'userName', width: 80, fixed: 'left' },
      { title: '年龄', dataIndex: 'age', sortOrde: this.state.sortOrder, sorter: (a, b) => a.age - b.age },
      { title: '性别', dataIndex: 'gender', render(gender) { return gender === 1 ? '男' : '女'; } },
      { title: '生日', dataIndex: 'birthday' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '地址', dataIndex: 'address' },
      { title: '打卡时间', dataIndex: 'time', fixed: 'right' }
    ];

    return (
      <div>
        <Card title="普通表格">
          <Button type="primary" style={{ margin: '10px 0' }} onClick={this.getDataSource}>refresh</Button>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            loading={this.state.isLoading}
            bordered
            onChange={this.orderChange}
            scroll={{ x: 2000 }}
          />
        </Card>
      </div>
    );
  }
}
