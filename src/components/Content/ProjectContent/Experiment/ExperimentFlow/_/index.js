// CORE LIBS
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { ArcherContainer, ArcherElement } from 'react-archer';
import ScrollContainer from 'react-indiana-drag-scroll';
// import { Spin } from 'antd';
// import { ArcherContainer, ArcherElement } from 'react-archer';
// import ScrollContainer from 'react-indiana-drag-scroll'
import ReactFlow, { addEdge, Background } from 'react-flow-renderer';

import Draggable from 'react-draggable';

// COMPONENTS
import TaskBox from '../TaskBox';
import LoadingBox from '../LoadingBox';

// STYLES
import './style.less';

// GRID CONFIGURATION
const columnsNumber = 3;

/**
 * Experiment Flow.
 * This component is responsible for displaying experiment flow grid.
 *
 * @component
 * @param props.tasks
 * @param props.loading
 * @param props.handleTaskBoxClick
 * @param props.tasks
 * @param props.loading
 * @param props.handleTaskBoxClick
 * @param props.tasks
 * @param props.loading
 * @param props.handleTaskBoxClick
 * @param {object} props Component props
 * @returns {ExperimentFlow} React component
 */
const ExperimentFlow = ({
  tasks,
  loading,
  handleTaskBoxClick,
  handleDeselectOperator,
}) => {
  const archerContainerRef = useRef(null);
  const ScrollContainerRef = useRef(null);

  useEffect(() => {
    //Re-center flow area into tasks on screen
    const element = ScrollContainerRef.current
      ? ScrollContainerRef.current.getElement()
      : null;
    if (element) {
      element.scrollTop = 300;
      element.scrollLeft = 300;
    }
  }, [loading]);
  // const archerContainerRef = useRef(null);
  // const ScrollContainerRef = useRef(null);

  // useEffect(() => {
  //Re-center flow area into tasks on screen
  //   const element = ScrollContainerRef.current ? ScrollContainerRef.current.getElement() : null;
  //   if (element) {
  //     element.scrollTop = 300;
  //     element.scrollLeft = 300;
  //   }
  // }, [loading])

  const calcDefaultPosition = (i) => {
    //Booleans to help arrow positioning in the future
    // const isFirstRowComponent = i % columnsNumber === 0;
    // const isLastRowComponent = (i + 1) % columnsNumber === 0;
    // const isLastFlowComponent = i === tasks.length - 1;

    return {
      x: 250 * (i % columnsNumber) + 350,
      y: 150 * Math.floor(i / columnsNumber) + 350,
    };
  };

  const isLastTarget = (i) => {
    const isLastRowComponent = (i + 1) % columnsNumber === 0;
    return isLastRowComponent ? 'top' : 'left';
  };

  const isLastSource = (i) => {
    const isLastRowComponent = (i + 1) % columnsNumber === 0;
    return isLastRowComponent ? 'bottom' : 'right';
  };

  const initialElements = [
    {
      id: '1',
      sourcePosition: 'right',
      type: 'input',
      data: { label: 'Node 1' },
      position: { x: 50, y: 50 },
    },
    // you can also pass a React component as a label
    {
      id: '2',
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: 'Node 2' },
      position: { x: 250, y: 50 },
    },
    {
      id: '3',
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: 'Node 3' },
      position: { x: 450, y: 50 },
    },
    {
      id: '1-2',
      type: 'smoothstep',
      arrowHeadType: 'arrow',
      source: '1',
      target: '2',
    },
    {
      id: '2-3',
      type: 'smoothstep',
      arrowHeadType: 'arrow',
      source: '2',
      target: '3',
    },
  ];

  const [elements, setElements] = useState(initialElements);
  // const onConnect = (params) => setElements((els) => addEdge({ type: 'smoothstep', animated: true, arrowHeadType: 'arrowclosed', ...params }, els));

  console.log(tasks);
  return (
    <ReactFlow elements={elements} onElementClick={(e, el) => console.log(el)}>
      <Background variant='dots' gap={24} size={1} color='#58585850' />
    </ReactFlow>
  );

  return (
    <ScrollContainer
      className='drag-scrolling-container'
      ignoreElements='.task-elements'
      ref={ScrollContainerRef}
      //Remove click and drag when loading container
      style={loading ? { pointerEvents: 'none' } : {}}
      onClick={handleDeselectOperator}
    >
      <ArcherContainer
        ref={archerContainerRef}
        strokeColor={loading ? 'rgba(0,0,0,0.3)' : '#000'}
        noCurves
        className='archer-container-drag'
      >
        {
          //If tasks is empty load one box at least
          loading ? (
            <LoadingBox />
          ) : (
            tasks.map((component, index) => (
              <Draggable
                bounds='parent'
                defaultPosition={calcDefaultPosition(index)}
                onDrag={() => archerContainerRef.current.refreshScreen()}
              >
                <div
                  style={{ width: 200, position: 'absolute' }}
                  className='task-elements'
                >
                  <ArcherElement
                    id={`component${index}`}
                    relations={
                      index + 1 < tasks.length
                        ? [
                            {
                              targetId: `component${index + 1}`,
                              targetAnchor: isLastTarget(index),
                              sourceAnchor: isLastSource(index),
                            },
                          ]
                        : []
                    }
                  >
                    <TaskBox
                      handleClick={handleTaskBoxClick}
                      {...component}
                      operator={component}
                    />
                  </ArcherElement>
                </div>
              </Draggable>
            ))
          )
        }
      </ArcherContainer>
    </ScrollContainer>
  );
};

// PROP TYPES
ExperimentFlow.propTypes = {
  /** experiment flow tasks list */
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** experiment flow task box click handler */
  handleTaskBoxClick: PropTypes.func.isRequired,
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default ExperimentFlow;
