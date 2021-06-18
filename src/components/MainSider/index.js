import React, { useState } from 'react';
import { Layout } from 'antd';

import logo from 'assets/logo-vazado.png';
import icon from 'assets/icone-vazado.png';

import Logo from './Logo';
import MainMenuContainer from './MainMenu/MainMenuContainer';

import './style.less';

const MainSider = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout.Sider
      className='mainSider'
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      collapsible
    >
      <Logo
        className='logoPlatiagro'
        altText='PlatIAgro logo'
        collapse={collapsed}
        collapsedSrc={icon}
        logoSrc={logo}
      />

      <MainMenuContainer />
    </Layout.Sider>
  );
};

export default MainSider;
