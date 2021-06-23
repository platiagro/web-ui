import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { TasksFlowTable } from 'components';
import {
  fetchTemplatesRequest,
  deleteTemplateRequest,
} from 'store/templates/templates.actions';
import { getTemplates } from 'store/templates/templates.selectors';
import * as TEMPLATES_TYPES from 'store/templates/templates.actionTypes';

import { useIsLoading } from 'hooks';

const TasksFlowTableContainer = ({ onSelectRow }) => {
  const dispatch = useDispatch();

  const tasksFlowData = useSelector(getTemplates);
  const isLoading = useIsLoading(
    TEMPLATES_TYPES.FETCH_TEMPLATES_REQUEST,
    TEMPLATES_TYPES.DELETE_TEMPLATE_REQUEST
  );

  const handleTaskFlowDelete = (tasksFlowId) => {
    dispatch(deleteTemplateRequest(tasksFlowId));
  };

  useEffect(() => {
    dispatch(fetchTemplatesRequest());
  }, [dispatch]);

  return (
    <TasksFlowTable
      isLoading={isLoading}
      onDelete={handleTaskFlowDelete}
      tasksFlowData={tasksFlowData}
      onSelectRow={onSelectRow}
    />
  );
};

TasksFlowTableContainer.propTypes = {
  onSelectRow: PropTypes.func.isRequired,
};

export default TasksFlowTableContainer;
