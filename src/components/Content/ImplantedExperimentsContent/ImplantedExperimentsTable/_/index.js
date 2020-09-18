// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import {
  Table,
  Typography,
  Tooltip,
  Popconfirm,
  Badge,
  Divider,
  Modal,
  Button,
} from 'antd';

// COMPONENTS
import UploadInferenceTestButton from '../UploadInferenceTestButton';
import LogsDrawer from '../../LogsDrawer/Container';

// STYLES
import './style.less';

// TYPOGRAPHY COMPONENTS
const { Paragraph } = Typography;

/**
 * Implanted Experiments Table.
 * This component is responsible for displaying implanted experiments table.
 *
 * @param {object} props Component props
 * @returns {ImplantedExperimentsTable} React Component
 * @component
 */
const ImplantedExperimentsTable = (props) => {
  // destructuring props
  const {
    implantedExperiments,
    handleTestInference,
    handleOpenLog,
    handleDeleteImplantedExperiment,
    loading,
    selectedExperiment,
    experimentInference,
    experimentInferenceModal,
    closeModal,
  } = props;

  // convert status to badge icon
  const statusToBadge = {
    Failed: 'error',
    Running: 'processing',
    Succeeded: 'success',
  };

  /**
   * Check whenever a response is a encoded base64 string
   *
   * @param {Array} ndarray response from Seldon
   * @returns {boolean} is a response includes a encoded base64 string or not
   */
  const isBase64Encoded = (ndarray) => {
    const array = ndarray.flat();
    const baseString = array.find((element) => typeof element === 'string');

    if (baseString) {
      const pattern = /[A-Za-z0-9+/=]/;
      const [base, content] = baseString.split(',');

      if (base.includes('image/') && pattern.test(content)) return true;
    } else {
      return false;
    }
  };

  /**
   * Check if a array has a encoded base64 image
   *
   * @param {*} ndarray response from Seldon
   * @returns {boolean} is a response includes a encoded base64 image or not
   */
  const isImage = (ndarray) => {
    const encodedString = [...ndarray].shift();

    if (encodedString) {
      const [base] = encodedString.split(',');
      if (base.includes('image/')) return true;
    }
    return false;
  };

  // table columns config
  const columnsConfig = [
    // status column
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value) => (
        // badge
        <Badge status={statusToBadge[value]} text={value} />
      ),
    },
    // name
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    // url column
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (value) => (
        // tooltip
        <Tooltip title={value}>
          {/* copyable paragraph */}
          <Paragraph copyable>{value}</Paragraph>
        </Tooltip>
      ),
    },
    // createdAt column
    {
      title: 'Data de Criação',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => new Date(value).toLocaleString(),
    },
    // action column
    {
      title: 'Ação',
      dataIndex: 'action',
      key: 'action',
      render: (value, record) => (
        // fragment container
        <>
          {/* see error logs */}
          <Popconfirm
            placement='left'
            title='Você tem certeza que deseja excluir essa implantação?'
            okText='Sim'
            cancelText='Não'
            onConfirm={() =>
              handleDeleteImplantedExperiment(record.experimentId)
            }
          >
            <Button type='link'>Deletar</Button>
          </Popconfirm>
          <Divider type='vertical' />
          <Button
            type='link'
            onClick={() => handleOpenLog(record.experimentId)}
          >
            Logs
          </Button>
          <Divider type='vertical' />
          {/* upload inference test button */}
          <UploadInferenceTestButton
            handleUpload={(file) =>
              handleTestInference(record.experimentId, file)
            }
          />
        </>
      ),
    },
  ];

  // RENDER
  return (
    // rendering implanted experiments table
    <>
      <Table
        dataSource={implantedExperiments}
        columns={columnsConfig}
        pagination={{ pageSize: 9 }}
        loading={loading}
        rowKey={(record) => record.runId}
        rowClassName={(record) =>
          record.name === selectedExperiment ? 'ant-table-row-selected' : ''
        }
      />
      <LogsDrawer />
      <Modal
        title='Predições'
        visible={experimentInferenceModal}
        onOk={closeModal}
        onCancel={closeModal}
        width='70vw'
      >
        {isBase64Encoded(experimentInference.ndarray) ? (
          <div className='container-difference'>
            {isImage(experimentInference.ndarray.flat()) ? (
              <img
                src={experimentInference.ndarray.flat()}
                alt='predict-response'
                className='image-difference'
              />
            ) : (
              <div className='iterative-prediction'>
                <Tooltip title='O formato do arquivo gerado pelo modelo não é do tipo imagem. Veja mais sobre essa saída logo abaixo!'>
                  <span>Arquivo gerado pelo modelo</span>
                </Tooltip>
                <div className='show-code'>
                  {experimentInference.ndarray.flat()}
                </div>
                <a
                  href={experimentInference.ndarray.flat()}
                  download='predict-file'
                >
                  <Button type='primary' style={{ margin: '6px 6px 0px 0px' }}>
                    Baixar
                  </Button>
                </a>
              </div>
            )}
          </div>
        ) : (
          <Table
            dataSource={experimentInference.ndarray.map((e, i) => {
              const data = { key: i };
              experimentInference.names.forEach((c, j) => {
                data[c] = e[j];
              });
              return data;
            })}
            columns={experimentInference.names.map((name) => ({
              title: name,
              dataIndex: name,
              key: name,
              width: 100,
            }))}
            scroll={{ x: 800 }}
          />
        )}
      </Modal>
    </>
  );
};

// PROP TYPES
ImplantedExperimentsTable.propTypes = {
  /** implanted experiments table implanted experiments list */
  implantedExperiments: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** implanted experiments table test inference handle */
  handleTestInference: PropTypes.func.isRequired,
};

// EXPORT
export default ImplantedExperimentsTable;
