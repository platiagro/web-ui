import React, { useEffect, useMemo } from 'react';
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
  handleDownloadResult,
  onLoadTrainingHistory,
  onResultDatasetPageChange,
}) => {
  const trainingDetail = useMemo(() => {
    const experimentId = compareResult.experimentId;
    if (
      experimentId &&
      // eslint-disable-next-line no-prototype-builtins
      experimentsTrainingHistory.hasOwnProperty(experimentId)
    ) {
      const trainingHistory = experimentsTrainingHistory[experimentId];
      if (trainingHistory) {
        return trainingHistory.find(({ uuid }) => uuid === compareResult.runId);
      }
    }

    return null;
  }, [
    compareResult.experimentId,
    compareResult.runId,
    experimentsTrainingHistory,
  ]);

  // Get results if experiment and task are selected and results undefined
  useEffect(() => {
    if (
      compareResult.experimentId &&
      compareResult.operatorId &&
      compareResult.runId &&
      !compareResult.resultsFetched
    ) {
      onFetchResults(compareResult);
    }
  }, [compareResult, onFetchResults]);

  return (
    <Card
      style={{
        height: '100%',
        margin: 0,
      }}
      title={
        <CompareResultItemTitle
          onDelete={onDelete}
          onUpdate={onUpdate}
          compareResult={compareResult}
          trainingDetail={trainingDetail}
          experimentsOptions={experimentsOptions}
          handleDownloadResult={handleDownloadResult}
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
  tasks: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  compareResult: PropTypes.object.isRequired,
  experimentsOptions: PropTypes.array.isRequired,
  experimentsTrainingHistory: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onFetchResults: PropTypes.func.isRequired,
  handleDownloadResult: PropTypes.func.isRequired,
  onLoadTrainingHistory: PropTypes.func.isRequired,
  onResultDatasetPageChange: PropTypes.func.isRequired,
};

export default withResizeDetector(CompareResultItem);
