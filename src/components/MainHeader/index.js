import React from 'react';

import { Link } from 'react-router-dom';

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
      <Menu.Item key='1'>
        <Link to='/'>Início</Link>
      </Menu.Item>
      <Menu.Item key='2'>
        <Link to='/projects'>Projetos</Link>
      </Menu.Item>
      <Menu.Item key='3'>
        <Link to='/implanted-models'>Modelos Implantados</Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export default MainHeader;
