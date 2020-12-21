// REACT LIBS
import PropTypes from 'prop-types';
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
  const { experimentId } = useParams();

  // HANDLERS
  const newTemplateHandle = (templateName) => {
    handleCreateTemplate(templateName, experimentId);
  };

  // RENDER
  return (
    <div>
      <SaveTemplateModal 
        visible={modalVisible}
        handleCloseModal={handleHideModal}
        handleNewTemplate={newTemplateHandle}
        loading={loading}
      />
      <SaveTemplateButton disabled={disabled} handleClick={handleShowModal}/>
    </div>
  );
};

SaveTemplateContainer.propTypes = {
  /** save template modal is visible */
  modalVisible: PropTypes.bool.isRequired,
  /** save template modal is loading */
  loading: PropTypes.bool.isRequired,
  /** action to create a new template */
  handleCreateTemplate: PropTypes.func.isRequired,
  /** action to show save template modal */
  handleShowModal: PropTypes.func.isRequired,
  /** action to hide save template modal */
  handleHideModal: PropTypes.func.isRequired,
  /** save template button is disabled */
  disabled: PropTypes.bool,
};

// EXPORT DEFAULT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SaveTemplateContainer)
);