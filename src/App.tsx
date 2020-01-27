/*
 * @Author: Harry.Hao
 * @Date: 2020-01-14 20:07:44
 * @Last Modified by: Harry.Hao
 * @Last Modified time: 2020-01-20 00:25:27
 */

import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import './App.less';
import ContentRouter from './router/AppRouter';
import SlideCustom from 'components/common/SlideCustom';
import BreadcrumbCustom from 'components/common/BreadcrumbCustom';
import 'animate.css/animate.min.css';

const { Header, Sider, Content, Footer } = Layout;

export class App extends Component<RouteComponentProps, any> {
  state = {
    collapsed: false,
    mainStyle: {
      marginLeft: 200
    }
  };

  toggle = () => {
    const { collapsed } = this.state;

    this.setState({
      collapsed: !collapsed,
      mainStyle: {
        ...this.state.mainStyle,
        marginLeft: collapsed ? 200 : 80
      }
    });
  };

  render() {
    return (
      <Layout className="layout">
        <Sider
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}>
          <div className="logo" />
          <SlideCustom></SlideCustom>
        </Sider>
        <Layout style={this.state.mainStyle}>
          <Header>
            <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
          </Header>
          <Content style={{ overflow: 'initial' }}>
            <BreadcrumbCustom />
            <ContentRouter />
          </Content>
          <Footer>OFO MS &copy;2020 Created by Harry Hao</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
