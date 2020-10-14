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
  handleClick,
  handleCompareResultsClick,
  disabled,
  loading,
}) => (
  <div className='experimentButtons'>
    <Space>
      <Button
        onClick={handleCompareResultsClick}
        shape='round'
        type='primary-inverse'
      >
        <BarChartOutlined />
        Comparar resultados
      </Button>
      <Button
        disabled={disabled}
        onClick={handleClick}
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
  /** deploy experiment button click function */
  handleClick: PropTypes.func.isRequired,
  /** compare results button click function */
  handleCompareResultsClick: PropTypes.func.isRequired,
  /** deployment is running / loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default ExperimentButtons;
