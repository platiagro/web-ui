// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import TasksEmpty from '../TasksEmpty';
import NewTaskButton from '../NewTaskButton';
import NewTaskModal from '../NewTaskModal';
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
  const [editTaskModalValues, setEditTaskModalValues] = useState(false);

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
  const showEditTaskModal = () => {
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
      handleClickEdit={(uuid) => alert(`Edit ${uuid}`)}
      handleClickDelete={(uuid) => alert(`Delete ${uuid}`)}
    />
  );

  // RENDER
  return (
    // div container
    <div>
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
      {/* <EditTaskModal
        visible={editTaskModalVisible}
        handleCloseModal={hideEditTaskModal}
        handleEditTask={(taskValues) =>
          alert(
            `Edit ${taskValues.uuid} ${taskValues.name}, ${taskValues.description}`
            // eslint-disable-next-line
          )}
      /> */}
      {/* render tasks table or tasks empty */}
      {tasks.length > 0 ? renderTasksTable() : renderTasksEmpty()}
    </div>
  );
};

// EXPORT
export default TaskContent;
