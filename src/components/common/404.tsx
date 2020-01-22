import React from 'react';
import { Row, Col, Card, Empty } from 'antd';

const NotMatch = () => {
  return (
      <Row>
        <Col span={24}>
          <Card>
            <Empty description="404, Not Found." />
          </Card>
        </Col>
      </Row>
  );
};

export default NotMatch;
