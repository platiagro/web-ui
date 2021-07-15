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
    <h3>
      <Skeleton.Input style={{ width: 150 }} active size='small' />
    </h3>
  ) : (
    <h3 className='task-details-page-header-title-group'>
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
    </h3>
  );
};

TaskDetailsHeaderTitle.propTypes = {
  title: PropTypes.object.isRequired,
  isLoadingTask: PropTypes.bool.isRequired,
  onStartEditingTaskName: PropTypes.func.isRequired,
};

export default TaskDetailsHeaderTitle;
