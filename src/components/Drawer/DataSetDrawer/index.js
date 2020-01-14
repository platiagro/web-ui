// TODO: otimizar e refatorar esse componente

/* eslint-disable react/no-unused-state */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

// CORE IMPORTS
import React, { useState } from 'react';
import { connect } from 'react-redux';

// ANTD IMPORTS
import { Upload, Button, Icon, Divider, Select, Spin } from 'antd';

// UTILS IMPORTS
import _ from 'lodash';
import { findTarget } from '../../../utils';

// COMPONENTS IMPORTS
import DataSetTable from '../DataSetTable';
import InfoHelper from '../InfoHelper';
import ResultsDrawer from '../ResultsDrawer';
import ResultsButtonBar from '../ResultsButtonBar';

// ACTIONS IMPORTS
import {
  setTarget,
  uploadDataset,
  setColumnType,
} from '../../../store/actions/experimentActions';

// get option from antd select
const { Option } = Select;

// dataset drawer component
const DataSetDrawer = ({
  details,
  parameter,
  runStatus,
  taskStatus,
  uploadDatasetAction,
  setTargetAction,
  setColumnTypeAction,
  loading,
}) => {
  // hooks to handle files
  const [dataSetFileList, setDataSetFileList] = useState([]);
  const [dataSetHeaderFileList, setDataSetHeaderFileList] = useState([]);

  // hooks to handle results
  const [results, setResults] = useState(
    (runStatus === 'Failed' || runStatus === 'Succeeded') &&
      taskStatus === 'Succeeded'
  );
  const [showResults, setShowResults] = useState(results);

  // get columns, project id, experiment id, parameters and target column id
  const {
    columns,
    projectId,
    uuid: experimentId,
    parameters,
    targetColumnId,
  } = details;

  // handler to upload dataset
  const handleUploadDataset = () => {
    // creating new form data object
    const formData = new FormData();

    // append dataset file to form data
    formData.append(
      'dataset',
      dataSetFileList[0].originFileObj,
      dataSetFileList[0].name
    );

    // append dataset header file to form data
    if (dataSetHeaderFileList[0]) {
      formData.append(
        'header',
        dataSetHeaderFileList[0].originFileObj,
        dataSetHeaderFileList[0].name
      );
    }

    // calling action to upload dataset
    uploadDatasetAction(projectId, experimentId, formData);

    // remove dataset header and dataset files
    setDataSetHeaderFileList([]);
    setDataSetFileList([]);
  };

  // handler to set experiment target
  const handleTargetSet = (targetId) => {
    // calling action to set target
    setTargetAction(projectId, experimentId, targetId, parameters);
  };

  // handler to set dataset column type
  const handleSetColumnType = (e, row) => {
    // get header id, column id and column position on array
    const { headerId, uuid: columnId, position: columnPosition } = row;
    // set column type const
    const columnType = e;

    // calling action to set column type
    setColumnTypeAction(headerId, columnId, columnType, columnPosition);
  };

  // function to render dataset columns table
  const renderTable = () => {
    // rendering loading
    if (loading)
      return (
        <div>
          <Divider />
          <Spin />
        </div>
      );

    // rendering table
    return columns.length === 0 ? null : (
      <div>
        <Divider />

        {/* target select */}
        <p>Qual é o seu atributo alvo?</p>
        <Select
          onChange={handleTargetSet}
          style={{ width: 200 }}
          placeholder='Selecione'
          value={targetColumnId}
          showSearch
        >
          {columns.map((column) => (
            <Option key={column.uuid} value={column.uuid}>
              {column.name}
            </Option>
          ))}
        </Select>

        {/* target tip */}
        <InfoHelper content='Seu modelo será treinado para prever os valores do alvo.' />

        <br />
        <br />

        {/* dataset table */}
        <DataSetTable
          targetColumnId={targetColumnId}
          dataSource={columns}
          handleSelect={handleSetColumnType}
        />
      </div>
    );
  };

  // function to render dataset upload
  const renderDataSetUpload = () => {
    // creating props
    const props = {
      // handler to remove dataset file
      onRemove: (file) => {
        const index = dataSetFileList.indexOf(file);
        const newDataSetFileList = dataSetFileList.slice();
        newDataSetFileList.splice(index, 1);
        setDataSetFileList(newDataSetFileList);
        setDataSetHeaderFileList([]);
      },
      // handler to change dataset file
      onChange: (info) => {
        let newDataSetFileList = [...info.fileList];
        // limiting the number of uploaded files to 1
        newDataSetFileList = newDataSetFileList.slice(-1);
        setDataSetFileList(newDataSetFileList);
      },
      // handler to prepare dataset upload
      beforeUpload: (file) => {
        setDataSetFileList([...dataSetFileList, file]);
        return false;
      },
      // dataset file list
      fileList: dataSetFileList,
    };

    // rendering component
    return (
      <Upload {...props} disabled={loading} accept='.csv'>
        <Button disabled={loading}>
          <Icon type={loading ? 'loading' : 'upload'} />
          Selecionar
        </Button>
      </Upload>
    );
  };

  const renderDataSetHeaderUpload = () => {
    const props = {
      onRemove: (file) => {
        const index = dataSetHeaderFileList.indexOf(file);
        const newDataSetHeaderFileList = dataSetHeaderFileList.slice();
        newDataSetHeaderFileList.splice(index, 1);
        setDataSetHeaderFileList(newDataSetHeaderFileList);
      },
      onChange: (info) => {
        let newDataSetHeaderFileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        newDataSetHeaderFileList = newDataSetHeaderFileList.slice(-1);
        setDataSetHeaderFileList(newDataSetHeaderFileList);
      },
      beforeUpload: (file) => {
        setDataSetHeaderFileList([...dataSetHeaderFileList, file]);
        return false;
      },
      fileList: dataSetHeaderFileList,
    };

    return (
      <Upload {...props} disabled={loading} accept='.txt'>
        <Button disabled={!(dataSetFileList.length > 0) || loading}>
          <Icon type={loading ? 'loading' : 'upload'} />
          Selecionar cabeçalho
        </Button>
      </Upload>
    );
  };

  return (
    <div>
      {!showResults ? (
        <div>
          <p>Arquivo .csv com os dados de entrada</p>
          {renderDataSetUpload()}

          <br />

          <p>
            Cabeçalho com os atributos
            <small>(Opcional)</small>
          </p>
          {renderDataSetHeaderUpload()}

          <br />

          <Button
            onClick={handleUploadDataset}
            loading={loading}
            disabled={!dataSetFileList.length > 0}
          >
            Importar
          </Button>

          {renderTable()}
        </div>
      ) : (
        <ResultsDrawer
          details={details}
          target={findTarget(columns, parameter.target)}
          table
        />
      )}
      {runStatus === 'Failed' && taskStatus === 'Succeeded' ? (
        <ResultsButtonBar
          setShowResults={setShowResults}
          showResults={showResults}
        />
      ) : null}
    </div>
  );
};

// STATES
const mapStateToProps = ({ drawer: { loading }, experiment: details }) => ({
  loading,
  details,
});

// DISPATCHS
const mapDispatchToProps = (dispatch) => ({
  uploadDatasetAction: (projectId, experimentId, form) =>
    dispatch(uploadDataset(projectId, experimentId, form)),
  setTargetAction: (projectId, experimentId, targetId, parameters) =>
    dispatch(setTarget(projectId, experimentId, targetId, parameters)),
  setColumnTypeAction: (headerId, columnId, columnType, columnPosition) =>
    dispatch(setColumnType(headerId, columnId, columnType, columnPosition)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataSetDrawer);
