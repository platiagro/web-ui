// CORE LIBS
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// COMPONENTS
import PreloadAnimation from 'components/PreloadAnimation';

// ACTIONS
import { fetchJupyterLabHealth } from 'store/jupyterLab/actions';

// UTILS
import utils from 'utils';

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
  const [remainingSeconds, setRemainingSeconds] = useState(-1);

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

    async function updateRemainingSeconds() {
      await utils.sleep(1000);
      if (remainingSeconds > 0) {
        setRemainingSeconds(remainingSeconds - 1);
      } else {
        // polling jupyterlab health status
        handleFetchJupyterLabHealth();

        // gives 3 seconds of reading time for users
        await utils.sleep(1000);
        setRemainingSeconds(9);
      }
    }

    updateRemainingSeconds();
  }, [
    path,
    qs,
    healthy,
    handleFetchJupyterLabHealth,
    remainingSeconds,
    setRemainingSeconds,
  ]);

  return <PreloadAnimation remainingSeconds={remainingSeconds} />;
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JupyterLabContainer)
);
