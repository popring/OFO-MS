import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import { Row } from 'antd';

import './style/common.less'

export default class common extends React.Component {

  render() {
    return (
      <div>
        <Row span={20} className="simple-page">
          <Header className="header" menuType="second"/>
          <Row className="content">
            {this.props.children}
          </Row>
          <Footer className="footer" />
        </Row>
      </div>
    );
  }
}