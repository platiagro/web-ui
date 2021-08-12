import {
  getPageSize,
  getTaskData,
  getTasks,
  getTotalTasks,
} from '../tasks.selectors';

describe('Tasks Selectors', () => {
  const tasksReducer = {
    tasks: [{ uuid: '1' }],
    pageSize: 1,
    totalTasks: 1,
    taskData: {
      uuid: '1',
    },
  };

  it('should return the page size from the reducer state', () => {
    expect(getPageSize({ tasksReducer })).toBe(tasksReducer.pageSize);
  });

  it('should return the task data from the reducer state', () => {
    expect(getTaskData({ tasksReducer })).toBe(tasksReducer.taskData);
  });

  it('should return the tasks from the reducer state', () => {
    expect(getTasks({ tasksReducer })).toBe(tasksReducer.tasks);
  });

  it('should return the total of tasks from the reducer state', () => {
    expect(getTotalTasks({ tasksReducer })).toBe(tasksReducer.totalTasks);
  });
});
