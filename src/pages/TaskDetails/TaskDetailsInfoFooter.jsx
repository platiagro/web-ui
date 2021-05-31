import React from 'react';
import PropTypes from 'prop-types';

import { UserInfo } from 'components';

const TaskDetailsInfoFooter = ({ hasEditedSomething }) => {
  return (
    <div className='task-details-page-content-info-footer'>
      <UserInfo
        className='task-details-page-content-info-footer-task-creator'
        avatarBackground='#1890ff'
        name='Usuário Anônimo'
      />

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
