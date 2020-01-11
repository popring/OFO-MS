import React from 'react';
import { Menu } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import './index.less'
import MenuConfig from '@/config/menuConfig.js'
import { switchMenu } from '@/redux/action';
import { connect } from 'react-redux';
const { SubMenu } = Menu;


class NavLeft extends React.Component {
  state = {
    currentKey: '',
    menuTreeNode: null
  }
  componentDidMount() {
    console.log(this.props);
    let currentKey = this.props.routeProps.history.location.pathname;
    if (currentKey === '/admin') currentKey = '/admin/home'
    const menuTreeNode = this.renderMenu(MenuConfig);

    this.setState({
      menuTreeNode,
      currentKey
    })
  }

  handleClick = ({ item, key }) => {
    if (key === this.state.currentKey) return;

    const { dispatch } = this.props;
    dispatch(switchMenu(item.props.title));
    this.setState({
      currentKey: key
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

      return (<Menu.Item key={item.key} title={item.title}>
        <NavLink to={"/admin" + item.key}>
          {item.title}
        </NavLink>
      </Menu.Item>);
    });
  }

  render() {
    const currentKey = this.state.currentKey || '/admin/home';
    return (
      <div>
        <Link to="/admin">
          <div className="logo">
            <img src="/assets/logo-ant.svg" alt="logo" />
            <h1>小黄车 MS</h1>
          </div>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          onClick={(p) => this.handleClick(p)}
          defaultSelectedKeys={['/admin/home']}
          selectedKeys={currentKey}
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}

export default connect()(NavLeft);