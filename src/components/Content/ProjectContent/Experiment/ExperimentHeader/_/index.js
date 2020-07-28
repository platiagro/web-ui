// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import DeleteExperimentButton from '../DeleteExperimentButton';
import TrainExperimentButton from '../TrainExperimentButton';
import DeployExperimentButton from '../DeployExperimentButton';
import NewTemplateButton from '../NewTemplateButton/Container';
import NewTemplateModal from '../NewTemplateModal/Container';

import './styles.scss';
/**
 * Experiment Header.
 * This component is responsible for displaying the experiment header.
 */
const ExperimentHeader = ({
  loading,
  trainingLoading,
  trainingSucceeded,
  deployStatus,
  handleDeleteExperiment,
  handleTrainExperiment,
  handleDeployExperiment,
  empty,
}) => (
  <div className='buttons-config'>
    <NewTemplateModal />
    {/* new template button */}
    <NewTemplateButton disabled={loading || trainingLoading || empty} />
    {/* train button */}
    <TrainExperimentButton
      handleClick={handleTrainExperiment}
      disabled={loading || trainingLoading || trainingSucceeded || empty}
      experimentRunning={trainingLoading}
    />
    {/* deploy button */}
    <DeployExperimentButton
      handleClick={handleDeployExperiment}
      disabled={
        loading ||
        trainingLoading ||
        !trainingSucceeded ||
        deployStatus === 'Succeeded' ||
        deployStatus === 'Running'
      }
      loading={deployStatus === 'Running'}
    />
    {/* delete button */}
    <DeleteExperimentButton
      disabled={loading || trainingLoading}
      handleClick={handleDeleteExperiment}
      loading={loading}
    />
  </div>
);

// PROP TYPES
ExperimentHeader.propTypes = {
  /** experiment header delete experiment handler */
  handleDeleteExperiment: PropTypes.func.isRequired,
  /** experiment header edit experiment name handler */
  handleEditExperimentName: PropTypes.func.isRequired,
  /** experiment header train experiment handler */
  handleTrainExperiment: PropTypes.func.isRequired,
  /** experiment header deploy experiment handler */
  handleDeployExperiment: PropTypes.func.isRequired,
  /** is loading */
  loading: PropTypes.bool.isRequired,
  /** training is loading */
  trainingLoading: PropTypes.bool.isRequired,
  /** is empty (there isn't any operators) */
  empty: PropTypes.bool.isRequired,
  /** experiment deploy status */
  deployStatus: PropTypes.string.isRequired,
};

// EXPORT
export default ExperimentHeader;
