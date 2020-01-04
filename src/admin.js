import React from 'react';

import Header from './components/Header';
import NavLeft from './components/NavLeft';
import Footer from './components/Footer';
import { Col, Row } from 'antd';

import './style/common.less'

export default class Admin extends React.Component {

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Row className="container">
          <Col span={4} className="nav-left">
            <NavLeft />
          </Col>
          <Row span={20} className="main">
            <Header className="header" />
            <Row className="content">
              {this.props.children}
            </Row>
            <Footer className="footer" />
          </Row>
        </Row>
      </div>
    );
  }
}