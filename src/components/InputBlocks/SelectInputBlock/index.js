// CORE LIBS
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Tooltip, Select, Skeleton } from 'antd';

// COMPONENTS
import { InputBlockContainer } from 'components';

// SELECT COMPONENTS
const { Option } = Select;

/**
 * A input block with select input
 *
 * @param {object} props Component props
 * @returns {SelectInputBlock} Component
 */
const SelectInputBlock = (props) => {
  const { handleChange, isDisabled, isLoading, isMultiple, options } = props;
  const { placeholder, tip, title, value, valueLatestTraining } = props;
  const selectRef = useRef(null);
  const inputValue = typeof value === 'string' ? [value] : value;
  const executionValue =
    typeof valueLatestTraining === 'string'
      ? [valueLatestTraining]
      : valueLatestTraining;
  const modifiedSinceLastExecution =
    JSON.stringify(inputValue) !== JSON.stringify(executionValue);

  // rendering component
  return (
    <InputBlockContainer tip={tip} title={title}>
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
          {/* select input */}
          <Select
            ref={selectRef}
            onChange={(values) => {
              selectRef.current.blur();
              handleChange(values);
            }}
            mode={isMultiple ? 'multiple' : null}
            placeholder={placeholder}
            value={value}
            loading={isLoading}
            disabled={isLoading || isDisabled}
            style={
              modifiedSinceLastExecution ? { width: '90%' } : { width: '100%' }
            }
          >
            {/* rendering select options */}
            {options &&
              options.map((option) => {
                const { uuid, name: optionName } = option;
                return (
                  <Option key={uuid || option} value={uuid || option}>
                    {optionName || option}
                  </Option>
                );
              })}
          </Select>
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
    </InputBlockContainer>
  );
};

// PROP TYPES
SelectInputBlock.propTypes = {
  /** Input title string */
  title: PropTypes.string,
  /** Input name string */
  name: PropTypes.string,
  /** Input is loading */
  isLoading: PropTypes.bool.isRequired,
  /** Input is disabled */
  isDisabled: PropTypes.bool.isRequired,
  /** Input tip */
  tip: PropTypes.string,
  /** Input is multiple select */
  isMultiple: PropTypes.bool.isRequired,
  /** Input placeholder */
  placeholder: PropTypes.string.isRequired,
  /** Input selected value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** Input options list */
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  /** Input change handler */
  handleChange: PropTypes.func.isRequired,
  /** Lastest Training value */
  valueLatestTraining: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

// PROP DEFAULT VALUES
SelectInputBlock.defaultProps = {
  /** Input tip */
  tip: undefined,
  /** Input selected value */
  value: undefined,
  /** Input title  */
  title: undefined,
  /** Input name  */
  name: undefined,
};

// EXPORT
export default SelectInputBlock;
