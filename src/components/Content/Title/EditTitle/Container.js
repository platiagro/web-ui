// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import EditTitle from './index';
import NewProjectModal from '../../ProjectsContent/NewProjectModal/Container';

// ACTIONS
import { showNewProjectModal } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // show new project modal
    handleShowNewProjectModal: (record) =>
      dispatch(showNewProjectModal(record)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
  };
};

/**
 * New Project Button Container.
 * This component is responsible for create a logic container for new project
 * button with redux.
 *
 * @param root0
 * @param root0.handleShowNewProjectModal
 * @param root0.project
 * @param root0
 * @param root0.handleShowNewProjectModal
 * @param root0.project
 * @param root0
 * @param root0.handleShowNewProjectModal
 * @param root0.project
 */
const EditTitleContainer = ({
  handleShowNewProjectModal,
  project,
  ...props
}) => {
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
      <EditTitle handleClick={handleEditModal} {...props} />
    </>
  );
};

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(EditTitleContainer);
