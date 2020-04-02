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

/**
 * Experiment Header.
 * This component is responsible for displaying the experiment header.
 */
const ExperimentHeader = ({
  title,
  loading,
  handleDeleteExperiment,
  handleEditExperimentName,
  handleTrainExperiment,
  handleDeployExperiment,
}) => (
  // row container
  <Row>
    {/* column container */}
    <Col span={19}>
      {/* title */}
      <Title
        title={title}
        loading={loading}
        level={4}
        handleSubmit={handleEditExperimentName}
      />
    </Col>
    {/* column container */}
    <Col span={2}>
      {/* train button */}
      <TrainExperimentButton
        handleClick={handleTrainExperiment}
        disabled={false}
        experimentRunning={false}
      />
    </Col>
    <Col span={2}>
      {/* deploy button */}
      <DeployExperimentButton
        handleClick={handleDeployExperiment}
        disabled={false}
      />
    </Col>
    <Col span={1} style={{ paddingRight: '0.7vw' }}>
      {/* delete button */}
      <DeleteExperimentButton
        disabled={false}
        handleClick={handleDeleteExperiment}
        loading={loading}
      />
    </Col>
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
};

// EXPORT
export default ExperimentHeader;
