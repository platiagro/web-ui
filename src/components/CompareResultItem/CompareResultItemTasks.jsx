// REACT LIBS
import PropTypes from 'prop-types';
import React from 'react';

// UI LIBS
import { Select } from 'antd';

// COMPONENTS
import { Skeleton } from 'uiComponents';

// STYLES
import './CompareResultItem.less';

const { Option } = Select;

const CompareResultItemTasks = (props) => {
  const { compareResult, onUpdate, tasks, trainingDetail } = props;

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
          onUpdate(updatedCompareResult, true);
        }}
        optionLabelProp='label'
        placeholder={'Selecione a tarefa'}
        style={{ width: '100%' }}
      >
        {Object.keys(trainingDetail.operators).map((operatorId) => {
          const operator = trainingDetail.operators[operatorId];
          const task = tasks.find((x) => x.uuid === operator.taskId);
          return (
            <Option
              key={operator.taskId}
              label={task ? task.name : operator.taskId}
              value={operatorId}
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

// PROP TYPES
CompareResultItemTasks.propTypes = {
  /** The compare result */
  compareResult: PropTypes.object.isRequired,
  /** Function to handle update compare result */
  onUpdate: PropTypes.func.isRequired,
  /** Tasks list */
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** The expriment training detail */
  trainingDetail: PropTypes.object,
};

// EXPORT DEFAULT
export default CompareResultItemTasks;
