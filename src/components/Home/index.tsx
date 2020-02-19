import React from 'react';
import { Card, Row, Col } from 'antd';
import './index.less';

function Home() {
  return (
    <Row>
      <Col span={24}>
        <Card className="home-wrap">欢迎进入 OLO小黄车 后台管理系统</Card>
      </Col>
    </Row>
  );
}

export default Home;
