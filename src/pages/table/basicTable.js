import React from 'react';
import { Card, Table } from 'antd';

export default class basicTable extends React.Component {

  state = {
    dataSource: null
  }

  componentWillMount() {
    this.axios.get('/api/table/basictable')
      .then((res) => {
        this.setState({
          dataSource: res.data
        })
      })

  }

  render() {

    const dataSource = this.state.dataSource;
    const columns = [
      { title: 'id', dataIndex: 'id' },
      { title: '姓名', dataIndex: 'userName' },
      { title: '年龄', dataIndex: 'age' },
      { title: '性别', dataIndex: 'gender' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '地址', dataIndex: 'address' },
      { title: '打卡时间', dataIndex: 'time' }
    ];

    return (
      <div>
        <Card title="普通表格">
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            bordered />
        </Card>
      </div>
    );
  }
}