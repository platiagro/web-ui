export const getContainerState = ({ tasksReducer }) => {
  return tasksReducer.containerState;
};

export const getEditModalIsVisible = ({ tasksReducer }) => {
  return tasksReducer.editModalIsVisible;
};

export const getErrorMessage = ({ tasksReducer }) => {
  return tasksReducer.errorMessage;
};

export const getModalIsVisible = ({ tasksReducer }) => {
  return tasksReducer.modalIsVisible;
};

export const getModalValidateStatus = ({ tasksReducer }) => {
  return tasksReducer.modalValidateStatus;
};

export const getNewTaskRecord = ({ tasksReducer }) => {
  return tasksReducer.newTaskRecord;
};

export const getPageSize = ({ tasksReducer }) => {
  return tasksReducer.pageSize;
};

export const getTasks = ({ tasksReducer }) => {
  return tasksReducer.tasks;
};

export const getTotalTasks = ({ tasksReducer }) => {
  return tasksReducer.totalTasks;
};
