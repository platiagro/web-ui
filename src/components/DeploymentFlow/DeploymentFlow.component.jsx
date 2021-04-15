import React, { useMemo } from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import LoadingBox from 'components/LoadingBox';
import ReactFlow, { Background, Handle } from 'react-flow-renderer';

import DeploymentFlowBox from './DeploymentFlowBox/DeploymentFlowBox.component';

import Vectors, {
  nodeTypes,
  edgeTypes,
} from 'components/Content/ExperimentsContent/Experiment/ExperimentFlow/_/CustomNodes';

import './DeploymentFlow.style.less';

const DeploymentFlow = ({
  operators,
  loading,
  handleSelectOperator,
  handleSavePosition,
  handleDeselectOperator,
  selectedOperatorId,
}) => {
  const handleLoad = (reactFlowInstance) => {
    setTimeout(() => {
      reactFlowInstance.fitView();
      reactFlowInstance.zoomTo(1);
    }, 0);
  };

  const handleDragStop = (_, task) => {
    handleSavePosition(task.id, task.position);
  };

  const dependencyGraph = useMemo(() => {
    return operators
      .map((el) => ({
        id: el.uuid,
        dep: el.dependencies,
      }))
      .reduce((obj, item) => Object.assign(obj, { [item.id]: item.dep }), {});
  }, [operators]);

  const cardsElements = useMemo(() => {
    return operators.map((component) => {
      const arrows = component.dependencies.map((arrow) => {
        const arrowId = `${component.uuid}/${arrow}`;
        return {
          id: arrowId,
          target: component.uuid,
          source: arrow,
          type: 'customEdge',
        };
      });

      const card = {
        id: component.uuid,
        sourcePosition: 'right',
        targetPosition: 'left',
        type: 'cardNode',
        data: {
          label: (
            <div
              id={component.uuid}
              style={{ width: 200 }}
              className='task-elements'
            >
              <DeploymentFlowBox
                operator={component}
                title={component.name}
                status={component.status}
                icon={component.icon}
                settedUp={component.settedUp}
                selected={selectedOperatorId === component.uuid}
                onEdit={handleSelectOperator}
                onSelect={handleSelectOperator}
                onDeselect={handleDeselectOperator}
                dependenciesGraph={dependencyGraph}
                leftFlowHandle={
                  <Handle
                    type='target'
                    position='left'
                    className='arrow-handler left'
                    isValidConnection={() => false}
                  />
                }
                rightFlowHandle={
                  <Handle
                    type='source'
                    position='right'
                    className='arrow-handler right'
                    isValidConnection={() => false}
                  />
                }
              />
            </div>
          ),
        },
        position: {
          x: component.positionX,
          y: component.positionY,
        },
      };

      return [card, ...arrows];
    });
  }, [
    dependencyGraph,
    handleDeselectOperator,
    handleSelectOperator,
    operators,
    selectedOperatorId,
  ]);

  return loading ? (
    <LoadingBox siderColor='#FFF2E8' />
  ) : (
    <div style={{ height: '100%' }}>
      <ReactFlow
        deleteKeyCode={46}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        nodesConnectable={false}
        elements={lodash.flattenDeep(cardsElements)}
        onLoad={handleLoad}
        onNodeDragStop={handleDragStop}
        onPaneClick={handleDeselectOperator}
        onSelectionChange={handleDeselectOperator}
        onPaneContextMenu={(e) => e.preventDefault()}
      >
        <Background
          variant='dots'
          gap={25}
          size={1}
          color={'#58585850'}
          style={{ backgroundColor: 'white' }}
        />
        <Vectors />
      </ReactFlow>
    </div>
  );
};

DeploymentFlow.propTypes = {
  operators: PropTypes.array,
  loading: PropTypes.bool,
  selectedOperatorId: PropTypes.string,
  handleSavePosition: PropTypes.func,
  handleSelectOperator: PropTypes.func,
  handleDeselectOperator: PropTypes.func,
};

export default DeploymentFlow;
