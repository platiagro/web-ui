import React from 'react';
import { useHistory } from 'react-router';

import NewTaskButton from './NewTaskButton';
import TasksTableContainer from './TasksTable/TasksTableContainer';
import ContentHeaderContainer from 'components/ContentHeader/ContentHeaderContainer';

const Tasks = () => {
  const history = useHistory();

  const handleOpenNewTaskPage = () => {
    history.push('/nova-tarefa');
  };

  return (
    <div className='tasks-page'>
      <ContentHeaderContainer
        title='Tarefas'
        editable={false}
        backIcon={false}
      />

      <div className='contentPage'>
        <NewTaskButton disabled={false} handleClick={handleOpenNewTaskPage} />
        <TasksTableContainer />
      </div>
    </div>
  );
};

export default Tasks;
