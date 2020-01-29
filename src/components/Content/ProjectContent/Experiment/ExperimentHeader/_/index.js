// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import TrainExperimentButton from '../TrainExperimentButton';
import DeployExperimentButton from '../DeployExperimentButton';

const ExperimentHeader = () => {
  return (
    <div>
      <TrainExperimentButton
        disabled={false}
        handleClick={() => alert('train experiment')}
      />
      <DeployExperimentButton
        disabled={false}
        handleClick={() => alert('deploy experiment')}
      />
    </div>
  );
};

export default ExperimentHeader;
