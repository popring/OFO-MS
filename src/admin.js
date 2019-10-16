import React from 'react';

import Header from './components/Header';
import NavLeft from './components/NavLeft';
import Footer from './components/Footer';
import { Col, Row } from 'antd';
import Home from './pages/Home'

import './style/common.less'

export default class Admin extends React.Component {

  render() {
    return (
      <div>
        <Row className="container">
          <Col span={4} className="nav-left">
            <NavLeft />
          </Col>
          <Col span={20} className="main">
            <Header className="header" />
            <Row className="content">
              <Home />
            </Row>
            <Footer className="footer" />
          </Col>
        </Row>
      </div>
    );
  }
}