// REACT LIBS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// ACTIONS
import { createTemplateRequest } from 'store/templates/actions';
import { showNewTemplateModal, hideNewTemplateModal } from 'store/ui/actions';

// COMPONENTS
import SaveTemplateButton from 'components/Buttons/SaveTemplateButton';
import SaveTemplateModal from 'components/Modals/SaveTemplateModal';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // create template action
    handleCreateTemplate: (templateName, experimentId) =>
      dispatch(createTemplateRequest(templateName + experimentId)),
    // show modal action
    handleShowModal: () => dispatch(showNewTemplateModal()),
    // hide modal action
    handleHideModal: () => dispatch(hideNewTemplateModal()),
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
 * Save Template Container
 * 
 * @param {*} props Component props
 * 
 * @returns {SaveTemplateContainer} Component
 */
const SaveTemplateContainer = (props) => {
  const {
    modalVisible,
    loading,
    handleCreateTemplate,
    handleShowModal,
    handleHideModal,
    disabled
  } = props;

  // CONSTANTS
  const { deploymentId } = useParams();

  // HANDLERS
  const newTemplateHandle = (templateName) => {
    handleCreateTemplate(templateName, deploymentId);
  };

  // RENDER
  return (
    <>
      <SaveTemplateModal 
        visible={modalVisible}
        onClose={handleHideModal}
        onConfirm={newTemplateHandle}
        loading={loading}
      />
      <SaveTemplateButton disabled={disabled} onClick={handleShowModal}/>
    </>
  );
};

// EXPORT DEFAULT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SaveTemplateContainer)
);