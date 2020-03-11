// CORE LIBS
import React from 'react';

// UI LIBS
import { Result } from 'antd';

// COMPONENTS
import ContentHeader from '../ContentHeader/Container';

/**
 * Error 404 Content.
 * This component is responsible for displaying the error 404 content.
 */
const Error404Content = () => (
  // fragment container
  <>
    {/* content header */}
    <ContentHeader title='Página não encontrada!' editable={false} />
    {/* div content page container */}
    <div className='contentPage'>
      {/* result component */}
      <Result
        status='404'
        title='404'
        subTitle='Desculpe, a página que você visitou não existe.'
      />
    </div>
  </>
);

// EXPORT
export default Error404Content;
