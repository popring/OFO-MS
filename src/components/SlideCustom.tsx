import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { menus, IMenu } from '../router/AppConfig';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

export class SlideCustom extends Component<RouteComponentProps> {
  state = {
    currentKey: []
  };

  componentDidMount() {
    const currentKey = this.props.location.pathname;
    this.setState({
      currentKey: [currentKey]
    });
  }

  handleClick = ({ key }: any) => {
    this.setState({
      currentKey: [key]
    });
  };

  renderMenu = (item: IMenu) => {
    return (
      <Menu.Item key={item.path} onClick={this.handleClick}>
        <NavLink to={item.path}>
          <Icon type={item.icon || 'compass'} />
          <span>{item.title}</span>
        </NavLink>
      </Menu.Item>
    );
  };

  renderSubMenu = (item: IMenu) => {
    return (
      <Menu.SubMenu
        key={item.path}
        title={
          <span>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </span>
        }>
        {item.subs?.map(sub => (sub.subs ? this.renderSubMenu(sub) : this.renderMenu(sub)))}
      </Menu.SubMenu>
    );
  };

  render() {
    const currentKey = this.state.currentKey || '/app/home';
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['/app/home']} selectedKeys={currentKey}>
        {menus.menus.map(item => (item.subs ? this.renderSubMenu(item) : this.renderMenu(item)))}
      </Menu>
    );
  }
}

export default withRouter(SlideCustom);
