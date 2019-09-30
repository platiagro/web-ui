import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Layout } from 'antd';
import ExperimentsTabs from '../ExperimentsTabs';
import LeftSideMenu from '../LeftSideMenu';

const { Content } = Layout;

const ExperimentContainer = (props) => {
  const { details } = props;
  return (
    <Layout className='experiment-container'>
      <LeftSideMenu />
      <Content>
        <ExperimentsTabs details={details} />
      </Content>
    </Layout>
  );
};

ExperimentContainer.propTypes = {
  details: PropTypes.shape({
    experimentsList: PropTypes.array,
    projectName: PropTypes.string,
  }).isRequired,
};

export default ExperimentContainer;
