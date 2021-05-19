import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { ExternalDatasetHelperModal } from 'components/Modals';
import { hideExternalDatasetHelperModal } from 'store/ui/actions';

const visibleSelector = ({ uiReducer }) => {
  return uiReducer.externalDatasetHelperModal.visible;
};

const ExternalDatasetHelperModalContainer = ({ disabled, url }) => {
  const dispatch = useDispatch();

  const visible = useSelector(visibleSelector);

  const handleClose = () => {
    dispatch(hideExternalDatasetHelperModal());
  };

  return (
    <ExternalDatasetHelperModal
      onClose={handleClose}
      disabled={disabled}
      visible={visible}
      url={url}
    />
  );
};

ExternalDatasetHelperModalContainer.propTypes = {
  url: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

ExternalDatasetHelperModalContainer.defaultProps = {
  disabled: false,
  url: '',
};

export default ExternalDatasetHelperModalContainer;
