import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPaginatedTasks, getPageSize, getTotalTasks } from 'store/tasks';

import TasksTablePagination from './index';

const TasksTablePaginationContainer = () => {
  const dispatch = useDispatch();

  const pageSize = useSelector(getPageSize);
  const totalTasks = useSelector(getTotalTasks);

  const handleFetchPaginatedTasks = (page, pageSize) => {
    dispatch(fetchPaginatedTasks(page, pageSize));
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
