// CORE LIBS
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Spin, BackTop } from 'antd';
import { ArcherContainer, ArcherElement } from 'react-archer';
import ScrollContainer from 'react-indiana-drag-scroll'

import Draggable from 'react-draggable';

// COMPONENTS
import TaskBox from '../TaskBox';

// STYLES
import './styles.less';

// GRID CONFIGURATION
const columnsNumber = 3;

/**
 * Experiment Flow.
 * This component is responsible for displaying experiment flow grid.
 *
 * @component
 * @param {object} props Component props
 * @returns {ExperimentFlow} React component
 */
const ExperimentFlow = ({ tasks, loading, handleTaskBoxClick }) => {
  const archerContainerRef = useRef(null);
  const ScrollContainerRef = useRef(null);

  useEffect(() => {
    //Re-center flow area into tasks on screen
    const element = ScrollContainerRef.current ? ScrollContainerRef.current.getElement() : null;
    if (element) {
      element.scrollTop = 300;
      element.scrollLeft = 300;
    }
  }, [loading])

  const calcDefaultPosition = (i) => {
    // const isFirstRowComponent = i % columnsNumber === 0;

    // const isLastRowComponent = (i + 1) % columnsNumber === 0;

    // const isLastFlowComponent = i === tasks.length - 1;

    return { x: (250 * (i % columnsNumber)) + 350, y: (150 * Math.floor(i / columnsNumber)) + 350 };
  }

  const isLastTarget = (i) => {
    const isLastRowComponent = (i + 1) % columnsNumber === 0;
    return isLastRowComponent ? 'top' : 'left'
  }

  const isLastSource = (i) => {
    const isLastRowComponent = (i + 1) % columnsNumber === 0;
    return isLastRowComponent ? 'bottom' : 'right'
  }


  return (
    <>
      <ScrollContainer
        className='drag-scrolling-container'
        ignoreElements='.task-elements'
        ref={ScrollContainerRef}
      >
        <ArcherContainer
          ref={archerContainerRef}
          strokeColor='#FA541C'
          noCurves
          className='archer-container-drag'

        >
          {loading ? (
            <Spin className='spin-drag-container' />
          ) : (
              tasks.map((component, index) => (
                <Draggable
                  bounds='parent'
                  defaultPosition={calcDefaultPosition(index)}
                  onDrag={() => archerContainerRef.current.refreshScreen()}
                >
                  <div style={{ width: 200, position: 'absolute' }} className='task-elements'>
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
            )}

        </ArcherContainer>

      </ScrollContainer>
      <BackTop />
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
