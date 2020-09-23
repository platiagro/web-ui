import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { DropTarget } from 'react-dnd';

//COMPONENTS
import ExperimentEmpty from '../../Experiment/ExperimentEmpty';
import ExperimentHeader from '../../Experiment/ExperimentHeader/_/Container';
import ExperimentFlow from '../../Experiment/ExperimentFlow/_/Container';
import CustomDragLayer from '../CustomDragLayer';

import './style.less';

const FlowDrop = ({ canDrop, isOver, connectDropTarget }) => {
  const { experimentId } = useParams();

  const isActive = canDrop && isOver && Boolean(experimentId);

  let backgroundColor = '#fff';
  if (isActive) {
    backgroundColor = 'rgba(20,250,20,0.1)';
  } else if (canDrop) {
    backgroundColor = 'rgba(250,20,20,0.1)';
  }
  return (
    <div
      ref={connectDropTarget}
      className='custom-flow'
      style={{ backgroundColor }}
    >
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

export default DropTarget(
  'TASK',
  {
    drop: () => ({ name: 'Flow' }),
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })
)(FlowDrop);
