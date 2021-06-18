import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import MainMenu from './index';
import itemsMenu from './itemsMenu';

const MainMenuContainer = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleItemClick = (path) => {
    history.push(path);
  };

  return (
    <MainMenu
      className='mainMenu'
      itemsList={itemsMenu}
      selectedItems={[pathname]}
      handleItemClick={handleItemClick}
    />
  );
};

export default MainMenuContainer;
