import React from 'react';
import { Row, Col, Button } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';

import './index.less';
class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      date: '', //2019-10-15
      datetimer: null,
      weather: '多云转晴'
    };
  }

  componentWillMount() {
      this.setState({
        date: moment().format('YYYY-MM-DD')
      })
  }

  handleLogOut = () => {
    window.sessionStorage.removeItem('userInfo');
    this.props.history.push('/login');
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
                <span>小黄车 通用管理系统</span>
              </Col> : ''
          }
          <span>{userName ? '欢迎，' + userName : '请登录'}</span>
          <Button to="/login" onClick={this.handleLogOut}>退出</Button>
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
    userName: state.userInfo.userName
  }
}

export default connect(mapStateToProps)(Header);