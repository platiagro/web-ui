import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Input, Tooltip, Skeleton } from 'antd';
import PropTypes from 'prop-types';

import { PropertyBlock } from 'components';

const TextInputBlock = ({
  handleChange,
  name,
  isLoading,
  isDisabled,
  placeholder,
  tip,
  title,
  value,
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
    const trimmedValue = value?.toString()?.trim();
    const trimmedCurrentValue = currentValue?.toString()?.trim();
    if (trimmedValue !== trimmedCurrentValue) {
      handleChange(name, trimmedCurrentValue);
    }
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
          <Input
            ref={inputRef}
            value={currentValue}
            onBlur={beforeSubmit}
            onKeyUp={handleKeyPress}
            placeholder={placeholder}
            disabled={isLoading || isDisabled}
            onChange={(e) => setCurrentValue(e.target.value)}
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

TextInputBlock.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  tip: PropTypes.string,
  placeholder: PropTypes.number,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  valueLatestTraining: PropTypes.string,
};

TextInputBlock.defaultProps = {
  tip: undefined,
  value: undefined,
  placeholder: undefined,
  title: undefined,
};

export default TextInputBlock;
