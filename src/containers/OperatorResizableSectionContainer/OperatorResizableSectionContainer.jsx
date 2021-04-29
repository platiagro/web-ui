import React from 'react';
import { useSelector } from 'react-redux';

import { PropertiesPanel } from 'components';
import DatasetDrawerContainer from 'pages/Experiments/Experiment/Drawer/DatasetDrawer/DatasetDrawerContainer';
import GenericDrawerContainer from 'pages/Experiments/Experiment/Drawer/GenericDrawer/GenericDrawerContainer';

import './OperatorResizableSectionContainer.less';

const operatorDescriptionSelector = ({ operatorReducer }) => {
  return operatorReducer.description;
};

const isOperatorDatasetSelector = ({ operatorReducer }) => {
  return operatorReducer.tags
    ? operatorReducer.tags.includes('DATASETS')
    : false;
};

const operatorNameSelector = ({ operatorReducer }) => {
  return operatorReducer.name;
};

const OperatorResizableSectionContainer = () => {
  const operatorDescription = useSelector(operatorDescriptionSelector);
  const isOperatorDataset = useSelector(isOperatorDatasetSelector);
  const operatorName = useSelector(operatorNameSelector);

  return (
    <PropertiesPanel tip={operatorDescription} title={operatorName}>
      {!!operatorName && (
        <>
          {isOperatorDataset && <DatasetDrawerContainer />}

          <div className='operatorResizableSectionDrawer'>
            {!isOperatorDataset && <GenericDrawerContainer />}
          </div>
        </>
      )}
    </PropertiesPanel>
  );
};

export default OperatorResizableSectionContainer;
