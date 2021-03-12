import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ExternalDatasetHelperModal } from 'components/Modals';

// ACTIONS
import { hideExternalDatasetHelperModal } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // close modal
    handleClose: () => dispatch(hideExternalDatasetHelperModal()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    // external dataset helper is visible
    visible: state.uiReducer.externalDatasetHelperModal.visible,
  };
};

const ExternalDatasetHelperModalContainer = (props) => {
  const { handleClose, visible, disabled, url } = props;
  return (
    <ExternalDatasetHelperModal
      onClose={handleClose}
      visible={visible}
      disabled={disabled}
      url={url}
    />
  );
};

ExternalDatasetHelperModalContainer.propTypes = {
  /** Data view modal close handler */
  handleClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

ExternalDatasetHelperModalContainer.defaultProps = {
  disabled: false,
  url: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExternalDatasetHelperModalContainer);
