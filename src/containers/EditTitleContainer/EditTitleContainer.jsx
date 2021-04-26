// CORE LIBS
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// COMPONENTS
import EditTitle from 'components/EditTitle';
import NewProjectModal from 'components/Content/ProjectsContent/NewProjectModal/Container';

// ACTIONS
import { showNewProjectModal } from 'store/ui/actions';
import { Selectors } from 'store/projects';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // show new project modal
    handleShowNewProjectModal: (record) =>
      dispatch(showNewProjectModal(record)),
  };
};

// STATES
const mapStateToProps = (state, ownProps) => {
  const { getProject } = Selectors;

  const { projectId } = ownProps.match.params;

  return {
    project: getProject(projectId, state),
  };
};

/**
 * New Project Button Container.
 * This component is responsible for create a logic container for new project
 * button with redux.
 *
 * @component
 * @param {object} props Component props
 * @returns {EditTitleContainer} React component
 */
const EditTitleContainer = (props) => {
  // destructuring props
  const { handleShowNewProjectModal, project, title, ...restProps } = props;

  // RENDER
  const handleEditModal = () => {
    const record = {
      name: project.name,
      description: project.description,
      uuid: project.uuid,
    };
    handleShowNewProjectModal(record);
  };

  return (
    <>
      <NewProjectModal />
      <EditTitle
        {...restProps}
        handleClick={handleEditModal}
        title={title || project.name}
      />
    </>
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditTitleContainer)
);
