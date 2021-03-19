// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// COMPONENTS
import PreloadAnimation from 'components/PreloadAnimation';

// ACTIONS
import { fetchJupyterLabHealth } from 'store/jupyterLab/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchJupyterLabHealth: () => dispatch(fetchJupyterLabHealth()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    healthy: state.jupyterLabReducer.healthy,
  };
};

/**
 * Container that handles redirect to JupyterLab.
 *
 * When JupyterLab is unavailable it shows a preload animation.
 * @param {object} props Container props
 * @returns {JupyterLabContainer} Container
 */
const JupyterLabContainer = (props) => {
  const { path } = useParams();

  const { healthy, handleFetchJupyterLabHealth } = props;

  const qs = props.location.search;

  // HOOKS
  // did mount hook
  useEffect(() => {
    if (healthy) {
      let url = '/notebook/anonymous/server/lab';
      if (path !== undefined) {
        url = `${url}/${path}`;
      }
      if (qs !== undefined) {
        url = `${url}${qs}`;
      }
      window.location.href = url;
    }

    handleFetchJupyterLabHealth();

    // polling experiment status
    const polling = setInterval(() => handleFetchJupyterLabHealth(), 5000);
    return () => clearInterval(polling);
  }, [path, qs, healthy, handleFetchJupyterLabHealth]);

  return <PreloadAnimation />;
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JupyterLabContainer)
);
