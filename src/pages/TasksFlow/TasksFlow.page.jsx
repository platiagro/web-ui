import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ContentHeaderContainer from 'components/ContentHeader/ContentHeaderContainer';
import DeleteTemplatesButton from './DeleteTemplatesButton';
import { TasksFlowTableContainer } from 'containers';
import { deleteTemplateRequest } from 'store/templates/templates.actions';

const TasksFlow = () => {
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);

  const onDeleteRows = () => {
    setSelectedRows([]);
    dispatch(deleteTemplateRequest(selectedRows));
  };

  return (
    <>
      <ContentHeaderContainer
        title='Fluxo de Tarefas'
        editable={false}
        backIcon={false}
      />

      <div className='contentPage'>
        {selectedRows.length > 0 && (
          <>
            <DeleteTemplatesButton onDelete={onDeleteRows} />
          </>
        )}
        <TasksFlowTableContainer
          selectedRows={selectedRows}
          onSelectRow={setSelectedRows}
        />
      </div>
    </>
  );
};

export default TasksFlow;
