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
import { updateExperiment } from '../../../services/projectsApi';
import { getHeaderColumns, updateColumn } from '../../../services/dataSetApi';

import ResultsDrawer from '../ResultsDrawer';
import ResultsButtonBar from '../ResultsButtonBar';

import { findTarget } from '../../../utils';

import { uploadDataset } from '../../../store/actions/experimentActions';

const { Option } = Select;

const DataSetDrawer = ({
  setColumns,
  setTarget,
  details,
  parameter,
  runStatus,
  taskStatus,
  handleUploadDataset,
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

  const { columns } = details;

  // Handle upload csv e txt
  const handleUpload = async () => {
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

    handleUploadDataset(details.projectId, formData);
    //   // Depois da resposta preencher os estados
    //   if (response) {
    //     headerColumns = await getHeaderColumns(response.data.payload.header.uuid);

    //     await updateExperiment(details.projectId, details.uuid, {
    //       datasetId: response.data.payload.dataset.uuid,
    //       headerId: response.data.payload.header.uuid,
    //       targetColumnId: null,
    //       runId: null,
    //     });

    //     setTXT(response.data.payload.header.uuid);
    //     setCSV(response.data.payload.dataset.uuid);

    //     setColumns(headerColumns.data.payload);
    //     setDataset(response.data.payload.dataset.uuid);

    //   } else {
    //     setColumns([]);
    //     setDataset(null);
    //     setTXT(null);
    //     setCSV(null);
    //     await updateExperiment(details.projectId, details.uuid, {
    //       datasetId: null,
    //       headerId: null,
    //       targetColumnId: null,
    //       runId: null,
    //     });
    //   }
    setDataSetHeaderFileList([]);
    setDataSetFileList([]);
    setTarget(undefined);
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
            onClick={handleUpload}
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
  handleUploadDataset: (projectId, form) =>
    dispatch(uploadDataset(projectId, form)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSetDrawer);
