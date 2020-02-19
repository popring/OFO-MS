import React from 'react';
import { Card, Table, Button, Modal, message } from 'antd';
import { tableBasic } from '../../api/index';

export default class basicTable extends React.Component {
  state = {
    dataSource: [],
    isLoading: false,
    selectedRowKeys: []
  };

  componentWillMount() {
    this.getDataSource();
  }

  getDataSource = async () => {
    this.setState({
      isLoading: true
    });
    const res = await tableBasic();
    this.setState({
      isLoading: false,
      dataSource: res.data
    });
  };

  onRowClick = (record: any, index: number) => {
    let selectKeys = [record.id];
    this.setState({
      selectedRowKeys: selectKeys,
      selectedItem: record
    });
    console.log(record, index);
  };

  handleClickDelete = () => {
    const selectedRowKeys = this.state.selectedRowKeys;
    // console.log(selectedRowKeys);
    // console.log(this.state.selectedRows);
    Modal.confirm({
      title: '删除提醒',
      content: '确定删除这些数据吗？' + selectedRowKeys.join(','),
      onOk: () => {
        let dataSource = this.state.dataSource;
        dataSource = dataSource.filter((v1: any) => {
          return !selectedRowKeys.some((v2, index) => {
            if (v1.id === v2) {
              selectedRowKeys.splice(index, 1);
              console.log(selectedRowKeys);
              return true;
            }
            return false;
          });
        });
        this.setState({
          dataSource,
          selectedRowKeys: []
        });
        message.success('删除成功！');
      }
    });
  };

  render() {
    const dataSource = this.state.dataSource;
    const columns = [
      { title: 'id', dataIndex: 'id' },
      { title: '姓名', dataIndex: 'userName' },
      { title: '年龄', dataIndex: 'age' },
      {
        title: '性别',
        dataIndex: 'gender',
        render(gender: number) {
          return gender === 1 ? '男' : '女';
        }
      },
      { title: '生日', dataIndex: 'birthday' },
      { title: '地址', dataIndex: 'address' },
      { title: '打卡时间', dataIndex: 'time' }
    ];

    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection: any = {
      type: 'radio',
      selectedRowKeys
    };
    const rowCheckSelection: any = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        });
      }
    };

    return (
      <div>
        <Card title="多选表格">
          <Button type="primary" style={{ margin: '10px 0' }} onClick={this.getDataSource}>
            refresh
          </Button>
          <Button type="primary" style={{ margin: '10px' }} onClick={this.handleClickDelete}>
            删除
          </Button>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            loading={this.state.isLoading}
            rowSelection={rowCheckSelection}
            bordered
          />
        </Card>

        <Card title="普通表格">
          <Button type="primary" style={{ margin: '10px 0' }} onClick={this.getDataSource}>
            refresh
          </Button>
          <Button type="primary" style={{ margin: '10px' }}>
            删除
          </Button>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            loading={this.state.isLoading}
            rowSelection={rowSelection}
            onRow={(record: never, index: number) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
            bordered
          />
        </Card>
      </div>
    );
  }
}
