// CORE LIBS
import React, { useState } from 'react';

// UI LIBS
import { Layout } from 'antd';

// COMPONENTS
import Logo from '../Logo';
import MainMenuContainer from '../MainMenu/MainMenuContainer';

// STYLES
import './style.scss';

// IMAGES
import logo from 'assets/logo-vazado.png';
import icone from 'assets/icone-vazado.png';

// LAYOUT COMPONENTS
const { Sider } = Layout;

/**
 * Main Header.
 * This component is responsible for displaying the PlatIA logo, main menu and
 * Foragri demo logo.
 */
const MainHeader = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      className='mainHeader'
    >
      <Logo
        collapse={collapsed}
        logoSrc={logo}
        collapsedSrc={icone}
        className='logoPlatiagro'
        altText='PlatIAgro logo'
      />
      <MainMenuContainer />
    </Sider>
  );
};

// EXPORT
export default MainHeader;
