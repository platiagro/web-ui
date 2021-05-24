import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { cancelDatasetUpload } from 'store/dataset/actions';

const CustomConfirmRouterContainer = ({ children }) => {
  const dispatch = useDispatch();

  const handleGetUserConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message);

    if (allowTransition) {
      dispatch(cancelDatasetUpload());
      callback(allowTransition);
    }
  };

  return (
    <Router getUserConfirmation={handleGetUserConfirmation}>{children}</Router>
  );
};

CustomConfirmRouterContainer.propTypes = {
  children: PropTypes.node,
};

CustomConfirmRouterContainer.defaultProps = {
  children: undefined,
};

export default CustomConfirmRouterContainer;
