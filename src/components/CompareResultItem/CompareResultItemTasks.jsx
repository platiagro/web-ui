import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

import { Skeleton } from 'uiComponents';

import './CompareResultItem.less';

const CompareResultItemTasks = ({
  selectedExperiment,
  compareResult,
  onUpdate,
}) => {
  if (!compareResult.runId || !selectedExperiment) {
    return <Skeleton />;
  }

  const handleChange = (value) => {
    const updatedCompareResult = { ...compareResult, operatorId: value };
    onUpdate(updatedCompareResult, true);
  };

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
        {selectedExperiment.operators?.map(({ uuid, name }) => {
          return (
            <Select.Option key={uuid} value={uuid} label={name || uuid}>
              {name || uuid}
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
  selectedExperiment: PropTypes.object,
  compareResult: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CompareResultItemTasks;
