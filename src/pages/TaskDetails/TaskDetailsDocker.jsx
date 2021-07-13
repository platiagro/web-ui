import React, { useEffect, useRef, useState } from 'react';
import { Input, message, Radio, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import { DockerIconComponent } from 'assets';

import { useShellAndExecFunctions } from './useShellAndExecFunctions';

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

const INPUT_TYPES = {
  SHELL: 'SHELL',
  EXEC: 'EXEC',
};

const TaskDetailsDocker = ({ taskData, handleUpdateTaskData }) => {
  const isFirstRender = useRef(true);

  const [commandsInputType, setCommandsInputType] = useState(INPUT_TYPES.EXEC);
  const [argsInputType, setArgsInputType] = useState(INPUT_TYPES.EXEC);

  const [imageUrl, setImageUrl] = useState('');
  const [commands, setCommands] = useState('');
  const [args, setArgs] = useState('');

  const {
    transformShellIntoExec,
    transformExecArrayIntoShell,
    transformExecJsonIntoShell,
  } = useShellAndExecFunctions();

  const getNewValueByFieldId = (fieldId) => {
    const fieldValues = {
      [FIELD_IDS.IMAGE_URL]: imageUrl.trim(),
      [FIELD_IDS.COMMANDS]: commands.trim(),
      [FIELD_IDS.ARGUMENTS]: args.trim(),
    };

    return fieldValues[fieldId];
  };

  const getOldValueByFieldId = (fieldId) => {
    switch (fieldId) {
      case FIELD_IDS.IMAGE_URL:
        return taskData.image;

      case FIELD_IDS.COMMANDS:
        return commandsInputType === INPUT_TYPES.SHELL
          ? transformExecArrayIntoShell(taskData.commands || [])
          : JSON.stringify(taskData.commands);

      case FIELD_IDS.ARGUMENTS:
        return argsInputType === INPUT_TYPES.SHELL
          ? transformExecArrayIntoShell(taskData.arguments || [])
          : JSON.stringify(taskData.arguments);

      default:
        return undefined;
    }
  };

  const handleFormatValueToSave = (fieldId, value) => {
    switch (fieldId) {
      case FIELD_IDS.COMMANDS: {
        if (value === '') return [];
        else if (commandsInputType === INPUT_TYPES.SHELL) {
          return JSON.parse(transformShellIntoExec(value));
        }
        return JSON.parse(value);
      }

      case FIELD_IDS.ARGUMENTS: {
        if (value === '') return [];
        else if (argsInputType === INPUT_TYPES.SHELL) {
          return JSON.parse(transformShellIntoExec(value));
        }
        return JSON.parse(value);
      }

      default:
        return value;
    }
  };

  const handleSaveDataWhenLooseFocus = (fieldId) => () => {
    try {
      const newValue = getNewValueByFieldId(fieldId);
      const oldValue = getOldValueByFieldId(fieldId);
      const isOldValueEqualsNewValue = isEqual(newValue, oldValue);
      if (isOldValueEqualsNewValue) return;

      const fieldName = FIELD_ID_TO_FIELD_NAME[fieldId];
      const formattedNewValue = handleFormatValueToSave(fieldId, newValue);
      handleUpdateTaskData(fieldName, formattedNewValue);
    } catch (error) {
      message.error('Erro ao tentar salvar as alterações');
    }
  };

  const showTransformationError = (newInputType) => {
    const newTypeName = newInputType === INPUT_TYPES.SHELL ? 'SHELL' : 'EXEC';
    const oldTypeName = newInputType === INPUT_TYPES.SHELL ? 'EXEC' : 'SHELL';
    message.error(
      `Erro ao converter de ${oldTypeName} para ${newTypeName}. Verifique se o formato está correto`
    );
  };

  const handleChangeCommandsInputType = (event) => {
    try {
      const transformedCommands =
        event.target.value === INPUT_TYPES.SHELL
          ? transformExecJsonIntoShell(commands)
          : transformShellIntoExec(commands);
      setCommandsInputType(event.target.value);
      setCommands(transformedCommands);
    } catch (error) {
      showTransformationError(event.target.value);
    }
  };

  const handleChangeArgumentsInputType = (event) => {
    try {
      const transformedArgs =
        event.target.value === INPUT_TYPES.SHELL
          ? transformExecJsonIntoShell(args)
          : transformShellIntoExec(args);
      setArgsInputType(event.target.value);
      setArgs(transformedArgs);
    } catch (error) {
      showTransformationError(event.target.value);
    }
  };

  useEffect(() => {
    if (taskData && isFirstRender.current) {
      isFirstRender.current = false;
      setImageUrl(taskData.image || '');
      setCommands(taskData.commands ? JSON.stringify(taskData.commands) : '');
      setArgs(taskData.arguments ? JSON.stringify(taskData.arguments) : '');
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

          <Radio.Group
            className='task-details-page-content-info-docker-radio-group'
            name='CommandsInputTypes'
            value={commandsInputType}
            onChange={handleChangeCommandsInputType}
          >
            <Tooltip
              placement='topLeft'
              title='O formato SHELL é uma string. Exemplo: /bin/sh -c'
            >
              <Radio value={INPUT_TYPES.SHELL}>Formato Shell</Radio>
            </Tooltip>

            <Tooltip
              placement='topLeft'
              title='O formato EXEC é um array em JSON. Exemplo: ["/bin/sh", "-c"]'
            >
              <Radio value={INPUT_TYPES.EXEC}>Formato Exec</Radio>
            </Tooltip>
          </Radio.Group>

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

          <Radio.Group
            className='task-details-page-content-info-docker-radio-group'
            name='ArgumentsInputTypes'
            value={argsInputType}
            onChange={handleChangeArgumentsInputType}
          >
            <Tooltip
              placement='topLeft'
              title='O formato SHELL é uma string. Exemplo: echo "hello world"'
            >
              <Radio value={INPUT_TYPES.SHELL}>Formato Shell</Radio>
            </Tooltip>

            <Tooltip
              placement='topLeft'
              title='O formato EXEC é um array em JSON. Exemplo: ["echo", "hello world"]'
            >
              <Radio value={INPUT_TYPES.EXEC}>Formato Exec</Radio>
            </Tooltip>
          </Radio.Group>

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
        <a
          href={URLS.ENTRYPOINT}
          target='_blank'
          rel='noreferrer'
          referrerPolicy='no-referrer'
        >
          ENTRYPOINT
        </a>
        <span> e os argumentos à instrução </span>
        <a
          href={URLS.CMD}
          target='_blank'
          rel='noreferrer'
          referrerPolicy='no-referrer'
        >
          CMD
        </a>
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
