// CORE LIBS
import React from 'react';

// COMPONENTS
import ContentHeader from '../../ContentHeader/Container';
import NewTaskButton from '../NewTaskButton/Container';
import NewTaskModal from '../NewTaskModal/Container';
import EditTaskModal from '../EditTaskModal/Container';
import TasksTable from '../TasksTable/Container';

/**
 * Task Content.
 * This component is responsible for displaying task content.
 */
const TaskContent = () => {
  // RENDER
  return (
    // fragment container
    <>
      {/* content header */}
      <ContentHeader title='Tarefas' editable={false} />
      {/* div content page container */}
      <div className='contentPage'>
        {/* new task button */}
        <NewTaskButton />
        {/* new task modal */}
        <NewTaskModal />
        {/* edit task modal */}
        <EditTaskModal />
        {/* render tasks table or tasks empty */}
        <TasksTable />
      </div>
    </>
  );
};

// EXPORT
export default TaskContent;
