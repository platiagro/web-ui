import React from 'react';
import PropTypes from 'prop-types';
import { CodeTwoTone } from '@ant-design/icons';

import { TaskTemplateItem } from 'components';
import { ReactComponent as DockerIcon } from 'assets/dockerIcon.svg';

const NewTaskDefaultTemplates = ({
  handleCreateBlankTask,
  handleCreateDockerTask,
}) => {
  return (
    <>
      <div className='new-task-page-content-panels-left-title'>
        <CodeTwoTone twoToneColor='#a9a9a9' />
        <span>Faça Você Mesmo(a)</span>
      </div>

      <div className='new-task-page-content-panels-left-list'>
        <TaskTemplateItem
          className='new-task-page-content-panels-left-item'
          handleClickButton={handleCreateBlankTask}
          buttonText='Criar Tarefa'
          title='Em Branco'
          description='Crie a tarefa a partir de um template contendo a estrutura necessária para funcionamento na PlatIAgro ou faça upload do seu Notebook Jupyter.'
        />

        <TaskTemplateItem
          className='new-task-page-content-panels-left-item'
          handleClickButton={handleCreateDockerTask}
          titleComponent={<DockerIcon />}
          buttonText='Criar Tarefa'
          description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
        />
      </div>
    </>
  );
};

NewTaskDefaultTemplates.propTypes = {
  handleCreateBlankTask: PropTypes.func.isRequired,
  handleCreateDockerTask: PropTypes.func.isRequired,
};

export default NewTaskDefaultTemplates;
