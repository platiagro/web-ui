// REACT LIBS
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// UI LIBS
import {
  ClockCircleTwoTone,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Button, Card, Popover, Select, Space } from 'antd';

// COMPONENTS
import { CommonTable } from 'components';
import { Skeleton } from 'uiComponents';
import ResultsDrawer from 'components/Content/ProjectContent/Experiment/Drawer/ResultsDrawer/_';

const { Option, OptGroup } = Select;

const CompareResultItem = (props) => {
  const {
    compareResult,
    experiments,
    experimentsTrainingHistory,
    onDelete,
    onUpdate,
    tasks,
  } = props;

  // TODO get the results
  useEffect(() => {}, []);

  const formatDate = (date) => {
    var options = {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formatDate = new Date(date).toLocaleDateString(undefined, options);
    var rest = formatDate.substring(0, formatDate.lastIndexOf(' ') + 1);
    var last = formatDate.substring(
      formatDate.lastIndexOf(' ') + 1,
      formatDate.length
    );
    return rest + ', ' + last;
  };

  const getTraining = () => {
    const experimentTrainingHistory =
      experimentsTrainingHistory[compareResult.experimentId];
    const train = experimentTrainingHistory.find(
      (x) => x.runId === compareResult.runId
    );
    return train;
  };

  const renderExperimentSelect = () => {
    return experiments.map((experiment) => {
      const experimentTrainingHistory = experimentsTrainingHistory
        ? experimentsTrainingHistory[experiment.uuid]
        : null;

      if (!experimentTrainingHistory) {
        return;
      }

      return (
        <OptGroup label={experiment.name}>
          {experimentTrainingHistory.map((train) => {
            return (
              <Option
                value={`${experiment.uuid}/${train.runId}`}
                label={experiment.name}
              >
                {formatDate(train.createdAt)}
              </Option>
            );
          })}
        </OptGroup>
      );
    });
  };

  const renderTrainingDate = () => {
    if (!compareResult.runId) {
      return;
    }
    const train = getTraining();
    return (
      <Space>
        <ClockCircleTwoTone />
        {formatDate(train.createdAt)}
      </Space>
    );
  };

  const title = () => {
    const defaultValue =
      compareResult.experimentId && compareResult.runId
        ? `${compareResult.experimentId}/${compareResult.runId}`
        : null;
    return (
      <>
        <Space>
          <Select
            defaultValue={defaultValue}
            onChange={(value) => {
              var splitted = value.split('/');
              const updatedCompareResult = {
                ...compareResult,
                experimentId: splitted[0],
                runId: splitted[1],
              };
              onUpdate(updatedCompareResult);
            }}
            optionLabelProp='label'
            placeholder={
              <span style={{ color: '#262626' }}>Selecione o experimento</span>
            }
            style={{ width: 250 }}
          >
            {renderExperimentSelect()}
          </Select>
          {renderTrainingDate()}
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
    if (!compareResult.runId) {
      return <Skeleton paragraphConfig={{ rows: 1, width: '100%' }} />;
    }

    const train = getTraining();
    const trainTasks = train.details.map((details) => {
      const task = tasks.find((x) => x.uuid === details.taskId);
      return { operatorId: details.operatorId, taskName: task.name };
    });
    return (
      <>
        <Select
          defaultValue={compareResult.operatorId}
          onChange={(value) => {
            const updatedCompareResult = {
              ...compareResult,
              operatorId: value,
            };
            onUpdate(updatedCompareResult);
          }}
          optionLabelProp='label'
          placeholder={
            <span style={{ color: '#262626' }}>Selecione a tarefa</span>
          }
          style={{ width: '100%' }}
        >
          {trainTasks.map((trainTask) => {
            return (
              <Option value={trainTask.operatorId} label={trainTask.taskName}>
                {trainTask.taskName}
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
    if (!compareResult.runId || !compareResult.operatorId) {
      return (
        <>
          <CommonTable
            columns={['', '', '', '']}
            isLoading={true}
            rowKey={() => {
              return uuidv4();
            }}
            size={'small'}
            skeletonRowsAmount={5}
          />
        </>
      );
    }

    return (
      <>
        <ResultsDrawer
          metrics={[
            { r2_score: 1.0 },
            { accuracy: 1.0, scores: [1.0, 0.5, 0.1] },
          ]}
          results={[]}
          parameters={[]}
        />
      </>
    );
  };

  return (
    <Card title={title()} style={{ height: 450 }}>
      {renderTaskSelect()}
      {renderResults()}
    </Card>
  );
};

// PROP TYPES
CompareResultItem.propTypes = {
  /** Show tooltip below the icon */
  isTooltipBelow: PropTypes.bool.isRequired,
  /** Tooltip information text */
  tooltipText: PropTypes.string.isRequired,
  /** Icon type */
  iconType: PropTypes.oneOf(['info', 'question']).isRequired,
};

// EXPORT DEFAULT
export default CompareResultItem;
