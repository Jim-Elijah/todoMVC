import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Menu } from "antd";
import { routes } from "../router";

class CommonSider extends Component {
  constructor(props) {
    super(props);
    let menus = routes.filter((route) => route.meta.isMenu);
    menus = menus.map((menu) => ({
      ...menu,
      label: menu.name,
      key: menu.path,
    }));
    this.state = {
      menus,
      selectedKeys: ['/'],
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { history: { location } } = nextProps;
    const { pathname } = location
    const { selectedKeys } = prevState
    if (selectedKeys[0] !== pathname) {
      return {
        selectedKeys: [pathname]
      }
    }
    return null
  }
  menuClickHandler = ({ key }) => {
    this.setState({
      selectedKeys: [key]
    })
    this.props.history.push(key)
  };

  render() {
    const { menus, selectedKeys } = this.state;
    return (
      <Menu items={menus} theme={"dark"} onClick={this.menuClickHandler} selectedKeys={selectedKeys} />
    );
  }
}

export default withRouter(CommonSider);
