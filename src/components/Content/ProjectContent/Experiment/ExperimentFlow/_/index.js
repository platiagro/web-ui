// CORE LIBS
import React, { memo, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { ArcherContainer, ArcherElement } from 'react-archer';
import ScrollContainer from 'react-indiana-drag-scroll';
// import { Spin } from 'antd';
// import { ArcherContainer, ArcherElement } from 'react-archer';
// import ScrollContainer from 'react-indiana-drag-scroll'
import ReactFlow, { addEdge, Background, Handle } from 'react-flow-renderer';
import Xarrow from 'react-xarrows';

import Draggable from 'react-draggable';

// COMPONENTS
import TaskBox from '../TaskBox';
import LoadingBox from '../LoadingBox';

// STYLES
import './style.less';

// GRID CONFIGURATION
const columnsNumber = 3;

const nodeTypes = {
  cardNode: memo(({ data }) => {
    return data.label;
  }),
};

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
  // const archerContainerRef = useRef(null);
  // const ScrollContainerRef = useRef(null);

  // const [elements, setElements] = useState([]);

  const calcDefaultPosition = (i) => {
    //Booleans to help arrow positioning in the future
    // const isFirstRowComponent = i % columnsNumber === 0;
    // const isLastRowComponent = (i + 1) % columnsNumber === 0;
    // const isLastFlowComponent = i === tasks.length - 1;

    return {
      x: 250 * (i % columnsNumber) + 50,
      y: 150 * Math.floor(i / columnsNumber) + 50,
    };
  };

  // useEffect(() => {
  //   console.log('loading', tasks);

  //   //Re-center flow area into tasks on screen
  //   const element = ScrollContainerRef.current
  //     ? ScrollContainerRef.current.getElement()
  //     : null;
  //   if (element) {
  //     element.scrollTop = 300;
  //     element.scrollLeft = 300;
  //   }
  // }, [loading]);

  const cardsElements = tasks.map((component, index) => {
    console.log(component.uuid, component.name, index);

    return {
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
            <TaskBox
              handleClick={handleTaskBoxClick}
              {...component}
              operator={component}
            />
          </div>
        ),
      },
      position: calcDefaultPosition(index),
    };
  });

  // useEffect(() => {
  //   // const arrows = [];

  //   // tasks.map((operator) =>
  //   //   operator.dependencies.map((arrow) => {
  //   //     arrows.push({
  //   //       id: `${operator.uuid}-${arrow}`,
  //   //       type: 'smoothstep',
  //   //       arrowHeadType: 'arrow',
  //   //       target: operator.uuid,
  //   //       source: arrow,
  //   //     });
  //   //   })
  //   // );
  //   // console.log('arw', [...cardsElements, ...arrows]);

  //   setElements(cardsElements);
  // }, [tasks]);
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

  // const isLastTarget = (i) => {
  //   const isLastRowComponent = (i + 1) % columnsNumber === 0;
  //   return isLastRowComponent ? 'top' : 'left';
  // };

  // const isLastSource = (i) => {
  //   const isLastRowComponent = (i + 1) % columnsNumber === 0;
  //   return isLastRowComponent ? 'bottom' : 'right';
  // };

  // const initialElements = [
  //   {
  //     id: '1',
  //     sourcePosition: 'right',
  //     type: 'input',
  //     data: { label: 'Node 1' },
  //     position: { x: 50, y: 50 },
  //   },
  //   // you can also pass a React component as a label
  //   {
  //     id: '2',
  //     sourcePosition: 'right',
  //     targetPosition: 'left',
  //     data: { label: <div className='card'>Node 2</div> },
  //     position: { x: 250, y: 50 },
  //   },
  //   {
  //     id: '3',
  //     sourcePosition: 'right',
  //     targetPosition: 'left',
  //     type: SelectorCard,
  //     data: { label: <div className='card'>Node 2</div> },
  //     position: { x: 450, y: 50 },
  //   },
  //   {
  //     id: '1-2',
  //     type: 'smoothstep',
  //     arrowHeadType: 'arrow',
  //     source: '1',
  //     target: '2',
  //   },
  //   {
  //     id: '2-3',
  //     type: 'smoothstep',
  //     arrowHeadType: 'arrow',
  //     source: '2',
  //     target: '3',
  //   },
  // ];

  // <TaskBox
  //                     handleClick={handleTaskBoxClick}
  //                     {...component}
  //                     operator={component}
  //                   />

  const onConnect = (params) => console.log(params);
  // setElements((els) =>
  //   addEdge(
  //     {
  //       type: 'smoothstep',
  //       animated: false,
  //       arrowHeadType: 'arrowclosed',
  //       ...params,
  //     },
  //     els
  //   )

  return (
    <>
      <ReactFlow
        elements={cardsElements}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
      >
        <Background variant='dots' gap={24} size={1} color='#58585850' />
      </ReactFlow>
      {/* {!loading &&
        cardsElements.map((operator) => {
          return operator.dependencies.map((arrow) => (
            <Xarrow
              end={operator.uuid} //can be react ref
              start={arrow} //or an id
            />
          ));
        })} */}
    </>
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
