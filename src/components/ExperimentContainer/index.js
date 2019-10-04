import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Layout } from 'antd';
import ExperimentsTabs from '../ExperimentsTabs';
import LeftSideMenu from '../LeftSideMenu';
import ContentHeader from '../ContentHeader';

const { Content } = Layout;

const ExperimentContainer = (props) => {
  const { details } = props;
  return (
    <>
      <ContentHeader
        title='Projetos'
        subTitle='Crie, experimente e implante fluxos de forma rápida e fácil.'
      />
      {/* <div style={{ margin: '40px' }}> */}
      <Layout className='experiment-container'>
        {/* <Layout className='experiment-content'> */}
        <LeftSideMenu />
        <Content className='experiment-wraper'>
          <ExperimentsTabs details={details} />
        </Content>
        {/* </Layout> */}
      </Layout>
      {/* </div> */}
    </>
  );
};

ExperimentContainer.propTypes = {
  details: PropTypes.shape({
    experimentsList: PropTypes.array,
    projectName: PropTypes.string,
  }).isRequired,
};

export default ExperimentContainer;
