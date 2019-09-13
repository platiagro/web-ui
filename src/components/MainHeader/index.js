import React from 'react';

import { Layout, Menu } from 'antd';

import logo from '../../assets/logo.png';

import './style.scss';

const { Header } = Layout;

const MainHeader = () => (
  <Header>
    <div className='logo'>
      <img src={logo} alt='PlatIAgro' />
    </div>
    <Menu
      className='main-header-menu'
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['2']}
    >
      <Menu.Item key='1'>Início</Menu.Item>
      <Menu.Item key='2'>Projetos</Menu.Item>
      <Menu.Item key='3'>Modelos Implantados</Menu.Item>
    </Menu>
  </Header>
);

export default MainHeader;
