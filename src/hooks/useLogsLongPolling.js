import { useEffect } from 'react';

import { OPERATOR_STATUS } from 'configs';
import { usePrevious } from 'hooks';

export const useLogsLongPolling = ({ handleFetchLogs, operators = [] }) => {
  const previousOperators = usePrevious(operators);

  useEffect(() => {
    const hasNoFetchFunction = !handleFetchLogs;
    const hasNoOperators = !operators?.length;
    const hasNoPreviousOperators = !previousOperators?.length;
    const isLengthsDifferent = operators?.length !== previousOperators?.length;

    if (
      hasNoFetchFunction ||
      hasNoOperators ||
      hasNoPreviousOperators ||
      isLengthsDifferent
    ) {
      return;
    }

    const haveRunningOrFinishedOperators = operators.some(({ status }) => {
      const wasSuccessful = status === OPERATOR_STATUS.SUCCEEDED;
      const isRunning = status === OPERATOR_STATUS.RUNNING;
      const failed = status === OPERATOR_STATUS.FAILED;
      return wasSuccessful || isRunning || failed;
    });

    const isStatusDifferentFromPreviousState = operators.some(
      (operator, index) => {
        const currentOperatorStatus = operator.status;
        const previousOperatorStatus = previousOperators[index].status;
        return currentOperatorStatus !== previousOperatorStatus;
      }
    );

    if (haveRunningOrFinishedOperators && isStatusDifferentFromPreviousState) {
      handleFetchLogs();
    }
  }, [handleFetchLogs, operators, previousOperators]);
};
