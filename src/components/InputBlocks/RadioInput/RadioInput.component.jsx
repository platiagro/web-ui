import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Skeleton, Tooltip } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { PropertyBlock } from 'components';

const RadioInput = ({
  tip,
  title,
  value,
  options,
  isLoading,
  isDisabled,
  handleChange,
  valueLatestTraining,
}) => {
  const modifiedSinceLastExecution = value !== valueLatestTraining;

  return (
    <PropertyBlock tip={tip} title={title}>
      {isLoading ? (
        <Skeleton
          active
          size='large'
          title={false}
          paragraph={{ rows: 1, width: 110 }}
        />
      ) : (
        <>
          <Radio.Group
            value={value}
            onChange={handleChange}
            disabled={isLoading || isDisabled}
          >
            {options.map((option) => (
              <Radio
                key={option.uuid}
                value={option.uuid}
                style={{ display: 'block' }}
              >
                {option.name}
              </Radio>
            ))}
          </Radio.Group>

          {modifiedSinceLastExecution && (
            <Tooltip
              placement='bottomRight'
              title='Valor modificado desde a última execução.'
            >
              <ExclamationCircleFilled
                style={{ color: '#FAAD14', marginLeft: 5 }}
              />
            </Tooltip>
          )}
        </>
      )}
    </PropertyBlock>
  );
};

RadioInput.propTypes = {
  tip: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  valueLatestTraining: PropTypes.string,
};

RadioInput.defaultProps = {
  tip: undefined,
  title: undefined,
  value: undefined,
  warning: undefined,
  description: undefined,
};

export default RadioInput;
