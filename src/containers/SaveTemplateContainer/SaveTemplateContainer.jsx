import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createTemplateRequest } from 'store/templates/actions';
import SaveTemplateModal from 'components/Modals/SaveTemplateModal';
import SaveTemplateButton from 'components/Buttons/SaveTemplateButton';
import { showNewTemplateModal, hideNewTemplateModal } from 'store/ui/actions';

const modalVisibleSelector = ({ uiReducer }) => {
  return uiReducer.newTemplateModal.visible;
};

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.template.loading;
};

const SaveTemplateContainer = ({ disabled }) => {
  const { deploymentId } = useParams();
  const dispatch = useDispatch();

  const modalVisible = useSelector(modalVisibleSelector);
  const isLoading = useSelector(loadingSelector);

  const handleCreateTemplate = (templateName) => {
    dispatch(createTemplateRequest(templateName, deploymentId));
  };

  const handleShowModal = () => {
    dispatch(showNewTemplateModal());
  };

  const handleHideModal = () => {
    dispatch(hideNewTemplateModal());
  };

  return (
    <>
      <SaveTemplateModal
        loading={isLoading}
        visible={modalVisible}
        onClose={handleHideModal}
        onConfirm={handleCreateTemplate}
      />

      <SaveTemplateButton disabled={disabled} onClick={handleShowModal} />
    </>
  );
};

SaveTemplateContainer.propTypes = {
  disabled: PropTypes.bool,
};

SaveTemplateContainer.defaultProps = {
  disabled: false,
};

export default SaveTemplateContainer;
