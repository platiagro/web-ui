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

  // check if a ndarray is base64 and image/jpg
  const isBase64Encoded = (ndarray) => {
    const pattern = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    const baseValue = ndarray.find((value) => typeof value === 'string');

    if (baseValue) {
      const [base, content] = baseValue.split(',');

      if (base.includes('image/jpeg') && pattern.test(content)) return true;
      else return false;
    } else {
      return false;
    }
  };

  console.log(
    experimentInference.names.map((name) => {
      return { title: name, dataIndex: name, key: name };
    })
  );

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
            <img
              src={experimentInference.ndarray.map((element) => {
                return element;
              })}
              alt='predict-response'
              className='image-difference'
            />
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
              // colSpan: 50,
            }))}
            // scroll={{ x: 800 }}
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
