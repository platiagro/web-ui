import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

const TaskDetailsInfoFooter = ({ hasEditedSomething }) => {
  return (
    <div className='task-details-page-content-info-footer'>
      <div className='task-details-page-content-info-footer-task-creator'>
        <Avatar>UA</Avatar>
        <span>Usuário Anônimo</span>
      </div>

      {hasEditedSomething && (
        <div className='task-details-page-content-info-footer-task-modified'>
          Modificada
        </div>
      )}
    </div>
  );
};

TaskDetailsInfoFooter.propTypes = {
  hasEditedSomething: PropTypes.bool.isRequired,
};

export default TaskDetailsInfoFooter;
