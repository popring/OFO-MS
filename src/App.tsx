/*
 * @Author: Harry.Hao
 * @Date: 2020-01-14 20:07:44
 * @Last Modified by: Harry.Hao
 * @Last Modified time: 2020-01-14 20:08:32
 */

import React, { Component } from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import './App.less';

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
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
          </Header>
          <Content>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
          </Content>
          <Footer>OFO MS &copy;2020 Created by Harry Hao</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
