import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPaginatedTasks,
  pageSizeSelector,
  totalTasksSelector,
} from 'store/tasks';

import TasksTablePagination from './index';

const TasksTablePaginationContainer = () => {
  const dispatch = useDispatch();

  const pageSize = useSelector(pageSizeSelector);
  const totalTasks = useSelector(totalTasksSelector);

  const handleFetchPaginatedTasks = (page, size) => {
    dispatch(fetchPaginatedTasks(page, size));
  };

  return totalTasks > pageSize ? (
    <TasksTablePagination
      pageSize={pageSize}
      total={totalTasks}
      onChange={handleFetchPaginatedTasks}
    />
  ) : null;
};

export default TasksTablePaginationContainer;
