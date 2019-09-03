import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

const SideMenu = ({ collapsed }) => (
  <Sider trigger={null} collapsible collapsed={collapsed}>
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
);

SideMenu.propTypes = { collapsed: PropTypes.bool };

SideMenu.defaultProps = { collapsed: false };

export default SideMenu;
