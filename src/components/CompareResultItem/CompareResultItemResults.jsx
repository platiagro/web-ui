import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';

import utils from 'utils';
import GraphLoaderImage from 'assets/resultGraphLoader.svg';
import TableLoaderImage from 'assets/resultTableLoader.svg';
import ResultsDrawer from 'pages/Experiments/Experiment/Drawer/ResultsDrawer';

import './CompareResultItem.less';

const CompareResultItemResults = ({
  tasks,
  height,
  onUpdate,
  compareResult,
  trainingDetail,
  onResultDatasetPageChange,
}) => {
  const isRandomResultImageEqualsTwo = useMemo(() => {
    const randomResultImage = Math.floor(Math.random() * 2) + 1;
    return randomResultImage === 2;
  }, []);

  const shouldShowResultImagePlaceholder = useMemo(() => {
    return (
      !compareResult.operatorId ||
      !trainingDetail ||
      (!compareResult.dataset && !compareResult.figures)
    );
  }, [
    compareResult.dataset,
    compareResult.figures,
    compareResult.operatorId,
    trainingDetail,
  ]);

  const resultsParameters = useMemo(() => {
    if (shouldShowResultImagePlaceholder) return [];

    const operatorKeys = Object.keys(trainingDetail.operators);
    const operatorId = operatorKeys.find(
      (opId) => opId === compareResult.operatorId
    );

    const operator = trainingDetail.operators[operatorId];
    const task = tasks.find(({ uuid }) => uuid === operator.taskId);

    if (task) {
      return utils.formatResultsParameters(
        task.parameters,
        operator.parameters
      );
    }

    return Object.entries(operator.parameters).map(([key, value]) => {
      return {
        name: key,
        value: value,
      };
    });
  }, [
    compareResult.operatorId,
    shouldShowResultImagePlaceholder,
    tasks,
    trainingDetail?.operators,
  ]);

  const handleOnDatasetPageChange = (page, size) => {
    onResultDatasetPageChange(compareResult, page, size);
  };

  const handleOnTabChange = (activeKey) => {
    const updatedCompareResult = { ...compareResult, activeTab: activeKey };
    onUpdate(updatedCompareResult, false);
  };

  if (shouldShowResultImagePlaceholder) {
    return isRandomResultImageEqualsTwo ? (
      <Image
        src={GraphLoaderImage}
        className={'centerResultImagePlaceholder'}
      />
    ) : (
      <Image
        src={TableLoaderImage}
        className={'centerResultImagePlaceholder'}
      />
    );
  }

  return (
    <ResultsDrawer
      loading={false}
      parameters={resultsParameters}
      dataset={compareResult.dataset}
      figures={compareResult.figures}
      onTabChange={handleOnTabChange}
      activeKey={compareResult.activeTab}
      scroll={{ y: height ? height - 300 : 200 }}
      onDatasetPageChange={handleOnDatasetPageChange}
      datasetScroll={{
        x: compareResult.dataset
          ? compareResult.dataset.columns.length * 100
          : undefined,
        y: height ? height - 375 : 200,
      }}
      resultsTabStyle={{
        maxHeight: height ? height - 220 : 300,
        overflow: 'auto',
      }}
    />
  );
};

CompareResultItemResults.propTypes = {
  tasks: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  compareResult: PropTypes.object.isRequired,
  trainingDetail: PropTypes.object.isRequired,
  onResultDatasetPageChange: PropTypes.func.isRequired,
};

export default CompareResultItemResults;
