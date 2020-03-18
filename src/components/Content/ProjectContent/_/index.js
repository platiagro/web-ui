// CORE LIBS
import React from 'react';
import { useParams } from 'react-router-dom';

// UI LIBS
import { Row, Col } from 'antd';

// COMPONENTS
import ContentHeader from '../../ContentHeader/ProjectContainer';
import ComponentsMenuBlock from '../ComponentsMenuBlock/_/Container';
import ExperimentsTabs from '../ExperimentsTabs/_/Container';
import NewExperimentButton from '../NewExperimentButton/Container';
import ExperimentEmpty from '../Experiment/ExperimentEmpty';
import Experiment from '../Experiment/_';

/**
 * Project Content.
 * This component is responsible for displaying the project content.
 */
const ProjectContent = () => {
  // CONSTANTS
  const { experimentId } = useParams();

  // RENDER
  return (
    // fragment container
    <>
      {/* content header */}
      <ContentHeader />
      {/* div content page container */}
      <div className='contentPage'>
        {/* project row container */}
        <Row gutter={24}>
          {/* menu column container */}
          <Col span={5}>
            <ComponentsMenuBlock disabled={!experimentId} />
          </Col>
          {/* experiment column container */}
          <Col span={19}>
            {/* experiment tabs row container */}
            <Row gutter={15}>
              {/* experiment tabs column container */}
              <Col span={23}>
                <ExperimentsTabs />
              </Col>
              {/* new experiment column container */}
              <Col span={1}>
                <NewExperimentButton />
              </Col>
            </Row>
            {/* experiment row container */}
            <Row>{experimentId ? <Experiment /> : <ExperimentEmpty />}</Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

// EXPORT
export default ProjectContent;
