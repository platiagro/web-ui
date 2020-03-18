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
  handleDeleteExperiment,
  handleEditExperimentName,
  handleTrainExperiment,
  handleDeployExperiment,
}) => (
  // row container
  <Row>
    {/* column container */}
    <Col span={18}>
      {/* title */}
      <Title
        title={title}
        loading={false}
        level={4}
        handleSubmit={handleEditExperimentName}
      />
      {/* TODO: adicionar popconfirm ao excluir */}
      {/* delete button */}
      <DeleteExperimentButton
        disabled={false}
        handleClick={handleDeleteExperiment}
      />
    </Col>
    {/* column container */}
    <Col span={6}>
      {/* train button */}
      <TrainExperimentButton
        handleClick={handleTrainExperiment}
        disabled={false}
        experimentRunning={false}
      />
      {/* deploy button */}
      <DeployExperimentButton
        handleClick={handleDeployExperiment}
        disabled={false}
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
