import React from 'react';
import { Card, Button, message } from 'antd';

type messageType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export default class notifications extends React.Component {
  handleClick = (type: messageType) => {
    message[type]('登陆成功，欢迎回来');
  };

  render() {
    return (
      <div style={{ width: '100%' }}>
        <Card title="全局通知框">
          <Button type="primary" onClick={() => this.handleClick('success')}>
            Open success
          </Button>
          <Button type="primary" onClick={() => this.handleClick('error')}>
            Open error
          </Button>
          <Button type="primary" onClick={() => this.handleClick('info')}>
            Open info
          </Button>
          <Button type="primary" onClick={() => this.handleClick('warning')}>
            Open warning
          </Button>
          <Button type="primary" onClick={() => this.handleClick('loading')}>
            Open loading
          </Button>
        </Card>
      </div>
    );
  }
}
