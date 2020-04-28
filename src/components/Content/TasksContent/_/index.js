// CORE LIBS
import React, { useState } from 'react';

// COMPONENTS
import ContentHeader from '../../ContentHeader/Container';
import NewTaskButton from '../NewTaskButton';
import NewTaskModal from '../NewTaskModal/Container';
import EditTaskModal from '../EditTaskModal/Container';
import TasksTable from '../TasksTable/Container';

/**
 * Task Content.
 * This component is responsible for displaying task content.
 */
const TaskContent = () => {
  // HOOKS
  // new task modal visibility hook
  const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
  // edit task modal visibility hook
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  // edit task modal initial values hook
  const [editTaskModalValues, setEditTaskModalValues] = useState({
    uuid: null,
    name: null,
    description: null,
  });

  // FUNCTIONS
  // show new task modal function
  const showNewTaskModal = () => {
    setNewTaskModalVisible(true);
  };
  // hide new task modal function
  const hideNewTaskModal = () => {
    setNewTaskModalVisible(false);
  };
  // show edit task modal function
  const showEditTaskModal = (taskValues) => {
    // creating task initial values object
    const taskInitialValues = {
      uuid: taskValues.uuid,
      name: taskValues.name,
      description: taskValues.description,
    };

    // setting task initial values
    setEditTaskModalValues(taskInitialValues);

    // showing edit task modal
    setEditTaskModalVisible(true);
  };
  // hide edit task modal function
  const hideEditTaskModal = () => {
    setEditTaskModalVisible(false);
  };

  // RENDER
  return (
    // fragment container
    <>
      {/* content header */}
      <ContentHeader title='Tarefas' editable={false} />
      {/* div content page container */}
      <div className='contentPage'>
        {/* new task button */}
        <NewTaskButton disabled={false} handleClick={showNewTaskModal} />
        {/* new task modal */}
        <NewTaskModal
          visible={newTaskModalVisible}
          handleCloseModal={hideNewTaskModal}
        />
        {/* edit task modal */}
        <EditTaskModal
          visible={editTaskModalVisible}
          initialValues={editTaskModalValues}
          handleCloseModal={hideEditTaskModal}
        />
        {/* render tasks table or tasks empty */}
        <TasksTable handleClickEdit={(record) => showEditTaskModal(record)} />
      </div>
    </>
  );
};

// EXPORT
export default TaskContent;
