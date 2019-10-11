/* eslint-disable react/no-unused-state */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import _ from 'lodash';
import { Upload, Button, Icon, Divider, Select, Spin } from 'antd';

import DataSetTable from '../DataSetTable';
import InfoHelper from '../InfoHelper';
import {
  uploadDataSet,
  getHeaderColumns,
  updateColumn,
} from '../../services/dataSetApi';
import col from '../ExperimentContent/mock_col';

const { Option } = Select;

class DataSetDrawerContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      dataSetFileList: [],
      dataSetHeaderFileList: [],
      dataSetColumns: [],
      dataSetId: null,
      targetColumnId: null,
    };
  }

  componentDidMount() {
    const { parameter, columns } = this.props;
    this.setState({
      targetColumnId: parameter.target,
      dataSetColumns: !_.isEmpty(columns) ? columns : null,
      dataSetId: parameter.dataSetId,
    });
  }

  handleUpload = async () => {
    const { dataSetFileList, dataSetHeaderFileList } = this.state;
    const { setCSV, setTXT, setColumns, setTarget, setDataset } = this.props;

    const formData = new FormData();
    let response = null;
    let headerColumns;

    formData.append(
      'dataset',
      dataSetFileList[0].originFileObj,
      dataSetFileList[0].name
    );

    if (dataSetHeaderFileList.lenght > 0) {
      formData.append(
        'header',
        dataSetHeaderFileList[0].originFileObj,
        dataSetHeaderFileList[0].name
      );
    }

    setCSV(dataSetFileList[0].name);

    if (dataSetHeaderFileList[0]) setTXT(dataSetHeaderFileList[0].name);

    this.setState({
      uploading: true,
    });

    response = await uploadDataSet(formData);

    headerColumns = await getHeaderColumns(response.data.payload.header.uuid);

    this.setState({
      uploading: false,
      dataSetFileList: [],
      dataSetHeaderFileList: [],
      dataSetColumns: headerColumns.data.payload,
      dataSetId: response.data.payload.dataset.uuid,
      targetColumnId: null,
    });
    setColumns(headerColumns.data.payload);
    setDataset(response.data.payload.dataset.uuid);
    setTarget(null);
  };

  handleOnChange = (targetColumnId) => {
    const { setTarget } = this.props;
    this.setState({ targetColumnId });
    setTarget(targetColumnId);
  };

  handleColumnSelect = async (e, row) => {
    const res = await updateColumn(row.headerId, row.uuid, e);
    if (res) {
      const cols = [...this.props.columns];
      cols[row.position].datatype = e;
      this.props.setColumns(cols);
    }
  };

  renderTable() {
    const { dataSetColumns, uploading, targetColumnId } = this.state;

    if (uploading)
      return (
        <div>
          <Divider />
          <Spin />
        </div>
      );

    return !dataSetColumns ? null : (
      <div>
        <Divider />

        <p>Qual é o seu atributo alvo?</p>
        <Select
          onChange={this.handleOnChange}
          style={{ width: 200 }}
          placeholder='Selecione'
          value={targetColumnId}
        >
          {dataSetColumns.map((column) => (
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
          dataSource={dataSetColumns}
          handleSelect={this.handleColumnSelect}
        />
      </div>
    );
  }

  renderDataSetUpload() {
    const { dataSetFileList, uploading } = this.state;

    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.dataSetFileList.indexOf(file);
          const newDataSetFileList = state.dataSetFileList.slice();
          newDataSetFileList.splice(index, 1);
          return {
            dataSetFileList: newDataSetFileList,
            dataSetHeaderFileList: [],
          };
        });
      },
      onChange: (info) => {
        let newDataSetFileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        newDataSetFileList = newDataSetFileList.slice(-1);

        this.setState({ dataSetFileList: newDataSetFileList });
      },
      beforeUpload: (file) => {
        this.setState((state) => ({
          dataSetFileList: [...state.dataSetFileList, file],
        }));
        return false;
      },
      fileList: dataSetFileList,
    };

    return (
      <Upload {...props} disabled={uploading} accept='.csv'>
        <Button disabled={uploading}>
          <Icon type='upload' />
          Selecionar
        </Button>
      </Upload>
    );
  }

  renderDataSetHeaderUpload() {
    const { dataSetHeaderFileList, dataSetFileList, uploading } = this.state;

    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.dataSetHeaderFileList.indexOf(file);
          const newDataSetHeaderFileList = state.dataSetHeaderFileList.slice();
          newDataSetHeaderFileList.splice(index, 1);
          return {
            dataSetHeaderFileList: newDataSetHeaderFileList,
          };
        });
      },
      onChange: (info) => {
        let newDataSetHeaderFileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        newDataSetHeaderFileList = newDataSetHeaderFileList.slice(-1);

        this.setState({ dataSetHeaderFileList: newDataSetHeaderFileList });
      },
      beforeUpload: (file) => {
        this.setState((state) => ({
          dataSetHeaderFileList: [...state.dataSetHeaderFileList, file],
        }));
        return false;
      },
      fileList: dataSetHeaderFileList,
    };

    return (
      <Upload {...props} disabled={uploading} accept='.txt'>
        <Button disabled={!(dataSetFileList.length > 0) || uploading}>
          <Icon type='upload' />
          Selecionar cabeçalho
        </Button>
      </Upload>
    );
  }

  render() {
    const { dataSetFileList, uploading } = this.state;

    return (
      <div>
        <p>Arquivo .csv com os dados de entrada</p>
        {this.renderDataSetUpload()}

        <br />

        <p>
          Cabeçalho com os atributos
          <small>(Opcional)</small>
        </p>
        {this.renderDataSetHeaderUpload()}

        <br />

        <Button
          onClick={this.handleUpload}
          loading={uploading}
          disabled={!dataSetFileList.length > 0}
        >
          Importar
        </Button>

        {this.renderTable()}
      </div>
    );
  }
}

export default DataSetDrawerContent;
