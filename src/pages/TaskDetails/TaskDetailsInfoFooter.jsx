import React from 'react';
import PropTypes from 'prop-types';

import { UserInfoContainer } from 'containers';

const TaskDetailsInfoFooter = ({ hasEditedSomething }) => {
  return (
    <div className='task-details-page-content-info-footer'>
      <UserInfoContainer
        className='task-details-page-content-info-footer-task-creator'
        avatarBackground='#1890ff'
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
