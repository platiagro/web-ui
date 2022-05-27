import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPaginatedTasks,
  getPageSize,
  getTotalTasks,
  getActualPage,
} from 'store/tasks';

import TasksTablePagination from './index';

const TasksTablePaginationContainer = () => {
  const dispatch = useDispatch();

  const pageSize = useSelector(getPageSize);
  const totalTasks = useSelector(getTotalTasks);
  const actualPage = useSelector(getActualPage);

  const handleFetchPaginatedTasks = (page, size) => {
    dispatch(fetchPaginatedTasks(page, size));
  };

  const handleSizeChange = (size) => {
    dispatch(fetchPaginatedTasks(1, size));
  };

  return totalTasks > pageSize ? (
    <TasksTablePagination
      pageSize={pageSize}
      total={totalTasks}
      page={actualPage}
      onChange={handleFetchPaginatedTasks}
      onSizeChange={handleSizeChange}
    />
  ) : null;
};

export default TasksTablePaginationContainer;
