// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import {
  BarChartOutlined,
  LoadingOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Button, Space } from 'antd';

// STYLES
import './style.less';

/**
 * Experiment Buttons.
 * This component is responsible for show experiment buttons on content header.
 */
const ExperimentButtons = ({
  disabled,
  loading,
  onCompareResultsClick,
  onDeploymentClick,
}) => (
  <div className='experimentButtons'>
    <Space>
      <Button
        onClick={onCompareResultsClick}
        shape='round'
        type='primary-inverse'
      >
        <BarChartOutlined />
        Comparar resultados
      </Button>
      <Button
        disabled={disabled}
        onClick={onDeploymentClick}
        shape='round'
        type='primary-inverse'
      >
        {loading ? <LoadingOutlined /> : <ToolOutlined />}
        Preparar para a implantação
      </Button>
    </Space>
  </div>
);

// PROP TYPES
ExperimentButtons.propTypes = {
  /** deploy experiment button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** deployment is running / loading */
  loading: PropTypes.bool.isRequired,
  /** compare results button click function */
  onCompareResultsClick: PropTypes.func.isRequired,
  /** deploy experiment button click function */
  onDeploymentClick: PropTypes.func.isRequired,
};

// EXPORT
export default ExperimentButtons;
