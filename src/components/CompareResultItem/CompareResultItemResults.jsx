// REACT LIBS
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// UI LIBS
import { Image } from 'antd';

// COMPONENTS
import ResultsDrawer from 'pages/Experiments/Experiment/Drawer/ResultsDrawer';

// IMAGES
import graphLoaderImage from 'assets/resultGraphLoader.svg';
import tableLoaderImage from 'assets/resultTableLoader.svg';

// UTILS
import utils from 'utils';

// STYLES
import './CompareResultItem.less';

const CompareResultItemResults = (props) => {
  const {
    compareResult,
    height,
    onResultDatasetPageChange,
    onUpdate,
    tasks,
    trainingDetail,
  } = props;
  const [randResultImage] = useState(Math.floor(Math.random() * 2) + 1);

  if (
    !compareResult.operatorId ||
    !trainingDetail ||
    (!compareResult.dataset && !compareResult.figures && !compareResult.metrics)
  ) {
    return (
      <>
        {randResultImage === 2 ? (
          <Image
            src={graphLoaderImage}
            className={'centerResultImagePlaceholder'}
          />
        ) : (
          <Image
            src={tableLoaderImage}
            className={'centerResultImagePlaceholder'}
          />
        )}
      </>
    );
  }

  const operatorId = Object.keys(trainingDetail.operators).find(
    (opId) => opId === compareResult.operatorId
  );
  const operator = trainingDetail.operators[operatorId];
  const task = tasks.find((x) => x.uuid === operator.taskId);
  let resultsParameters;
  if (task) {
    resultsParameters = utils.formatResultsParameters(
      task.parameters,
      operator.parameters
    );
  } else {
    resultsParameters = [];
    for (const [key, value] of Object.entries(operator.parameters)) {
      resultsParameters.push({
        name: key,
        value: value,
      });
    }
  }

  const handleOnDatasetPageChange = (page, size) => {
    onResultDatasetPageChange(compareResult, page, size);
  };

  const handleOnTabChange = (activeKey) => {
    const updatedCompareResult = {
      ...compareResult,
      activeTab: activeKey,
    };
    onUpdate(updatedCompareResult, false);
  };

  return (
    <ResultsDrawer
      activeKey={compareResult.activeTab}
      dataset={compareResult.dataset}
      datasetScroll={{
        x: compareResult.dataset
          ? compareResult.dataset.columns.length * 100
          : undefined,
        y: height ? height - 375 : 200,
      }}
      figures={compareResult.figures}
      loading={false}
      metrics={compareResult.metrics}
      metricsLoading={false}
      parameters={resultsParameters}
      onDatasetPageChange={handleOnDatasetPageChange}
      onTabChange={handleOnTabChange}
      resultsTabStyle={{
        maxHeight: height ? height - 220 : 300,
        overflow: 'auto',
      }}
      scroll={{ y: height ? height - 300 : 200 }}
    />
  );
};

// PROP TYPES
CompareResultItemResults.propTypes = {
  /** The compare result */
  compareResult: PropTypes.object.isRequired,
  /** The current card height on grid */
  height: PropTypes.number,
  /** Function to handle result dataset page change */
  onResultDatasetPageChange: PropTypes.func.isRequired,
  /** Function to handle update compare result */
  onUpdate: PropTypes.func.isRequired,
  /** Tasks list */
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** The expriment training detail */
  trainingDetail: PropTypes.object,
};

// EXPORT DEFAULT
export default CompareResultItemResults;
