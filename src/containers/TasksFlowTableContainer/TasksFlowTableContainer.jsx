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
import { TasksFlowEmptyPlaceholder } from 'components/EmptyPlaceholders';

import { useIsLoading } from 'hooks';

const TasksFlowTableContainer = ({ onSelectRow, selectedRows }) => {
  const dispatch = useDispatch();

  const tasksFlowData = useSelector(getTemplates);
  const isLoading = useIsLoading(
    TEMPLATES_TYPES.FETCH_TEMPLATES_REQUEST,
    TEMPLATES_TYPES.DELETE_TEMPLATE_REQUEST
  );

  const handleTaskFlowDelete = (tasksFlowId) => {
    dispatch(deleteTemplateRequest([tasksFlowId]));
  };

  useEffect(() => {
    dispatch(fetchTemplatesRequest());
  }, [dispatch]);

  return isLoading || (tasksFlowData && tasksFlowData.length > 0) ? (
    <TasksFlowTable
      isLoading={isLoading}
      onDelete={handleTaskFlowDelete}
      tasksFlowData={tasksFlowData}
      onSelectRow={onSelectRow}
      selectedRows={selectedRows}
    />
  ) : (
    <TasksFlowEmptyPlaceholder />
  );
};

TasksFlowTableContainer.propTypes = {
  onSelectRow: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TasksFlowTableContainer;
