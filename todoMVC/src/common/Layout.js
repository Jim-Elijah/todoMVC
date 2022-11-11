import React, { Component } from "react";
import { Layout } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";
import CommonSider from "./CommonSider";
import { routes } from "../router";

const { Header, Sider, Content } = Layout;

class CommonLayout extends Component {
  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Header>Jim's todoMVC</Header>
        <Layout>
          <Sider>
            <CommonSider />
          </Sider>
          <Content>
            <Switch>
              {routes.map((route) => {
                return <Route {...route} exact key={route.path}></Route>;
              })}
              <Redirect from="/home" to="/" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default CommonLayout;
