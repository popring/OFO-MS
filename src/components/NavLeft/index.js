import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.less'
import MenuConfig from '../../config/menuConfig.js'

const { SubMenu } = Menu;


export default class NavLeft extends React.Component {

  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);

    this.setState({
      menuTreeNode
    })
  }

  renderMenu = (data) => {

    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (<Menu.Item key={item.key}>
        <NavLink to={"/admin"+item.key}>
          {item.title}
        </NavLink>
      </Menu.Item>);
    });
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="logo" />
          <h1>Imooc MS</h1>
        </div>
        <Menu theme="dark">
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}