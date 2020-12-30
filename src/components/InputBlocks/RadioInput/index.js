// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Radio, Skeleton, Tooltip } from 'antd';

// COMPONENTS
import { PropertyBlock } from 'components';

// RADIO COMPONENTS
const { Group } = Radio;

/**
 * Radio Input.
 * This component is responsible for displaying radio input in generic drawer.
 */
const RadioInput = (props) => {
  const { handleChange, isDisabled, isLoading, options } = props;
  const { tip, title, value, valueLatestTraining } = props;
  const modifiedSinceLastExecution = value !== valueLatestTraining;

  // rendering component
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
          {/* radio group */}
          <Group
            disabled={isLoading || isDisabled}
            onChange={handleChange}
            value={value}
          >
            {/* rendering radio options */}
            {options.map((option) => (
              <Radio
                style={{
                  display: 'block',
                }}
                key={option.uuid}
                value={option.uuid}
              >
                {option.name}
              </Radio>
            ))}
          </Group>
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
RadioInput.propTypes = {
  /** radio input title string */
  title: PropTypes.string,
  /** radio input description string */
  description: PropTypes.string,
  /** radio input warning message string */
  warning: PropTypes.string,
  /** radio input tip message string */
  tip: PropTypes.string,
  /** radio input value id string */
  value: PropTypes.string,
  /** radio input options list */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** radio input change handler */
  handleChange: PropTypes.func.isRequired,
};

// PROP DEFAULT VALUES
RadioInput.defaultProps = {
  /** radio input warning message string */
  warning: undefined,
  /** radio input tip message string */
  tip: undefined,
  /** radio input value id string */
  value: undefined,
  /** radio input title string */
  title: undefined,
  /** radio input description string */
  description: undefined,
};

// EXPORT
export default RadioInput;
