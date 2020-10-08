// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Handle } from 'react-flow-renderer';

// UI LIBS
import {
  CheckCircleFilled,
  ClockCircleFilled,
  ExclamationCircleFilled,
  StopOutlined,
  LoadingOutlined,
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
      config.iconType = <LoadingOutlined style={style} spin />;

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
    onConnectingClass,
    settedUp,
    selected,
    handleClick,
    operator,
    experimentIsRunning,
    interruptIsRunning,
    handleRemoveOperator,
    dependenciesGraph,
  } = props;

  // CONSTANTS
  // class name
  const cssClass = `card ${settedUp && 'setted-up'} ${
    interruptIsRunning ? 'Interrupting' : status
  } ${selected && 'selected'} ${onConnectingClass}`;

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

  const detectCycle = function (adjList) {
    const graphNodes = Object.keys(adjList);
    const visited = {};
    const recStack = {};

    const _detectCycleUtil = function (vertex, visited, recStack) {
      if (!visited[vertex]) {
        visited[vertex] = true;
        recStack[vertex] = true;
        const nodeNeighbors = adjList[vertex];
        for (let i = 0; i < nodeNeighbors.length; i++) {
          const currentNode = nodeNeighbors[i];
          if (
            !visited[currentNode] &&
            _detectCycleUtil(currentNode, visited, recStack)
          ) {
            return true;
          } else if (recStack[currentNode]) {
            return true;
          }
        }
      }
      recStack[vertex] = false;
      return false;
    };

    for (let i = 0; i < graphNodes.length; i++) {
      const node = graphNodes[i];
      if (_detectCycleUtil(node, visited, recStack)) return false;
    }
    return true;
  };

  // RENDER
  return (
    // Right click menu
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      {/* div container */}
      <div className={cssClass} onClick={handleBoxClick} role='presentation'>
        <div className='siders'>
          <Handle
            type='target'
            position='left'
            className='arrow-handler left'
            isValidConnection={() => false}
          />
          <div style={{ fontSize: '18px' }}>{icon}</div>
        </div>
        <div className='middle'>
          <div className='ellipsis'>{name}</div>
        </div>
        <div className='siders'>
          {renderTooltip()}
          <Handle
            type='source'
            position='right'
            className='arrow-handler right'
            isValidConnection={(connection) => {
              const cloneGraph = { ...dependenciesGraph };
              const futureGraph = {
                ...cloneGraph,
                [connection.target]: [
                  ...cloneGraph[connection.target],
                  connection.source,
                ],
              };
              return detectCycle(futureGraph);
            }}
          />
        </div>
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
