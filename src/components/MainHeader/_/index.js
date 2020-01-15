// CORE LIBS
import React from 'react';

// UI LIBS
import { Layout } from 'antd';

// COMPONENTS
import Logo from '../Logo';
import MainMenu from '../MainMenu';

// STYLES
import './style.scss';

// IMAGES
import logo from '../../../assets/logo-vazado.png';
import logoDemo from '../../../assets/logoDemo.png';

// TODO: Remover mocks
// MOCKS
import menuItemsMock from '../MainMenu/_itemsListMock';

// LAYOUT COMPONENTS
const { Header } = Layout;

/**
 * Main header.
 * This component is responsible for displaying the PlatIA logo, main menu and
 * Foragri demo logo.
 */
const MainHeader = () => (
  // header component
  <Header className='mainHeader'>
    {/* logo platiagro */}
    <Logo logoSrc={logo} className='logoPlatiagro' altText='PlatIAgro logo' />
    {/* TODO: Alterar para container component (redux) */}
    {/* main menu */}
    <MainMenu
      itemsList={menuItemsMock}
      selectedItems={['home']}
      handleItemClick={() => alert('Click!')}
      className='mainMenu'
    />
    {/* logo demo foragri */}
    <Logo
      logoSrc={logoDemo}
      className='logoDemo'
      altText='Demonstração ForAGRI'
    />
  </Header>
);

export default MainHeader;
