import React from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from 'react-flow-renderer';

//COMPONENTS
import { ExperimentLogsPanelContainer } from 'containers';
import ExperimentEmpty from 'components/ExperimentEmpty';
import ExperimentHeader from '../../Experiment/ExperimentHeader/_/Container';
import ExperimentFlow from '../../Experiment/ExperimentFlow/_/Container';
import CustomDragLayer from '../CustomDragLayer';

import './style.less';

const FlowDrop = () => {
  const { experimentId } = useParams();

  return (
    <div className='custom-flow'>
      <ReactFlowProvider>
        <ExperimentHeader />
        {experimentId ? <ExperimentFlow /> : <ExperimentEmpty />}
        <CustomDragLayer />
        <ExperimentLogsPanelContainer />
      </ReactFlowProvider>
    </div>
  );
};

export default FlowDrop;
