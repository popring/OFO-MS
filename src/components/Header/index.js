import React from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';

import './index.less'
class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      date: '', //2019-10-15 15:20:02
      weather: '多云转晴'
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
    const { menuName, menuType, userName } = this.props;
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
          <span>欢迎，{userName}</span>
          <a href="#/">退出</a>
        </Row>
        {
          menuType ? '' :
            <Row className="breadcrumb">
              <Col span={6} className="breadcrumb-title">
                <h2>{menuName || ''}</h2>
              </Col>
              <Col span={18} className="weather">
                <span className="date">{this.state.date}</span>
                <span className="weather-detail">{this.state.weather}</span>
              </Col>
            </Row>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuName: state.menu.menuName,
    userName: state.user.userName
  }
}

export default connect(mapStateToProps)(Header);