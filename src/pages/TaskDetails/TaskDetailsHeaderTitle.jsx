import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const TaskDetailsHeaderTitle = ({
  title,
  isLoadingTask,
  onStartEditingTaskName,
}) => {
  return isLoadingTask ? (
    <Skeleton.Input style={{ width: 150 }} active size='small' />
  ) : (
    <>
      <span>{title}</span>
      <Tooltip title='Editar' placement='bottom'>
        <EditOutlined
          className='task-details-page-header-edit-icon'
          onClick={onStartEditingTaskName}
          type='edit'
        />
      </Tooltip>
    </>
  );
};

TaskDetailsHeaderTitle.propTypes = {
  title: PropTypes.object.isRequired,
  isLoadingTask: PropTypes.bool.isRequired,
  onStartEditingTaskName: PropTypes.func.isRequired,
};

export default TaskDetailsHeaderTitle;
