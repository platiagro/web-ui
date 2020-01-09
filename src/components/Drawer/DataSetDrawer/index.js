// TODO: otimizar e refatorar esse componente

/* eslint-disable react/no-unused-state */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import _ from 'lodash';
import { Upload, Button, Icon, Divider, Select, Spin, message } from 'antd';

import { connect } from 'react-redux';
import DataSetTable from '../DataSetTable';
import InfoHelper from '../InfoHelper';

import ResultsDrawer from '../ResultsDrawer';
import ResultsButtonBar from '../ResultsButtonBar';

import { findTarget } from '../../../utils';

import {
  setTarget,
  uploadDataset,
  setColumnType,
} from '../../../store/actions/experimentActions';

const { Option } = Select;

const DataSetDrawer = ({
  setColumns,
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

  // resultados
  const [results, setResults] = useState(
    (runStatus === 'Failed' || runStatus === 'Succeeded') &&
      taskStatus === 'Succeeded'
  );
  const [showResults, setShowResults] = useState(results);

  const { columns, targetColumnId } = details;

  // Handle upload csv e txt
  const handleUploadDataset = () => {
    const formData = new FormData();

    formData.append(
      'dataset',
      dataSetFileList[0].originFileObj,
      dataSetFileList[0].name
    );

    if (dataSetHeaderFileList[0]) {
      formData.append(
        'header',
        dataSetHeaderFileList[0].originFileObj,
        dataSetHeaderFileList[0].name
      );
    }

    formData.append('experimentId', details.uuid);

    uploadDatasetAction(details.projectId, formData);

    setDataSetHeaderFileList([]);
    setDataSetFileList([]);
  };

  const handleTargetSet = (targetId) => {
    setTargetAction(
      details.projectId,
      details.uuid,
      targetId,
      details.parameters
    );
  };

  const handleSetColumnType = (e, row) => {
    const { headerId, uuid: columnId, position: columnPosition } = row;
    const columnType = e;

    setColumnTypeAction(headerId, columnId, columnType, columnPosition);
  };

  const renderTable = () => {
    if (loading)
      return (
        <div>
          <Divider />
          <Spin />
        </div>
      );

    return _.isEmpty(columns) ? null : (
      <div>
        <Divider />

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

        <InfoHelper content='Seu modelo será treinado para prever os valores do alvo.' />

        <br />
        <br />

        <DataSetTable
          targetColumnId={targetColumnId}
          dataSource={columns}
          handleSelect={handleSetColumnType}
        />
      </div>
    );
  };

  const renderDataSetUpload = () => {
    const props = {
      onRemove: (file) => {
        const index = dataSetFileList.indexOf(file);
        const newDataSetFileList = dataSetFileList.slice();
        newDataSetFileList.splice(index, 1);
        setDataSetFileList(newDataSetFileList);
        setDataSetHeaderFileList([]);
      },
      onChange: (info) => {
        let newDataSetFileList = [...info.fileList];
        // 1. Limit the number of uploaded files
        newDataSetFileList = newDataSetFileList.slice(-1);
        setDataSetFileList(newDataSetFileList);
      },
      beforeUpload: (file) => {
        setDataSetFileList([...dataSetFileList, file]);
        return false;
      },
      fileList: dataSetFileList,
    };

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

const mapStateToProps = ({ drawer: { loading }, experiment: details }) => ({
  loading,
  details,
});

const mapDispatchToProps = (dispatch) => ({
  uploadDatasetAction: (projectId, form) =>
    dispatch(uploadDataset(projectId, form)),
  setTargetAction: (projectId, experimentId, targetId, parameters) =>
    dispatch(setTarget(projectId, experimentId, targetId, parameters)),
  setColumnTypeAction: (headerId, columnId, columnType, columnPosition) =>
    dispatch(setColumnType(headerId, columnId, columnType, columnPosition)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataSetDrawer);
