import React from 'react';
import { Card, Empty } from 'antd';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <Empty description='404, Not Found.' />
        </Card>
      </div>
    );
  }
}
