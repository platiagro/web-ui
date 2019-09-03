import React from 'react';

import './style.scss';

import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      MenuCollapsed: false,
    };
  }

  toggle = () => {
    const { MenuCollapsed } = this.state;

    this.setState({
      MenuCollapsed: !MenuCollapsed,
    });
  };

  render() {
    const { MenuCollapsed } = this.state;

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={MenuCollapsed}>
          <div className='logo' />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <Icon type='user' />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <Icon type='video-camera' />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key='3'>
              <Icon type='upload' />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={MenuCollapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            Hello World
          </Content>
        </Layout>
      </Layout>
    );
  }
}
