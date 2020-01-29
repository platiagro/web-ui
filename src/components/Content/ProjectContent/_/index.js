// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Row, Col } from 'antd';

// COMPONENTS
import ComponentsMenuBlock from '../ComponentsMenuBlock/_';
import ExperimentsTabs from '../ExperimentsTabs/_';
import NewExperimentButton from '../NewExperimentButton';

// MOCKS
import componentsMock from '../ComponentsMenuBlock/_/_componentsMock';
import experimentsMock from '../ExperimentsTabs/_/_experimentsMock';

/**
 * Project Content.
 * This component is responsible for displaying the project content.
 */
const ProjectContent = () => {
  return (
    <Row gutter={24}>
      <Col span={5}>
        <ComponentsMenuBlock components={componentsMock} />
      </Col>
      <Col span={19}>
        <Row gutter={15}>
          <Col span={23}>
            <ExperimentsTabs
              experiments={experimentsMock}
              handleChange={(key) => alert(key)}
            />
          </Col>
          <Col span={1}>
            <NewExperimentButton
              disabled={false}
              handleClick={() => alert('new experiment')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

// EXPORT
export default ProjectContent;
