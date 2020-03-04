import React from 'react';
// TODO: REFACTOR (OCLAIR)
import axios from 'axios';

import { Table, Typography, Tooltip, Icon, message, Upload, Button } from 'antd';
import { Link } from 'react-router-dom';

import './style.scss';

// TODO: REFACTOR (OCLAIR)
const uploadJson = (e, value) => {
  const cleanedUrl = value.replace('http://10.50.11.143:31380', '');

  const fileJson = JSON.parse(e.target.result);

  console.log(fileJson);

  axios.post(cleanedUrl, fileJson)
    .then(function (response) {
      const responseMessage = response.data.data.ndarray;
      const responseMessage1 = JSON.stringify(responseMessage[0]);
      const responseMessage2 = JSON.stringify(responseMessage[1]);

      console.log(response);

      message.info(responseMessage1, 1)
        .then(() => message.info(responseMessage2, 1));
    })
    .catch(function (error) {
      console.log(error);
    });
}

const { Paragraph } = Typography;

const tableColumns = [
  {
    title: 'Nome',
    dataIndex: 'flowName',
    key: 'flowName',
   
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    render: (value) => {
      // TODO: REFACTOR (OCLAIR)
      const uploadProps = {
        showUploadList: false,
        name: 'file',
        action: (file) => new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsText(file);

          fileReader.onloadend = async (e) => await uploadJson(e, value);

          resolve();
        }),
        // headers: {
        //   authorization: 'authorization-text',
        // },
        customRequest: () => null,
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

      return (
        <div>      
        <Tooltip title={value}>
          <Paragraph ellipsis copyable>
            {value}
          </Paragraph>
          {/* TODO: REFACTOR (OCLAIR)*/}
          <Upload {...uploadProps}>
              <Button>
                <Icon type="thunderbolt" /> Subir arquivo de Inferência
              </Button>
            </Upload>
        </Tooltip>
        </div>
      )
    },
  },
  {
    title: 'Data de Criação',
    dataIndex: 'created',
    key: 'created',
    // render: (value) => new Date(value).toLocaleString(),
  },
  {
    title: 'Ação',
    dataIndex: 'action',
    key: 'action',
    render: (value) => (
      <a target='_blank' href='/notebook/kubeflow-anonymous/server-1/tree?'>
        Monitoramento
      </a>
    ),
  },
];

const ImplantedFlowsTable = ({ flowList }) => {
  return (
    <Table
      // rowKey={(record) => record.uuid}
      dataSource={flowList}
      columns={tableColumns}
      pagination={{ pageSize: 9 }}
    // scroll={{ y: 'calc(100vh - 480px)' }}
    />
  );
};

export default ImplantedFlowsTable;
