// TODO: alterar nome para TaskBox...

// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// UI LIBS
import { Icon, Tooltip, Menu, Dropdown } from 'antd';

// STYLES
import './style.scss';

// ACTIONS
import {
  removeOperatorRequest,
} from 'store/operator/actions';

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
    iconColor: '#666666',
    iconType: 'setting',
    iconTheme: null,
    spin: true,
  },
  // pending status
  Pending: {
    title: 'Tarefa pendente',
    iconColor: '#666666',
    iconType: 'clock-circle',
    iconTheme: 'filled',
    spin: false,
  },
  // succeeded status
  Succeeded: {
    title: 'Tarefa executada com sucesso',
    iconColor: '#389E0D',
    iconType: 'check-circle',
    iconTheme: 'filled',
    spin: false,
  },
  // failed status
  Failed: {
    title: 'Tarefa executada com falha',
    iconColor: '#CF1322',
    iconType: 'exclamation-circle',
    iconTheme: 'filled',
    spin: false,
  },
};

/**
 * Component Box.
 * This component is responsible for displaying experiment flow.
 */
const ComponentBox = ({
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
  const cssClass = `card ${settedUp && 'setted-up'} ${status} ${selected &&
    'selected'}`;

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
    handleRemoveOperator(projectId, experimentId, operator.uuid);
  }

  // box right click
  const handleRightButtonClick = (e) => {
    if (status !== 'Pending' && status !== 'Running' && e.key === 'edit') handleClick(operator);

    if (status !== 'Pending' && status !== 'Running' && operator.uuid !== 'dataset' && e.key === 'remove') removeOperator();
  }

  // RENDERS
  //dropdown menu
  const menu = (
    <Menu onClick={handleRightButtonClick}>
      <Menu.Item key="edit">Editar</Menu.Item>
      {operator.uuid !== 'dataset' && <Menu.Item key="remove">Remover</Menu.Item>}
    </Menu>
  );

  // tooltip
  const renderTooltip = () => {
    if (!status || status === 'Loading') return null;

    return (
      <Tooltip placement='right' title={toolTipConfigs[status].title}>
        <Icon
          style={{ fontSize: '18px', color: toolTipConfigs[status].iconColor }}
          type={toolTipConfigs[status].iconType}
          theme={toolTipConfigs[status].iconTheme}
          spin={toolTipConfigs[status].spin}
        />
      </Tooltip>
    );
  };

  // RENDER
  return (
    // Right click menu
    <Dropdown overlay={menu} trigger={['contextMenu']} >
      {/* div container */}
      <div className={cssClass} onClick={handleBoxClick} role='presentation'>
        {/* div title icon container */}
        <div className='title-icon'>
          {/* component icon */}
          <Icon style={{ fontSize: '18px' }} theme={iconTheme} type={icon} />
          {/* component title */}
          <span>{name}</span>
        </div>
        {/* rendering tooltip */}
        {renderTooltip()}
      </div>
    </Dropdown>
  );
};

// PROP TYPES
ComponentBox.propTypes = {
  /** component title string */
  name: PropTypes.string.isRequired,
  /** component icon string */
  icon: PropTypes.string.isRequired,
  /** component icon theme string */
  iconTheme: PropTypes.string.isRequired,
  /** component status string */
  status: PropTypes.string.isRequired,
  /** component is setted up */
  settedUp: PropTypes.bool.isRequired,
  /** component is selected */
  selected: PropTypes.bool.isRequired,
  /** component click handler */
  handleClick: PropTypes.func.isRequired,
  /** component remove handler */
  handleRemoveOperator: PropTypes.func.isRequired,
};

// EXPORT
export default connect(
  null,
  mapDispatchToProps
)(ComponentBox);
