// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Table, Button, Popconfirm } from 'antd';

/**
 * Tasks Table.
 * This component is responsible for displaying tasks table.
 */
const TasksTable = ({
  tasks,
  handleClickTask,
  handleClickEdit,
  handleClickDelete,
  loading,
}) => {
  // table columns config
  const columnsConfig = [
    {
      title: 'Nome da Tarefa',
      dataIndex: 'name',
      key: 'name',
      render: (value, record) => (
        <Button type='link' onClick={() => handleClickTask(record.uuid)}>
          {value}
        </Button>
      ),
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ação',
      dataIndex: 'action',
      key: 'action',
      render: (value, record) => (
        <>
          <Button type='link' onClick={() => handleClickEdit(record)}>
            Alterar nome e descrição
          </Button>
          <Popconfirm
            title='Você tem certeza que deseja excluir essa tarefa?'
            onConfirm={() => handleClickDelete(record.uuid)}
            okText='Sim'
            cancelText='Não'
          >
            <Button type='link'>Excluir</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  // RENDER
  return (
    <Table
      className='tasksTable'
      rowKey={(record) => record.uuid}
      dataSource={tasks}
      columns={columnsConfig}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
      }}
      loading={loading}
    />
  );
};

// PROP TYPES
TasksTable.propTypes = {
  /** tasks list */
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** tasks table is loading */
  loading: PropTypes.bool.isRequired,
  /** tasks table click task handle */
  handleClickTask: PropTypes.func.isRequired,
  /** tasks table click edit handle */
  handleClickEdit: PropTypes.func.isRequired,
  /** tasks table click delete handle */
  handleClickDelete: PropTypes.func.isRequired,
};

// EXPORT
export default TasksTable;
