import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Switch, Skeleton } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

import { PropertyBlock } from 'components';

const ToggleInputBlock = ({
  handleChange,
  name,
  isChecked,
  isLoading,
  isDisabled,
  tip,
  title,
  valueLatestTraining,
}) => {
  const modifiedSinceLastExecution = useMemo(() => {
    return isChecked !== valueLatestTraining;
  }, [isChecked, valueLatestTraining]);

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
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={isChecked}
            onChange={(valueReceived) => handleChange(name, valueReceived)}
            disabled={isLoading || isDisabled}
            loading={isLoading}
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

ToggleInputBlock.propTypes = {
  title: PropTypes.string.isRequired,
  tip: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  valueLatestTraining: PropTypes.bool,
};

ToggleInputBlock.defaultProps = {
  tip: undefined,
  title: undefined,
};

export default ToggleInputBlock;
