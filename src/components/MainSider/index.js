import React, { useState } from 'react';
import { Layout } from 'antd';

import { NoBackgroundLogo, NoBackgroundIcon } from 'assets';

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
        collapsedSrc={NoBackgroundIcon}
        logoSrc={NoBackgroundLogo}
      />

      <MainMenuContainer />
    </Layout.Sider>
  );
};

export default MainSider;
