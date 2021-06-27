import React from 'react';

import NewTemplateModal from './index';

import * as TEMPLATES_TYPES from 'store/templates/templates.actionTypes';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createTemplateRequest } from 'store/templates/templates.actions';
import { hideNewTemplateModal } from 'store/ui/actions';

import { useIsLoading } from 'hooks';

const modalVisibleSelector = ({ uiReducer }) => {
  return uiReducer.newTemplateModal.visible;
};

const NewTemplateModalContainer = () => {
  const { experimentId } = useParams();
  const dispatch = useDispatch();

  const loading = useIsLoading(TEMPLATES_TYPES.CREATE_TEMPLATE_REQUEST);
  const modalVisible = useSelector(modalVisibleSelector);

  const handleCreateNewTemplate = (templateName) => {
    const createObject = {
      name: templateName,
      experimentId,
    };

    dispatch(createTemplateRequest(createObject));
  };

  const handleHideTemplateModal = () => {
    dispatch(hideNewTemplateModal());
  };

  return (
    <NewTemplateModal
      loading={loading}
      visible={modalVisible}
      handleNewTemplate={handleCreateNewTemplate}
      handleCloseModal={handleHideTemplateModal}
    />
  );
};

export default NewTemplateModalContainer;
