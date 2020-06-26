// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { fetchPaginatedTasks } from '../../../../store/tasks/actions';

// COMPONENTS
import TasksTablePagination from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchPaginatedTasks: (page, pageSize) => {
      dispatch(fetchPaginatedTasks(page, pageSize));
    },
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    currentPage: state.tasks.currentPage,
    pageSize: state.tasks.pageSize,
    totalTasks: state.tasks.totalTasks,
  };
};

/**
 * Tasks Table Pagination Container.
 * This component is responsible for create a logic container for tasks table pagination
 * with redux.
 */
const TasksTablePaginationContainer = (props) => {
  // states
  const { pageSize, totalTasks } = props;
  // dispatchs
  const { handleFetchPaginatedTasks } = props;

  // RENDER
  return (
    <>
      {totalTasks > pageSize ? (
        <TasksTablePagination
          pageSize={pageSize}
          total={totalTasks}
          onChange={handleFetchPaginatedTasks}
        />
      ) : null}
    </>
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksTablePaginationContainer);
