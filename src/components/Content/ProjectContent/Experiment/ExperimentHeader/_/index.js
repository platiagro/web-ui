// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import DeleteExperimentButton from '../DeleteExperimentButton';
import DeployExperimentButton from '../DeployExperimentButton';
import InterruptTrainExperimentButton from '../InterruptTrainExperimentButton';
import NewTemplateButton from '../NewTemplateButton/Container';
import NewTemplateModal from '../NewTemplateModal/Container';
import TrainExperimentButton from '../TrainExperimentButton';

import './styles.scss';
/**
 * Experiment Header.
 * This component is responsible for displaying the experiment header.
 */
const ExperimentHeader = ({
  loading,
  deleteTrainingLoading,
  trainingLoading,
  trainingSucceeded,
  deployStatus,
  handleDeleteExperiment,
  handleTrainExperiment,
  handleDeployExperiment,
  handleDeleteTrainExperiment,
  empty,
}) => (
  <div className='buttons-config'>
    <NewTemplateModal />
    {/* new template button */}
    <NewTemplateButton disabled={loading || trainingLoading || empty} />
    {/* train button or interrupt train button */}
    {trainingLoading ? (
      <InterruptTrainExperimentButton
        handleClick={handleDeleteTrainExperiment}
        disabled={loading || deleteTrainingLoading}
        deleteExperimentRunning={deleteTrainingLoading}
      />
    ) : (
      <TrainExperimentButton
        handleClick={handleTrainExperiment}
        disabled={loading || empty}
      />
    )}
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
  /** experiment header delete train experiment handler */
  handleDeleteTrainExperiment: PropTypes.func.isRequired,
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
