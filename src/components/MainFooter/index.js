// CORE LIBS
import React from 'react';

import './style.scss';

/**
 * Main footer of the application.
 * This component is responsible for displaying a copyright message in the main
 * application footer.
 */
const MainFooter = () => {
  // getting year
  const year = new Date().getFullYear();
  // configuring message
  const message = `PlatIAgro© ${year} - Todos os direitos reservados`;
  // RENDER
  return <div className='main-footer'>{message}</div>;
};

// EXPORT
export default MainFooter;
