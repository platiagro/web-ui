import React from 'react';
import { useSelector } from 'react-redux';

import { PropertiesPanel, ExternalDatasetDrawer } from 'components';

const selectedOperatorNameSelector = ({ operatorReducer }) => {
  return operatorReducer.name;
};

const selectedOperatorTagsSelector = ({ operatorReducer }) => {
  return operatorReducer?.tags?.includes('DATASETS');
};

const selectedOperatorParametersSelector = ({ operatorReducer }) => {
  return operatorReducer.parameters;
};

const PropertiesResizableContainer = () => {
  const operatorName = useSelector(selectedOperatorNameSelector);
  const operatorParameters = useSelector(selectedOperatorParametersSelector);
  const operatorIsDataset = useSelector(selectedOperatorTagsSelector);

  console.log(operatorParameters);
  return (
    <PropertiesPanel title={operatorName}>
      {operatorIsDataset && (
        <ExternalDatasetDrawer
          propertyTitle='Tipo da fonte de dados'
          propertyTip='Dica'
          urlText='Url para cópia'
          knowMoreUrl='/'
          description='Um texto falando sobre como uma aplicação pode enviar dados para o fluxo (através de uma URL) a fim de testá-lo antes da implantação.'
        />
      )}
    </PropertiesPanel>
  );
};

// EXPORT DEFAULT
export default PropertiesResizableContainer;
