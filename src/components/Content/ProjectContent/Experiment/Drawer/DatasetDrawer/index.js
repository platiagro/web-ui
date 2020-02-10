// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Upload, Button, Icon, Divider, Select } from 'antd';

// COMPONENTS
import ColumnsTable from './ColumnsTable';
import InputTip from '../InputTip';

// SELECT COMPONENTS
const { Option } = Select;

/**
 * Dataset Drawer.
 * This component is responsible for displaying dataset content in drawer.
 */
const DatasetDrawer = ({
  projectId,
  experimentId,
  loading,
  columns,
  targetColumnId,
  parameters,
  handleSetTarget,
  handleSetColumnType,
  handleUploadFiles,
}) => {
  // HOOKS
  // dataset file list hook
  const [datasetFileList, setDatasetFileList] = useState([]);
  // dataset header file list hook
  const [datasetHeaderFileList, setDatasetHeaderFileList] = useState([]);

  // HANDLERS
  // handler to upload dataset and header
  const handleUpload = () => {
    // creating new form data object
    const formData = new FormData();
    // append dataset file to form data
    formData.append(
      'dataset',
      datasetFileList[0].originFileObj,
      datasetFileList[0].name
    );
    // append dataset header file to form data
    if (datasetHeaderFileList[0]) {
      formData.append(
        'header',
        datasetHeaderFileList[0].originFileObj,
        datasetHeaderFileList[0].name
      );
    }
    // uploading files
    handleUploadFiles(projectId, experimentId, formData);
    // cleaning dataset header file list
    setDatasetHeaderFileList([]);
    // cleaning dataset file list
    setDatasetFileList([]);
  };
  // handler to set experiment target
  const handleChangeTarget = (targetId) => {
    // setting target
    handleSetTarget(projectId, experimentId, targetId, parameters);
  };
  // handler to set dataset column type
  const handleChangeColumnType = (e, row) => {
    // get header id, column id and column position on array
    const { headerId, uuid: columnId, position: columnPosition } = row;
    // set column type const
    const columnType = e;
    // setting column type
    handleSetColumnType(headerId, columnId, columnType, columnPosition);
  };

  // COMPONENTS RENDERS
  // dataset upload
  const renderDatasetUpload = () => {
    // upload component props configuration
    const props = {
      // handler to remove dataset file
      onRemove: (file) => {
        // get file index
        const index = datasetFileList.indexOf(file);
        // configuring new file list
        const newDatasetFileList = datasetFileList.slice();
        newDatasetFileList.splice(index, 1);
        // setting new file list
        setDatasetFileList(newDatasetFileList);
        // cleaning dataset header file list
        setDatasetHeaderFileList([]);
      },
      // handler to change dataset file
      onChange: (info) => {
        // getting file list
        let newDatasetFileList = [...info.fileList];
        // limiting upload file list to 1
        newDatasetFileList = newDatasetFileList.slice(-1);
        // setting new file list
        setDatasetFileList(newDatasetFileList);
      },
      // handler to prepare dataset upload
      beforeUpload: (file) => {
        // adding file to list
        setDatasetFileList([...datasetFileList, file]);
        // stopping default action
        return false;
      },
      // dataset file list
      fileList: datasetFileList,
    };

    // rendering component
    return (
      // upload component
      <Upload {...props} disabled={loading} accept='.csv'>
        {/* upload button component */}
        <Button disabled={loading}>
          {/* icon component */}
          <Icon type={loading ? 'loading' : 'upload'} />
          Selecionar
        </Button>
      </Upload>
    );
  };
  // dataset header upload
  const renderDatasetHeaderUpload = () => {
    // upload component props configuration
    const props = {
      // handler to remove dataset header file
      onRemove: (file) => {
        // get file index
        const index = datasetHeaderFileList.indexOf(file);
        // configuring new file list
        const newDatasetHeaderFileList = datasetHeaderFileList.slice();
        newDatasetHeaderFileList.splice(index, 1);
        // setting new file list
        setDatasetHeaderFileList(newDatasetHeaderFileList);
      },
      // handler to change dataset header file
      onChange: (info) => {
        // getting file list
        let newDatasetHeaderFileList = [...info.fileList];
        // limiting upload file list to 1
        newDatasetHeaderFileList = newDatasetHeaderFileList.slice(-1);
        // setting new file list
        setDatasetHeaderFileList(newDatasetHeaderFileList);
      },
      // handler to prepare dataset header upload
      beforeUpload: (file) => {
        // adding file to list
        setDatasetHeaderFileList([...datasetHeaderFileList, file]);
        // stopping default action
        return false;
      },
      // dataset header file list
      fileList: datasetHeaderFileList,
    };

    // rendering component
    return (
      // upload component
      <Upload {...props} disabled={loading} accept='.txt'>
        {/* upload button component */}
        <Button disabled={!(datasetFileList.length > 0) || loading}>
          {/* icon component */}
          <Icon type={loading ? 'loading' : 'upload'} />
          Selecionar cabeçalho
        </Button>
      </Upload>
    );
  };
  // render dataset columns table
  const renderColumnsTable = () => {
    // rendering loading
    if (loading)
      return (
        // div container
        <div>
          {/* divider component */}
          <Divider />
          {/* loading icon */}
          <Icon type='loading' />
        </div>
      );

    // rendering table
    return columns.length === 0 ? null : (
      // div container
      <div>
        {/* divider component */}
        <Divider />
        {/* target select block */}
        <p>Qual é o seu atributo alvo?</p>
        {/* select component */}
        <Select
          onChange={handleChangeTarget}
          style={{ width: 200 }}
          placeholder='Selecione'
          value={targetColumnId}
          showSearch
        >
          {/* mapping columns to select options */}
          {columns.map((column) => (
            // select option component
            <Option key={column.uuid} value={column.uuid}>
              {column.name}
            </Option>
          ))}
        </Select>
        {/* input tip */}
        <InputTip tip='Seu modelo será treinado para prever os valores do alvo.' />
        {/* line breaks */}
        <br />
        <br />
        {/* dataset columns table */}
        <ColumnsTable
          targetColumnId={targetColumnId}
          columns={columns}
          handleSelect={handleChangeColumnType}
        />
      </div>
    );
  };

  // RENDER
  return (
    // div container
    <div>
      {/* dataset upload block */}
      <p>Arquivo .csv com os dados de entrada</p>
      {renderDatasetUpload()}
      {/* line break */}
      <br />
      {/* dataset header upload block */}
      <p>
        Cabeçalho com os atributos
        <small>(Opcional)</small>
      </p>
      {renderDatasetHeaderUpload()}
      {/* line break */}
      <br />
      {/* upload button */}
      <Button
        onClick={handleUpload}
        loading={loading}
        disabled={!datasetFileList.length > 0}
      >
        Importar
      </Button>
      {/* columns table */}
      {renderColumnsTable()}
    </div>
  );
};

// PROP TYPES
DatasetDrawer.propTypes = {
  /** dataset drawer current project id string */
  projectId: PropTypes.string.isRequired,
  /** dataset drawer current experiment id string */
  experimentId: PropTypes.string.isRequired,
  /** dataset drawer is loading dataset */
  loading: PropTypes.bool.isRequired,
  /** dataset drawer dataset columns */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** dataset drawer target column id string */
  targetColumnId: PropTypes.string.isRequired,
  /** dataset drawer current experiment parameters */
  parameters: PropTypes.objectOf(PropTypes.object).isRequired,
  /** dataset drawer set target handler */
  handleSetTarget: PropTypes.func.isRequired,
  /** dataset drawer set column type handler */
  handleSetColumnType: PropTypes.func.isRequired,
  /** dataset drawer upload dataset and header handler */
  handleUploadFiles: PropTypes.func.isRequired,
};

// EXPORT
export default DatasetDrawer;
