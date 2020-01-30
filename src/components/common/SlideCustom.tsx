import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { menus, IMenu } from 'router/AppConfig';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

export class SlideCustom extends Component<RouteComponentProps> {
  state = {
    currentKeys: [],
    openKeys: []
  };

  handleMenukeys = () => {
    const currentKey = this.props.location.pathname;

    let reg = new RegExp('(/[a-z]*){2}');
    let openKey = reg.exec(currentKey) || [''];

    return {
      currentKeys: [currentKey],
      openKeys: [openKey[0]]
    };
  };

  handleClick = ({ key }: any) => {
    this.setState({
      currentKeys: [key]
    });
  };

  renderMenu = (item: IMenu) => {
    return (
      <Menu.Item key={item.path} onClick={this.handleClick}>
        <NavLink to={item.path}>
          <Icon type={item.icon || 'compass'} />
          <span>{item.breadcrumbName}</span>
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
            <span>{item.breadcrumbName}</span>
          </span>
        }>
        {item.children?.map((sub: IMenu) => (sub.children ? this.renderSubMenu(sub) : this.renderMenu(sub)))}
      </Menu.SubMenu>
    );
  };

  render() {
    const { currentKeys, openKeys } = this.handleMenukeys();
    return (
      <Menu theme="dark" mode="inline" defaultOpenKeys={openKeys} selectedKeys={currentKeys}>
        {menus.menus.map((item: IMenu) => (item.children ? this.renderSubMenu(item) : this.renderMenu(item)))}
      </Menu>
    );
  }
}

export default withRouter(SlideCustom);
