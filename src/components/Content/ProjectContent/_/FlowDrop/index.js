import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

//COMPONENTS
import ExperimentEmpty from '../../Experiment/ExperimentEmpty';
import ExperimentHeader from '../../Experiment/ExperimentHeader/_/Container';
import ExperimentFlow from '../../Experiment/ExperimentFlow/_/Container';
import CustomDragLayer from '../CustomDragLayer';

import './style.less';

const FlowDrop = () => {
  const { experimentId } = useParams();

  return (
    <div className='custom-flow'>
      <ExperimentHeader />
      {experimentId ? <ExperimentFlow /> : <ExperimentEmpty />}
      <CustomDragLayer />
    </div>
  );
};

// PROP TYPES
FlowDrop.propTypes = {
  canDrop: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  handleDeselectOperator: PropTypes.func.isRequired,
};

export default FlowDrop;
