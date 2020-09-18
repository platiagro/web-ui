// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import InterruptTrainExperimentButton from '../InterruptTrainExperimentButton';
import NewTemplateButton from '../NewTemplateButton/Container';
import NewTemplateModal from '../NewTemplateModal/Container';
import TrainExperimentButton from '../TrainExperimentButton';

import './styles.less';

/**
 * Experiment Header.
 * This component is responsible for displaying the experiment header.
 *
 * @component
 * @param {object} props Component props
 * @returns {ExperimentHeader} React component
 */
const ExperimentHeader = ({
  loading,
  deleteTrainingLoading,
  trainingLoading,
  handleTrainExperiment,
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
  </div>
);

// PROP TYPES
ExperimentHeader.propTypes = {
  /** experiment header edit experiment name handler */
  handleEditExperimentName: PropTypes.func.isRequired,
  /** experiment header train experiment handler */
  handleTrainExperiment: PropTypes.func.isRequired,
  /** experiment header delete train experiment handler */
  handleDeleteTrainExperiment: PropTypes.func.isRequired,
  /** is loading */
  loading: PropTypes.bool.isRequired,
  /** training is loading */
  trainingLoading: PropTypes.bool.isRequired,
  /** is empty (there isn't any operators) */
  empty: PropTypes.bool.isRequired,
};

// EXPORT
export default ExperimentHeader;
