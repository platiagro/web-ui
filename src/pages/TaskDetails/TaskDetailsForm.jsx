import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Tooltip, Tag } from 'antd';
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { TASK_CATEGORIES } from 'configs';

const TaskDetailsForm = ({ setHasEditedSomething }) => {
  const descriptionRef = useRef(null);
  const inputDataRef = useRef(null);
  const outputDataRef = useRef(null);
  const documentationRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSearchTags, setSelectedSearchTags] = useState([]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasEditedSomething(true);
  };

  return (
    <form
      className='task-details-page-content-form'
      onSubmit={handleSubmit}
      noValidate
    >
      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor='description'
        >
          Descrição
        </label>

        <Input
          className='task-details-page-content-form-field-input task-details-page-input-style'
          ref={descriptionRef}
          type='text'
          size='large'
          id='description'
          placeholder='Adicionar Descrição'
        />
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor='category'
        >
          Categoria
        </label>

        <Select
          className='task-details-page-content-form-field-input task-details-page-input-style'
          id='category'
          size='large'
          value={selectedCategory}
          onChange={handleSelectCategory}
          placeholder='Selecionar Categoria'
        >
          {Object.values(TASK_CATEGORIES).map((category) => {
            return (
              <Select.Option key={category.key} value={category.key}>
                {category.name}
              </Select.Option>
            );
          })}
        </Select>
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor='inputData'
        >
          <span>Dados de Entrada</span>

          <Tooltip
            title='Descrição dos dados de entrada da tarefa. Exemplo: “Arquivo .csv com dados tabulares (um atributo por coluna), sem cabeçalho”'
            placement='right'
          >
            <QuestionCircleOutlined />
          </Tooltip>
        </label>

        <Input
          className='task-details-page-content-form-field-input task-details-page-input-style'
          ref={inputDataRef}
          type='text'
          size='large'
          id='inputData'
          placeholder='Adicionar dados de entrada'
        />
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor='outputData'
        >
          <span>Dados de Saída</span>
          <Tooltip
            title='Descrição dos dados de saída da tarefa. Exemplo: “Conjunto de dados em formato de matriz, com uma amostra por linha”'
            placement='right'
          >
            <QuestionCircleOutlined />
          </Tooltip>
        </label>

        <Input
          className='task-details-page-content-form-field-input task-details-page-input-style'
          ref={outputDataRef}
          type='text'
          size='large'
          id='outputData'
          placeholder='Adicionar dados de saída'
        />
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor='searchTags'
        >
          <span>Tags de Busca</span>

          <Tooltip
            title='As tags facilitam a busca de tarefas. Escolha e escreva palavras-chave e depois aperte a tecla ENTER ou TAB para adicionar a tag.'
            placement='right'
          >
            <QuestionCircleOutlined />
          </Tooltip>
        </label>

        <Select
          className='task-details-page-content-form-field-input task-details-page-input-style'
          mode='tags'
          size='large'
          id='searchTags'
          value={selectedSearchTags}
          onChange={setSelectedSearchTags}
          placeholder='Adicionar tags de busca'
          tagRender={({ label, ...otherTagProps }) => {
            return (
              <Tag
                {...otherTagProps}
                color='blue'
                closeIcon={<CloseOutlined style={{ color: '#1890ff' }} />}
              >
                {label}
              </Tag>
            );
          }}
        />
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor='documentation'
        >
          Documentação
        </label>

        <Input.TextArea
          className='task-details-page-content-form-field-input task-details-page-input-style'
          ref={documentationRef}
          id='documentation'
          placeholder='Adicionar documentação'
          autoSize
        />
      </div>
    </form>
  );
};

TaskDetailsForm.propTypes = {
  setHasEditedSomething: PropTypes.func.isRequired,
};

export default TaskDetailsForm;
