import { useEffect } from 'react';

import { OPERATOR_STATUS } from 'configs';

export default ({ handleFetchLogs, operators = [] }) => {
  useEffect(() => {
    if (!operators?.length || !handleFetchLogs) return;

    const canFetchLogs = operators.some(({ status }) => {
      const wasSuccessful = status === OPERATOR_STATUS.SUCCEEDED;
      const isRunning = status === OPERATOR_STATUS.RUNNING;
      const failed = status === OPERATOR_STATUS.FAILED;
      return wasSuccessful || isRunning || failed;
    });

    if (canFetchLogs) handleFetchLogs();
  }, [handleFetchLogs, operators]);
};
