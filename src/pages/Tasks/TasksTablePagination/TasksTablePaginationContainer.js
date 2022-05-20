import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPaginatedTasks, getPageSize, getTotalTasks } from 'store/tasks';

import TasksTablePagination from './index';

const TasksTablePaginationContainer = () => {
  const dispatch = useDispatch();

  const sizePage = useSelector(getPageSize);
  const totalTasks = useSelector(getTotalTasks);

  const handleFetchPaginatedTasks = (page, sizePage) => {
    dispatch(fetchPaginatedTasks(page, sizePage));
  };

  return totalTasks > sizePage ? (
    <TasksTablePagination
      pageSize={sizePage}
      total={totalTasks}
      onChange={handleFetchPaginatedTasks}
    />
  ) : null;
};

export default TasksTablePaginationContainer;
