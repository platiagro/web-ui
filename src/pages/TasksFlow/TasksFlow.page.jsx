import React from 'react';

import ContentHeaderContainer from 'components/ContentHeader/ContentHeaderContainer';

const TasksFlow = () => {
  return (
    <>
      <ContentHeaderContainer
        title='Fluxo de Tarefas'
        editable={false}
        backIcon={false}
      />

      <div className='contentPage'>Tasks Flow Table</div>
    </>
  );
};

export default TasksFlow;
