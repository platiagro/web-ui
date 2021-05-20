import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createTemplateRequest } from 'store/templates/actions';
import { hideNewTemplateModal } from 'store/ui/actions';

import NewTemplateModal from './index';

const modalVisibleSelector = ({ uiReducer }) => {
  return uiReducer.newTemplateModal.visible;
};

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.template.loading;
};

const NewTemplateModalContainer = () => {
  const { experimentId } = useParams();
  const dispatch = useDispatch();

  const loading = useSelector(loadingSelector);
  const modalVisible = useSelector(modalVisibleSelector);

  const handleCreateNewTemplate = (templateName) => {
    dispatch(createTemplateRequest(templateName, experimentId));
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
