import React, { Component } from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class CommonLayout extends Component {
    render() {
        return (
            <Layout  style={{ background: '#fff' }}>
                <Header>Jim's todoMVC</Header>
                <Layout>
                    <Sider>Sider</Sider>
                    <Content>Content</Content>
                </Layout>
            </Layout >
        );
    }
}

export default CommonLayout;