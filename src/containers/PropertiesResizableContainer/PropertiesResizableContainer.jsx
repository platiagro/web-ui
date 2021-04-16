import React from 'react';
import { useSelector } from 'react-redux';

import { PropertiesPanel } from 'components';

const selectedOperatorNameSelector = ({ operatorReducer }) => {
  return operatorReducer.name;
};

const PropertiesResizableContainer = () => {
  const operatorName = useSelector(selectedOperatorNameSelector);

  return <PropertiesPanel title={operatorName} />;
};

// EXPORT DEFAULT
export default PropertiesResizableContainer;
