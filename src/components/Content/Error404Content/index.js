// CORE LIBS
import React from 'react';

// UI LIBS
import { Result } from 'antd';

/**
 * Error 404 Content.
 * This component is responsible for displaying the error 404 content.
 */
const Error404Content = () => (
  // result component
  <Result
    status='404'
    title='404'
    subTitle='Desculpe, a página que você visitou não existe.'
  />
);

// EXPORT
export default Error404Content;
