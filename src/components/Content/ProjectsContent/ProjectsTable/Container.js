// CORE LIBS
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import fetchProjects from '../../../../store/projects/actions';

// COMPONENTS
import ProjectsTable from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchProjects: () => dispatch(fetchProjects()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return { projects: state.projects };
};

// HANDLE CLICK MOCK
const handleClick = (uuid) => alert(uuid);

/**
 * Projects Table Container.
 * This component is responsible for create a logic container for projects table
 * with redux.
 */
const ProjectsTableContainer = ({ projects, handleFetchProjects }) => {
  // did mount hook
  useLayoutEffect(() => {
    // fetching projects
    handleFetchProjects();
  }, []);

  // RENDER
  return <ProjectsTable projects={projects} handleClickProject={handleClick} />;
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsTableContainer);
