import React from 'react';

import './style.scss';

import { Layout } from 'antd';
import SideMenu from '../SideMenu';
import MainHeader from '../MainHeader';

const { Content } = Layout;

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
          <MainHeader
            sideMenuCollapsed={sideMenuCollapsed}
            sideMenuTriggerFunction={this.toggleSideMenu}
          />
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
