// CORE LIBS
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// COMPONENTS
import MainMenu from './index';

// ITEMS MENU
import itemsMenu from './itemsMenu';

/**
 * Main Menu Container.
 * This component is responsible for create a logic container for main menu
 * with route control.
 */
const MainMenuContainer = () => {
  // getting history
  const history = useHistory();
  // getting location
  const location = useLocation();
  // getting path
  const { pathname } = location;

  // HANDLERS
  const itemClickHandler = (path) => history.push(path);

  // RENDER
  return (
    <MainMenu
      itemsList={itemsMenu}
      selectedItems={[pathname]}
      handleItemClick={itemClickHandler}
      className='mainMenu'
    />
  );
};

// EXPORT
export default MainMenuContainer;
