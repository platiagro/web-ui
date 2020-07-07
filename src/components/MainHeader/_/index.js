// CORE LIBS
import React from 'react';

// UI LIBS
import { Layout } from 'antd';

// COMPONENTS
import Logo from '../Logo';
import MainMenuContainer from '../MainMenu/MainMenuContainer';

// STYLES
import './style.scss';

// IMAGES
import logo from '../../../assets/logo-vazado.png';

// LAYOUT COMPONENTS
const { Header } = Layout;

/**
 * Main Header.
 * This component is responsible for displaying the PlatIA logo, main menu and
 * Foragri demo logo.
 */
const MainHeader = () => (
  // header component
  <Header className='mainHeader'>
    {/* logo platiagro */}
    <Logo logoSrc={logo} className='logoPlatiagro' altText='PlatIAgro logo' />
    {/* main menu */}
    <MainMenuContainer />
  </Header>
);

// EXPORT
export default MainHeader;
