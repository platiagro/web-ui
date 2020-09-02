// CORE LIBS
import React from 'react';

// UI LIBS
import { Result } from 'antd';

// COMPONENTS
import ContentHeaderContainer from '../ContentHeader/_/ContentHeaderContainer';

/**
 * Error 404 Content.
 * This component is responsible for displaying the error 404 content.
 */
const Error404Content = () => (
  // fragment container
  <>
    {/* content header */}
    <ContentHeaderContainer
      title='Página não encontrada!'
      editable={false}
      backIcon={false}
    />
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
