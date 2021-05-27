import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';

import { Placeholder } from 'components';

const TaskDetailsUploads = () => {
  return (
    <div className='task-details-page-content-info-uploads'>
      <div className='task-details-page-content-info-uploads-title'>
        <ClockCircleOutlined />
        <span>Uploads Recentes</span>
      </div>

      <Placeholder
        iconComponent={<ClockCircleOutlined />}
        message='Nenhum Upload Foi Realizado'
      />
    </div>
  );
};

export default TaskDetailsUploads;
