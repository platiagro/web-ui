import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Tooltip, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const TaskDetailsHeaderTitle = ({
  title,
  isLoadingTask,
  onStartEditingTaskName,
}) => {
  return isLoadingTask ? (
    <div className='task-details-page-header-title-group'>
      <Skeleton.Input style={{ width: 150 }} active size='small' />
    </div>
  ) : (
    <div className='task-details-page-header-title-group'>
      <Typography.Title
        level={3}
        ellipsis
        className='task-details-page-header-title'
      >
        <Tooltip title={title} placement='bottom'>
          <span>{title}</span>
        </Tooltip>
      </Typography.Title>

      <Tooltip title='Editar' placement='bottom'>
        <EditOutlined
          className='task-details-page-header-edit-icon'
          onClick={onStartEditingTaskName}
          type='edit'
        />
      </Tooltip>
    </div>
  );
};

TaskDetailsHeaderTitle.propTypes = {
  title: PropTypes.string,
  isLoadingTask: PropTypes.bool.isRequired,
  onStartEditingTaskName: PropTypes.func.isRequired,
};

export default TaskDetailsHeaderTitle;
