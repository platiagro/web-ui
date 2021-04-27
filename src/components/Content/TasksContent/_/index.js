import React from 'react';

import ContentHeaderContainer from 'components/ContentHeader/_/ContentHeaderContainer';

import EditTaskModalContainer from '../EditTaskModal/EditTaskModalContainer';
import TasksTableContainer from '../TasksTable/TasksTableContainer';
import NewTaskButton from '../NewTaskButton/Container';
import NewTaskModal from '../NewTaskModal/Container';

const TaskContent = () => {
  return (
    <>
      <ContentHeaderContainer
        title='Tarefas'
        editable={false}
        backIcon={false}
      />

      <div className='contentPage'>
        <NewTaskButton />
        <NewTaskModal />
        <EditTaskModalContainer />
        <TasksTableContainer />
      </div>
    </>
  );
};

export default TaskContent;
