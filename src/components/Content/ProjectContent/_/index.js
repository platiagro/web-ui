// CORE LIBS
import React from 'react';

// UI LIBS
import { Row, Col } from 'antd';

// COMPONENTS
import ComponentsMenuBlock from '../ComponentsMenuBlock/_';
import ExperimentsTabs from '../ExperimentsTabs/_';
import NewExperimentButton from '../NewExperimentButton';
import Experiment from '../Experiment/_';

// MOCKS
import componentsMock from '../ComponentsMenuBlock/_/_componentsMock';
import experimentsMock from '../ExperimentsTabs/_/_experimentsMock';

/**
 * Project Content.
 * This component is responsible for displaying the project content.
 */
const ProjectContent = () => (
  // project row container
  <Row gutter={24}>
    {/* menu column container */}
    <Col span={5}>
      <ComponentsMenuBlock components={componentsMock} />
    </Col>
    {/* experiment column container */}
    <Col span={19}>
      {/* experiment tabs row container */}
      <Row gutter={15}>
        {/* experiment tabs column container */}
        <Col span={23}>
          <ExperimentsTabs
            experiments={experimentsMock}
            handleChange={(key) => alert(key)}
          />
        </Col>
        {/* new experiment column container */}
        <Col span={1}>
          <NewExperimentButton
            disabled={false}
            handleClick={() => alert('new experiment')}
          />
        </Col>
      </Row>
      {/* experiment row container */}
      <Row>
        <Experiment />
      </Row>
    </Col>
  </Row>
);

// EXPORT
export default ProjectContent;
