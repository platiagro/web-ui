// CORE LIBS
import React from 'react';
import { useParams } from 'react-router-dom';

// COMPONENTS
import ContentHeaderProjectContainer from '../../ContentHeader/ContentHeaderProjectContainer';
import ComponentsMenuBlock from '../ComponentsMenuBlock/_/Container';
import ExperimentsTabs from '../ExperimentsTabs/_/Container';
import NewExperimentButton from '../NewExperimentButton/Container';
import NewExperimentModal from '../NewExperimentModal/Container';
import ExperimentEmpty from '../Experiment/ExperimentEmpty';
import ExperimentHeader from '../Experiment/ExperimentHeader/_/Container';
import ExperimentFlow from '../Experiment/ExperimentFlow/_/Container';
import { OperatorResizableSectionContainer } from 'containers';

import './style.scss';
/**
 * Project Content.
 * This component is responsible for displaying the project content.
 */
const ProjectContent = () => {
  // CONSTANTS
  const { experimentId } = useParams();

  // RENDER
  return (
    <>
      {/* Header from project (name and rename) */}
      <ContentHeaderProjectContainer />
      {/* main area of project with menu, flow and configuration drawer, is flex column */}
      <div className='experiment-area'>
        {/*  Sibling to config drawer (flow and menu), is flex row*/}
        <div className='experiment-content'>
          <ComponentsMenuBlock disabled={!experimentId} />

          {/* All content of flow (header, tabs and flow content), is flex column */}
          <div className='experiment-content-flow'>
            <ExperimentHeader />

            {/* Flow content, display flow or empty */}
            <div className='flow-content'>
              {experimentId ? <ExperimentFlow /> : <ExperimentEmpty />}
            </div>

            {/* Tabs row*/}
            <div className='row-tab-plus-button'>
              <ExperimentsTabs />
              <NewExperimentButton />
              <NewExperimentModal />
            </div>
          </div>
          <OperatorResizableSectionContainer />
        </div>
      </div>
    </>
  );
};

// EXPORT
export default ProjectContent;
