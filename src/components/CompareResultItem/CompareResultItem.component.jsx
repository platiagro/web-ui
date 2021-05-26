import React, { useEffect } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import { withResizeDetector } from 'react-resize-detector';

import CompareResultItemTasks from './CompareResultItemTasks';
import CompareResultItemTitle from './CompareResultItemTitle';
import CompareResultItemResults from './CompareResultItemResults';

import './CompareResultItem.less';

const CompareResultItem = ({
  tasks,
  height,
  compareResult,
  experimentsOptions,
  experimentsTrainingHistory,
  onDelete,
  onUpdate,
  onFetchResults,
  onLoadTrainingHistory,
  onResultDatasetPageChange,
}) => {
  /**
   * Get the results if the experiment and task were selected
   * and the results were undefined
   */
  useEffect(() => {
    if (
      compareResult.experimentId &&
      compareResult.operatorId &&
      compareResult.runId &&
      !compareResult.results
    ) {
      onFetchResults(compareResult);
    }
  }, [compareResult, onFetchResults]);

  const experimentId = compareResult.experimentId;
  let trainingDetail = null;
  // eslint-disable-next-line no-prototype-builtins
  if (experimentId && experimentsTrainingHistory.hasOwnProperty(experimentId)) {
    const trainingHistory = experimentsTrainingHistory[experimentId];
    if (trainingHistory) {
      trainingDetail = trainingHistory.find(
        (x) => x.uuid === compareResult.runId
      );
    }
  }

  return (
    <Card
      style={{ height: '100%', margin: 0 }}
      title={
        <CompareResultItemTitle
          onDelete={onDelete}
          onUpdate={onUpdate}
          compareResult={compareResult}
          trainingDetail={trainingDetail}
          experimentsOptions={experimentsOptions}
          onLoadTrainingHistory={onLoadTrainingHistory}
        />
      }
    >
      <CompareResultItemTasks
        tasks={tasks}
        onUpdate={onUpdate}
        compareResult={compareResult}
        trainingDetail={trainingDetail}
      />

      <CompareResultItemResults
        tasks={tasks}
        height={height}
        onUpdate={onUpdate}
        compareResult={compareResult}
        trainingDetail={trainingDetail}
        onResultDatasetPageChange={onResultDatasetPageChange}
      />
    </Card>
  );
};

CompareResultItem.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number,
  compareResult: PropTypes.object.isRequired,
  experimentsOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  experimentsTrainingHistory: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onFetchResults: PropTypes.func.isRequired,
  onLoadTrainingHistory: PropTypes.func.isRequired,
  onResultDatasetPageChange: PropTypes.func.isRequired,
};

export default withResizeDetector(CompareResultItem);
