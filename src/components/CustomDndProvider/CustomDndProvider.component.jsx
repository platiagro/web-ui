import React, { useRef } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, createDndContext } from 'react-dnd';

const RNDContext = createDndContext(HTML5Backend);

const useDNDProviderElement = (props) => {
  const manager = useRef(RNDContext);
  if (!props.children) return null;

  return (
    <DndProvider manager={manager.current.dragDropManager}>
      {props.children}
    </DndProvider>
  );
};

const CustomDndProvider = (props) => {
  const DNDElement = useDNDProviderElement(props);
  return <>{DNDElement}</>;
};

export default CustomDndProvider;
