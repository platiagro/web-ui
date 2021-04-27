export const containerStateSelector = ({ tasksReducer }) => {
  return tasksReducer.containerState;
};

export const editModalIsVisibleSelector = ({ tasksReducer }) => {
  return tasksReducer.editModalIsVisible;
};

export const errorMessageSelector = ({ tasksReducer }) => {
  return tasksReducer.errorMessage;
};

export const modalIsVisibleSelector = ({ tasksReducer }) => {
  return tasksReducer.modalIsVisible;
};

export const modalValidateStatusSelector = ({ tasksReducer }) => {
  return tasksReducer.modalValidateStatus;
};

export const newTaskRecordSelector = ({ tasksReducer }) => {
  return tasksReducer.newTaskRecord;
};

export const pageSizeSelector = ({ tasksReducer }) => {
  return tasksReducer.pageSize;
};

export const tasksSelector = ({ tasksReducer }) => {
  return tasksReducer.tasks;
};

export const totalTasksSelector = ({ tasksReducer }) => {
  return tasksReducer.totalTasks;
};
