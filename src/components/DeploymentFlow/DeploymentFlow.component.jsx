import React, { useMemo } from 'react';
import _ from 'lodash';
import ReactFlow, { Background, Handle } from 'react-flow-renderer';
import LoadingBox from 'components/LoadingBox';
import PropTypes from 'prop-types';

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
  handleSaveDependencies,
  handleDeselectOperator,
  selectedOperatorId,
}) => {
  const cardsElements = useMemo(() => {
    return operators.map((component) => {
      const arrows = component.dependencies.map((arrow) => {
        const arrowId = `${component.uuid}/${arrow}`;
        return {
          id: arrowId,
          target: component.uuid,
          source: arrow,
          type: 'customEdge',
          data: {
            onDelete: null,
          },
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
                onSelect={handleSelectOperator}
                onDeselect={handleDeselectOperator}
                selected={selectedOperatorId === component.uuid}
                dependenciesGraph={operators
                  .map((el) => ({
                    id: el.uuid,
                    dep: el.dependencies,
                  }))
                  .reduce(
                    (obj, item) => Object.assign(obj, { [item.id]: item.dep }),
                    {}
                  )}
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
                {...component}
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
    handleDeselectOperator,
    handleSelectOperator,
    operators,
    selectedOperatorId,
  ]);

  const handleLoad = (reactFlowInstance) => {
    setTimeout(() => {
      reactFlowInstance.fitView();
      reactFlowInstance.zoomTo(1);
    }, 0);
  };

  const handleDragStop = (_, task) => {
    handleSavePosition(task.id, task.position);
  };

  const handleConnect = (params) => {
    const targetOperator = operators.find(({ uuid }) => uuid === params.target);
    const targetOperatorDependencies = targetOperator?.dependencies || [];
    handleSaveDependencies(params.target, [
      ...targetOperatorDependencies,
      params.source,
    ]);
  };

  return loading ? (
    <LoadingBox siderColor='#FFF2E8' />
  ) : (
    <div style={{ height: '100%' }}>
      <ReactFlow
        deleteKeyCode={46}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        nodesConnectable={true}
        elements={_.flattenDeep(cardsElements)}
        onLoad={handleLoad}
        onConnect={handleConnect}
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
  handleSaveDependencies: PropTypes.func,
  handleDeselectOperator: PropTypes.func,
};

export default DeploymentFlow;
