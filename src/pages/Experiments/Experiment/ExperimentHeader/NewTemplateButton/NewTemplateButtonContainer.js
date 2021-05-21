import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { showNewTemplateModal } from 'store/ui/actions';

import NewTemplateButton from './index';

const NewTemplateButtonContainer = ({ disabled }) => {
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showNewTemplateModal());
  };

  return (
    <NewTemplateButton disabled={disabled} handleClick={handleShowModal} />
  );
};

NewTemplateButtonContainer.propTypes = {
  disabled: PropTypes.bool,
};

NewTemplateButtonContainer.defaultProps = {
  disabled: false,
};

export default NewTemplateButtonContainer;
