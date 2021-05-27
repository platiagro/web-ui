import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Tooltip, Tag } from 'antd';
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { TASK_CATEGORIES } from 'configs';

const FORM_IDS = {
  DESCRIPTION: 'description',
  CATEGORY: 'category',
  INPUT_DATA: 'inputData',
  OUTPUT_DATA: 'outputData',
  SEARCH_TAGS: 'tags',
  DOCUMENTATION: 'documentation',
};

const TaskDetailsForm = ({ setHasEditedSomething, handleUpdateTaskData }) => {
  const descriptionRef = useRef(null);
  const inputDataRef = useRef(null);
  const outputDataRef = useRef(null);
  const documentationRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSearchTags, setSelectedSearchTags] = useState([]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const getValueByFieldId = (fieldId) => {
    switch (fieldId) {
      case FORM_IDS.DESCRIPTION: {
        return descriptionRef.current.state.value || '';
      }

      case FORM_IDS.CATEGORY: {
        return selectedCategory;
      }

      case FORM_IDS.INPUT_DATA: {
        return inputDataRef.current.state.value || '';
      }

      case FORM_IDS.OUTPUT_DATA: {
        return outputDataRef.current.state.value || '';
      }

      case FORM_IDS.SEARCH_TAGS: {
        return selectedSearchTags;
      }

      case FORM_IDS.DOCUMENTATION: {
        return documentationRef.current.state.value || '';
      }
    }
  };

  const handleSaveDataWhenLooseFocus = (fieldId) => () => {
    setHasEditedSomething(true);
    const value = getValueByFieldId(fieldId);
    handleUpdateTaskData(fieldId, value);
  };

  return (
    <div className='task-details-page-content-form'>
      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor={FORM_IDS.DESCRIPTION}
        >
          Descrição
        </label>

        <Input
          className='task-details-page-content-form-field-input task-details-page-input-style'
          ref={descriptionRef}
          type='text'
          size='large'
          id={FORM_IDS.DESCRIPTION}
          onBlur={handleSaveDataWhenLooseFocus(FORM_IDS.DESCRIPTION)}
          placeholder='Adicionar Descrição'
        />
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor={FORM_IDS.CATEGORY}
        >
          Categoria
        </label>

        <Select
          className='task-details-page-content-form-field-input task-details-page-input-style'
          id={FORM_IDS.CATEGORY}
          onBlur={handleSaveDataWhenLooseFocus(FORM_IDS.CATEGORY)}
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
          htmlFor={FORM_IDS.INPUT_DATA}
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
          id={FORM_IDS.INPUT_DATA}
          onBlur={handleSaveDataWhenLooseFocus(FORM_IDS.INPUT_DATA)}
          placeholder='Adicionar dados de entrada'
        />
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor={FORM_IDS.OUTPUT_DATA}
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
          id={FORM_IDS.OUTPUT_DATA}
          onBlur={handleSaveDataWhenLooseFocus(FORM_IDS.OUTPUT_DATA)}
          placeholder='Adicionar dados de saída'
        />
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor={FORM_IDS.SEARCH_TAGS}
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
          id={FORM_IDS.SEARCH_TAGS}
          onBlur={handleSaveDataWhenLooseFocus(FORM_IDS.SEARCH_TAGS)}
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
          htmlFor={FORM_IDS.DOCUMENTATION}
        >
          Documentação
        </label>

        <Input.TextArea
          className='task-details-page-content-form-field-input task-details-page-input-style'
          ref={documentationRef}
          id={FORM_IDS.DOCUMENTATION}
          onBlur={handleSaveDataWhenLooseFocus(FORM_IDS.DOCUMENTATION)}
          placeholder='Adicionar documentação'
          autoSize
        />
      </div>
    </div>
  );
};

TaskDetailsForm.propTypes = {
  setHasEditedSomething: PropTypes.func.isRequired,
  handleUpdateTaskData: PropTypes.func.isRequired,
};

export default TaskDetailsForm;
