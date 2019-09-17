import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import logo from '../../assets/logo.png';

import './style.scss';

const { Header } = Layout;

/* 
  This component is responsible for renders the app header.

  The header contain menu and logo.

  The menu is rendered with the mainRoutes props.
  The menu active item is set with the selectedKeys props.
  
  Both props is required.
*/
const MainHeader = ({ selectedKeys, mainRoutes }) => {
  return (
    <Header>
      <div className='logo'>
        <img src={logo} alt='PlatIAgro' />
      </div>
      <Menu
        className='main-header-menu'
        theme='dark'
        mode='horizontal'
        selectedKeys={selectedKeys}
      >
        {mainRoutes.map((route) =>
          route.notInMenu ? null : (
            <Menu.Item key={route.path}>
              <Link to={route.path}>{route.title}</Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </Header>
  );
};

MainHeader.propTypes = {
  selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  mainRoutes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MainHeader;
