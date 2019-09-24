/* 
  Main application header.

  This component is responsible for displaying the logo and main menu of
  the application.
*/

import React from 'react';

import { Link } from 'react-router-dom';

import { Menu } from 'antd';

import logo from '../../assets/logo.png';

import './style.scss';

import getCurrentRoute from '../../utils';

const MainHeader = ({ location, mainRoutes }) => (
  <div>
    <div className='logo'>
      <img src={logo} alt='PlatIAgro Logo' />
    </div>
    <Menu
      className='main-header-menu'
      theme='dark'
      mode='horizontal'
      selectedKeys={[
        location && mainRoutes
          ? getCurrentRoute(location, mainRoutes).path
          : null,
      ]}
    >
      {mainRoutes &&
        mainRoutes.map((route) =>
          route.notInMenu ? null : (
            <Menu.Item key={route.path}>
              <Link to={route.path}>{route.title}</Link>
            </Menu.Item>
          )
        )}
    </Menu>
  </div>
);

export default MainHeader;
