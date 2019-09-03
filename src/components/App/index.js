import React from 'react';

import './style.scss';

import { Layout, Icon } from 'antd';
import SideMenu from '../SideMenu';

const { Header, Content } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sideMenuCollapsed: false,
    };
  }

  toggleSideMenu = () => {
    const { sideMenuCollapsed } = this.state;

    this.setState({
      sideMenuCollapsed: !sideMenuCollapsed,
    });
  };

  render() {
    const { sideMenuCollapsed } = this.state;

    return (
      <Layout>
        <SideMenu collapsed={sideMenuCollapsed} />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={sideMenuCollapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggleSideMenu}
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
