import React from 'react';
import { Row, Col } from 'antd';
import utils from '../../utils/utils'

import './index.less'
export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      date: '2019年10月15日 15:20:02',
      weather: '多云转晴',
      username: '河畔一脚'
    };
  }

  componentWillMount() {
    let date;
    setInterval(() => {
      date = new Date();
      this.setState({
        date: utils.formate(date)
      })
    }, 1000)
  }

  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <span>欢迎，{this.state.username}</span>
          <a href="#/">退出</a>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            首页
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.date}</span>
            <span className="weather-detail">{this.state.weather}</span>
          </Col>
        </Row>
      </div>
    );
  }
}