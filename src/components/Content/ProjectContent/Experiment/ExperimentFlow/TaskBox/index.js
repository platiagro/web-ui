// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Draggable from 'react-draggable';

// UI LIBS
import {
  CheckCircleFilled,
  ClockCircleFilled,
  ExclamationCircleFilled,
  SettingOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { Tooltip, Menu, Dropdown } from 'antd';

// STYLES
import './style.less';

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
const toolTipConfigs = (status, interruptIsRunning) => {
  let style = { fontSize: '18px' };
  const config = { title: '', iconType: '' };
  switch (status) {
    case 'Running':
      style.color = interruptIsRunning ? '' : '#666666';
      config.title = 'Tarefa em execução';
      config.iconType = <SettingOutlined style={style} spin />;

      break;
    case 'Pending':
      style.color = interruptIsRunning ? '' : '#666666';
      config.title = 'Tarefa pendente';
      config.iconType = <ClockCircleFilled style={style} />;
      break;
    case 'Succeeded':
      style.color = interruptIsRunning ? '' : '#389E0D';
      config.title = 'Tarefa executada com sucesso';
      config.iconType = <CheckCircleFilled style={style} />;
      break;
    case 'Failed':
      style.color = interruptIsRunning ? '' : '#CF1322';
      config.title = 'Tarefa executada com falha';
      config.iconType = <ExclamationCircleFilled style={style} />;
      break;
    default:
      style.color = interruptIsRunning ? '' : '#666666';
      config.title = 'Tarefa interrompida';
      config.iconType = <StopOutlined style={style} />;
      break;
  }
  return config;
};

/**
 * Task Box.
 * This component is responsible for displaying experiment flow.
 *
 * @param {object} props Component props
 * @returns {TaskBox} React component
 */
const TaskBox = (props) => {
  // destructuring props
  const {
    name,
    icon,
    status,
    settedUp,
    selected,
    handleClick,
    operator,
    experimentIsRunning,
    interruptIsRunning,
    handleRemoveOperator,
  } = props;

  // CONSTANTS
  // class name
  const cssClass = `card ${settedUp && 'setted-up'} ${
    interruptIsRunning ? 'Interrupting' : status
  } ${selected && 'selected'}`;

  // getting experiment uuid
  const { projectId, experimentId } = useParams();

  // HANDLERS
  // box click
  const handleBoxClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (status !== 'Pending' && status !== 'Running') handleClick(operator);
  };

  // remove on right click menu
  const removeOperator = () => {
    handleRemoveOperator(projectId, experimentId, operator);
  };

  // box right click
  const handleRightButtonClick = (e) => {
    if (experimentIsRunning || interruptIsRunning) {
      return;
    }

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
    const toolTipConfig = toolTipConfigs(status, interruptIsRunning);
    return (
      <Tooltip
        placement='right'
        title={toolTipConfig.title}
        className={interruptIsRunning ? 'Interrupt' : ''}
      >
        {toolTipConfig.iconType}
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

// EXPORT
export default connect(null, mapDispatchToProps)(TaskBox);
