// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// UI LIBS
import {
  CheckCircleFilled,
  ClockCircleFilled,
  ExclamationCircleFilled,
  SettingOutlined,
} from '@ant-design/icons';
import { Tooltip, Menu, Dropdown } from 'antd';

// STYLES
import './style.scss';

// ACTIONS
import { removeOperatorRequest } from 'store/operator/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // remove operator
    handleRemoveOperator: (projectId, experimentId, operatorId) =>
      dispatch(removeOperatorRequest(projectId, experimentId, operatorId)),
  };
};

// tooltip configs
const toolTipConfigs = {
  // running status
  Running: {
    title: 'Tarefa em execução',
    iconType: (
      <SettingOutlined style={{ fontSize: '18px', color: '#666666' }} spin />
    ),
  },
  // pending status
  Pending: {
    title: 'Tarefa pendente',
    iconType: (
      <ClockCircleFilled style={{ fontSize: '18px', color: '#666666' }} />
    ),
  },
  // succeeded status
  Succeeded: {
    title: 'Tarefa executada com sucesso',
    iconType: (
      <CheckCircleFilled style={{ fontSize: '18px', color: '#389E0D' }} />
    ),
  },
  // failed status
  Failed: {
    title: 'Tarefa executada com falha',
    iconType: (
      <ExclamationCircleFilled style={{ fontSize: '18px', color: '#CF1322' }} />
    ),
  },
};

/**
 * Task Box.
 * This component is responsible for displaying experiment flow.
 */
const TaskBox = ({
  name,
  icon,
  iconTheme,
  status,
  settedUp,
  selected,
  uuid: taskUuid,
  handleClick,
  operator,
  handleRemoveOperator,
}) => {
  // CONSTANTS
  // class name
  const cssClass = `card ${settedUp && 'setted-up'} ${status} ${
    selected && 'selected'
  }`;

  // getting experiment uuid
  const { projectId, experimentId } = useParams();

  // HANDLERS
  // box click
  const handleBoxClick = (e) => {
    e.preventDefault();

    if (status !== 'Pending' && status !== 'Running') handleClick(operator);
  };

  // remove on right click menu
  const removeOperator = () => {
    handleRemoveOperator(projectId, experimentId, operator);
  };

  // box right click
  const handleRightButtonClick = (e) => {
    if (status !== 'Pending' && status !== 'Running' && e.key === 'edit')
      handleClick(operator);

    if (status !== 'Pending' && status !== 'Running' && e.key === 'remove')
      removeOperator();
  };

  // RENDERS
  //dropdown menu
  const menu = (
    <Menu onClick={handleRightButtonClick}>
      <Menu.Item key='edit'>Editar</Menu.Item>
      <Menu.Item key='remove'>Remover</Menu.Item>
    </Menu>
  );

  // tooltip
  const renderTooltip = () => {
    if (!status || status === 'Loading') return null;
    return (
      <Tooltip placement='right' title={toolTipConfigs[status].title}>
        {toolTipConfigs[status].iconType}
      </Tooltip>
    );
  };

  // RENDER
  return (
    // Right click menu
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      {/* div container */}
      <div className={cssClass} onClick={handleBoxClick} role='presentation'>
        {/* div title icon container */}
        <div className='title-icon'>
          {/* task icon */}
          <div style={{ fontSize: '18px' }}>{icon}</div>
          {/* task title */}
          <span>{name}</span>
        </div>
        {/* rendering tooltip */}
        {renderTooltip()}
      </div>
    </Dropdown>
  );
};

// PROP TYPES
TaskBox.propTypes = {
  /** task title string */
  name: PropTypes.string.isRequired,
  /** task icon string */
  icon: PropTypes.string.isRequired,
  /** task icon theme string */
  iconTheme: PropTypes.string,
  /** task status string */
  status: PropTypes.string.isRequired,
  /** task is setted up */
  settedUp: PropTypes.bool.isRequired,
  /** task is selected */
  selected: PropTypes.bool.isRequired,
  /** task click handler */
  handleClick: PropTypes.func.isRequired,
  /** task remove handler */
  handleRemoveOperator: PropTypes.func.isRequired,
};

// PROP DEFAULT VALUES
TaskBox.defaultProps = {
  /** task icon theme */
  iconTheme: undefined,
};

// EXPORT
export default connect(null, mapDispatchToProps)(TaskBox);
