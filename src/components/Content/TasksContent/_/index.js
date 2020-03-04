// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import TasksEmpty from '../TasksEmpty';
import NewTaskButton from '../NewTaskButton';
import NewTaskModal from '../NewTaskModal';

// MOCKS
import templatesMock from '../NewTaskModal/_templatesMock';

/**
 * Task Content.
 * This component is responsible for displaying task content.
 */
const TaskContent = ({ tasks }) => {
  // HOOKS
  // editing hook
  const [modalVisible, setModalVisible] = useState(false);

  // FUNCTIONS
  // show modal function
  const showModal = () => {
    setModalVisible(true);
  };
  // hide modal function
  const hideModal = () => {
    setModalVisible(false);
  };

  // COMPONENTS RENDERS
  // tasks empty
  const renderTasksEmpty = () => <TasksEmpty />;
  // projects table
  // const renderTasksTable = () => (
  //   // <TasksTable tasks={tasks} handleClickProject={(uuid) => alert(uuid)} />
  // );

  // RENDER
  return (
    // div container
    <div>
      {/* new task button */}
      <NewTaskButton disabled={false} handleClick={showModal} />
      {/* new task modal */}
      <NewTaskModal
        visible={modalVisible}
        templates={templatesMock}
        handleCloseModal={hideModal}
        handleNewTask={(taskValues) =>
          alert(
            `${taskValues.name}, ${taskValues.template}, ${taskValues.description}`
            // eslint-disable-next-line
          )}
      />
      {/* render tasks table or tasks empty */}
      {/* {tasks.length > 0 ? renderTasksTable() : renderTasksEmpty()} */}
    </div>
  );
};

// EXPORT
export default TaskContent;
