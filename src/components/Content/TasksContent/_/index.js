// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import ContentHeader from '../../ContentHeader/Container';
import TasksEmpty from '../TasksEmpty';
import NewTaskButton from '../NewTaskButton';
import NewTaskModal from '../NewTaskModal';
import EditTaskModal from '../EditTaskModal';
import TasksTable from '../TasksTable';

// MOCKS
import templatesMock from '../NewTaskModal/_templatesMock';

/**
 * Task Content.
 * This component is responsible for displaying task content.
 */
const TaskContent = ({ tasks }) => {
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

  // COMPONENTS RENDERS
  // tasks empty
  const renderTasksEmpty = () => <TasksEmpty />;
  // projects table
  const renderTasksTable = () => (
    <TasksTable
      tasks={tasks}
      handleClickTask={(uuid) => alert(uuid)}
      handleClickEdit={(record) => showEditTaskModal(record)}
      handleClickDelete={(uuid) => alert(`Delete ${uuid}`)}
    />
  );

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
          templates={templatesMock}
          handleCloseModal={hideNewTaskModal}
          handleNewTask={(taskValues) =>
            alert(
              `${taskValues.name}, ${taskValues.template}, ${taskValues.description}`
              // eslint-disable-next-line
          )}
        />
        {/* edit task modal */}
        <EditTaskModal
          visible={editTaskModalVisible}
          initialValues={editTaskModalValues}
          handleCloseModal={hideEditTaskModal}
          handleEditTask={(uuid, taskValues) =>
            alert(
              `Edit ${uuid} ${taskValues.name}, ${taskValues.description}`
              // eslint-disable-next-line
          )}
        />
        {/* render tasks table or tasks empty */}
        {tasks.length > 0 ? renderTasksTable() : renderTasksEmpty()}
      </div>
    </>
  );
};

// PROP TYPES
TaskContent.propTypes = {
  /** task content task list */
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT
export default TaskContent;
