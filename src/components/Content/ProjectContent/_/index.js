// CORE LIBS
import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

// COMPONENTS
import ContentHeaderProjectContainer from '../../ContentHeader/ContentHeaderProjectContainer';
import ComponentsMenuBlock from '../ComponentsMenuBlock/_/Container';
import ExperimentsTabs from '../ExperimentsTabs/_/Container';
import NewExperimentButton from '../NewExperimentButton/Container';
import NewExperimentModal from '../NewExperimentModal/Container';
import ExperimentEmpty from '../Experiment/ExperimentEmpty';
import ExperimentHeader from '../Experiment/ExperimentHeader/_/Container';
import ExperimentFlow from '../Experiment/ExperimentFlow/_/Container';
import {
  OperatorResizableSectionContainer,
  OperatorResultsModalContainer,
} from 'containers';

import { ProjectEmptyPlaceholder } from 'components/Placeholders';

// ACTIONS
import { deselectOperator } from '../../../../store/operator/actions';

import './style.scss';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleDeselectOperator: () => dispatch(deselectOperator()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    experiments: state.projectReducer.experiments,
  };
};

/**
 * Project Content.
 * This component is responsible for displaying the project content.
 *
 * @param props
 */
const ProjectContent = (props) => {
  // destructuring props
  const { experiments, handleDeselectOperator } = props;
  // CONSTANTS
  const { experimentId } = useParams();

  const FlowContent = (
    /* main area of project with menu, flow and configuration drawer, is flex column */
    <div className='experiment-area'>
      {/*  Sibling to config drawer (flow and menu), is flex row*/}
      <div className='experiment-content'>
        <ComponentsMenuBlock disabled={!experimentId} />

        {/* All content of flow (header, tabs and flow content), is flex column */}
        <div className='experiment-content-flow'>
          <ExperimentHeader />

          {/* Flow content, display flow or empty */}
          <div
            className='flow-content'
            onClick={() => handleDeselectOperator()}
          >
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
  );

  // RENDER
  return (
    <>
      {/* operator results modal */}
      <OperatorResultsModalContainer />
      {/* Header from project (name and rename) */}
      <ContentHeaderProjectContainer />
      {experiments && experiments.length > 0 ? (
        FlowContent
      ) : (
        <ProjectEmptyPlaceholder />
      )}
    </>
  );
};

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(ProjectContent);
