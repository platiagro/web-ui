import React from 'react';
import PropTypes from 'prop-types';

import SaveTemplateModal from 'components/Modals/SaveTemplateModal';
import SaveTemplateButton from 'components/Buttons/SaveTemplateButton';

import * as TEMPLATES_TYPES from 'store/templates/templates.actionTypes';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createTemplateRequest } from 'store/templates/templates.actions';
import { showNewTemplateModal, hideNewTemplateModal } from 'store/ui/actions';

import { useIsLoading } from 'hooks';

const modalVisibleSelector = ({ uiReducer }) => {
  return uiReducer.newTemplateModal.visible;
};

const SaveTemplateContainer = ({ disabled }) => {
  const { deploymentId } = useParams();
  const dispatch = useDispatch();

  const modalVisible = useSelector(modalVisibleSelector);
  const isLoading = useIsLoading(TEMPLATES_TYPES.CREATE_TEMPLATE_REQUEST);

  const handleCreateTemplate = (templateName) => {
    const createObject = {
      name: templateName,
      deploymentId,
    };

    dispatch(createTemplateRequest(createObject));
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
