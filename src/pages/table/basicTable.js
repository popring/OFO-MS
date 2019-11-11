import React from 'react';
import { Card, Table, Button, Modal, message } from 'antd';

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
    this.axios.get('/table/basictable')
      .then((res) => {
        setTimeout(() => {
          this.setState({
            isLoading: false,
            dataSource: res.data
          })
        }, 500)
      });
  }

  onRowClick = (record, index) => {
    let selectKeys = [record.id];
    this.setState({
      selectedRowKeys: selectKeys,
      selectedItem: record
    })
    console.log(record, index);
  }

  handleClickDelete = () => {
    const selectedRowKeys = this.state.selectedRowKeys;
    // console.log(selectedRowKeys);
    // console.log(this.state.selectedRows);
    Modal.confirm({
      title: '删除提醒',
      content: '确定删除这些数据吗？' + selectedRowKeys.join(','),
      onOk: () => {
        let dataSource = this.state.dataSource;
        dataSource = dataSource.filter(v1 => {
          return !selectedRowKeys.some((v2,index) => {
            if (v1.id === v2) {
              selectedRowKeys.splice(index,1);
              console.log(selectedRowKeys);
              return true
            }
            return false
          })
        })
        this.setState({
          dataSource,
          selectedRowKeys: []
        })
        message.success('删除成功！');
      }
    })
  }

  render() {

    const dataSource = this.state.dataSource;
    const columns = [
      { title: 'id', dataIndex: 'id' },
      { title: '姓名', dataIndex: 'userName' },
      { title: '年龄', dataIndex: 'age' },
      { title: '性别', dataIndex: 'gender', render(gender) { return gender === 1 ? '男' : '女'; } },
      { title: '生日', dataIndex: 'birthday' },
      { title: '地址', dataIndex: 'address' },
      { title: '打卡时间', dataIndex: 'time' }
    ];

    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    };
    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }

    return (
      <div>
        <Card title="多选表格">
          <Button type="primary" style={{ margin: '10px 0' }} onClick={this.getDataSource}>refresh</Button>
          <Button type="primary" style={{ margin: '10px' }} onClick={this.handleClickDelete}>删除</Button>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            loading={this.state.isLoading}
            rowSelection={rowCheckSelection}
            bordered />
        </Card>

        <Card title="普通表格">
          <Button type="primary" style={{ margin: '10px 0' }} onClick={this.getDataSource}>refresh</Button>
          <Button type="primary" style={{ margin: '10px' }}>删除</Button>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            loading={this.state.isLoading}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              }

            }}
            bordered />
        </Card>
      </div>
    );
  }
}
