/*
 * @Author: Harry.Hao
 * @Date: 2020-01-14 20:07:44
 * @Last Modified by: Harry.Hao
 * @Last Modified time: 2020-01-16 13:29:02
 */

import React, { Component } from 'react';
import { Layout, Icon, Breadcrumb } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import './App.less';
import ContentRouter from './router/AppRouter';
import SlideCustom from 'components/SlideCustom';

const { Header, Sider, Content, Footer } = Layout;

export class App extends Component<RouteComponentProps, any> {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
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
        <Layout style={{ marginLeft: 200 }}>
          <Header>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Application Center</Breadcrumb.Item>
              <Breadcrumb.Item>Application List</Breadcrumb.Item>
              <Breadcrumb.Item>An Application</Breadcrumb.Item>
            </Breadcrumb>
            <ContentRouter />
          </Content>
          <Footer>OFO MS &copy;2020 Created by Harry Hao</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
