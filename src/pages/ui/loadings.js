import React from 'react';
import { Card, Spin, Icon, Alert, Switch } from 'antd';

// import '../../style/common.less'
export default class loading extends React.Component {
  state = {
    loading: true
  };

  toggle = () => {
    this.setState({
      loading: !this.state.loading
    })
  }

  render() {
    return (
      <div>
        <Card title="Loading">
          <div>
            <Spin size="small" />
            <Spin style={{ margin: "0 10px" }} />
            <Spin size="large" style={{ margin: "0 10px" }} />
            <Spin indicator={<Icon type="loading" style={{ fontSize: 24, color: '#f9c700' }} />} />
          </div>
        </Card>
        <Card title="包裹元素">
          <Spin spinning={this.state.loading} tip="正在加载。。。" delay="1000">
            <Alert message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            ></Alert>
          </Spin>
          <div style={{ marginTop: 16 }}>
            Loading state：
          <Switch checked={this.state.loading} onChange={this.toggle} />
          </div>
        </Card>
      </div>
    );
  }
}