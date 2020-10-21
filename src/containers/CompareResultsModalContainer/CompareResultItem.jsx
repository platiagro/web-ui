// REACT LIBS
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import {
  ClockCircleTwoTone,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Button, Card, Cascader, Image, Popover, Select, Space } from 'antd';

// COMPONENTS
import { Skeleton } from 'uiComponents';
import ResultsDrawer from 'components/Content/ProjectContent/Experiment/Drawer/ResultsDrawer/_';

// IMAGES
import graphLoaderImage from 'assets/resultGraphLoader.svg';
import tableLoaderImage from 'assets/resultTableLoader.svg';

// UTILS
import utils from 'utils';

// STYLES
import './CompareResultItem.less';

const { Option } = Select;

const CompareResultItem = (props) => {
  const {
    compareResult,
    experimentsOptions,
    experimentsTrainingHistory,
    onDelete,
    onFetchResults,
    onLoadTrainingHistory,
    onUpdate,
    tasks,
  } = props;

  const experimentId = compareResult.experimentId;
  let trainingDetail = null;
  if (experimentId && experimentsTrainingHistory.hasOwnProperty(experimentId)) {
    const trainingHistory = experimentsTrainingHistory[experimentId];
    if (trainingHistory) {
      trainingDetail = trainingHistory.find(
        (x) => x.runId === compareResult.runId
      );
    }
  }

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

  const renderCardTitle = () => {
    return (
      <>
        <Space>
          <Cascader
            defaultValue={
              compareResult.experimentId && compareResult.runId
                ? [compareResult.experimentId, compareResult.runId]
                : null
            }
            displayRender={(label, selectedOptions) => {
              return label[0];
            }}
            loadData={(selectedOptions) => {
              const targetOption = selectedOptions[selectedOptions.length - 1];
              onLoadTrainingHistory(targetOption.value);
            }}
            onChange={(value, selectedOptions) => {
              const updatedCompareResult = {
                ...compareResult,
              };
              if (value.length === 0) {
                updatedCompareResult.experimentId = null;
                updatedCompareResult.operatorId = null;
                updatedCompareResult.runId = null;
              } else {
                updatedCompareResult.experimentId = value[0];
                updatedCompareResult.operatorId = null;
                updatedCompareResult.runId = value[1];
              }
              onUpdate(updatedCompareResult);
            }}
            options={experimentsOptions}
            placeholder={'Selecione o experimento'}
            style={{ width: 250 }}
          />
          {trainingDetail ? (
            <Space>
              <ClockCircleTwoTone />
              {utils.formatCompareResultDate(trainingDetail.createdAt)}
            </Space>
          ) : null}
        </Space>
        <Popover
          placement='bottom'
          content={
            <Button
              type='text'
              icon={<DeleteOutlined />}
              onClick={() => {
                onDelete(compareResult.uuid);
              }}
            >
              Remover
            </Button>
          }
        >
          <Button
            type='text'
            icon={<MoreOutlined />}
            style={{ float: 'right' }}
          />
        </Popover>
      </>
    );
  };

  const renderTaskSelect = () => {
    if (!compareResult.runId || !trainingDetail) {
      return <Skeleton />;
    }
    return (
      <>
        <Select
          key={compareResult.operatorId}
          defaultValue={compareResult.operatorId}
          onChange={(value) => {
            const updatedCompareResult = {
              ...compareResult,
              operatorId: value,
            };
            onUpdate(updatedCompareResult);
          }}
          optionLabelProp='label'
          placeholder={'Selecione a tarefa'}
          style={{ width: '100%' }}
        >
          {trainingDetail.operators.map((operator) => {
            const task = tasks.find((x) => x.uuid === operator.taskId);
            return (
              <Option
                key={operator.taskId}
                label={task ? task.name : operator.taskId}
                value={operator.operatorId}
              >
                {task ? task.name : operator.taskId}
              </Option>
            );
          })}
        </Select>
        <br />
        <br />
      </>
    );
  };

  const renderResults = () => {
    if (
      !compareResult.operatorId ||
      !compareResult.metrics ||
      !compareResult.results ||
      !trainingDetail
    ) {
      const randNumber = Math.floor(Math.random() * 2) + 1;
      return (
        <>
          {randNumber === 1 ? (
            <Image src={graphLoaderImage} height={'100%'} width={'100%'} />
          ) : (
            <Image src={tableLoaderImage} width={'100%'} />
          )}
        </>
      );
    }

    const operator = trainingDetail.operators.find(
      (op) => op.operatorId === compareResult.operatorId
    );
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
    return (
      <ResultsDrawer
        loading={false}
        metrics={compareResult.metrics}
        metricsLoading={false}
        parameters={resultsParameters}
        results={compareResult.results}
        resultsTabStyle={{
          maxHeight: '200px',
          overflow: 'auto',
        }}
        scroll={{ y: 150 }}
      />
    );
  };

  return (
    <Card title={renderCardTitle()} style={{ height: 450 }}>
      {renderTaskSelect()}
      {renderResults()}
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
  /** Function to handle delete compare result */
  onDelete: PropTypes.func.isRequired,
  /** Function to handle fetch results */
  onFetchResults: PropTypes.func.isRequired,
  /** SFunction to handle load training history */
  onLoadTrainingHistory: PropTypes.func.isRequired,
  /** Function to handle update compare result */
  onUpdate: PropTypes.func.isRequired,
  /** Tasks list */
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT DEFAULT
export default CompareResultItem;
