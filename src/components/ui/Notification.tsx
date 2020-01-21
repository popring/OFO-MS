import React from 'react';
import { Card, Button, notification } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification/index';

type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'warn' | 'open';

export default class notifications extends React.Component {
  openNotification = (type: NotificationType) => {
    console.log(type);
    let directions: NotificationPlacement[] = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
    let dd: NotificationPlacement = directions[Math.round(Math.random() * 4)];
    notification[type]({
      description: '老板心情好，这个月工资翻倍！！！',
      // duration: 2,
      message: '薪资发放提醒',
      placement: dd
    });
  };

  render() {
    return (
      <div style={{ width: '100%' }}>
        <Card title="通知提醒框">
          <Button type="primary" onClick={() => this.openNotification('success')}>
            Open success
          </Button>
          <Button type="primary" onClick={() => this.openNotification('error')}>
            Open error
          </Button>
          <Button type="primary" onClick={() => this.openNotification('info')}>
            Open info
          </Button>
          <Button type="primary" onClick={() => this.openNotification('warning')}>
            Open warning
          </Button>
          <Button type="primary" onClick={() => this.openNotification('warn')}>
            Open warn
          </Button>
          <Button type="primary" onClick={() => this.openNotification('open')}>
            Open
          </Button>
        </Card>
      </div>
    );
  }
}
