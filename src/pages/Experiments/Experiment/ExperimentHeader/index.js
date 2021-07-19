import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  InterruptTrainExperimentButton,
  TrainExperimentButton,
} from 'components/Buttons';
import ToolbarConfig from 'components/ToolbarConfig';
import NewTemplateModal from './NewTemplateModal/NewTemplateModalContainer';
import NewTemplateButton from './NewTemplateButton/NewTemplateButtonContainer';

import './styles.less';

const ExperimentHeader = ({
  empty,
  loading,
  operator,
  trainingLoading,
  deleteTrainingLoading,
  handleRemoveOperator,
  handleTrainExperiment,
  handleDeleteTrainExperiment,
}) => {
  return (
    <div className='experiment-toolbar-container'>
      <NewTemplateModal />

      <div className='experiment-toolbar-container-controls'>
        <ToolbarConfig
          operator={operator}
          handleDeleteClick={handleRemoveOperator}
        />
      </div>

      <div className='experiment-toolbar-container-buttons'>
        <NewTemplateButton disabled={loading || trainingLoading || empty} />

        {trainingLoading ? (
          <InterruptTrainExperimentButton
            handleClick={handleDeleteTrainExperiment}
            disabled={loading || deleteTrainingLoading}
            deleteExperimentRunning={deleteTrainingLoading}
          />
        ) : (
          <TrainExperimentButton
            disabled={loading || empty}
            handleClick={handleTrainExperiment}
          />
        )}
      </div>
    </div>
  );
};

ExperimentHeader.propTypes = {
  empty: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  operator: PropTypes.object.isRequired,
  trainingLoading: PropTypes.bool.isRequired,
  deleteTrainingLoading: PropTypes.bool.isRequired,
  handleRemoveOperator: PropTypes.func.isRequired,
  handleTrainExperiment: PropTypes.func.isRequired,
  handleDeleteTrainExperiment: PropTypes.func.isRequired,
};

export default memo(ExperimentHeader);
