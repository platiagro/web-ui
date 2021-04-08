// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { Tooltip, Switch, Skeleton } from 'antd';

// COMPONENTS
import { PropertyBlock } from 'components';

/**
 * A input block with toggle input
 *
 * @param {object} props Component props
 * @returns {ToggleInputBlock} Component
 */
const ToggleInputBlock = (props) => {
  const { handleChange, name, isChecked, isLoading, isDisabled } = props;
  const { tip, title, valueLatestTraining } = props;
  const modifiedSinceLastExecution = isChecked !== valueLatestTraining;

  // rendering component
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
          {/* toggle input */}
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={isChecked}
            onChange={(valueReceived) => handleChange(name, valueReceived)}
            disabled={isLoading || isDisabled}
            loading={isLoading}
          />
          {/* rendering tooltip */}
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
  /** Lastest Training value */
  valueLatestTraining: PropTypes.bool,
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
