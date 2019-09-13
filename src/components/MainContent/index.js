import React from 'react';

import './style.scss';

import { Layout } from 'antd';

import ContentHeader from '../ContentHeader';

const { Content } = Layout;

const MainContent = () => (
  <div>
    <ContentHeader />
    <Content className='main-content'>
      <div className='content' />
    </Content>
  </div>
);

export default MainContent;
