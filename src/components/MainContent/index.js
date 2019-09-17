import React from 'react';

import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom';

import './style.scss';

import { Layout } from 'antd';

import ContentHeader from '../ContentHeader';

const { Content } = Layout;

/* 
  This component is responsible for renders the app main content.

  The app main content contain a content header and a main content.

  The content header is rendered with the title and subTitle props.
  The main content is rendered with mainRoutes props.
  
  All props is required.
*/
const MainContent = ({ title, subTitle, mainRoutes }) => {
  return (
    <div>
      <ContentHeader title={title} subTitle={subTitle} />
      <Content className='main-content'>
        <div className='content'>
          <Switch>
            {mainRoutes.map((mainRoute) => (
              <Route
                key={mainRoute.path}
                exact={mainRoute.exact}
                path={mainRoute.path}
                component={mainRoute.component}
              />
            ))}
          </Switch>
        </div>
      </Content>
    </div>
  );
};

MainContent.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  mainRoutes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MainContent;
