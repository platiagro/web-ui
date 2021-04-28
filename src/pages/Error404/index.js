import React from 'react';
import { Result } from 'antd';

import ContentHeaderContainer from 'components/ContentHeader/_/ContentHeaderContainer';

const Error404 = () => (
  <>
    <ContentHeaderContainer
      title='Página não encontrada!'
      editable={false}
      backIcon={false}
    />

    <div className='contentPage'>
      <Result
        status='404'
        title='404'
        subTitle='Desculpe, a página que você visitou não existe.'
      />
    </div>
  </>
);

export default Error404;
