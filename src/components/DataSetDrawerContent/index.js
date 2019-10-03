import React from 'react';

import { Upload, Button, Icon, Divider, Select, Spin } from 'antd';

import DataSetTable from '../DataSetTable';
import InfoHelper from '../InfoHelper';

const { Option } = Select;

class DataSetDrawerContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSetFileList: [],
      dataSetHeaderFileList: [],
      uploading: false,
      dataSetColumns: null,
    };
  }

  handleUpload = () => {
    const { dataSetFileList, dataSetHeaderFileList } = this.state;
    const formData = new FormData();

    dataSetFileList.forEach((file) => {
      formData.append('dataSetFiles[]', file);
    });

    dataSetHeaderFileList.forEach((file) => {
      formData.append('dataSetHeaderFiles[]', file);
    });

    this.setState({
      uploading: true,
    });

    setTimeout(
      () =>
        this.setState({
          uploading: false,
          dataSetColumns: true,
        }),
      2000
    );

    // // You can use any AJAX library you like
    // reqwest({
    //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success('upload successfully.');
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error('upload failed.');
    //   },
    // });
  };

  renderTable() {
    const { dataSetColumns, uploading } = this.state;

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
        <Select style={{ width: 200 }} placeholder='Selecione'>
          <Option value='id'>id</Option>
          <Option value='hour'>hora</Option>
          <Option value='type'>Tipo</Option>
        </Select>

        <InfoHelper content='Seu modelo será treinado para prever os valores do alvo.' />

        <br />
        <br />

        <DataSetTable />
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
      <Upload {...props}>
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
      <Upload {...props}>
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
