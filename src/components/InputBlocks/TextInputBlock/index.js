// CORE LIBS
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Input, Tooltip, Skeleton } from 'antd';

// COMPONENTS
import { PropertyBlock } from 'components';

/**
 * A input block with text input
 *
 * @param {object} props Component props
 * @returns {TextInputBlock} Component
 */
const TextInputBlock = (props) => {
  const { handleChange, name, isLoading, isDisabled } = props;
  const { placeholder, tip, title, value, valueLatestTraining } = props;
  const modifiedSinceLastExecution = value !== valueLatestTraining;

  // HOOKS
  // use ref
  const inputRef = useRef();
  // use state
  const [currentValue, setCurrentValue] = useState(value);
  // use effect
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  // FUNCTIONS
  // handle key press
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      await setCurrentValue(value);
      inputRef.current.blur();
    }
  };
  // before submit
  const beforeSubmit = () => {
    const trimmedValue = value?.trim();
    const trimmedCurrentValue = currentValue?.trim();

    // new value is different from old
    if (trimmedValue !== trimmedCurrentValue)
      handleChange(name, trimmedCurrentValue);
  };

  // RENDER
  return (
    <PropertyBlock tip={tip} title={title}>
      {isLoading ? (
        /* loading */
        <Skeleton
          active
          paragraph={{ rows: 1, width: 110 }}
          size='large'
          title={false}
        />
      ) : (
        <>
          {/* string input */}
          <Input
            ref={inputRef}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onBlur={beforeSubmit}
            onKeyUp={handleKeyPress}
            placeholder={placeholder}
            disabled={isLoading || isDisabled}
            style={
              modifiedSinceLastExecution ? { width: '80%' } : { width: '100%' }
            }
          />
          {/* rendering tooltip */}
          {modifiedSinceLastExecution ? (
            <Tooltip
              placement='bottomRight'
              title='Valor modificado desde a última execução.'
            >
              <ExclamationCircleFilled
                style={{ color: '#FAAD14', marginLeft: 5 }}
              />
            </Tooltip>
          ) : null}
        </>
      )}
    </PropertyBlock>
  );
};

// PROP TYPES
TextInputBlock.propTypes = {
  /** Input title */
  title: PropTypes.string,
  /** Input name */
  name: PropTypes.string.isRequired,
  /** Input tip message */
  tip: PropTypes.string,
  /** Input placeholder */
  placeholder: PropTypes.number,
  /** Input value */
  value: PropTypes.string,
  /** Input change handler */
  handleChange: PropTypes.func.isRequired,
  /** Input is disabled */
  isDisabled: PropTypes.bool.isRequired,
  /** Input is loading */
  isLoading: PropTypes.bool.isRequired,
  /** Lastest Training value */
  valueLatestTraining: PropTypes.bool,
};

// PROP DEFAULT VALUESstring
TextInputBlock.defaultProps = {
  /** Input tip */
  tip: undefined,
  /** Input text value */
  value: undefined,
  /** Input placeholder */
  placeholder: undefined,
  /** Input title */
  title: undefined,
};

// EXPORT
export default TextInputBlock;
