// REACT LIBS
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withResizeDetector } from 'react-resize-detector';

// UI LIBS
import { Card } from 'antd';

// COMPONENTS
import CompareResultItemResults from './CompareResultItemResults';
import CompareResultItemTasks from './CompareResultItemTasks';
import CompareResultItemTitle from './CompareResultItemTitle';

// STYLES
import './CompareResultItem.less';

const CompareResultItem = (props) => {
  const {
    compareResult,
    experimentsOptions,
    experimentsTrainingHistory,
    height,
    onDelete,
    onFetchResults,
    onLoadTrainingHistory,
    onResultDatasetPageChange,
    onUpdate,
    tasks,
  } = props;

  /**
   * Get the results if the experiment and task were selected
   * and the metrics and results were undefined
   */
  useEffect(() => {
    if (
      compareResult.experimentId &&
      compareResult.operatorId &&
      compareResult.runId &&
      !compareResult.metrics &&
      !compareResult.results
    ) {
      onFetchResults(compareResult);
    }
  }, [compareResult, onFetchResults]);

  const experimentId = compareResult.experimentId;
  let trainingDetail = null;
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
      title={
        <CompareResultItemTitle
          compareResult={compareResult}
          experimentsOptions={experimentsOptions}
          onDelete={onDelete}
          onLoadTrainingHistory={onLoadTrainingHistory}
          onUpdate={onUpdate}
          trainingDetail={trainingDetail}
        />
      }
      style={{ height: '100%', margin: 0 }}
    >
      <CompareResultItemTasks
        compareResult={compareResult}
        onUpdate={onUpdate}
        tasks={tasks}
        trainingDetail={trainingDetail}
      />
      <CompareResultItemResults
        compareResult={compareResult}
        height={height}
        onResultDatasetPageChange={onResultDatasetPageChange}
        onUpdate={onUpdate}
        tasks={tasks}
        trainingDetail={trainingDetail}
      />
    </Card>
  );
};

// PROP TYPES
CompareResultItem.propTypes = {
  /** The compare result */
  compareResult: PropTypes.object.isRequired,
  /** The expriment options to use on Cascader */
  experimentsOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** The expriments training history */
  experimentsTrainingHistory: PropTypes.object.isRequired,
  /** The current card height on grid */
  height: PropTypes.number,
  /** Function to handle delete compare result */
  onDelete: PropTypes.func.isRequired,
  /** Function to handle fetch results */
  onFetchResults: PropTypes.func.isRequired,
  /** Function to handle load training history */
  onLoadTrainingHistory: PropTypes.func.isRequired,
  /** Function to handle result dataset page change */
  onResultDatasetPageChange: PropTypes.func.isRequired,
  /** Function to handle update compare result */
  onUpdate: PropTypes.func.isRequired,
  /** Tasks list */
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT DEFAULT
export default withResizeDetector(CompareResultItem);
