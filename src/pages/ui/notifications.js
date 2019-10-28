import React from 'react';
import { Card, Button,notification } from 'antd';

export default class notifications extends React.Component {

  openNotification = (type) => {
    console.log(type)
    let directions = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
    let dd = directions[Number.parseInt(Math.random()*4)];
    console.log(dd)
    notification[type]({
      description: '老板心情好，这个月工资翻倍！！！',
      // duration: 2,
      message: '薪资发放提醒',
      placement: dd
    });
  }

  render() {
    return (
      <div>
        <Card title="通知提醒框">
          <Button type="primary" onClick={() => this.openNotification('success')}>Open success</Button>
          <Button type="primary" onClick={() => this.openNotification('error')}>Open error</Button>
          <Button type="primary" onClick={() => this.openNotification('info')}>Open info</Button>
          <Button type="primary" onClick={() => this.openNotification('warning')}>Open warning</Button>
          <Button type="primary" onClick={() => this.openNotification('warn')}>Open warn</Button>
          <Button type="primary" onClick={() => this.openNotification('open')}>Open</Button>
        </Card>
      </div>
    );
  }
}