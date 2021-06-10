import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Tooltip, Tag } from 'antd';
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { TASK_CATEGORIES_WITHOUT_TEMPLATES } from 'configs';

const FIELD_IDS = {
  DESCRIPTION: 'DESCRIPTION',
  CATEGORY: 'CATEGORY',
  INPUT_DATA: 'INPUT_DATA',
  OUTPUT_DATA: 'OUTPUT_DATA',
  SEARCH_TAGS: 'SEARCH_TAGS',
  DOCUMENTATION: 'DOCUMENTATION',
};

const FIELD_ID_TO_FIELD_NAME = {
  DESCRIPTION: 'description',
  CATEGORY: 'tags', // TODO: Put 'category' here when the backend accepts a category
  INPUT_DATA: 'inputData',
  OUTPUT_DATA: 'outputData',
  SEARCH_TAGS: 'tags',
  DOCUMENTATION: 'documentation',
};

const TaskDetailsForm = ({ taskData, handleUpdateTaskData }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(undefined);
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [searchTags, setSearchTags] = useState([]);
  const [documentation, setDocumentation] = useState('');

  const getNewValueByFieldId = (fieldId) => {
    switch (fieldId) {
      case FIELD_IDS.DESCRIPTION:
        return description.trim();

      // TODO: Return only the category when the backend accepts a category
      case FIELD_IDS.CATEGORY:
        return [category];

      case FIELD_IDS.INPUT_DATA:
        return inputData.trim();

      case FIELD_IDS.OUTPUT_DATA:
        return outputData.trim();

      case FIELD_IDS.SEARCH_TAGS:
        return searchTags.trim();

      case FIELD_IDS.DOCUMENTATION:
        return documentation.trim();

      default:
        return undefined;
    }
  };

  const getOldValueByFieldId = (fieldId) => {
    switch (fieldId) {
      case FIELD_IDS.DESCRIPTION:
        return taskData.description;

      // TODO: Return the category when the backend accepts a category
      case FIELD_IDS.CATEGORY:
        return taskData.tags;

      case FIELD_IDS.INPUT_DATA:
        return taskData.inputData;

      case FIELD_IDS.OUTPUT_DATA:
        return taskData.outputData;

      case FIELD_IDS.SEARCH_TAGS:
        return taskData.searchTags;

      case FIELD_IDS.DOCUMENTATION:
        return taskData.documentation;

      default:
        return undefined;
    }
  };

  const handleCompareNewAndOldValues = (fieldId, oldValue, newValue) => {
    switch (fieldId) {
      case FIELD_IDS.INPUT_DATA:
      case FIELD_IDS.DESCRIPTION:
      case FIELD_IDS.OUTPUT_DATA:
      case FIELD_IDS.DOCUMENTATION:
        return oldValue === newValue;

      case FIELD_IDS.SEARCH_TAGS: {
        const hasTheSameLength = oldValue.length === newValue.length;
        const isIdentical = oldValue.every((tag) => newValue.includes(tag));
        return hasTheSameLength || isIdentical;
      }

      case FIELD_IDS.CATEGORY: {
        return oldValue.some((tag) => newValue.includes(tag));
      }

      default:
        return true;
    }
  };

  const handleSaveDataWhenLooseFocus = (fieldId) => () => {
    const newValue = getNewValueByFieldId(fieldId);
    const oldValue = getOldValueByFieldId(fieldId);
    const isOldValueEqualsNewValue = handleCompareNewAndOldValues(
      fieldId,
      oldValue,
      newValue
    );

    // Prevent making the update request if the user didn't change anything
    if (isOldValueEqualsNewValue) return;

    const fieldName = FIELD_ID_TO_FIELD_NAME[fieldId];
    handleUpdateTaskData(fieldName, newValue);
  };

  useEffect(() => {
    if (taskData) {
      setDescription(taskData.description);

      // TODO: Use taskData.category here when the backend accepts a category
      setCategory(taskData?.tags.length ? taskData.tags[0] : undefined);

      setInputData(taskData.inputData);
      setOutputData(taskData.outputData);
      setSearchTags(taskData.tags);
      setDocumentation(taskData.documentation);
    }
  }, [taskData]);

  return (
    <div className='task-details-page-content-form'>
      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor={FIELD_IDS.DESCRIPTION}
        >
          Descrição
        </label>

        <Input
          className='task-details-page-content-form-field-input task-details-page-input-style'
          type='text'
          size='large'
          value={description}
          id={FIELD_IDS.DESCRIPTION}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleSaveDataWhenLooseFocus(FIELD_IDS.DESCRIPTION)}
          placeholder='Adicionar Descrição'
        />
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor={FIELD_IDS.CATEGORY}
        >
          Categoria
        </label>

        <Select
          className='task-details-page-content-form-field-input task-details-page-input-style'
          id={FIELD_IDS.CATEGORY}
          onBlur={handleSaveDataWhenLooseFocus(FIELD_IDS.CATEGORY)}
          size='large'
          value={category}
          onChange={setCategory}
          placeholder='Selecionar Categoria'
        >
          {Object.values(TASK_CATEGORIES_WITHOUT_TEMPLATES).map(
            (categoryOption) => {
              return (
                <Select.Option
                  key={categoryOption.key}
                  value={categoryOption.key}
                >
                  {categoryOption.name}
                </Select.Option>
              );
            }
          )}
        </Select>
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor={FIELD_IDS.INPUT_DATA}
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
          type='text'
          size='large'
          value={inputData}
          id={FIELD_IDS.INPUT_DATA}
          onChange={(e) => setInputData(e.target.value)}
          onBlur={handleSaveDataWhenLooseFocus(FIELD_IDS.INPUT_DATA)}
          placeholder='Adicionar dados de entrada'
        />
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor={FIELD_IDS.OUTPUT_DATA}
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
          type='text'
          size='large'
          value={outputData}
          id={FIELD_IDS.OUTPUT_DATA}
          onChange={(e) => setOutputData(e.target.value)}
          onBlur={handleSaveDataWhenLooseFocus(FIELD_IDS.OUTPUT_DATA)}
          placeholder='Adicionar dados de saída'
        />
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor={FIELD_IDS.SEARCH_TAGS}
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
          id={FIELD_IDS.SEARCH_TAGS}
          onBlur={handleSaveDataWhenLooseFocus(FIELD_IDS.SEARCH_TAGS)}
          value={searchTags}
          onChange={setSearchTags}
          placeholder='Adicionar tags de busca'
          tagRender={({ label, ...otherTagProps }) => {
            return (
              <Tag
                {...otherTagProps}
                color='blue'
                closeIcon={<CloseOutlined style={{ color: '#1890ff' }} />}
                closable={false} // TODO: Make this field closable removing this prop when the backend accepts custom tags
              >
                {label}
              </Tag>
            );
          }}
          disabled // TODO: Enable this field when the backend accepts custom tags
        />
      </div>

      <div className='task-details-page-content-form-field'>
        <label
          className='task-details-page-content-form-field-label'
          htmlFor={FIELD_IDS.DOCUMENTATION}
        >
          Documentação
        </label>

        <Input.TextArea
          className='task-details-page-content-form-field-input task-details-page-input-style'
          id={FIELD_IDS.DOCUMENTATION}
          value={documentation}
          onChange={(e) => setDocumentation(e.target.value)}
          onBlur={handleSaveDataWhenLooseFocus(FIELD_IDS.DOCUMENTATION)}
          placeholder='Adicionar documentação'
          autoSize
        />
      </div>
    </div>
  );
};

TaskDetailsForm.propTypes = {
  taskData: PropTypes.object.isRequired,
  handleUpdateTaskData: PropTypes.func.isRequired,
};

export default TaskDetailsForm;
