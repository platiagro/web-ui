/* 
  Main footer of the application.
  
  This component is responsible for displaying a copyright message in the main
  application footer.
*/
import React from 'react';

import './style.scss';

const MainFooter = () => {
  const year = new Date().getFullYear();
  const message = `PlatIAgro© ${year} - Todos os direitos reservados`;
  return <div className='main-footer'>{message}</div>;
};

export default MainFooter;
