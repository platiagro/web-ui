// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Row, Col } from 'antd';

// COMPONENTS
import EditableTitle from '../../../../../EditableTitle';
import DeleteExperimentButton from '../DeleteExperimentButton';
import TrainExperimentButton from '../TrainExperimentButton';
import DeployExperimentButton from '../DeployExperimentButton';

// editable title class name const
const editableTitleClassName = 'editable-title autosize-input-custom';

const ExperimentHeader = () => {
  return (
    <Row>
      <Col span={18}>
        <EditableTitle
          title='Experimento 01'
          loading={false}
          className={editableTitleClassName}
          editingClassName={`${editableTitleClassName} edit-mode`}
        />
        <DeleteExperimentButton
          disabled={false}
          handleClick={() => alert('delete experiment')}
        />
      </Col>
      <Col span={6}>
        <TrainExperimentButton
          disabled={false}
          handleClick={() => alert('train experiment')}
        />
        <DeployExperimentButton
          disabled={false}
          handleClick={() => alert('deploy experiment')}
        />
      </Col>
    </Row>
  );
};

export default ExperimentHeader;
