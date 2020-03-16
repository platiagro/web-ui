// CORE LIBS
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentHeader from './index';

// ACTIONS
import { deleteExperiment } from '../../../../../../store/experiments/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteExperiment: (experimentUuid) =>
      dispatch(deleteExperiment(experimentUuid)),
  };
};

// STATES
// const mapStateToProps = (state) => {
//   return { project: state.project };
// };

/**
 * Experiment Header Container.
 * This component is responsible for create a logic container for experiment
 * header with redux.
 */
const ExperimentHeaderContainer = ({ handleDeleteExperiment }) => {
  // CONSTANTS
  // getting project uuid
  const { experimentUuid } = useParams();

  // HOOKS
  // did mount hook
  // useLayoutEffect(() => {
  //   // fetching projects
  //   handleFetchProject(projectUuid);
  // }, []);

  // HANDLERS
  const deleteHandler = () => handleDeleteExperiment(experimentUuid);

  // RENDER
  return <ExperimentHeader handleDeleteExperiment={deleteHandler} />;
};

// EXPORT
export default connect(null, mapDispatchToProps)(ExperimentHeaderContainer);
