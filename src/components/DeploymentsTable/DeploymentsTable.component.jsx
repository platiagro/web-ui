import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Button, Divider, Popconfirm, Tooltip, Typography } from 'antd';
import {
  FundOutlined,
  DeleteOutlined,
  ProfileOutlined,
} from '@ant-design/icons';

import { CommonTable } from 'components';
import { DEPLOYMENT_STATUS } from 'configs';

const statusToBadge = {
  [DEPLOYMENT_STATUS.FAILED]: 'error',
  [DEPLOYMENT_STATUS.RUNNING]: 'processing',
  [DEPLOYMENT_STATUS.PENDING]: 'processing',
  [DEPLOYMENT_STATUS.SUCCEEDED]: 'success',
};

const statusTextToPortuguese = {
  [DEPLOYMENT_STATUS.FAILED]: 'Falhou',
  [DEPLOYMENT_STATUS.RUNNING]: 'Em implantação',
  [DEPLOYMENT_STATUS.PENDING]: 'Em implantação',
  [DEPLOYMENT_STATUS.SUCCEEDED]: 'Sucesso',
};

const DeploymentsTable = ({
  loading,
  deployments,
  selectedExperiment,
  onOpenLog,
  onDeleteDeployment,
  handleShowMonitoringDrawer,
}) => {
  return (
    <CommonTable
      rowKey={(uuid) => uuid}
      isLoading={loading}
      dataSource={deployments}
      pagination={{ pageSize: 10 }}
      locale={{
        emptyText: 'Nenhum Fluxo Implantado',
      }}
      rowClassName={(record) => {
        if (selectedExperiment) {
          return record.experimentId === selectedExperiment
            ? 'ant-table-row-selected'
            : '';
        } else {
          return '';
        }
      }}
      columns={[
        {
          title: <strong>Status</strong>,
          dataIndex: 'status',
          key: 'status',
          width: '12%',
          render(value) {
            return (
              <Badge
                status={statusToBadge[value]}
                text={statusTextToPortuguese[value]}
              />
            );
          },
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
          render(value) {
            return (
              <Tooltip title={value}>
                <Typography.Paragraph style={{ margin: 0 }} copyable ellipsis>
                  {value}
                </Typography.Paragraph>
              </Tooltip>
            );
          },
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
          render(_, record) {
            return (
              <>
                <Tooltip placement='bottom' title='Ver Monitoramentos'>
                  <Button
                    onClick={handleShowMonitoringDrawer}
                    style={{ padding: 0 }}
                    size='large'
                    type='link'
                  >
                    <FundOutlined />
                  </Button>
                </Tooltip>

                <Divider type='vertical' />

                <Tooltip placement='bottom' title='Ver Logs'>
                  <Button
                    disabled={record.status === DEPLOYMENT_STATUS.RUNNING}
                    onClick={() => onOpenLog(record.uuid)}
                    style={{ padding: 0 }}
                    size='large'
                    type='link'
                  >
                    <ProfileOutlined />
                  </Button>
                </Tooltip>

                <Divider type='vertical' />

                <Popconfirm
                  okText='Sim'
                  cancelText='Não'
                  placement='left'
                  onConfirm={() => onDeleteDeployment(record.uuid)}
                  title='Você tem certeza que deseja excluir esta implantação?'
                >
                  <Tooltip placement='bottom' title='Excluir'>
                    <Button style={{ padding: 0 }} size='large' type='link'>
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                </Popconfirm>
              </>
            );
          },
        },
      ]}
    />
  );
};

DeploymentsTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  selectedExperiment: PropTypes.string,
  deployments: PropTypes.array.isRequired,
  onOpenLog: PropTypes.func.isRequired,
  onDeleteDeployment: PropTypes.func.isRequired,
  handleShowMonitoringDrawer: PropTypes.func.isRequired,
};

export default DeploymentsTable;
