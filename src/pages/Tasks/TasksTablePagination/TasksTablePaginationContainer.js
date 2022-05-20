import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPaginatedTasks, getPageSize, getTotalTasks } from 'store/tasks';

import TasksTablePagination from './index';

const TasksTablePaginationContainer = () => {
  const dispatch = useDispatch();

  const size = useSelector(getPageSize);
  const totalTasks = useSelector(getTotalTasks);

  const handleFetchPaginatedTasks = (page, size) => {
    dispatch(fetchPaginatedTasks(page, size));
  };

  return totalTasks > size ? (
    <TasksTablePagination
      pageSize={size}
      total={totalTasks}
      onChange={handleFetchPaginatedTasks}
    />
  ) : null;
};

export default TasksTablePaginationContainer;
