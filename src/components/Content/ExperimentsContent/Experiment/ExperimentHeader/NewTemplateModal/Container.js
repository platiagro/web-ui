// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// ACTIONS
import { createTemplateRequest } from '../../../../../../store/templates/actions';
import { hideNewTemplateModal } from '../../../../../../store/ui/actions';

// COMPONENTS
import NewTemplateModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // create template action
    handleCreateTemplate: (templateName, experimentId) =>
      dispatch(createTemplateRequest(templateName, experimentId)),
    // hide modal action
    handleHideTemplateModal: () => dispatch(hideNewTemplateModal()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    modalVisible: state.uiReducer.newTemplateModal.visible,
    loading: state.uiReducer.template.loading,
  };
};

/**
 * New Template Modal Container.
 * This component is responsible for create a logic container for new template
 * modal with redux.
 */
const NewTemplateModalContainer = ({
  modalVisible,
  loading,
  handleHideTemplateModal,
  handleCreateTemplate,
}) => {
  // CONSTANTS
  const { experimentId } = useParams();

  // HANDLERS
  const newTemplateHandler = (templateName) => {
    handleCreateTemplate(templateName, experimentId);
  };

  // RENDER
  return (
    <NewTemplateModal
      visible={modalVisible}
      handleCloseModal={handleHideTemplateModal}
      handleNewTemplate={newTemplateHandler}
      loading={loading}
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewTemplateModalContainer)
);
