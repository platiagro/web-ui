import React, { useMemo } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

import { Skeleton } from 'uiComponents';

import './CompareResultItem.less';

const CompareResultItemTasks = ({
  trainingDetail,
  compareResult,
  onUpdate,
  tasks,
}) => {
  const operatorKeys = useMemo(() => {
    if (!trainingDetail?.operators) return [];
    return Object.keys(trainingDetail.operators);
  }, [trainingDetail?.operators]);

  const handleChange = (value) => {
    const updatedCompareResult = { ...compareResult, operatorId: value };
    onUpdate(updatedCompareResult, true);
  };

  if (!compareResult.runId || !trainingDetail) return <Skeleton />;

  return (
    <>
      <Select
        key={compareResult.operatorId}
        onChange={handleChange}
        optionLabelProp='label'
        style={{ width: '100%' }}
        placeholder={'Selecione a tarefa'}
        defaultValue={compareResult.operatorId}
      >
        {operatorKeys.map((operatorKey) => {
          const operator = trainingDetail.operators[operatorKey];
          const task = tasks.find((x) => x.uuid === operator.taskId);

          return (
            <Select.Option
              key={operator.taskId}
              value={operatorKey}
              label={task ? task.name : operator.taskId}
            >
              {task ? task.name : operator.taskId}
            </Select.Option>
          );
        })}
      </Select>
      <br />
      <br />
    </>
  );
};

CompareResultItemTasks.propTypes = {
  trainingDetail: PropTypes.object,
  compareResult: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CompareResultItemTasks;
