// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// UI LIBS
import { DeleteOutlined, ProfileOutlined } from '@ant-design/icons';
import { Badge, Button, Divider, Popconfirm, Tooltip, Typography } from 'antd';

// COMPONENTS
import { CommonTable } from 'components';
import UploadInferenceTestButton from './UploadInferenceTestButton';

// STYLES
import './style.less';

// TYPOGRAPHY COMPONENTS
const { Paragraph } = Typography;

/**
 * Deployments Table.
 * This component is responsible for displaying deployments table.
 *
 * @param {object} props Component props
 * @returns {DeploymentsTable} React Component
 */
const DeploymentsTable = (props) => {
  const {
    deployments,
    loading,
    onDeleteDeployment,
    onOpenLog,
    onTestInference,
    selectedExperiment,
  } = props;

  // convert status to badge icon
  const statusToBadge = {
    Failed: 'error',
    Running: 'processing',
    Succeeded: 'success',
  };

  // convert status text to portuguese
  const statusTextToPortuguese = {
    Failed: 'Falhou',
    Running: 'Em implantação',
    Succeeded: 'Sucesso',
  };

  // table columns config
  const columnsConfig = [
    {
      title: <strong>Status</strong>,
      dataIndex: 'status',
      key: 'status',
      width: '12%',
      render: (value) => (
        <Badge
          status={statusToBadge[value]}
          text={statusTextToPortuguese[value]}
        />
      ),
    },
    {
      title: <strong>Nome</strong>,
      dataIndex: 'name',
      key: 'name',
      width: '18%',
    },
    {
      title: <strong>URL</strong>,
      dataIndex: 'url',
      key: 'url',
      width: '35%',
      render: (value) => (
        <Tooltip title={value}>
          <Paragraph copyable ellipsis>
            {value}
          </Paragraph>
        </Tooltip>
      ),
    },
    {
      title: <strong>Data de criação</strong>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '20%',
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      title: <strong>Ações</strong>,
      dataIndex: 'action',
      key: 'action',
      width: '15%',
      render: (value, record) => (
        <>
          <UploadInferenceTestButton
            handleUpload={(file) => onTestInference(record.url, file)}
          />{' '}
          <Divider type='vertical' />
          <Tooltip placement='bottom' title='Ver logs'>
            <Button
              onClick={() => onOpenLog(record.experimentId)}
              size='large'
              style={{ padding: 0 }}
              type='link'
            >
              <ProfileOutlined />
            </Button>
          </Tooltip>
          <Divider type='vertical' />
          <Popconfirm
            placement='left'
            title='Você tem certeza que deseja excluir essa implantação?'
            okText='Sim'
            cancelText='Não'
            onConfirm={() => onDeleteDeployment(record.experimentId)}
          >
            <Tooltip placement='bottom' title='Excluir'>
              <Button size='large' style={{ padding: 0 }} type='link'>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Popconfirm>
        </>
      ),
    },
  ];

  // RENDER
  return (
    <CommonTable
      columns={columnsConfig}
      dataSource={deployments}
      isLoading={loading}
      locale={{
        emptyText: 'Nenhum fluxo implantado',
      }}
      pagination={{ pageSize: 10 }}
      rowClassName={(record) => {
        if (selectedExperiment) {
          return record.experimentId === selectedExperiment
            ? 'ant-table-row-selected'
            : '';
        } else {
          return '';
        }
      }}
      rowKey={(record) => {
        if (record.experimentId) {
          return record.experimentId;
        } else {
          return uuidv4();
        }
      }}
    />
  );
};

// PROP TYPES
DeploymentsTable.propTypes = {
  /** delete deployment handle */
  onDeleteDeployment: PropTypes.func.isRequired,
  /** open log handle */
  onOpenLog: PropTypes.func.isRequired,
  /** test inference handle */
  onTestInference: PropTypes.func.isRequired,
  /** deployments list */
  deployments: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** table is loading */
  loading: PropTypes.bool.isRequired,
  /** selected experiment */
  selectedExperiment: PropTypes.string,
};

// EXPORT
export default DeploymentsTable;
