import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import logo from '../../assets/logo.png';

import './style.scss';

import mainRoutes from '../../routes/main';

const { Header } = Layout;

const MainHeader = ({ location }) => {
  return (
    <Header>
      <div className='logo'>
        <img src={logo} alt='PlatIAgro' />
      </div>
      <Menu
        className='main-header-menu'
        theme='dark'
        mode='horizontal'
        selectedKeys={[location.pathname]}
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
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default MainHeader;
