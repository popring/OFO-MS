import React from 'react';
import { Card, Button, Radio } from 'antd';
import RadioGroup from 'antd/lib/radio/group';
import { ButtonSize } from 'antd/lib/button';
import './ui.less';

interface IState {
  loading: boolean;
  size: ButtonSize;
}

export default class App extends React.Component {
  state: IState = {
    loading: false,
    size: 'default'
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  handleChange = (e: any) => {
    this.setState({
      size: e.target.value
    });
  };

  render() {
    return (
      <div>
        <Card title="普通按钮组">
          <Button type="primary">按钮</Button>
          <Button>按钮</Button>
          <Button type="dashed">按钮</Button>
          <Button type="danger">按钮</Button>
          <Button disabled>按钮</Button>
        </Card>
        <br />
        <Card title="图标按钮组">
          <Button icon="plus">添加</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button shape="circle" icon="search"></Button>
          <Button type="primary" icon="search">
            搜索
          </Button>
          <Button type="primary" icon="download">
            下载
          </Button>
        </Card>
        <br />

        <Card title="Loading组件">
          <Button onClick={this.toggleLoading} type="primary" loading={this.state.loading}>
            按钮
          </Button>
          <Button
            onClick={this.toggleLoading}
            shape="circle"
            loading={this.state.loading}
            type="primary"
            icon="delete"></Button>
          <Button onClick={this.toggleLoading} loading={this.state.loading}>
            按钮
          </Button>
          <Button
            onClick={this.toggleLoading}
            shape="circle"
            loading={this.state.loading}
            icon="delete"></Button>
          <Button onClick={this.toggleLoading}>{this.state.loading ? '关闭' : '开启'}</Button>
        </Card>
        <br />

        <Card title="按钮组">
          <Button.Group>
            <Button type="primary" icon="left" style={{ marginRight: 0 }}>
              上一页
            </Button>
            <Button type="primary" icon="right">
              下一页
            </Button>
          </Button.Group>
        </Card>
        <br />

        <Card title="按钮尺寸">
          <RadioGroup value={this.state.size} onChange={this.handleChange}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </RadioGroup>
          <Button type="primary" size={this.state.size}>
            按钮
          </Button>
          <Button size={this.state.size}>按钮</Button>
          <Button size={this.state.size} type="dashed">
            按钮
          </Button>
          <Button size={this.state.size} type="danger">
            按钮
          </Button>
        </Card>
      </div>
    );
  }
}
