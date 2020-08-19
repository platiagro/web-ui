// CORE LIBS
import React, { useState } from 'react';

// UI LIBS
import { Layout } from 'antd';

// COMPONENTS
import Logo from '../Logo';
import MainMenuContainer from '../MainMenu/MainMenuContainer';

// STYLES
import './style.less';

// IMAGES
import logo from 'assets/logo-vazado.png';
import icone from 'assets/icone-vazado.png';

// LAYOUT COMPONENTS
const { Sider } = Layout;

/**
 * Main Sider.
 * This component is responsible for displaying the PlatIA logo, main menu and
 * Foragri demo logo.
 */
const MainSider = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      className='mainSider'
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
export default MainSider;
