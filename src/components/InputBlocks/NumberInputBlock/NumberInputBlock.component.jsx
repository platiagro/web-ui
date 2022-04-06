import React, { useRef, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Tooltip, Skeleton } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { PropertyBlock } from 'components';

const NumberInputBlock = ({
  handleChange,
  isDisabled,
  isLoading,
  max,
  min,
  name,
  placeholder,
  tip,
  title,
  value,
  step,
  valueLatestTraining,
}) => {
  const inputRef = useRef();
  const [currentValue, setCurrentValue] = useState(value);

  const modifiedSinceLastExecution = useMemo(() => {
    return value !== valueLatestTraining;
  }, [value, valueLatestTraining]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setCurrentValue(value);
      inputRef.current.blur();
    }
  };

  const beforeSubmit = () => {
    if (value !== currentValue) handleChange(name, currentValue);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <PropertyBlock tip={tip} title={title}>
      {isLoading ? (
        <Skeleton
          active
          paragraph={{ rows: 1, width: 110 }}
          size='large'
          title={false}
        />
      ) : (
        <>
          <InputNumber
            ref={inputRef}
            value={currentValue}
            onChange={(valueReceived) => {
              setCurrentValue(valueReceived);
            }}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            decimalSeparator=','
            disabled={isLoading || isDisabled}
            onKeyUp={handleKeyPress}
            onBlur={beforeSubmit}
            style={{
              width: modifiedSinceLastExecution ? '80%' : '100%',
            }}
          />
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

NumberInputBlock.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  tip: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  valueLatestTraining: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  placeholder: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

NumberInputBlock.defaultProps = {
  tip: undefined,
  value: undefined,
  step: undefined,
  placeholder: undefined,
  title: undefined,
  name: undefined,
  min: undefined,
  max: undefined,
};

export default NumberInputBlock;
