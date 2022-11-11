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
      defaultSelectedKeys: ['/'],
    };
  }
  menuClickHandler = ({ key }) => {
    console.log("click", key);
    this.props.history.push(key)
  };
  render() {
    const { menus, defaultSelectedKeys } = this.state;
    return (
      <Menu items={menus} theme={"dark"} onClick={this.menuClickHandler} defaultSelectedKeys={defaultSelectedKeys} />
    );
  }
}

export default withRouter(CommonSider);
