/**
 * Component responsible for:
 * - Structuring the not found page layout
 */
import React from 'react';
import { Result } from 'antd';

const E404 = () => (
  <Result
    status='404'
    title='404'
    subTitle='Desculpe, a página que você visitou não existe.'
  />
);

export default E404;
