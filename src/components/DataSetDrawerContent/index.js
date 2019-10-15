/* eslint-disable react/no-unused-state */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import _ from 'lodash';
import { Upload, Button, Icon, Divider, Select, Spin, message } from 'antd';

import DataSetTable from '../DataSetTable';
import InfoHelper from '../InfoHelper';
import { updateExperiment } from '../../services/projectsApi';
import {
  uploadDataSet,
  getHeaderColumns,
  updateColumn,
} from '../../services/dataSetApi';

import ResultsDrawer from '../ResultsDrawer';
import ResultsButtonBar from '../ResultsButtonBar';

import { findTarget } from '../../utils';

import col from '../ExperimentContent/mock_col';

const { Option } = Select;

const DataSetDrawerContent = ({
  setCSV,
  setTXT,
  setColumns,
  setTarget,
  setDataset,
  details,
  columns,
  parameter,
  runStatus,
  taskStatus,
}) => {
  const [uploading, setUploading] = useState(false);
  const [dataSetFileList, setDataSetFileList] = useState([]);
  const [dataSetHeaderFileList, setDataSetHeaderFileList] = useState([]);
  // resultados
  const [results, setResults] = useState(
    (runStatus === 'Failed' || runStatus === 'Succeeded') &&
      taskStatus === 'Succeeded'
  );
  const [showResults, setShowResults] = useState(results);

  // Handle upload csv e txt
  const handleUpload = async () => {
    const formData = new FormData();
    let response = null;
    let headerColumns;

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

    setUploading(true);
    response = await uploadDataSet(formData);
    // Depois da resposta preencher os estados
    if (response) {
      headerColumns = await getHeaderColumns(response.data.payload.header.uuid);

      await updateExperiment(details.projectId, details.uuid, {
        datasetId: response.data.payload.dataset.uuid,
        headerId: response.data.payload.header.uuid,
        targetColumnId: null,
        runId: null,
      });
      setTXT(response.data.payload.header.uuid);
      setCSV(response.data.payload.dataset.uuid);

      setColumns(headerColumns.data.payload);
      setDataset(response.data.payload.dataset.uuid);
    } else {
      setColumns([]);
      setDataset(null);
      setTXT(null);
      setCSV(null);
      await updateExperiment(details.projectId, details.uuid, {
        datasetId: null,
        headerId: null,
        targetColumnId: null,
        runId: null,
      });
    }
    setDataSetHeaderFileList([]);
    setDataSetFileList([]);
    setTarget(undefined);
    setUploading(false);
  };

  const handleTargetChange = async (targetId) => {
    await updateExperiment(details.projectId, details.uuid, {
      targetColumnId: targetId,
    });
    setTarget(targetId);
  };

  const handleColumnSelect = async (e, row) => {
    const res = await updateColumn(row.headerId, row.uuid, e);
    if (res) {
      console.log('[DATATYPE]', e);
      const cols = [...columns];
      cols[row.position].datatype = e;
      setColumns(cols);
    }
  };

  const renderTable = () => {
    if (uploading)
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
          onChange={handleTargetChange}
          style={{ width: 200 }}
          placeholder='Selecione'
          value={parameter.target}
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
          targetColumnId={parameter.target}
          dataSource={columns}
          handleSelect={handleColumnSelect}
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
      <Upload {...props} disabled={uploading} accept='.csv'>
        <Button disabled={uploading}>
          <Icon type={uploading ? 'loading' : 'upload'} />
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
      <Upload {...props} disabled={uploading} accept='.txt'>
        <Button disabled={!(dataSetFileList.length > 0) || uploading}>
          <Icon type={uploading ? 'loading' : 'upload'} />
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
            onClick={handleUpload}
            loading={uploading}
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
      {results ? (
        <ResultsButtonBar
          setShowResults={setShowResults}
          showResults={showResults}
        />
      ) : null}
    </div>
  );
};

export default DataSetDrawerContent;
