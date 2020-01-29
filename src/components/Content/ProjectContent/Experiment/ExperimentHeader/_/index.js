// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import TrainExperimentButton from '../TrainExperimentButton';

const ExperimentHeader = () => {
  return (
    <TrainExperimentButton
      disabled={false}
      handleClick={() => alert('train experiment')}
    />
  );
};

export default ExperimentHeader;
