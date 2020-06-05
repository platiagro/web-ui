// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Row, Col } from 'antd';

// COMPONENTS
import Title from '../../../../Title';
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
  title,
  loading,
  trainingLoading,
  trainingSucceeded,
  deployStatus,
  handleDeleteExperiment,
  handleEditExperimentName,
  handleTrainExperiment,
  handleDeployExperiment,
  empty,
}) => (
  // row container
  <Row>
    {/* new template modal */}
    <NewTemplateModal />
    {/* column container */}
    <Col span={12}>
      {/* title */}
      <Title
        title={title}
        loading={loading}
        level={4}
        handleSubmit={handleEditExperimentName}
      />
    </Col>
    {/* column container */}
    <div className='buttons-config'>
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
  </Row>
);

// PROP TYPES
ExperimentHeader.propTypes = {
  /** experiment header experiment name */
  title: PropTypes.string.isRequired,
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
  /** experiment deploy is failed */
  deployIsFailed: PropTypes.bool.isRequired,
};

// EXPORT
export default ExperimentHeader;
