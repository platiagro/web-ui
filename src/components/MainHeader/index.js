/* eslint no-console: "off" */

import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import { Layout, Icon } from 'antd';

const { Header } = Layout;

const MainHeader = ({ sideMenuCollapsed, sideMenuTriggerFunction }) => (
  <Header style={{ background: '#fff', padding: 0 }}>
    <Icon
      className='trigger'
      type={sideMenuCollapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={sideMenuTriggerFunction}
    />
  </Header>
);

MainHeader.propTypes = {
  sideMenuCollapsed: PropTypes.bool,
  sideMenuTriggerFunction: PropTypes.func,
};

MainHeader.defaultProps = {
  sideMenuCollapsed: false,
  sideMenuTriggerFunction: () => console.error('No function in sideMenuTriggerFunction'),
};

export default MainHeader;
