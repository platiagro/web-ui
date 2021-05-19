import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import utils from 'utils';
import PreloadAnimation from 'components/PreloadAnimation';
import { fetchJupyterLabHealth } from 'store/jupyterLab/actions';

const healthySelector = ({ jupyterLabReducer }) => {
  return jupyterLabReducer.healthy;
};

const JupyterLabContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { path } = useParams();

  const [remainingSeconds, setRemainingSeconds] = useState(-1);
  const healthy = useSelector(healthySelector);

  const handleFetchJupyterLabHealth = useCallback(() => {
    dispatch(fetchJupyterLabHealth());
  }, [dispatch]);

  useEffect(() => {
    if (healthy) {
      const search = location.search;

      let url = '/notebook/anonymous/server/lab';
      if (path) url = `${url}/${path}`;
      if (search) url = `${url}${search}`;

      window.location.href = url;
    }
  }, [path, healthy, location.search]);

  // Polling jupyterlab health status
  useEffect(() => {
    const updateRemainingSeconds = async () => {
      await utils.sleep(1000);
      if (remainingSeconds > 0) {
        setRemainingSeconds(remainingSeconds - 1);
      } else {
        handleFetchJupyterLabHealth();
        // 3 seconds of reading time
        await utils.sleep(3000);
        setRemainingSeconds(9);
      }
    };

    updateRemainingSeconds();
  }, [handleFetchJupyterLabHealth, remainingSeconds, setRemainingSeconds]);

  return <PreloadAnimation remainingSeconds={remainingSeconds} />;
};

export default JupyterLabContainer;
