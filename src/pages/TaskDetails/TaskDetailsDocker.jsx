import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import { DockerIconComponent } from 'assets';

const FIELD_IDS = {
  IMAGE_URL: 'IMAGE_URL',
  COMMANDS: 'COMMANDS',
  ARGUMENTS: 'ARGUMENTS',
};

const FIELD_ID_TO_FIELD_NAME = {
  IMAGE_URL: 'image',
  COMMANDS: 'commands',
  ARGUMENTS: 'arguments',
};

const URLS = {
  ENTRYPOINT: 'https://docs.docker.com/engine/reference/builder/#entrypoint',
  CMD: 'https://docs.docker.com/engine/reference/builder/#cmd',
};

const TaskDetailsDocker = ({ taskData, handleUpdateTaskData }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [commands, setCommands] = useState('');
  const [args, setArgs] = useState('');

  const getNewValueByFieldId = (fieldId) => {
    switch (fieldId) {
      case FIELD_IDS.IMAGE_URL:
        return imageUrl.trim();

      case FIELD_IDS.COMMANDS:
        return commands.trim().split(' ');

      case FIELD_IDS.ARGUMENTS:
        return args.trim().split(' ');

      default:
        return undefined;
    }
  };

  const getOldValueByFieldId = (fieldId) => {
    switch (fieldId) {
      case FIELD_IDS.IMAGE_URL:
        return taskData.image;

      case FIELD_IDS.COMMANDS:
        return taskData.commands || [];

      case FIELD_IDS.ARGUMENTS:
        return taskData.arguments || [];

      default:
        return undefined;
    }
  };

  const handleCompareNewAndOldValues = (fieldId, oldValue, newValue) => {
    switch (fieldId) {
      case FIELD_IDS.IMAGE_URL:
        return oldValue === newValue;

      case FIELD_IDS.COMMANDS:
      case FIELD_IDS.ARGUMENTS: {
        const hasTheSameLength = oldValue.length === newValue.length;
        const isIdentical = oldValue.every((val) => newValue.includes(val));
        console.log(hasTheSameLength, isIdentical);
        return hasTheSameLength && isIdentical;
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
      newValue,
      oldValue
    );

    if (isOldValueEqualsNewValue) return;
    const fieldName = FIELD_ID_TO_FIELD_NAME[fieldId];
    handleUpdateTaskData(fieldName, newValue);
  };

  useEffect(() => {
    if (taskData) {
      setImageUrl(taskData.image || '');
      setCommands((taskData.commands || []).join(' '));
      setArgs((taskData.arguments || []).join(' '));
    }
  }, [taskData]);

  return (
    <div className='task-details-page-content-info-docker'>
      <div className='task-details-page-content-info-docker-form'>
        <div className='task-details-page-content-info-docker-form-icon'>
          <DockerIconComponent />
        </div>

        <div className='task-details-page-content-info-docker-field'>
          <label
            className='task-details-page-content-info-docker-field-label'
            htmlFor={FIELD_IDS.IMAGE_URL}
          >
            <span>Imagem</span>
            <span className='optional-label'>(Opcional)</span>
          </label>

          <Input
            className='task-details-page-content-info-docker-field-input'
            type='text'
            size='middle'
            value={imageUrl}
            id={FIELD_IDS.IMAGE_URL}
            onChange={(e) => setImageUrl(e.target.value)}
            onBlur={handleSaveDataWhenLooseFocus(FIELD_IDS.IMAGE_URL)}
            placeholder='Adicionar Imagem'
          />
        </div>

        <div className='task-details-page-content-info-docker-field'>
          <label
            className='task-details-page-content-info-docker-field-label'
            htmlFor={FIELD_IDS.COMMANDS}
          >
            <span>Comandos</span>
            <span className='optional-label'>(Opcional)</span>
          </label>

          <Input
            className='task-details-page-content-info-docker-field-input'
            type='text'
            size='middle'
            value={commands}
            id={FIELD_IDS.COMMANDS}
            onChange={(e) => setCommands(e.target.value)}
            onBlur={handleSaveDataWhenLooseFocus(FIELD_IDS.COMMANDS)}
            placeholder='Adicionar Comandos'
          />
        </div>

        <div className='task-details-page-content-info-docker-field'>
          <label
            className='task-details-page-content-info-docker-field-label'
            htmlFor={FIELD_IDS.ARGUMENTS}
          >
            <span>Argumentos</span>
            <span className='optional-label'>(Opcional)</span>
          </label>

          <Input
            className='task-details-page-content-info-docker-field-input'
            type='text'
            size='middle'
            value={args}
            id={FIELD_IDS.ARGUMENTS}
            onChange={(e) => setArgs(e.target.value)}
            onBlur={handleSaveDataWhenLooseFocus(FIELD_IDS.ARGUMENTS)}
            placeholder='Adicionar Argumentos'
          />
        </div>
      </div>

      <div className='task-details-page-content-info-docker-explanation'>
        <span>Os comandos estão associados à instrução </span>
        <Link to={URLS.ENTRYPOINT} target='_blank' referrerPolicy='no-referrer'>
          ENTRYPOINT
        </Link>
        <span> e os argumentos à instrução </span>
        <Link to={URLS.CMD} target='_blank' referrerPolicy='no-referrer'>
          CMD
        </Link>
        <span> do Docker.</span>
      </div>
    </div>
  );
};

TaskDetailsDocker.propTypes = {
  taskData: PropTypes.object.isRequired,
  handleUpdateTaskData: PropTypes.func.isRequired,
};

export default TaskDetailsDocker;
