import React from 'react';

import ContentHeaderContainer from 'components/ContentHeader/ContentHeaderContainer';

import NewTaskButtonContainer from './NewTaskButton/NewTaskButtonContainer';
import EditTaskModalContainer from './EditTaskModal/EditTaskModalContainer';
import NewTaskModalContainer from './NewTaskModal/NewTaskModalContainer';
import TasksTableContainer from './TasksTable/TasksTableContainer';

const Tasks = () => {
  return (
    <>
      <ContentHeaderContainer
        title='Tarefas'
        editable={false}
        backIcon={false}
      />

      <div className='contentPage'>
        <NewTaskButtonContainer />
        <NewTaskModalContainer />
        <EditTaskModalContainer />
        <TasksTableContainer />
      </div>
    </>
  );
};

export default Tasks;
