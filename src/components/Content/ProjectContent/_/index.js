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
import NewExperimentModal from '../NewExperimentModal/Container';
import ExperimentEmpty from '../Experiment/ExperimentEmpty';
import Experiment from '../Experiment/_';

import './style.scss'
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
      <div className='contentPage' style={{padding: '0'}}>
        {/* project row container */}
        <Row gutter={24}>
          {/* menu column container */}
          <Col span={5} style={{backgroundColor: '#f2f0f5'}}>
            <ComponentsMenuBlock disabled={!experimentId} />
          </Col>
          {/* experiment column container */}
          <Col span={19} style={{backgroundColor: '#f2f0f5'}}>
            {/* experiment tabs row container */}
            {/* <Row gutter={15}> */}
            {/* experiment tabs column container */}
            {/* <Col span={23}> */}
            <div className='row-tab-plus-button'>
              <ExperimentsTabs />
              {/* </Col> */}
              {/* new experiment column container */}
              {/* <Col span={1}> */}
              {/* new experiment button */}
              <NewExperimentButton />
              {/* new experiment modal */}
              <NewExperimentModal />
              {/* </Col> */}
            </div>
            {/* </Row> */}
            {/* experiment row container */}
            <Row style={{
              backgroundColor: '#fff',
              border: '1px solid #e8e8e8',
              height: '74.1vh',
              padding: '13px 16px'
            }}>{experimentId ? <Experiment /> : <ExperimentEmpty />}</Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

// EXPORT
export default ProjectContent;
