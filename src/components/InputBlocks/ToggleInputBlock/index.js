// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Switch, Spin } from 'antd';

// COMPONENTS
import { InputBlockContainer } from 'components';

/**
 * A input block with toggle input
 *
 * @param {object} props Component props
 * @returns {ToggleInputBlock} Component
 * @component
 */
const ToggleInputBlock = (props) => {
  // destructuring props
  const {
    title,
    name,
    tip,
    isChecked,
    handleChange,
    isLoading,
    isDisabled,
  } = props;

  // rendering component
  return (
    <InputBlockContainer tip={tip} title={title}>
      {isLoading ? (
        /* loading */
        <Spin style={{ marginLeft: '1vw' }} indicator={<LoadingOutlined />} />
      ) : (
        /* toggle input */
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={isChecked}
          onChange={(valueReceived) => handleChange(name, valueReceived)}
          disabled={isLoading || isDisabled}
          loading={isLoading}
        />
      )}
    </InputBlockContainer>
  );
};

// PROP TYPES
ToggleInputBlock.propTypes = {
  /** Input title */
  title: PropTypes.string.isRequired,
  /** Input tip */
  tip: PropTypes.string.isRequired,
  /** Input is checked (toggled on) */
  isChecked: PropTypes.bool,
  /** Input change (toggle) handler */
  handleChange: PropTypes.func.isRequired,
  /** Input is disabled*/
  isDisabled: PropTypes.bool.isRequired,
  /** Input name */
  name: PropTypes.string.isRequired,
  /** Input is loading */
  isLoading: PropTypes.bool.isRequired,
};

// PROP DEFAULT VALUES
ToggleInputBlock.defaultProps = {
  /** string input tip message string */
  tip: undefined,
  /** string input title string */
  title: undefined,
};

// EXPORT
export default ToggleInputBlock;
