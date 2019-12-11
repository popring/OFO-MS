import React from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';

import './index.less'
export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      date: '2019-10-15 15:20:02',
      weather: '多云转晴',
      username: '河畔一脚'
    };
  }

  componentWillMount() {
    setInterval(() => {
      this.setState({
        date: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000)
  }

  render() {
    const { menuType } = this.props;
    return (
      <div className="header">
        <Row className="header-top">
          {
            menuType ?
              <Col span={6} className="logo">
                <img src="/assets/logo-ant.svg" alt="" />
                <span>IMooc 通用管理系统</span>
              </Col> : ''
          }
          <span>欢迎，{this.state.username}</span>
          <a href="#/">退出</a>
        </Row>
        {
          menuType ? '' :
            <Row className="breadcrumb">
              <Col span={4} className="breadcrumb-title">
                首页
          </Col>
              <Col span={20} className="weather">
                <span className="date">{this.state.date}</span>
                <span className="weather-detail">{this.state.weather}</span>
              </Col>
            </Row>
        }
      </div>
    );
  }
}