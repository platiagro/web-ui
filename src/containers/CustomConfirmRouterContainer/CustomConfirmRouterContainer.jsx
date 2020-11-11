// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ROUTER COMPONENTS
import { BrowserRouter as Router } from 'react-router-dom';

// ACTIONS
import { fetchCancelDatasetUpload } from 'store/dataset/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // show data view modal
    cancelUpload: () => dispatch(fetchCancelDatasetUpload()),
  };
};

const CustomConfirmRouterContainer = (props) => {
  // PROPS / CONSTANTS
  // destructuring props
  const { cancelUpload, children } = props;

  // rendering component
  return (
    <Router
      getUserConfirmation={(message, callback) => {
        // invoke alert confirm
        const allowTransition = window.confirm(message);

        // if confirmed
        if (allowTransition) {
          // cancel upload
          cancelUpload();
          // go to route
          callback(allowTransition);
        }
      }}
    >
      {/* child nodes */}
      {children}
    </Router>
  );
};

CustomConfirmRouterContainer.propTypes = {
  /** Cancel upload handler */
  cancelUpload: PropTypes.func.isRequired,
  /** Router childs */
  children: PropTypes.node.isRequired,
};

// EXPORT DEFAULT
export default connect(null, mapDispatchToProps)(CustomConfirmRouterContainer);
