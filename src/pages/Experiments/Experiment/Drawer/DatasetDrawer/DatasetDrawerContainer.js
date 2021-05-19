import React from 'react';
import { useSelector } from 'react-redux';

import DatasetDrawer from './index';

const datasetColumnsSelector = ({ datasetReducer }) => {
  return datasetReducer.columns;
};

const DatasetDrawerContainer = () => {
  const datasetColumns = useSelector(datasetColumnsSelector);

  return <DatasetDrawer columns={datasetColumns} />;
};

export default DatasetDrawerContainer;
