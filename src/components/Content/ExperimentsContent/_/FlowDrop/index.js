import React from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from 'react-flow-renderer';

import ExperimentEmpty from 'components/ExperimentEmpty';
import { ExperimentLogsPanelContainer } from 'containers';

import CustomDragLayer from '../CustomDragLayer';
import ExperimentHeader from '../../Experiment/ExperimentHeader/_/Container';
import ExperimentFlowContainer from '../../Experiment/ExperimentFlow/_/ExperimentFlowContainer';

import './style.less';

const FlowDrop = () => {
  const { experimentId } = useParams();

  return (
    <div className='custom-flow'>
      <ReactFlowProvider>
        <ExperimentHeader />
        {experimentId ? <ExperimentFlowContainer /> : <ExperimentEmpty />}
        <CustomDragLayer />
        <ExperimentLogsPanelContainer />
      </ReactFlowProvider>
    </div>
  );
};

export default FlowDrop;
