// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import EditTitle from './index';
import NewProjectModal from '../../Content/ProjectsContent/NewProjectModal/Container';

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
 * @component
 * @param {object} props Component props
 * @returns {EditTitleContainer} React component
 */
const EditTitleContainer = (props) => {
  // destructuring props
  const { handleShowNewProjectModal, project, ...restProps } = props;

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
      <EditTitle handleClick={handleEditModal} {...restProps} />
    </>
  );
};

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(EditTitleContainer);
