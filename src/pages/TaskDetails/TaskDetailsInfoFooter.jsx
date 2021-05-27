import React from 'react';
import { Avatar } from 'antd';

const TaskDetailsInfoFooter = () => {
  return (
    <div className='task-details-page-content-info-footer'>
      <div className='task-details-page-content-info-footer-task-creator'>
        <Avatar>UA</Avatar>
        <span>Usuário Anônimo</span>
      </div>

      <div className='task-details-page-content-info-footer-task-modified'>
        Modificada
      </div>
    </div>
  );
};

export default TaskDetailsInfoFooter;
