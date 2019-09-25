/* 
  Main application header.

  This component is responsible for displaying the logo and main menu of
  the application.

  This component is also responsible for changing the main routes of the application according to menu clicks.
*/

import React from 'react';

import PropTypes from 'prop-types';

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

MainHeader.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
  mainRoutes: PropTypes.arrayOf(PropTypes.any),
};

MainHeader.defaultProps = {
  location: null,
  mainRoutes: null,
};

export default MainHeader;
