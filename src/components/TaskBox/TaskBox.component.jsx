import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Handle } from 'react-flow-renderer';
import { Tooltip, Menu, Dropdown } from 'antd';
import {
  StopOutlined,
  LoadingOutlined,
  ClockCircleFilled,
  CheckCircleFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';

import { OPERATOR_STATUS } from 'configs';
import { removeOperatorRequest } from 'store/operator';

import './style.less';

const mapDispatchToProps = (dispatch) => {
  return {
    handleRemoveOperator: (projectId, experimentId, operatorId) => {
      dispatch(removeOperatorRequest(projectId, experimentId, operatorId));
    },
  };
};

const getToolTipConfig = (status, interruptIsRunning) => {
  const style = { fontSize: '18px' };
  const config = { title: '', iconType: '' };

  switch (status) {
    case OPERATOR_STATUS.RUNNING: {
      style.color = interruptIsRunning ? '' : '#666666';
      config.title = 'Tarefa em execução';
      config.iconType = <LoadingOutlined style={style} spin />;
      break;
    }

    case OPERATOR_STATUS.PENDING: {
      style.color = interruptIsRunning ? '' : '#666666';
      config.title = 'Tarefa pendente';
      config.iconType = <ClockCircleFilled style={style} />;
      break;
    }

    case OPERATOR_STATUS.SUCCEEDED: {
      style.color = interruptIsRunning ? '' : '#389E0D';
      config.title = 'Tarefa executada com sucesso';
      config.iconType = <CheckCircleFilled style={style} />;
      break;
    }

    case OPERATOR_STATUS.FAILED: {
      style.color = interruptIsRunning ? '' : '#CF1322';
      config.title = 'Tarefa executada com falha';
      config.iconType = <ExclamationCircleFilled style={style} />;
      break;
    }

    case OPERATOR_STATUS.TERMINATED: {
      style.color = interruptIsRunning ? '' : '#666666';
      config.title = 'Tarefa interrompida';
      config.iconType = <StopOutlined style={style} />;
      break;
    }

    default:
      break;
  }

  return config;
};

const TaskBox = (props) => {
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

  const { projectId, experimentId } = useParams();

  const { isPending, isRunning, isLoading } = useMemo(
    () => ({
      isPending: status === OPERATOR_STATUS.PENDING,
      isRunning: status === OPERATOR_STATUS.RUNNING,
      isLoading: status === OPERATOR_STATUS.LOADING,
    }),
    [status]
  );

  const cssClass = useMemo(() => {
    const settedUpClass = settedUp ? 'setted-up' : '';
    const statusClass = interruptIsRunning ? 'Interrupting' : status;
    const selectedClass = selected ? 'selected' : '';

    const classArray = [
      'card',
      settedUpClass,
      statusClass,
      selectedClass,
      onConnectingClass,
    ];

    return classArray.join(' ');
  }, [interruptIsRunning, onConnectingClass, selected, settedUp, status]);

  const handleBoxClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleClick(operator);
  };

  const handleRightButtonClick = (e) => {
    const isEditKey = e.key === 'edit';
    const isRemoveKey = e.key === 'remove';

    if (isEditKey) {
      handleClick(operator);
    }

    if (!experimentIsRunning && !isPending && !isRunning && isRemoveKey) {
      handleRemoveOperator(projectId, experimentId, operator);
    }
  };

  const handleDetectCycle = (adjList) => {
    const graphNodes = Object.keys(adjList);
    const visited = {};
    const recStack = {};

    const _detectCycleUtil = (vertex, _visited, _recStack) => {
      if (!_visited[vertex]) {
        _visited[vertex] = true;
        _recStack[vertex] = true;
        const nodeNeighbors = adjList[vertex];

        for (const currentNode of nodeNeighbors) {
          if (
            (!_visited[currentNode] &&
              _detectCycleUtil(currentNode, _visited, _recStack)) ||
            _recStack[currentNode]
          ) {
            return true;
          }
        }
      }

      _recStack[vertex] = false;
      return false;
    };

    for (const node of graphNodes) {
      if (_detectCycleUtil(node, visited, recStack)) return false;
    }

    return true;
  };

  const handleCheckIfConnectionIsValid = (connection) => {
    const isNotIncluded = !dependenciesGraph[connection.target].includes(
      operator.uuid
    );

    const graphClone = { ...dependenciesGraph };
    const futureGraph = {
      ...graphClone,
      [connection.target]: [
        ...graphClone[connection.target],
        connection.source,
      ],
    };

    return handleDetectCycle(futureGraph) && isNotIncluded;
  };

  const renderTooltip = () => {
    if (!status || isLoading) return null;
    const toolTipConfig = getToolTipConfig(status, interruptIsRunning);

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

  return (
    <Dropdown
      trigger={['contextMenu']}
      overlay={
        <Menu onClick={handleRightButtonClick}>
          <Menu.Item key='edit'>Editar</Menu.Item>
          <Menu.Item key='remove'>Remover</Menu.Item>
        </Menu>
      }
    >
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
            isValidConnection={handleCheckIfConnectionIsValid}
          />
        </div>
      </div>
    </Dropdown>
  );
};

TaskBox.propTypes = {
  /** task title string */
  name: PropTypes.string.isRequired,
  /** task icon string */
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
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
  /** connection class  */
  onConnectingClass: PropTypes.string,
  /** operator  */
  operator: PropTypes.object,
  /** experiment is running  */
  experimentIsRunning: PropTypes.bool,
  /** is being interrupted  */
  interruptIsRunning: PropTypes.bool,
  /** dependencies graph  */
  dependenciesGraph: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(TaskBox);
