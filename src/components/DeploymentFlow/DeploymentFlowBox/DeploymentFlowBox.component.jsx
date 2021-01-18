import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from './Tooltip';
import DropdownMenu from './DropdownMenu';

import './style.less';

/**
 * This component is responsible for displaying deployment flow task box.
 */
const DeploymentFlowBox = (props) => {
  const {
    title,
    icon,
    settedUp,
    status,
    selected,
    onSelect,
    onDeselect,
    operator,
    leftFlowHandle,
    rightFlowHandle,
    onRemove,
    onEdit,
  } = props;

  const disabled =
    status === 'Pending' || status === 'Running' || status === 'Interrupted';

  const settedUpClass = settedUp ? 'setted-up' : '';
  const statusClass = status?.toLowerCase();
  const selectedClass = selected ? 'selected' : '';
  const mainClassName = `card ${settedUpClass} ${statusClass} ${selectedClass}`;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled)
      if (selected) onDeselect(operator);
      else onSelect(operator);
  };

  const handleRemove = () => {
    onRemove(operator);
  };

  const handleEdit = () => {
    onEdit(operator);
  };

  return (
    <DropdownMenu
      disabled={disabled}
      onEdit={handleEdit}
      onRemove={handleRemove}
    >
      <div className='deploymentFlowBox'>
        <div
          className={mainClassName}
          onClick={handleClick}
          role='presentation'
        >
          <div className='siders'>
            {leftFlowHandle}

            <div className='icon'>{icon}</div>
          </div>
          <div className='middle'>
            <div className='ellipsis'>{title}</div>
          </div>
          <div className='siders'>
            <Tooltip status={status} />

            {rightFlowHandle}
          </div>
        </div>
      </div>
    </DropdownMenu>
  );
};

DeploymentFlowBox.propTypes = {
  icon: PropTypes.node.isRequired,
  leftFlowHandle: PropTypes.node,
  onDeselect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  operator: PropTypes.object.isRequired,
  rightFlowHandle: PropTypes.node,
  selected: PropTypes.bool,
  settedUp: PropTypes.bool,
  status: PropTypes.oneOf([
    '',
    'Running',
    'Pending',
    'Interrupted',
    'Succeeded',
    'Failed',
    'Waiting',
    'Ready',
  ]),
  title: PropTypes.string.isRequired,
};

DeploymentFlowBox.defaultProps = {
  settedUp: false,
  status: '',
  selected: false,
  leftFlowHandle: undefined,
  rightFlowHandle: undefined,
};

export default DeploymentFlowBox;
