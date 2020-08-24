// CORE LIBS
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Select, Skeleton } from 'antd';

// COMPONENTS
import { InputBlockContainer } from 'components';

// SELECT COMPONENTS
const { Option } = Select;

/**
 * A input block with select input
 *
 * @param {object} props Component props
 * @returns {SelectInputBlock} Component
 * @component
 */
const SelectInputBlock = (props) => {
  // destructuring props
  const {
    title,
    isLoading,
    isDisabled,
    tip,
    isMultiple,
    placeholder,
    value,
    options,
    handleChange,
  } = props;
  // ref hook
  const selectRef = useRef(null);

  // rendering component
  return (
    <InputBlockContainer tip={tip} title={title}>
      {isLoading ? (
        /* loading */
        <Skeleton
          paragraph={{ rows: 1, width: 110 }}
          size='large'
          title={false}
        />
      ) : (
        /* select input */
        <Select
          ref={selectRef}
          onChange={(values) => {
            selectRef.current.blur();
            handleChange(values);
          }}
          mode={isMultiple ? 'multiple' : null}
          style={{ width: '100%' }}
          placeholder={placeholder}
          value={value}
          loading={isLoading}
          disabled={isLoading || isDisabled}
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
